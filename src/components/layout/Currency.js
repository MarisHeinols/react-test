import React, { Component } from "react";
import { gql } from "@apollo/client";

const getCurrencyQuery = gql`
  {
    currencies
  }
`;
export default class Currency extends Component {
  state = {
    currencies: [],
  };
  componentDidMount = async () => {
    const { client } = this.props;
    await client.query({ query: getCurrencyQuery }).then((result) => {
      this.setState({ currencies: result.data.currencies });
    });
    console.log(this.state.currencies);
  };
  sendData = (currency) => {
    this.props.parentCallback(currency);
  };

  render() {
    return (
      <div className='currency-box '>
        {this.state.currencies.map((element) => (
          <a
            style={{ fontSize: "1.2rem" }}
            onClick={(e) => this.sendData(element)}
          >
            {element}
          </a>
        ))}
      </div>
    );
  }
}
