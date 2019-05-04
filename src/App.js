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
				
				{/*  Weight */}
      <PropertyCard pkey="weight" pname="Weight"></PropertyCard>
      <PropertyCard pkey="butts" pname="Butts"></PropertyCard>
				
				{/*  Condition */}
				<div className="card">
					<div className="card-header" id="condition-header">
						<h5 className="mb-0">
							<button className="btn btn-link" data-toggle="collapse" data-target="#condition-cardbody">Condition</button>
						</h5>
					</div> {/*  .card-header */}
					<div id="condition-cardbody" className="collapse show" aria-labelledby="condition-header">
						<div className="card-body row">
							{/*  Shopify */}
							<div className="col-sm-6 col-xs-10">
								<div className="form-label-group mb-4">
									<label htmlFor="shopify-condition" className="mb-3">Shopify condition</label> 
									<input id="shopify-condition" name="shopify-condition" type="text" className="form-control shopify-product-property" />
								</div>
							</div>
							{/*  eBay */}
							<div className="col-sm-6 col-xs-10">
								<div className="form-label-group">
									<label htmlFor="ebay-condition">eBay condition</label> 
									{/*  Old/new data toggle */}
									<div className="btn-group-toggle btn-group float-right mb-2" role="group" data-toggle="buttons" aria-label="eBay old/new data toggle">
										<label className="btn btn-sm btn-outline-secondary ebay-toggle">
											<input type="checkbox" name="ebay-condition-toggle" className="ebay-toggle" id="ebay-condition-old" />Old
										</label>
										<label className="btn btn-sm btn-secondary ebay-toggle">
											<input type="checkbox" name="ebay-condition-toggle" className="ebay-toggle" id="ebay-condition-new" defaultChecked />New
										</label>
									</div> {/*  .btn-group */} 
								
									<input id="ebay-condition" name="ebay-condition" type="text" className="form-control ebay-product-property" />
								</div>
							</div>
						</div> {/*  .card-body .row */}
					</div> {/*  #xx-cardbody */}
				</div> {/*  .card */}
			
				{/*  Manufacturer */}
				<div className="card">
					<div className="card-header" id="manufacturer-header">
						<h5 className="mb-0">
							<button className="btn btn-link" data-toggle="collapse" data-target="#manufacturer-cardbody">Manufacturer</button>
						</h5>
					</div> {/*  .card-header */}
					<div id="manufacturer-cardbody" className="collapse show" aria-labelledby="manufacturer-header">
						<div className="card-body row">
							{/*  Shopify */}
							<div className="col-sm-6 col-xs-10">
								<div className="form-label-group mb-4">
									<label htmlFor="shopify-manufacturer" className="mb-3">Shopify manufacturer</label> 
									<input id="shopify-manufacturer" name="shopify-condition" type="text" className="form-control shopify-product-property" />
								</div>
							</div>
							{/*  eBay */}
							<div className="col-sm-6 col-xs-10">
								<div className="form-label-group">
									<label htmlFor="ebay-manufacturer">eBay manufacturer</label> 
									{/*  Old/new data toggle */}
									<div className="btn-group-toggle btn-group float-right mb-2" role="group" data-toggle="buttons" aria-label="eBay old/new data toggle">
										<label className="btn btn-sm btn-outline-secondary ebay-toggle">
											<input type="checkbox" name="ebay-manufacturer-toggle" className="ebay-toggle" id="ebay-manufacturer-old" />Old
										</label>
										<label className="btn btn-sm btn-secondary ebay-toggle">
											<input type="checkbox" name="ebay-manufacturer-toggle" className="ebay-toggle" id="ebay-manufacturer-new" defaultChecked />New
										</label>
									</div> {/*  .btn-group */} 
									<input id="ebay-manufacturer" name="ebay-manufacturer" type="text" className="form-control ebay-product-property" />
								</div>
							</div>
						</div> {/*  .card-body .row */}
					</div> {/*  #xx-cardbody */}
				</div> {/*  .card */}
			
				{/*  MPN */}
				<div className="card">
					<div className="card-header" id="mpn-header">
						<h5 className="mb-0">
							<button className="btn btn-link" data-toggle="collapse" data-target="#mpn-cardbody">MPN</button>
						</h5>
					</div> {/*  .card-header */}
					<div id="mpn-cardbody" className="collapse show" aria-labelledby="mpn-header">
						<div className="card-body row">
							{/*  Shopify */}
							<div className="col-sm-6 col-xs-10">
								<div className="form-label-group mb-4">
									<label htmlFor="shopify-mpn" className="mb-3">Shopify MPN</label> 
									<input id="shopify-mpn" name="shopify-mpn" type="text" className="form-control shopify-product-property" />
								</div>
							</div>
							{/*  eBay */}
							<div className="col-sm-6 col-xs-10">
								<div className="form-label-group">
									<label htmlFor="ebay-mpn">eBay MPN</label> 
									{/*  Old/new data toggle */}
									<div className="btn-group-toggle btn-group float-right mb-2" role="group" data-toggle="buttons" aria-label="eBay old/new data toggle">
										<label className="btn btn-sm btn-outline-secondary ebay-toggle">
											<input type="checkbox" name="ebay-mpn-toggle" className="ebay-toggle" id="ebay-mpn-old" />Old
										</label>
										<label className="btn btn-sm btn-secondary ebay-toggle">
											<input type="checkbox" name="ebay-mpn-toggle" className="ebay-toggle" id="ebay-mpn-new" defaultChecked />New
										</label>
									</div> {/*  .btn-group */} 
									<input id="ebay-mpn" name="ebay-mpn" type="text" className="form-control ebay-product-property" />
								</div>
							</div>
						</div> {/*  .card-body .row */}
					</div> {/*  #xx-cardbody */}
				</div> {/*  .card */}
       </>
   );
 }
}

