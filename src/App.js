import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    var variable = "butts";
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code>
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn {variable}
          </a>
        </header>      
      </div>
    );
  }
}

class propsAccordion extends Component {
 render(){
   return(
     <div id="accordion">
       {/*Item titles*/}
				<div class="card">
					<div class="card-header" id="title-header">
						<h5 class="mb-0">
							<button class="btn btn-link" data-toggle="collapse" data-target="#title-cardbody">Title</button>
						</h5>
					</div>
			
					<div id="title-cardbody" class="collapse show" aria-labelledby="title-header">
						<div class="card-body">
							<div class="row">
                {/*<!-- Shopify -->				*/}
								<div class="col-sm-6 col-xs-10">
									<div class="form-label-group mb-4">
										<label for="shopify-title" class="mb-3">Shopify title</label> 
										<input id="shopify-title" name="shopify-title" type="text" class="form-control shopify-product-property">
									</div>
								</div>
								{/*<<!-- eBay -->
								<div class="col-sm-6 col-xs-10">
									<div class="form-label-group">
										<label for="ebay-title">eBay title</label> 
										{/*<<!-- Old/new data toggle -->
										<div class="btn-group-toggle btn-group float-right mb-2" role="group" data-toggle="buttons" aria-label="eBay old/new data toggle">
											<label class="btn btn-sm btn-outline-secondary ebay-toggle">
												<input type="checkbox" name="ebay-title-toggle" class="ebay-toggle" id="ebay-title-old">Old
											</label>
											<label class="btn btn-sm btn-secondary ebay-toggle">
												<input type="checkbox" name="ebay-title-toggle" class="ebay-toggle" id="ebay-title-new" checked>New
											</label>
										</div> {/*<<!-- .btn-group -->
										<input id="ebay-title" name="ebay-title" type="text" class="form-control ebay-product-property">
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				{/*<<!-- Description -->
				<div class="card">
					<div class="card-header" id="description-header">
						<h5 class="mb-0">
							<button class="btn btn-link" data-toggle="collapse" data-target="#description-cardbody">Description</button>
						</h5>
					</div>
					<div id="description-cardbody" class="collapse show" aria-labelledby="description-header">
						<div class="card-body row">
							<!-- Shopify -->
							<div class="col-sm-6 col-xs-10">
								<div class="form-label-group mb-4">
									<label for="shopify-description" class="mb-3">Shopify description</label> 
									<textarea id="shopify-description" name="shopify-description" type="textarea" rows="8" class="form-control shopify-product-property"></textarea>
								</div>
							</div>
							
							<!-- eBay -->
							<div class="col-sm-6 col-xs-10">
								<div class="form-label-group">
									<label for="ebay-description">eBay description</label> 
									<!-- Old/new data toggle -->
									<div class="btn-group-toggle btn-group float-right mb-2" role="group" data-toggle="buttons" aria-label="eBay old/new data toggle">
										<label class="btn btn-sm btn-outline-secondary ebay-toggle">
											<input type="checkbox" name="ebay-description-toggle" class="ebay-toggle" id="ebay-description-old">Old
										</label>
										<label class="btn btn-sm btn-secondary ebay-toggle">
											<input type="checkbox" name="ebay-description-toggle" class="ebay-toggle" id="ebay-description-new" checked>New
										</label>
									</div> <!-- .btn-group -->
									<iframe id="ebay-description-iframe" style="width:100%;"></iframe>
								</div>
							</div>
							
						</div> <!-- .card-body .row -->
					</div> <!-- #xx-cardbody -->
				</div> <!-- .card -->
				
				<!-- Weight -->
				<div class="card">
					<div class="card-header" id="weight-header">
						<h5 class="mb-0">
							<button class="btn btn-link" data-toggle="collapse" data-target="#weight-cardbody">Weight</button>
						</h5>
					</div> <!-- .card-header -->
					<div id="weight-cardbody" class="collapse show" aria-labelledby="weight-header">
						<div class="card-body row">
							<!-- Shopify -->
							<div class="col-sm-6 col-xs-10">
								<div class="form-label-group mb-4">
									<label for="shopify-weight" class="mb-3">Shopify weight</label> 
									<input id="shopify-weight" name="shopify-weight" type="text" class="form-control shopify-product-property">
								</div>
							</div>
							<!-- eBay -->
							<div class="col-sm-6 col-xs-10">
								<div class="form-label-group">
									<label for="ebay-weight">eBay weight</label>
									<!-- Old/new data toggle -->
									<div class="btn-group-toggle btn-group float-right mb-2" role="group" data-toggle="buttons" aria-label="eBay old/new data toggle">
										<label class="btn btn-sm btn-outline-secondary ebay-toggle">
											<input type="checkbox" name="ebay-weight-toggle" class="ebay-toggle" id="ebay-weight-old">Old
										</label>
										<label class="btn btn-sm btn-secondary ebay-toggle">
											<input type="checkbox" name="ebay-weight-toggle" class="ebay-toggle" id="ebay-weight-new" checked>New
										</label>
									</div> <!-- .btn-group --> 
									<input id="ebay-weight" name="ebay-weight" type="text" class="form-control ebay-product-property">
								</div>
							</div>
						</div> <!-- .card-body .row -->
					</div> <!-- #xx-cardbody -->
				</div> <!-- .card -->
				
				<!-- Condition -->
				<div class="card">
					<div class="card-header" id="condition-header">
						<h5 class="mb-0">
							<button class="btn btn-link" data-toggle="collapse" data-target="#condition-cardbody">Condition</button>
						</h5>
					</div> <!-- .card-header -->
					<div id="condition-cardbody" class="collapse show" aria-labelledby="condition-header">
						<div class="card-body row">
							<!-- Shopify -->
							<div class="col-sm-6 col-xs-10">
								<div class="form-label-group mb-4">
									<label for="shopify-condition" class="mb-3">Shopify condition</label> 
									<input id="shopify-condition" name="shopify-condition" type="text" class="form-control shopify-product-property">
								</div>
							</div>
							<!-- eBay -->
							<div class="col-sm-6 col-xs-10">
								<div class="form-label-group">
									<label for="ebay-condition">eBay condition</label> 
									<!-- Old/new data toggle -->
									<div class="btn-group-toggle btn-group float-right mb-2" role="group" data-toggle="buttons" aria-label="eBay old/new data toggle">
										<label class="btn btn-sm btn-outline-secondary ebay-toggle">
											<input type="checkbox" name="ebay-condition-toggle" class="ebay-toggle" id="ebay-condition-old">Old
										</label>
										<label class="btn btn-sm btn-secondary ebay-toggle">
											<input type="checkbox" name="ebay-condition-toggle" class="ebay-toggle" id="ebay-condition-new" checked>New
										</label>
									</div> <!-- .btn-group --> 
								
									<input id="ebay-condition" name="ebay-condition" type="text" class="form-control ebay-product-property">
								</div>
							</div>
						</div> <!-- .card-body .row -->
					</div> <!-- #xx-cardbody -->
				</div> <!-- .card -->
			
				<!-- Manufacturer -->
				<div class="card">
					<div class="card-header" id="manufacturer-header">
						<h5 class="mb-0">
							<button class="btn btn-link" data-toggle="collapse" data-target="#manufacturer-cardbody">Manufacturer</button>
						</h5>
					</div> <!-- .card-header -->
					<div id="manufacturer-cardbody" class="collapse show" aria-labelledby="manufacturer-header">
						<div class="card-body row">
							<!-- Shopify -->
							<div class="col-sm-6 col-xs-10">
								<div class="form-label-group mb-4">
									<label for="shopify-manufacturer" class="mb-3">Shopify manufacturer</label> 
									<input id="shopify-manufacturer" name="shopify-condition" type="text" class="form-control shopify-product-property">
								</div>
							</div>
							<!-- eBay -->
							<div class="col-sm-6 col-xs-10">
								<div class="form-label-group">
									<label for="ebay-manufacturer">eBay manufacturer</label> 
									<!-- Old/new data toggle -->
									<div class="btn-group-toggle btn-group float-right mb-2" role="group" data-toggle="buttons" aria-label="eBay old/new data toggle">
										<label class="btn btn-sm btn-outline-secondary ebay-toggle">
											<input type="checkbox" name="ebay-manufacturer-toggle" class="ebay-toggle" id="ebay-manufacturer-old">Old
										</label>
										<label class="btn btn-sm btn-secondary ebay-toggle">
											<input type="checkbox" name="ebay-manufacturer-toggle" class="ebay-toggle" id="ebay-manufacturer-new" checked>New
										</label>
									</div> <!-- .btn-group --> 
									<input id="ebay-manufacturer" name="ebay-manufacturer" type="text" class="form-control ebay-product-property">
								</div>
							</div>
						</div> <!-- .card-body .row -->
					</div> <!-- #xx-cardbody -->
				</div> <!-- .card -->
			
				<!-- MPN -->
				<div class="card">
					<div class="card-header" id="mpn-header">
						<h5 class="mb-0">
							<button class="btn btn-link" data-toggle="collapse" data-target="#mpn-cardbody">MPN</button>
						</h5>
					</div> <!-- .card-header -->
					<div id="mpn-cardbody" class="collapse show" aria-labelledby="mpn-header">
						<div class="card-body row">
							<!-- Shopify -->
							<div class="col-sm-6 col-xs-10">
								<div class="form-label-group mb-4">
									<label for="shopify-mpn" class="mb-3">Shopify MPN</label> 
									<input id="shopify-mpn" name="shopify-mpn" type="text" class="form-control shopify-product-property">
								</div>
							</div>
							<!-- eBay -->
							<div class="col-sm-6 col-xs-10">
								<div class="form-label-group">
									<label for="ebay-mpn">eBay MPN</label> 
									<!-- Old/new data toggle -->
									<div class="btn-group-toggle btn-group float-right mb-2" role="group" data-toggle="buttons" aria-label="eBay old/new data toggle">
										<label class="btn btn-sm btn-outline-secondary ebay-toggle">
											<input type="checkbox" name="ebay-mpn-toggle" class="ebay-toggle" id="ebay-mpn-old">Old
										</label>
										<label class="btn btn-sm btn-secondary ebay-toggle">
											<input type="checkbox" name="ebay-mpn-toggle" class="ebay-toggle" id="ebay-mpn-new" checked>New
										</label>
									</div> <!-- .btn-group --> 
									<input id="ebay-mpn" name="ebay-mpn" type="text" class="form-control ebay-product-property">
								</div>
							</div>
						</div> <!-- .card-body .row -->
					</div> <!-- #xx-cardbody -->
				</div> <!-- .card -->

				<!-- Shopify: variants -->
			
		</form>
	</div>
   );
 }
}

export default App;
