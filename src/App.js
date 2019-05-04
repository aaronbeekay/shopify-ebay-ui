import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <PropsAccordion />
    );
  }
}

class PropsAccordion extends Component {
 render(){
   return(
    <>
      <p>is anybody there?</p>			
      <PropertyCard pkey="title" pname="Title"></PropertyCard>
      <PropertyCard pkey="weight" pname="Weight"></PropertyCard>
      <PropertyCard pkey="condition" pname="Condition"></PropertyCard>
      <PropertyCard pkey="manufacturer" pname="Manufacturer"></PropertyCard>				
      <PropertyCard pkey="mpn" pname="MPN"></PropertyCard>
    </>
   );
 }
}

class PropertyCardHeader extends Component {
  render() {
    var propertyKey = this.props.pkey;
    var propertyTitle = this.props.ptitle;
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
 render(){
  var propertyKey = this.props.pkey;
  var propertyTitle = this.props.pname;

  return(
    <div className="col-sm-6 col-xs-10">
      <div className="form-label-group mb-4">
        <label htmlFor={"shopify-" + propertyKey} className="mb-3">Shopify {propertyTitle}</label> 
        <input id={"shopify-" + propertyKey} name={"shopify-" + propertyKey} type="text" className="form-control shopify-product-property" />
      </div>
    </div>
    );
 }
}

class EbayProperty extends Component {
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
          <label className="btn btn-sm btn-outline-secondary ebay-toggle">
            <input type="checkbox" name={"ebay-" + propertyKey + "-title-toggle"} className="ebay-toggle" id={"ebay-" + propertyKey + "-old"} />Old
          </label>
          <label className="btn btn-sm btn-secondary ebay-toggle">
            <input type="checkbox" name={"ebay-" + propertyKey + "-toggle"} className="ebay-toggle" id={"ebay-" + propertyKey + "-new"}checked />New
          </label>
        </div> {/*  .btn-group */}
        <EbayPropertyValueField pkey={propertyKey} item={oldEbayItem}></EbayPropertyValueField>
      </div>
      </div>
    </>
    );
 }
}

class EbayPropertyValueField extends Component{
  render(){
    var propertyKey = this.props.pkey;
    var item = this.props.item;   // the item that we'll pull info from -- leave it to parent to pass us the correct item
    switch (propertyKey) {
      case 'title':
        var pvalue = item.product.title;
        return(
          <input id={"ebay-" + propertyKey} name={"ebay-" + propertyKey} type="text" value={pvalue} className="form-control ebay-product-property" />
          );
        break;
      case 'weight':
        var pvalue = item.packageWeightAndSize.weight.value;
        var punit = item.packageWeightAndSize.weight.unit;
        return(
          <div className="input-group mb-3">
            <input id={"ebay-" + propertyKey} name={"ebay-" + propertyKey} type="text" value={pvalue} className="form-control ebay-product-property" />
            <div className="input-group-append">
              <span className="input-group-text">{punit}</span>
            </div>
          </div>
          );
        break;
      default:
        return(
          <input id={"ebay-" + propertyKey} name={"ebay-" + propertyKey} type="text" className="form-control ebay-product-property" />
          );
    }  
  }
}

class PropertyCard extends Component {
  render(){
    var propertyKey = this.props.pkey;
    var propertyTitle = this.props.pname;
    // pass in the Shopify attribute as a prop
    var shopifyProductProperty = this.props.shopify;
    // pass in the existing eBay attribute as a prop
    var ebayProductProperty = this.props.ebay;
    // calculate the destination eBay attribute from a function
    var updatedEbayProductProperty = null; //TODO calculate
    return(
      <>
        <div className="card">
          <PropertyCardHeader pkey={propertyKey} pname={propertyTitle}></PropertyCardHeader>
          <div id={propertyKey + "-cardbody"} className="collapse show" aria-labelledby={propertyKey + "-header"}>
          <div className="card-body">
            <div className="row">
              {/*  Shopify */}				
              <ShopifyProperty pkey={propertyKey} pname={propertyTitle}></ShopifyProperty>
              {/*  eBay */}
              <EbayProperty pkey={propertyKey} pname={propertyTitle}></EbayProperty>
            </div>
        </div>
        </div>
        </div>
      </>
      );
  }
}

export default App;
