import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Body from "./Body";
import IPAddress from './IPAddress';

class Layout extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Header />
        <div class="container">
          <Body />
          <IPAddress />
        </div>
        <Footer />
      </div>
    );
  }
}
/*
 * Main Layout Class(Template) to accomodate whole page  
*/
export default Layout;
