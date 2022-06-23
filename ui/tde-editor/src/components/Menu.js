import React from "react";
import "./Menu.css";
import Row from "react-bootstrap/Row";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/esm/Container";

class Menu extends React.Component {
  render() {
    return (
      <Container>
        <Row>Content Database</Row>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            select
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">project1-content</Dropdown.Item>
            <Dropdown.Item href="#/action-2">project2-content</Dropdown.Item>
            <Dropdown.Item href="#/action-3">project3-content</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    );
  }
}

export default Menu;