import React from "react";

export default class Header extends React.Component { 
  render() {
    const welcomMessage = "Welcome to my page";
    return (
      <div class="row">
        <h1>{welcomMessage}</h1>
      </div>
    );
  }
}
