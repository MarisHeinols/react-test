import "./App.css";
import NavBar from "./components/layout/NavBar";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import React, { Component } from "react";
import TechList from "./components/pages/TechList";
import ClothesList from "./components/pages/ClothesList";
import ProductInfo from "./components/layout/ProductInfo";
import Cart from "./components/pages/Cart";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import MiniCart from "./components/layout/MiniCart";
import Currency from "./components/layout/Currency";
const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});
const link = "/";
class App extends Component {
  state = {
    data: {},
    loading: false,
    category: null,
    currency: "USD",
    selectedProducts: [],
    overlayOpenState: false,
    currencyOverlay: false,
    productsInfo: [],
    selectedColor: {},
    selectedAttribute: {},
  };

  componentDidUpdate = async (prevState) => {
    if (prevState.selectedProducts !== this.state.selectedProducts) {
      this.state.productsInfo = [];
      this.state.selectedProducts.map((product) => {
        this.state.productsInfo.push({
          id: product.id,
          name: product.name,
          brand: product.brand,
          gallery: product.gallery,
          prices: product.prices,
          attributes: product.attributes,
          count: 1,
          selectedAttribute: this.state.selectedAttribute,
          selectedColor: this.state.selectedColor,
        });
      });
    }
  };
  callbackFunction = (childData, childState) => {
    this.setState({
      data: childData,
      loading: childState,
    });
  };

  getCategory = (childCategory, overlayState, currencyState) => {
    this.setState({ loading: true });
    this.setState({
      category: childCategory,
      overlayOpenState: overlayState,
      currencyOverlay: currencyState,
      loading: false,
    });
  };
  getSelectedProduct = (childProcut, selectedAttribute, selectedColor) => {
    this.setState((prevState) => ({
      selectedProducts: [childProcut, ...prevState.selectedProducts],
      selectedAttribute: selectedAttribute,
      selectedColor: selectedColor,
    }));
  };
  getIfClosed = (openState) => {
    this.setState({ overlayOpenState: openState });
  };
  getSelectedCurrency = (selectedCurrency) => {
    this.setState({
      currency: selectedCurrency,
    });
  };
  getProductInfo = (prodInfo) => {
    this.setState({ selectedProducts: prodInfo });
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className='App'>
            <NavBar
              client={client}
              parentCallback={this.getCategory}
              currency={this.state.currency}
            />
          </div>
          <Switch>
            {this.state.overlayOpenState && this.state.loading === false ? (
              <div className='overlay-back'>
                <MiniCart
                  productsInfo={this.state.productsInfo}
                  parentCallback={this.getProductInfo}
                />
              </div>
            ) : (
              console.log("Overlay closed")
            )}
            {this.state.currencyOverlay && this.state.loading === false ? (
              <Currency
                parentCallback={this.getSelectedCurrency}
                client={client}
              />
            ) : (
              console.log(this.state.currencyOverlay)
            )}
          </Switch>
          <Route exact path='/'>
            <div className='container'>
              <h1 className='x-large '>WELLCOME TO THE STORE</h1>
              <h3 className='fade'>Created in Reat</h3>
            </div>
          </Route>
          <Switch>
            <Route exact path='/tech'>
              <TechList
                client={client}
                currency={this.state.currency}
                parentCallback={this.callbackFunction}
              />
            </Route>
            <Route exact path='/clothes'>
              <ClothesList
                client={client}
                currency={this.state.currency}
                parentCallback={this.callbackFunction}
              />
            </Route>
            {this.state.loading ? (
              console.log(this.state.loading)
            ) : (
              <Route exact path='/Info'>
                <ProductInfo
                  data={this.state.data}
                  currency={this.state.currency}
                  parentCallback={this.getSelectedProduct}
                />
              </Route>
            )}
            <Route exact path='/Cart'>
              {this.state.loading ? (
                console.log(this.state.loading)
              ) : (
                <Cart
                  productsInfo={this.state.productsInfo}
                  currency={this.state.currency}
                  parentCallback={this.getProductInfo}
                />
              )}
            </Route>
          </Switch>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