class PropertyCard extends Component {
  render(){
    var propertyKey = this.props.pkey;
    var propertyTitle = this.props.pname;
    return(
      <>
        <div class="card">
					<div class="card-header" id={propertyKey + "-header"}>
						<h5 class="mb-0">
							<button class="btn btn-link" data-toggle="collapse" data-target={"#" + propertyKey + "-cardbody"}>{propertyTitle}</button>
						</h5>
					</div>
			
					<div id={propertyKey + "-cardbody"} class="collapse show" aria-labelledby={propertyKey + "-header"}>
						<div class="card-body">
							<div class="row">
								{/*  Shopify */}				
								<div class="col-sm-6 col-xs-10">
									<div class="form-label-group mb-4">
										<label htmlFor={"shopify-" + propertyKey} class="mb-3">Shopify {propertyTitle}</label> 
										<input id={"shopify-" + propertyKey} name={"shopify-" + propertyKey} type="text" class="form-control shopify-product-property" />
									</div>
								</div>
								{/*  eBay */}
								<div class="col-sm-6 col-xs-10">
									<div class="form-label-group">
										<label htmlFor={"ebay-" + propertyKey}>eBay {propertyTitle}</label> 
										{/*  Old/new data toggle */}
										<div class="btn-group-toggle btn-group float-right mb-2" role="group" data-toggle="buttons" aria-label="eBay old/new data toggle">
											<label class="btn btn-sm btn-outline-secondary ebay-toggle">
												<input type="checkbox" name={"ebay-" + propertyKey + "-title-toggle"} class="ebay-toggle" id={"ebay-" + propertyKey + "-old"} />Old
											</label>
											<label class="btn btn-sm btn-secondary ebay-toggle">
												<input type="checkbox" name={"ebay-" + propertyKey + "-toggle"} class="ebay-toggle" id={"ebay-" + propertyKey + "-new"}checked />New
											</label>
										</div> {/*  .btn-group */}
										<input id={"ebay-" + propertyKey} name={"ebay-" + propertyKey} type="text" class="form-control ebay-product-property" />
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
