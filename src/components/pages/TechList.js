import React, { Component, useState } from "react";
import { gql, graphql, withApollo } from "@apollo/client";
import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductInfo from "../layout/ProductInfo";
const link = "/Info";
const getTechQuery = gql`
  {
    category(input: { title: "tech" }) {
      products {
        id
        name
        category
        gallery
        prices {
          amount
          currency
        }
        inStock
        description
        brand
        attributes {
          name
          items {
            value
          }
        }
      }
    }
  }
`;

class TechList extends Component {
  state = {
    products: [{}],
    currency: this.props.currency,
    loading: true,
  };

  setProducts = (e) => this.setState({ [e.target.name]: e.target.value });

  componentDidMount = async () => {
    const { client } = this.props;
    this.setState({ loading: true });
    await client.query({ query: getTechQuery }).then((result) => {
      this.setState({
        products: result.data.category.products,
        loading: false,
      });
    });
    console.log(this.state.products);
  };

  sendData = (data, loading) => {
    this.props.parentCallback(data, loading);
  };
  render() {
    if (this.state.loading) {
      return <h1 className='all-center fade'>Loading..</h1>;
    }
    return (
      <div className='all-center'>
        <h1 className='lead text-category'>TECH</h1>
        <ul className='grid-3'>
          {this.state.products.map((product) => (
            <div>
              <Link
                key={product.id}
                className='card'
                to='/Info'
                onClick={(e) => this.sendData({ product }, false)}
              >
                {product.inStock ? (
                  <div className='image-card'>
                    <img src={product.gallery} className='img'></img>
                  </div>
                ) : (
                  <div className='image-card'>
                    <img src={product.gallery} className='img fade'></img>
                    <h4 className='centered'>Out of stock</h4>
                  </div>
                )}

                <h4>{product.name}</h4>

                <div className='small flex-row'>
                  {product.prices.map((sub) => {
                    if (this.state.currency == sub.currency) {
                      return (
                        <h4>
                          {this.state.currency} ${sub.amount}
                        </h4>
                      );
                    }
                  })}
                </div>
              </Link>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

export default TechList;
