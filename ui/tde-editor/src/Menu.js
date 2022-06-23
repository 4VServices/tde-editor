import React from "react";
import "./Menu.css";

class Menu extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

export default Menu;