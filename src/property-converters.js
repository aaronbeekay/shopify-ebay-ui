const merge = require('deepmerge');
const mustache = require('mustache');
var XMLHTTPRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest(); 
var ebay_template;

function receiveEbayTemplate(){
  ebay_template = this.responseText;
}
xhr.addEventListener("load", receiveEbayTemplate);
xhr.open("GET", "https://ebay-sync.slirp.aaronbeekay.info/item-template.html");
xhr.send();

function convert_shopify_item( product ){
 var ebayFields = [
   convert_shopify_property('title', product),
   convert_shopify_property('weight', product),
   convert_shopify_property('condition', product),
   convert_shopify_property('description', product)
   ];
  //console.log('ebayFields: %o ', ebayFields);
  var merged = merge.all(ebayFields);
  //console.log('merged into: %o', merged);
  return( merged );
}

function convert_shopify_property(key, product){
 switch(key){
   case 'title':
     return shopify_title_to_ebay_title(product);
   case 'weight':
     return shopify_weight_to_ebay_weight(product);
   case 'condition':
     return shopify_condition_to_ebay_condition(product);
   case 'description':
     return shopify_desc_to_ebay_desc(product);
   default:
     return {}
     
 }
}

function shopify_title_to_ebay_title(product){
  try{
    return {"product": {"title": product.title}};
  } catch(e) {
    return "";
  }
}

function shopify_desc_to_ebay_desc(product){
  try{
    var shopify_desc = product.body_html;
    var ebay_html = shopify_desc;    // TODO apply template
    return {"product": {"description": ebay_html}}
  } catch(e) {
    return {"product": {"description": ""}};
  }
}

function shopify_weight_to_ebay_weight(product){
  /* For whatever reason, product weight is stored only in product variants ...?
   * right now, just return the weight of the first variant :(
   */
  try {
    var shopify_weight = product.variants[0].grams;
    var ebay_weight = {
      "packageWeightAndSize": {
        "weight": {
          "unit" : "GRAM",
          "value": shopify_weight
          }
        }
      };
  } catch(e) {
    var ebay_weight = {};
  }
  return( ebay_weight );
}

function shopify_condition_to_ebay_condition(product){
  /* We store the condition in the first Shopify option. Not all of the products are updated this way so
   * we need to be careful that we check to see if the Shopify option is configured correctly.
   */
  
  // FIXME: This is totally wrong haha just using for debugging
  try{
    var ebay_condition = { "condition" : product.variants[0].option1 }
  } catch(e) {
    var ebay_condition = {};
  }
  return( ebay_condition );
}

export { convert_shopify_item };