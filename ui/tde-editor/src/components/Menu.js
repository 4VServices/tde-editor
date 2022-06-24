import React from 'react';
import './Menu.css';
import Row from 'react-bootstrap/Row';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Container from 'react-bootstrap/esm/Container';

class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  handleMenuSelect(dbName, event) {
    this.props.onContentDbSelected(dbName);
  }

  handleTemplateSelect(template, event) {
    this.props.onTemplateSelected(template);
    console.log(`handleTemplateSelect: ${JSON.stringify(template)}`);
  }

  render() {
    return (
      <Container>
        <Row>Content Database</Row>
        <DropdownButton title={this.props.selectedContentDb}>
          {this.props.contentDBs.map((db) => (
            <Dropdown.Item onClick={(e) => this.handleMenuSelect(db, e)}>{db}</Dropdown.Item>
          ))}
        </DropdownButton>

        <Row>Template</Row>
        <DropdownButton title={this.props.selectedTemplateURI}>
          {this.props.templates.map((template) => (
            <Dropdown.Item onClick={(e) => this.handleTemplateSelect(template.uri, e)}>{template.uri}</Dropdown.Item>
          ))}
        </DropdownButton>
      </Container>
    );
  }
}

export default Menu;
