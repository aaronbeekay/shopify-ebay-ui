import React, { Component } from 'react';
import { convert_shopify_item } from './property-converters.js';
const merge = require('deepmerge');
const shopify_sync_status = {'noproduct': 0, 'uptodate': 1, 'changed': 2, 'syncing': 3};

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      shopifyItem: null,
      shopifyItemChanged: shopify_sync_status.noproduct,
      shopifyItemChanges: {},
      ebayItemOld: null
    }
    this.handleShopifyChange = this.handleShopifyChange.bind(this);
    this.setShopifyItem = this.setShopifyItem.bind(this);
    this.handleShopifyUpdateButtonClick = this.handleShopifyUpdateButtonClick.bind(this);
    this.setEbayItem = this.setEbayItem.bind(this);
  }
  
  setShopifyItem(product){
    this.setState({shopifyItem: product, shopifyItemChanged: shopify_sync_status.uptodate});
  }
  
  setEbayItem(product){
    this.setState({ebayItem: product});
  }
  
  handleShopifyChange(e){
   var newShopifyChanges = merge(this.state.shopifyItemChanges, e);
   console.log("Shopify item change! Now the Shopify item changes are %o", newShopifyChanges);
   this.setState({shopifyItemChanged: shopify_sync_status.changed, shopifyItemChanges: newShopifyChanges}); 
  }
  
  handleShopifyUpdateButtonClick(e){
    alert("This button does not work yet.");
  }
  
  render() {
    //console.log("Rendering the whole app! Shopify item is %o", this.state.shopifyItem);
    var shopifyItemToSend;
    if( this.state.shopifyItemChanged == shopify_sync_status.uptodate ){
      console.log("No item changes, so sending original shopify item");
      shopifyItemToSend = this.state.shopifyItem;
    } else {
      console.log("I see that the shopify item changes are %o", this.state.shopifyItemChanges);
      shopifyItemToSend = merge(this.state.shopifyItem, this.state.shopifyItemChanges);
      console.log("The shopify item has been edited, so using merged state %o",shopifyItemToSend);
    }
    return (
      <>
      <ShopifyUpdateButton state={this.state.shopifyItemChanged} onUpdateButtonClick={this.handleShopifyUpdateButtonClick} />
      <PropsAccordion 
          ref={(propsAccordion) => {window.propsAccordion = propsAccordion}} 
          shopifyItem={shopifyItemToSend} 
          ebayItemOld={this.state.ebayItemOld} 
          onShopifyChange={this.handleShopifyChange} 
        />
      </>
        );
  }
}

class ShopifyUpdateButton extends Component {
  constructor(props){
    super(props);
    this.handleSyncButtonClick = this.handleSyncButtonClick.bind(this);
  }
 handleSyncButtonClick(e){
   this.props.onUpdateButtonClick(e);
 }
  
  render(){
   var state = this.props.state;
    
    if(state==shopify_sync_status.uptodate){    // 1 = no changes
      return(
        <button class="btn btn-outline-info disabled" type="button" id="shopify-update-button" disabled>Write Shopify changes</button>
        );
    } else if(state == shopify_sync_status.changed ) {   // 2 = changes to be synced
      return(
        <button class="btn btn-outline-info" type="button" id="shopify-update-button">Write Shopify changes</button>
        );
    } else if(state == shopify_sync_status.syncing ) { // 3 = actively syncing changes
      return(
        <button class="btn btn-outline-info" type="button" id="shopify-update-button">Updating...</button>
        );
    } else {
      return null;
    }
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
    var newShopify = {"title": newValue};
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
      <input id={"shopify-" + propertyKey} name={"shopify-" + propertyKey} type="text" value={pvalue} className="form-control shopify-product-property" onChange={this.handleChange} />
      );
 }
}

class ShopifyDescriptionValueField extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(e){
    var newValue = e.target.value;
    var newShopify = {"body_html": newValue}
    this.props.onChange(newShopify);
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
      case 'description':
        return(
          <EbayDescriptionValueField pkey={propertyKey} item={item}></EbayDescriptionValueField>
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

class EbayDescriptionValueField extends Component{
  render(){
    try{
      var ebay_html = this.props.item.product.description;
    } catch(e) {
      var ebay_html = '';
    }
  return(
    <iframe id="ebay-description-iframe" style={{width: "100%"}} srcDoc={ebay_html}></iframe>
  );
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
