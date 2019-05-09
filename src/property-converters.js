const merge = require('deepmerge');
const mustache = require('mustache');
var XMLHTTPRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest(); 

function convert_shopify_item( product ){
 var ebayFields = [
   convert_shopify_property('title', product),
   convert_shopify_property('weight', product),
   convert_shopify_property('condition', product),
   convert_shopify_property('description', product),
   convert_shopify_property('manufacturer', product),
   convert_shopify_property('mpn', product)
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
	case 'manufacturer':
		return shopify_manufacturer_to_ebay_manufacturer(product);
	case 'mpn':
		return shopify_mpn_to_ebay_mpn(product);
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
    var ebay_html = shopify_desc; 
    var fields = {   item_name: product.title,
                     item_description: shopify_desc  };
    ebay_html = mustache.render(window.item_template, fields);
    //ebay_html = ebay_html.replace(/\n+/g, '');					// strip newlines from html for ebay length concerns
    
    var newProduct = {"product": {}};
    
    if( 'offers' in product && product.offers.length > 0){
    	newProduct.offers = []
    	for( var i=0; i<product.offers.length; i++){
    		if('listingDescription' in product.offers[i]){
    			var offerId = product.offers[i].offerId
    			newProduct.offers.push( {offerId: offerId, listingDescription: ebay_html} );	// Add the new description to each offer
    		}
    	}
    } else {
    	newProduct.product.description = ebay_html
    }                 
   return( newProduct );
  } catch(e) {
  	console.log("uh oh: ",e);
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
    var shopify_condition = product.variants[0].option1
    var ebay_condition_value;
    switch(shopify_condition){
    	case 'New':
    		ebay_condition_value = 'NEW';
    		break;
    	case 'Used':
    		ebay_condition_value = 'USED_GOOD';
    		break;
    	default:
    		return( {} )   
    	}
    return({"Condition": ebay_condition_value});
  } catch(e) {
    var ebay_condition = {};
  }
  return( ebay_condition );
}

function shopify_manufacturer_to_ebay_manufacturer(product){
  try{
    return {"product": {"brand": product.metafields.Manufacturer}};
  } catch(e) {
    return {};
  }
}

function shopify_mpn_to_ebay_mpn(product){
  try{
    return {"product": {"mpn": product.metafields.MPN}};
  } catch(e) {
    return {};
  }
}

export { convert_shopify_item };