const merge = require('deepmerge');
const mustache = require('mustache');
var XMLHTTPRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest(); 

function convert_shopify_item( shopifyItem, ebayProduct ){
	try{
		 var ebayFields = [
		   convert_shopify_property('title', shopifyItem, ebayProduct),
		   convert_shopify_property('weight', shopifyItem, ebayProduct),
		   convert_shopify_property('condition', shopifyItem, ebayProduct),
		   convert_shopify_property('description', shopifyItem, ebayProduct),
		   convert_shopify_property('manufacturer', shopifyItem, ebayProduct),
		   convert_shopify_property('mpn', shopifyItem, ebayProduct)
		   ];
		  //console.log('ebayFields: %o ', ebayFields);
		  var merged = merge.all(ebayFields);
		  //console.log('merged into: %o', merged);
		  return( merged );
	} catch(e) {
		console.log('Converting shopify item failed: ', e);
	}
}

function convert_shopify_property(key, shopifyItem, ebayProduct){
 switch(key){
   case 'title':
     return shopify_title_to_ebay_title(shopifyItem);
   case 'weight':
     return shopify_weight_to_ebay_weight(shopifyItem);
   case 'condition':
     return shopify_condition_to_ebay_condition(shopifyItem);
   case 'description':
     return shopify_desc_to_ebay_desc(shopifyItem, ebayProduct);
	case 'manufacturer':
		return shopify_manufacturer_to_ebay_manufacturer(shopifyItem);
	case 'mpn':
		return shopify_mpn_to_ebay_mpn(shopifyItem);
   default:
     return {}
     
 }
}

function shopify_title_to_ebay_title(shopifyItem){
  try{
    return {"product": {"title": shopifyItem.product.title}};
  } catch(e) {
    return "";
  }
}

function shopify_desc_to_ebay_desc(shopifyItem, ebayProduct){
  try{
    var shopify_desc = shopifyItem.product.body_html;
    var ebay_html = shopify_desc; 
    var shopify_condition = shopifyItem.product.variants[0].option1;
    
    var fields = {   item_name: shopifyItem.product.title,
                     item_description: shopify_desc  };
    
    // Choose which condition badge to include in the template
    if( shopify_condition === 'Used' ){
        fields.condition = true;
        fields.conditionUsed = true;
    } else if( shopify_condition === 'New' ){
        fields.condition = true;
        fields.conditionNew = true;
    } else {
        fields.condition = false;    // don't render the "Condition" section of the template
    }
    
    ebay_html = mustache.render(window.item_template, fields);
    //ebay_html = ebay_html.replace(/\n+/g, '');					// strip newlines from html for ebay length concerns
    
    var newProduct = {"product": {}};
    
    if( 'offers' in ebayProduct && ebayProduct.offers.length > 0){
    	newProduct.offers = []
    	for( var i=0; i<ebayProduct.offers.length; i++){
    		if('listingDescription' in ebayProduct.offers[i]){
    			var offerId = ebayProduct.offers[i].offerId
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

function shopify_weight_to_ebay_weight(shopifyItem){
  /* For whatever reason, product weight is stored only in product variants ...?
   * right now, just return the weight of the first variant :(
   */
  try {
    var shopify_weight = shopifyItem.product.variants[0].grams;
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

function shopify_condition_to_ebay_condition(shopifyItem){
  /* We store the condition in the first Shopify option. Not all of the products are updated this way so
   * we need to be careful that we check to see if the Shopify option is configured correctly.
   */
  
  // FIXME: This is totally wrong haha just using for debugging
  try{
    var shopify_condition = shopifyItem.product.variants[0].option1
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
    return({"condition": ebay_condition_value});
  } catch(e) {
    var ebay_condition = {};
  }
}

function shopify_manufacturer_to_ebay_manufacturer(shopifyItem){
  try{
    return {"product": {"brand": shopifyItem.metafields.Manufacturer}};
  } catch(e) {
    return {};
  }
}

function shopify_mpn_to_ebay_mpn(shopifyItem){
  try{
    return {"product": {"mpn": shopifyItem.metafields.MPN}};
  } catch(e) {
    return {};
  }
}

export { convert_shopify_item };