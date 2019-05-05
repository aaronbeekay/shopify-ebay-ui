import React, { Component } from 'react';
import { convert_shopify_item } from './property-converters.js';
const merge = require('deepmerge');

const test_ebay_response_old = {
  "availability": {
    "pickupAtLocationAvailability": [
      {
        "availabilityType": "AvailabilityTypeEnum : [IN_STOCK,OUT_OF_STOCK,SHIP_TO_STORE]",
        "fulfillmentTime": {
          "unit": "TimeDurationUnitEnum : [YEAR,MONTH,DAY,HOUR,CALENDAR_DAY,BUSINESS_DAY,MINUTE,SECOND,MILLISECOND]",
          "value": "integer"
        },
        "merchantLocationKey": "string",
        "quantity": "integer"
      }
    ],
    "shipToLocationAvailability": {
      "quantity": "integer"
    }
  },
  "condition": "ConditionEnum : [NEW,LIKE_NEW,NEW_OTHER,NEW_WITH_DEFECTS,MANUFACTURER_REFURBISHED,SELLER_REFURBISHED,USED_EXCELLENT,USED_VERY_GOOD,USED_GOOD,USED_ACCEPTABLE,FOR_PARTS_OR_NOT_WORKING]",
  "conditionDescription": "string",
  "packageWeightAndSize": {
    "dimensions": {
      "height": "number",
      "length": "number",
      "unit": "LengthUnitOfMeasureEnum : [INCH,FEET,CENTIMETER,METER]",
      "width": "number"
    },
    "packageType": "PackageTypeEnum : [LETTER,BULKY_GOODS,CARAVAN,CARS,EUROPALLET,EXPANDABLE_TOUGH_BAGS,EXTRA_LARGE_PACK,FURNITURE,INDUSTRY_VEHICLES,LARGE_CANADA_POSTBOX,LARGE_CANADA_POST_BUBBLE_MAILER,LARGE_ENVELOPE,MAILING_BOX,MEDIUM_CANADA_POST_BOX,MEDIUM_CANADA_POST_BUBBLE_MAILER,MOTORBIKES,ONE_WAY_PALLET,PACKAGE_THICK_ENVELOPE,PADDED_BAGS,PARCEL_OR_PADDED_ENVELOPE,ROLL,SMALL_CANADA_POST_BOX,SMALL_CANADA_POST_BUBBLE_MAILER,TOUGH_BAGS,UPS_LETTER,USPS_FLAT_RATE_ENVELOPE,USPS_LARGE_PACK,VERY_LARGE_PACK,WINE_PAK]",
    "weight": {
      "unit": "POUND",
      "value": "number"
    }
  },
  "product": {
    "aspects": [
      "string"
    ],
    "brand": "string",
    "description": "string",
    "imageUrls": [
      "string"
    ],
    "mpn": "string",
    "subtitle": "string",
    "title": "string",
    "isbn": [
      "string"
    ],
    "upc": [
      "string"
    ],
    "ean": [
      "string"
    ],
    "epid": "string"
  },
  "sku": "string",
  "locale": "LocaleEnum : [en_US,en_CA,fr_CA,en_GB,en_AU,en_IN,de_AT,fr_BE,fr_FR,de_DE,it_IT,nl_BE,nl_NL,es_ES,de_CH,fi_FI,zh_HK,hu_HU,en_PH,pl_PL,pt_PT,ru_RU,en_SG,en_IE,en_MY]",
  "groupIds": [
    "string"
  ],
  "inventoryItemGroupKeys": [
    "string"
  ]
};
const test_shopify_response = {"product":{"admin_graphql_api_id":"gid://shopify/Product/2113031864379","body_html":"<ul>\n<li>\n<dl>\n<dt>Number of Protected Poles:</dt>\n<dd>1</dd>\n</dl>\n</li>\n<li>\n<dl>\n<dt>Arrester Class:</dt>\n<dd>II</dd>\n</dl>\n</li>\n<li>\n<dl>\n<dt>Version:</dt>\n<dd>Plug-in</dd>\n</dl>\n</li>\n<li>\n<dl>\n<dt>Discharge Current (I<sub>max</sub>):</dt>\n<dd>Nominal 20 kA<br>Maximum 40 kA</dd>\n</dl>\n</li>\n<li>\n<dl>\n<dt>Maximum Continuous Operating Voltage (U<sub>c</sub>):</dt>\n<dd>670 V</dd>\n</dl>\n</li>\n<li>\n<dl>\n<dt>Voltage Rating DC:</dt>\n<dd>600 V</dd>\n</dl>\n</li>\n<li>\n<dl>\n<dt>Short Circuit Withstand Icc:</dt>\n<dd>0.3 kA</dd>\n</dl>\n</li>\n<li>\n<dl>\n<dt>Product Name:</dt>\n<dd>Surge Protective Devices</dd>\n</dl>\n</li>\n<li>\n<dl>\n<dt>Suitable For:</dt>\n<dd>To protect the systems against the transient overvoltage (lightning)</dd>\n</dl>\n</li>\n</ul>","created_at":"2019-02-23T16:57:18-05:00","handle":"abb-2ctb803950r0000-ovr-surge-protector-pv-40-600-c","id":2113031864379,"image":{"admin_graphql_api_id":"gid://shopify/ProductImage/7503023079483","alt":null,"created_at":"2019-02-23T16:57:21-05:00","height":1544,"id":7503023079483,"position":1,"product_id":2113031864379,"src":"https://cdn.shopify.com/s/files/1/0129/3854/3163/products/ABB_2CTBB803950R0000_1.jpg?v=1550959041","updated_at":"2019-02-23T16:57:21-05:00","variant_ids":[],"width":1648},"images":[{"admin_graphql_api_id":"gid://shopify/ProductImage/7503023079483","alt":null,"created_at":"2019-02-23T16:57:21-05:00","height":1544,"id":7503023079483,"position":1,"product_id":2113031864379,"src":"https://cdn.shopify.com/s/files/1/0129/3854/3163/products/ABB_2CTBB803950R0000_1.jpg?v=1550959041","updated_at":"2019-02-23T16:57:21-05:00","variant_ids":[],"width":1648},{"admin_graphql_api_id":"gid://shopify/ProductImage/7503023407163","alt":null,"created_at":"2019-02-23T16:57:23-05:00","height":1824,"id":7503023407163,"position":2,"product_id":2113031864379,"src":"https://cdn.shopify.com/s/files/1/0129/3854/3163/products/ABB_2CTBB803950R0000_2.jpg?v=1550959043","updated_at":"2019-02-23T16:57:23-05:00","variant_ids":[],"width":2608}],"options":[{"id":2948214784059,"name":"Condition","position":1,"product_id":2113031864379,"values":["New"]}],"product_type":"","published_at":"2019-02-23T16:55:08-05:00","published_scope":"web","tags":"Industrial","template_suffix":null,"title":"ABB 2CTB803950R0000 OVR Surge Protector PV 40 600 C","updated_at":"2019-04-03T23:36:10-04:00","variants":[{"admin_graphql_api_id":"gid://shopify/ProductVariant/20361958522939","barcode":"","compare_at_price":null,"created_at":"2019-02-23T16:57:18-05:00","fulfillment_service":"manual","grams":454,"id":20361958522939,"image_id":null,"inventory_item_id":20836432773179,"inventory_management":"shopify","inventory_policy":"deny","inventory_quantity":1,"old_inventory_quantity":1,"option1":"New","option2":null,"option3":null,"position":1,"price":"50.00","product_id":2113031864379,"requires_shipping":true,"sku":"","taxable":true,"title":"New","updated_at":"2019-04-03T23:36:10-04:00","weight":1.0,"weight_unit":"lb"}],"vendor":"glitchlab"}};

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      shopifyItem: test_shopify_response.product,
      shopifyItemChanged: false,
      shopifyItemChanges: {},
      ebayItemOld: test_ebay_response_old
    }
    this.handleShopifyChange = this.handleShopifyChange.bind(this);
  }
  
  handleShopifyChange(e){
   var newShopifyChanges = merge(this.state.shopifyItemChanges, e);
    console.log("Shopify item change! Now the Shopify item changes are %o", newShopifyChanges);
   this.setState({shopifyItemChanged: true}); 
  }
  
  render() {
    //console.log("Rendering the whole app! Shopify item is %o", this.state.shopifyItem);
    return (
      <>
        {this.state.shopifyItemChanged &&
          <p>Something has changed</p> }
      <PropsAccordion ref={(propsAccordion) => {window.propsAccordion = propsAccordion}} shopifyItem={(this.state.shopifyItemChanged ? this.state.shopifyItem : merge(this.state.shopifyItem, this.state.shopifyItemChanges))} ebayItemOld={this.state.ebayItemOld} onShopifyChange={this.handleShopifyChange} />
      </>
        );
  }
}

