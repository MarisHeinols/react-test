import React, { Component } from "react";
import { Link } from "react-router-dom";
import { gql } from "@apollo/client";
import Cart from "../graphics/cart.png";
const link = "/";
const getCategoryQuery = gql`
  {
    categories {
      name
    }
  }
`;

export default class Navbar extends Component {
  state = {
    categorys: [{}],
    currency: "USD",
    loading: true,
    open: false,
    currencyOpen: false,
  };

  componentDidMount = async () => {
    const { client } = this.props;
    this.setState({ loading: true });
    await client.query({ query: getCategoryQuery }).then((result) => {
      this.setState({
        categorys: result.data.categories,
        loading: false,
      });
    });
  };
  componentDidUpdate = async (prevProps) => {
    const { currency } = this.props;
    if (this.props.currency !== prevProps.currency) {
      this.setState({ currency: currency });
      this.setCurrencyOpen();
    }
  };

  sendData = (category) => {
    this.props.parentCallback(
      category,
      this.state.open,
      this.state.currencyOpen
    );
  };
  setOpen = () => {
    this.setState({ loading: true });
    this.setState({
      open: !this.state.open,
      loading: false,
      currencyOpen: false,
    });
    this.sendData(null);
  };
  setCurrencyOpen = async () => {
    this.setState({ loading: true });
    this.setState({
      currencyOpen: !this.state.currencyOpen,
      loading: false,
      open: false,
    });
    this.sendData(null);
  };
  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>;
    }
    return (
      <nav className='navbar bg-primary'>
        {this.state.categorys.map((category) => (
          <Link
            key={category.name}
            className='nav-link'
            style={{ color: "black" }}
            to={link.concat(category.name)}
            onClick={(e) => this.sendData(category.name)}
          >
            {category.name}
          </Link>
        ))}
        <div style={{ paddingLeft: "65.5rem", display: "flex" }}>
          <Link>
            <h4
              style={{ color: "black" }}
              onClick={(e) => this.setCurrencyOpen()}
            >
              {this.state.currency}
            </h4>
          </Link>
          <Link
            style={{ color: "black" }}
            onClick={() => {
              this.setOpen();
            }}
          >
            <img
              src={Cart}
              alt=''
              style={{ width: "15%", marginLeft: "1rem" }}
            ></img>
          </Link>
        </div>

        <i></i>
      </nav>
    );
  }
}
