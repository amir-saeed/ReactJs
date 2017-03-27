import React from "react";

import Footer from "./Footer";
import Header from "./Header";

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Welcome",
    };
  }
  
  render() {
    return (
      <div>
        <Header />
        <Footer />
      </div>
    );
  }
}