class PropsAccordion extends Component {
  constructor(props){
    super(props);
    this.handleShopifyChange = this.handleShopifyChange.bind(this);
  }
  
  handleShopifyChange(e){
    this.props.onShopifyChange(e);
  }
  
 render(){
   var sp = this.props.shopifyItem;
   var epOld = this.props.ebayItemOld;
   return(
    <>			
      <PropertyCard pkey="title" pname="Title" shopifyItem={sp} ebayItemOld={epOld} onShopifyChange={this.handleShopifyChange}></PropertyCard>
      <PropertyCard pkey="description" pname="Description" shopifyItem={sp} ebayItemOld={epOld} onShopifyChange={this.handleShopifyChange}></PropertyCard>
      <PropertyCard pkey="weight" pname="Weight" shopifyItem={sp} ebayItemOld={epOld} onShopifyChange={this.handleShopifyChange}></PropertyCard>
      <PropertyCard pkey="condition" pname="Condition" shopifyItem={sp} ebayItemOld={epOld} onShopifyChange={this.handleShopifyChange}></PropertyCard>
      <PropertyCard pkey="manufacturer" pname="Manufacturer" shopifyItem={sp} ebayItemOld={epOld} onShopifyChange={this.handleShopifyChange} ></PropertyCard>				
      <PropertyCard pkey="mpn" pname="MPN" shopifyItem={sp} ebayItemOld={epOld} onShopifyChange={this.handleShopifyChange}></PropertyCard>
    </>
   );
 }
}

