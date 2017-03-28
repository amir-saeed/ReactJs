import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Body from "./Body";
import IPAddress from './IPAddress';

export default class Layout extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Header />
        <Body />
        <h3>List of IP Addresses:</h3>
        <IPAddress />
        <Footer />
      </div>
    );
  }
}
