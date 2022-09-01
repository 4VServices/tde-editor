import React from 'react';
import './Menu.css';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
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

  handleExport() {
    console.log('handleExport');
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

        <Row>
          <label>Template</label>
          <DropdownButton title={this.props.selectedTemplateURI}>
            {this.props.templates.map((template) => (
              <Dropdown.Item onClick={(e) => this.handleTemplateSelect(template.uri, e)}>{template.uri}</Dropdown.Item>
            ))}
          </DropdownButton>
        </Row>

        <Row>
          <ButtonGroup vertical>
            <Button onClick={this.props.onTemplateInsert}>Insert</Button>
            <Button onClick={this.handleExport}>Export</Button>
            <Button onClick={this.props.handleValidate}>Validate</Button>
            <Button onClick={this.props.onTemplateExtract}>Extract</Button>
          </ButtonGroup>
        </Row>
      </Container>
    );
  }
}

export default Menu;