class PropertyCard extends Component {
  constructor(props){
    super(props);
    this.handleShopifyChange = this.handleShopifyChange.bind(this);
  }
  
  handleShopifyChange(e){
    console.log("PropertyCard got change event e: %o", e);
    this.props.onShopifyChange(e);
  }
  
  render(){
    var propertyKey = this.props.pkey;
    var propertyTitle = this.props.pname;
    // pass in the Shopify attribute as a prop
    var sp = this.props.shopifyItem;
    // pass in the existing eBay attribute as a prop
    var epOld = this.props.ebayItemOld;
    // calculate the destination eBay attribute from a function
    var epNew = convert_shopify_item(this.props.shopifyItem); 
    
    //console.log('Hi I am the PropertyCard ' + propertyKey + '! I am trying to render myself and I was given the OLD eBay product %o. I was given the NEW eBay product %o.', epOld, epNew);
    return(
      <>
        <div className="card">
          <PropertyCardHeader pkey={propertyKey} pname={propertyTitle}></PropertyCardHeader>
          <div id={propertyKey + "-cardbody"} className="collapse show" aria-labelledby={propertyKey + "-header"}>
          <div className="card-body">
            <div className="row">
              {/*  Shopify */}				
              <ShopifyProperty pkey={propertyKey} pname={propertyTitle} item={sp} onChange={this.handleShopifyChange}></ShopifyProperty>
              {/*  eBay */}
              <EbayProperty pkey={propertyKey} pname={propertyTitle} old={epOld} new={epNew}></EbayProperty>
            </div>
        </div>
        </div>
        </div>
      </>
      );
  }
}

