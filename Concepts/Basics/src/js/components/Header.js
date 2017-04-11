import React from "react";
import Title from './Header/Title';

class Header extends React.Component {

  handleChange(e) {
    const title = e.target.value;
    this.props.changeTitle(title);
  }

  render() {
    return (
      <div>
        <Title title2={this.props.title1} />
        <input value={this.props.title1} onChange={this.handleChange.bind(this)} />
      </div>
    );
  }
}

export default Header;
