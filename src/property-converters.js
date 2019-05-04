function convert_shopify_property(key, product){
 switch(key){
   case 'title':
     return shopify_title_to_ebay_title(product);
     break;
   case 'weight':
     return shopify_weight_to_ebay_weight(product);
     break;
   default:
     return '???'
     
 }
}

function shopify_title_to_ebay_title(product){
  return {"product": {"title": product.title}};
}

function shopify_weight_to_ebay_weight(product){
  /* For whatever reason, product weight is stored only in product variants ...?
   * right now, just return the weight of the first variant :(
   */
  var shopify_weight = product.variants[0].grams;
  var ebay_weight = {
    "packageWeightAndSize": {
      "weight": {
        "unit" : "GRAM",
        "value": shopify_weight
        }
      }
    };
}

function shopify_condition_to_ebay_condition(product){
  // We store the condition in the first Shopify optio
}