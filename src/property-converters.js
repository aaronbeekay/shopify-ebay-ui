function convert_shopify_property(key, product){
 switch(key){
   case 'title':
     return shopify_title_to_ebay_title(product.title);
     break;
   case 'weight':
     
 }
}

function shopify_title_to_ebay_title(title){
  return title;
}
