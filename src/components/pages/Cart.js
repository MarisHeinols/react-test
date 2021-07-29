import React, { Component } from "react";

export default class Cart extends Component {
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
          return (item.count += 1);
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
          return (item.count -= 1);
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
      <div>
        <div className='category-label'>
          <h1>Basket</h1>
        </div>
        <ul className='flex-col all-center py-2'>
          {this.state.productsInfo.map((product, index) => {
            console.log(this.state.productsInfo.selectedColor);
            return (
              <div className='cart-prod-box py-1'>
                <div className='flex-col' style={{ width: "80%" }}>
                  <h2>{product.brand}</h2>
                  <h3>{product.name}</h3>
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
                  {product.attributes.map((subAtributes) => (
                    <div>
                      <h3>{subAtributes.name}:</h3>
                      <div className='flex-row '>
                        {subAtributes.items.map((subItems) => (
                          <ul>
                            {subAtributes.name === "Color" ? (
                              <label
                                className={
                                  subItems.value === product.selectedColor
                                    ? "prod-collor-label-selected"
                                    : "prod-collor-label "
                                }
                                style={{ backgroundColor: subItems.value }}
                              ></label>
                            ) : (
                              <label
                                className={
                                  subItems.value ===
                                  product.selectedAttribute.value
                                    ? "prod-attributes-info-selected"
                                    : "prod-attributes-info"
                                }
                              >
                                {subItems.value}
                              </label>
                            )}
                          </ul>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className='flex-col'>
                  <div className='all-center'>
                    <button
                      onClick={() => this.addItem(index)}
                      className='prod-count-button'
                    >
                      +
                    </button>
                    <h2>{product.count}</h2>
                    <button
                      onClick={() => this.removeItem(index)}
                      className='prod-count-button'
                    >
                      -
                    </button>
                  </div>
                </div>
                <img
                  src={product.gallery}
                  alt=''
                  className='small-img cart-prod-img'
                ></img>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}
