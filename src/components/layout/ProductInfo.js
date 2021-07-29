import React, { Component } from "react";

export default class ProductInfo extends Component {
  state = {
    image: {},
    loading: true,
    currency: this.props.currency,
    selectedColor: {},
    selectedAtributes: [{ name: "test", value: "test" }],
    atributeIsSelected: false,
    colorIsSelected: false,
  };

  cleanText = (data) => {
    var cleanText = data.replace(/<\/?[^>]+(>|$)/g, "");
    return cleanText;
  };
  updateImage = (data) => {
    this.setState({ loading: true });
    this.setState({ image: data, loading: false });
  };
  selectProduct = (data, attributes, collor) => {
    this.props.parentCallback(data, attributes, collor);
  };
  selectAttribute = async (name, value) => {
    const array = this.state.selectedAtributes;
    {
      array.map((el) => {
        if (el.name === name) {
          var index = array.indexOf(el.name) + 1;
          array.splice(index, 1);
          this.setState({ selectedAtributes: array });
        }
        if (el.name === "test") {
          var index = array.indexOf(el.name) + 1;
          array.splice(index, 1);
          this.setState({ selectedAtributes: array });
        }
      });
    }
    this.setState({
      selectedAtributes: [
        ...this.state.selectedAtributes,
        { name: name, value: value, selected: true },
      ],
      atributesAreSelected: true,
    });
  };
  render() {
    const colorIsSelected = this.state.colorIsSelected;
    const data = this.props;
    var attributeIsSelectedDiv = false;
    return (
      <div className='all-center'>
        <div className='prod-info'>
          <div className='prod-photo-array'>
            <ul className='small-img prod-photo-array photo-prewiev'>
              {data.data.product.gallery.map((image) => (
                <img
                  src={image}
                  className='py-1'
                  onClick={(e) => this.updateImage({ image })}
                ></img>
              ))}
            </ul>
          </div>
          {this.state.loading ? (
            <img src={data.data.product.gallery} className='prod-photo'></img>
          ) : (
            <img src={this.state.image.image} className='prod-photo'></img>
          )}
          <div className='prod-info-box'>
            <h2>{data.data.product.brand}</h2>
            <h2>{data.data.product.name}</h2>
            <div className='py-1'>
              {data.data.product.attributes.map((subAtributes) => (
                <div>
                  <h3>{subAtributes.name}:</h3>
                  <div className='flex-row '>
                    {subAtributes.items.map((subItems) => (
                      <ul>
                        {subAtributes.name === "Color" ? (
                          <label
                            className={
                              colorIsSelected &&
                              subItems.value === this.state.selectedColor
                                ? "prod-collor-label-selected"
                                : "prod-collor-label"
                            }
                            style={{ backgroundColor: subItems.value }}
                            onClick={(e) => {
                              this.setState({ colorIsSelected: true });
                              this.setState({ selectedColor: subItems.value });
                            }}
                          ></label>
                        ) : (
                          <div>
                            {this.state.selectedAtributes.map((el) => {
                              if (
                                el.value === subItems.value &&
                                el.name === subAtributes.name
                              ) {
                                attributeIsSelectedDiv = true;
                              } else {
                                attributeIsSelectedDiv = false;
                              }
                            })}
                            <label
                              className={
                                attributeIsSelectedDiv
                                  ? "prod-attributes-info-selected"
                                  : "prod-attributes-info"
                              }
                              onClick={(e) =>
                                this.selectAttribute(
                                  subAtributes.name,
                                  subItems.value
                                )
                              }
                            >
                              {subItems.value}
                            </label>
                          </div>
                        )}
                      </ul>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {data.data.product.prices.map((sub) => {
              if (this.state.currency == sub.currency) {
                return (
                  <div>
                    <h2>Price:</h2>
                    <h3 className='py-1-side'>
                      {this.state.currency} ${sub.amount}
                    </h3>
                  </div>
                );
              }
            })}
            <div className='all-center p-1'>
              {data.data.product.inStock ? (
                <button
                  className='btn btn-block'
                  onClick={(e) =>
                    this.selectProduct(
                      data.data.product,
                      this.state.selectedAtributes,
                      this.state.selectedColor
                    )
                  }
                >
                  ADD TO CART
                </button>
              ) : (
                <button disabled className='btn btn-block'>
                  OUT OF STOCK
                </button>
              )}

              <div
                className='center-text p-2'
                dangerouslySetInnerHTML={{
                  __html: data.data.product.description,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
