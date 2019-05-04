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

class PropertyCard extends Component {
  render(){
    var propertyKey = this.props.pkey;
    var propertyTitle = this.props.pname;
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
                  <input id={"ebay-" + propertyKey} name={"ebay-" + propertyKey} type="text" className="form-control ebay-product-property" />
                </div>
              </div>
            </div>
        </div>
        </div>
        </div>
      </>
      );
  }
}

export default App;
