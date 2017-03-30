import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Body from "./Body";
import Form from './Form';

class Layout extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Header />
        <div class="container custom-body">
          <Body />
          <Form />
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