class PropertyCardHeader extends Component {
  render() {
    var propertyKey = this.props.pkey;
    var propertyTitle = this.props.pname;
    return (
      <div className="card-header" id={propertyKey + "-header"}>
        <h5 className="mb-0">
          <button className="btn btn-link" data-toggle="collapse" data-target={"#" + propertyKey + "-cardbody"}>{propertyTitle}</button>
        </h5>
      </div>
      );
  }
}

class ShopifyProperty extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(e){
    console.log("ShopifyProperty got change event e: %o", e);
    this.props.onChange(e);
  }
  
 render(){
  var propertyKey = this.props.pkey;
  var propertyTitle = this.props.pname;
  var shopifyItem = this.props.item;

  return(
    <div className="col-sm-6 col-xs-10">
      <div className="form-label-group mb-4">
        <label htmlFor={"shopify-" + propertyKey} className="mb-3">Shopify {propertyTitle}</label> 
        <ShopifyPropertyValueField pkey={propertyKey} item={shopifyItem} onChange={this.handleChange}></ShopifyPropertyValueField>
      </div>
    </div>
    );
 }
}

class ShopifyPropertyValueField extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(e){
    console.log("ShopifyPropertyValueField got change event e: %o", e);
    this.props.onChange(e);
  }
  
 render() {
  var propertyKey = this.props.pkey;
  var item = this.props.item;
   switch(propertyKey){
     case 'title':
       return( <ShopifyTitleValueField pkey={propertyKey} item={item} onChange={this.handleChange}></ShopifyTitleValueField> );
     case 'description':
       return( <ShopifyDescriptionValueField pkey={propertyKey} item={item} onChange={this.handleChange}></ShopifyDescriptionValueField> );
     case 'weight':
       return( <ShopifyWeightValueField pkey={propertyKey} item={item} onChange={this.handleChange}></ShopifyWeightValueField> );
     case 'condition':
       return( <ShopifyConditionValueField pkey={propertyKey} item={item} onChange={this.handleChange}></ShopifyConditionValueField> );
     case 'manufacturer':
       return( <ShopifyManufacturerValueField pkey={propertyKey} item={item} onChange={this.handleChange}></ShopifyManufacturerValueField> );
     case 'mpn':
       return( <ShopifyMPNValueField pkey={propertyKey} item={item} onChange={this.handleChange}></ShopifyMPNValueField> );
     default:
       return null;
   }
 }
}

class ShopifyTitleValueField extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(e){
    console.log("ShopifyTitleValueField got change event e: %o", e);
    var newValue = e.target.value;
    var newShopify = {"item": {"title": newValue}};
    this.props.onChange(newShopify);
  }
 render(){
    var propertyKey = this.props.pkey;
    var pvalue = ''
    try {
       //console.log("ShopifyTitleValueField: item title: " + this.props.item.title );
       pvalue = this.props.item.title; 
    } catch(e) {
      //console.log('ShopifyTitleValueField: missing a shopify field value: ' + e);
      pvalue = '';
    }
    return(
      <input id={"shopify-" + propertyKey} name={"shopify-" + propertyKey} type="text" value={pvalue} className="form-control shopify-product-property" onBlur={this.handleChange} />
      );
 }
}

class ShopifyDescriptionValueField extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(){
    this.props.onChange();
  }
 render(){
    var propertyKey = this.props.pkey;

    try {
       var pvalue = this.props.item.body_html; 
    } catch(e) {
      //console.log('missing a shopify field value: ' + e);
      var pvalue = '';
    }
    return(
      <textarea id="shopify-description" name="shopify-description" type="textarea" rows="8" className="form-control shopify-product-property" value={pvalue} onChange={this.handleChange}></textarea>
      );
 }
}

