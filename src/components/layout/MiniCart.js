import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class MiniCart extends Component {
  state = {
    loading: true,
    currency: this.props.currency,
    productsInfo: this.props.productsInfo,
  };
  componentDidMount = async () => {
    {
      this.state.productsInfo.lenght > 0
        ? console.log("Still no data")
        : this.setState({ loading: false });
    }
  };

  addItem = (i) => {
    this.setState((state) => {
      const list = state.productsInfo.map((item, j) => {
        if (j === i) {
          return (item.count = item.count + 1);
        } else {
          return item;
        }
      });
      this.sendData();
      return {
        list,
      };
    });
  };
  removeItem = (i) => {
    this.setState((state) => {
      const list = state.productsInfo.map((item, j) => {
        if (j === i) {
          if (item.count <= 0) {
            this.state.productsInfo.splice(j, 1);
          }
          return (item.count = item.count - 1);
        } else {
          return item;
        }
      });
      this.sendData();
      return {
        list,
      };
    });
  };
  sendData = () => {
    this.props.parentCallback(this.state.productsInfo);
  };

  render() {
    if (this.state.loading) {
      return <h1 className='all-center fade'>Nothing in basket yet</h1>;
    }
    return (
      <div className='overlay-frame'>
        <div className='category-label'>
          <h3>CART</h3>
        </div>
        <ul className='flex-col all-center py-2'>
          {this.state.productsInfo.map((product, index) => {
            return (
              <div className='cart-prod-box py-1'>
                <div className='flex-col' style={{ width: "80%" }}>
                  <h4 className='fade'>{product.brand}</h4>
                  <h5>{product.name}</h5>
                  <div className='small flex-row'>
                    {product.prices.map((sub) => {
                      if (this.state.currency == sub.currency) {
                        return (
                          <h6>
                            {this.state.currency} ${sub.amount}
                          </h6>
                        );
                      }
                    })}
                  </div>
                  {product.attributes.map((subAtributes) => (
                    <div className='flex-row '>
                      {subAtributes.items.map((subItems) => (
                        <ul className='py-side-1'>
                          {subAtributes.name === "Color" ? (
                            <label
                              className={
                                subItems.value === product.selectedColor
                                  ? "prod-collor-label-miniCart-selected"
                                  : "prod-collor-label-miniCart "
                              }
                              style={{ backgroundColor: subItems.value }}
                            ></label>
                          ) : (
                            <label
                              className={
                                subItems.value ===
                                product.selectedAttribute.value
                                  ? "prod-attributes-miniCart-selected"
                                  : "prod-attributes-miniCart"
                              }
                            >
                              {subItems.value}
                            </label>
                          )}
                        </ul>
                      ))}
                    </div>
                  ))}
                </div>
                <div className='flex-col'>
                  <div className='all-center'>
                    <button
                      onClick={() => this.addItem(index)}
                      className='prod-count-button-mini'
                    >
                      +
                    </button>
                    <h5>{product.count}</h5>
                    <button
                      onClick={() => this.removeItem(index)}
                      className='prod-count-button-mini'
                    >
                      -
                    </button>
                  </div>
                </div>
                <img
                  src={product.gallery}
                  alt=''
                  className='small-img small-img-cart'
                ></img>
              </div>
            );
          })}
        </ul>
        <div className='btn-minicart-box'>
          <Link to='/Cart'>
            <button className='btn-cart'>VIEW CART</button>
          </Link>
          <Link>
            <button className='btn-cart' disabled>
              TO CHECKOUT
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
