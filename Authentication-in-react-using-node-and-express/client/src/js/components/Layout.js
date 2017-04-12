import React from "react";
import Body from "./Body";
import Form from './Form';

class Layout extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div class="container custom-body">
        <Body />
        <Form />
      </div>
    );
  }
}
/*
 * Main Layout Class(Template) to accomodate whole page  
*/
export default Layout;