class ShopifyWeightValueField extends Component {
  /* TODO: this currently just looks at the weight of the first defined variant
   *   If the variants have different weights, that won't show up on this page
   */
 render(){
    var propertyKey = this.props.pkey;

    try {
       var pvalue = this.props.item.variants[0].grams; 
    } catch(e) {
      //console.log('missing a shopify field value: ' + e);
      var pvalue = '';
    }
    var punit = 'grams';  // TODO: later we could look up the unit that the value is defined by in shopify, but for now we have a "grams" field that is always accurate
    return(
      <div className="input-group mb-3">
        <input id={"shopify-" + propertyKey} name={"shopify-" + propertyKey} type="text" value={pvalue} className="form-control shopify-product-property" readOnly />
        <div className="input-group-append">
          <span className="input-group-text">{punit}</span>
        </div>
      </div>
      );
 }
}

class ShopifyConditionValueField extends Component {
 render(){
    var propertyKey = this.props.pkey;

    try {
       var pvalue = this.props.item.variants[0].option1;     // FIXME: This needs to check to make sure the product's Option 1 field is set up correctly
    } catch(e) {
      //console.log('missing a shopify field value: ' + e);
      var pvalue = '';
    }
    return(
      <input id={"shopify-" + propertyKey} name={"shopify-" + propertyKey} type="text" value={pvalue} className="form-control shopify-product-property" readOnly />
      );
 }
}

class ShopifyManufacturerValueField extends Component {
 render(){
    var propertyKey = this.props.pkey;

    try {
       var pvalue = this.props.item.metafields.Manufacturer; 
    } catch(e) {
      console.log('missing a shopify field value: ' + e);
      var pvalue = '';
    }
    return(
      <input id={"shopify-" + propertyKey} name={"shopify-" + propertyKey} type="text" value={pvalue} className="form-control shopify-product-property" readOnly />
      );
 }
}

class ShopifyMPNValueField extends Component {
 render(){
    var propertyKey = this.props.pkey;

    try {
       var pvalue = this.props.item.metafields.MPN; 
    } catch(e) {
      //console.log('missing a shopify field value: ' + e);
      var pvalue = '';
    }
    return(
      <input id={"shopify-" + propertyKey} name={"shopify-" + propertyKey} type="text" value={pvalue} className="form-control shopify-product-property" readOnly />
      );
 }
}

class EbayProperty extends Component {
  constructor(props){
    super(props);
    this.state = {
      displayNewValue: true
    }
    this.handleValueToggleChange = this.handleValueToggleChange.bind(this);
  }
  
  handleValueToggleChange(){
    this.setState({
      displayNewValue: !this.state.displayNewValue
    });
  }
  
 render(){
  var propertyKey = this.props.pkey;
  var propertyTitle = this.props.pname;
  var oldEbayItem = this.props.old;      // The item as it currently exists in eBay
  var newEbayItem = this.props.new;      // The item as we plan to update it
  return(
    <>
    <div className="col-sm-6 col-xs-10">
      <div className="form-label-group">
        <label htmlFor={"ebay-" + propertyKey}>eBay {propertyTitle}</label> 
        {/*  Old/new data toggle */}
        <div className="btn-group-toggle btn-group float-right mb-2" role="group" data-toggle="buttons" aria-label="eBay old/new data toggle">
          <EbayPropertyToggle pkey={propertyKey} checked={!this.state.displayNewValue} text="Old" onChange={this.handleValueToggleChange} ></EbayPropertyToggle>
          <EbayPropertyToggle pkey={propertyKey} checked={this.state.displayNewValue} text="New" onChange={this.handleValueToggleChange} ></EbayPropertyToggle>
        </div> {/*  .btn-group */}
        <EbayPropertyValueField pkey={propertyKey} item={this.state.displayNewValue ? newEbayItem : oldEbayItem}></EbayPropertyValueField>
      </div>
      </div>
    </>
    );
 }
}

class EbayPropertyToggle extends Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(){
    this.props.onChange();
  }
  
 render(){
  var propertyKey = this.props.pkey;
  var checked = this.props.checked;
  var text = this.props.text;
  
  if(checked){
    var classes = "btn btn-sm btn-secondary active ebay-toggle";
  } else {
    var classes = "btn btn-sm btn-outline-secondary ebay-toggle";
  }
  return(
    <label className={classes} onClick={this.handleChange} >
      <input type="checkbox" name={"ebay-" + propertyKey + "-toggle"} className="ebay-toggle" checked={checked} readOnly />{text}
    </label>
    );
 }
}

