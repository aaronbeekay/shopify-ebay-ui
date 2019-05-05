const merge = require('deepmerge');

function convert_shopify_item( product ){
 var ebayFields = [
   convert_shopify_property('title', product),
   convert_shopify_property('weight', product),
   convert_shopify_property('condition', product)
   ];
  console.log('ebayFields: ' + ebayFields);
  return( merge.all(ebayFields) );
}

function convert_shopify_property(key, product){
 switch(key){
   case 'title':
     return shopify_title_to_ebay_title(product);
     break;
   case 'weight':
     return shopify_weight_to_ebay_weight(product);
     break;
  
   default:
     return {}
     
 }
}

function shopify_title_to_ebay_title(product){
  return {"product": {"title": product.title}};
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
    var ebay_weight = {"none": "none"};
  }
}

function shopify_condition_to_ebay_condition(product){
  /* We store the condition in the first Shopify option. Not all of the products are updated this way so
   * we need to be careful that we check to see if the Shopify option is configured correctly.
   */
  
  // FIXME: This is totally wrong haha just using for debugging
  try{
    var ebay_condition = { "condition" : this.product.variants[0].option1 }
  } catch(e) {
    var ebay_condiiton = null;
  }
}

export { convert_shopify_item };