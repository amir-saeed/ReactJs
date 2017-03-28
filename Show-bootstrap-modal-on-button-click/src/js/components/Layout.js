import React from "react";

import Header from "./Header";
import Footer from "./Footer";
import Body from "./Body";

export default class Layout extends React.Component {
  constructor() {
    super();
  }
  
  render() {
    return (
      <div>
        <Header />
        <Body />
        <Footer />
      </div>
    );
  }
}