class EbayPropertyValueField extends Component{
  render(){
    var propertyKey = this.props.pkey;
    var item = this.props.item;   // the item that we'll pull info from -- leave it to parent to pass us the correct item
    //console.log("What's up. I'm EbayPropertyValueField and I was given the key %s. The item I have is %o.", propertyKey, item);
    switch (propertyKey) {
      case 'title':
        var pvalue = ((typeof item != 'undefined') && ('product' in item) && ('title' in item.product) ? item.product.title : '');
        return(
          <input id={"ebay-" + propertyKey} name={"ebay-" + propertyKey} type="text" value={pvalue} className="form-control ebay-product-property" readOnly />
          );
      case 'weight':
        return(
          <EbayWeightValueField pkey={propertyKey} item={item}></EbayWeightValueField>
          );
      case 'condition':
        return(
          <EbayConditionValueField pkey={propertyKey} item={item}></EbayConditionValueField>
          );
      case 'manufacturer':
        return(
          <EbayManufacturerValueField pkey={propertyKey} item={item}></EbayManufacturerValueField>
          );
      case 'mpn':
        return(
          <EbayMPNValueField pkey={propertyKey} item={item}></EbayMPNValueField>
          );
      default:
        return(
          <input id={"ebay-" + propertyKey} name={"ebay-" + propertyKey} type="text" className="form-control ebay-product-property" readOnly />
          );
    }  
  }
}

class EbayWeightValueField extends Component{
  render(){
    var propertyKey = this.props.pkey;

    // see if we've been given an item
    if( (typeof this.props.item == 'undefined') || !('packageWeightAndSize' in this.props.item) || !('weight' in this.props.item.packageWeightAndSize) ){
      var pvalue = '';
      var punit = '';
    } else {
      var pvalue = this.props.item.packageWeightAndSize.weight.value;
      var punit = this.props.item.packageWeightAndSize.weight.unit;
    }
    return(
    <div className="input-group mb-3">
      <input id={"ebay-" + propertyKey} name={"ebay-" + propertyKey} type="text" value={pvalue} className="form-control ebay-product-property" readOnly />
      <div className="input-group-append">
        <span className="input-group-text">{punit}</span>
      </div>
    </div>
    );
  }
}

class EbayConditionValueField extends Component{
  render(){
    var propertyKey = this.props.pkey;

    // see if we've been given an item with the right characteristics
    if( (typeof this.props.item == 'undefined') || !('condition' in this.props.item) ){
      var pvalue = '';
    } else {
      var pvalue = this.props.item.condition;    // TODO: this may have to be decoded from a numeric value
    }
    return(
      <input id={"ebay-" + propertyKey} name={"ebay-" + propertyKey} type="text" value={pvalue} className="form-control ebay-product-property" readOnly />
    );
  }
}

class EbayManufacturerValueField extends Component{
  render(){
    var propertyKey = this.props.pkey;

    // see if we've been given an item with the right characteristics
    if( (typeof this.props.item == 'undefined') || !('product' in this.props.item) || !('brand' in this.props.item.product) ){
      var pvalue = '';
    } else {
      var pvalue = this.props.item.product.brand;  
    }
    return(
      <input id={"ebay-" + propertyKey} name={"ebay-" + propertyKey} type="text" value={pvalue} className="form-control ebay-product-property" readOnly />
    );
  }
}

class EbayMPNValueField extends Component{
  render(){
    var propertyKey = this.props.pkey;

    // see if we've been given an item with the right characteristics
    if( (typeof this.props.item == 'undefined') || !('product' in this.props.item) || !('mpn' in this.props.item.product) ){
      var pvalue = '';
    } else {
      var pvalue = this.props.item.product.mpn;  
    }
    return(
      <input id={"ebay-" + propertyKey} name={"ebay-" + propertyKey} type="text" value={pvalue} className="form-control ebay-product-property" readOnly />
    );
  }
}

export default App;
