import React from 'react';
import './Menu.css';
import Row from 'react-bootstrap/Row';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Container from 'react-bootstrap/esm/Container';
import { B2Med } from './common';
import { Select } from './Select';
import { Box, FlexBox } from './Box';
import { Button } from './Button';

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
      <div>
        <B2Med>Content Database</B2Med>
        <Select
          value={this.props.selectedContentDb}
          options={this.props.contentDBs.map((db) => ({ value: db }))}
          onChange={(v) => this.handleMenuSelect(v)}
          fullWidth
        />

        <Box marginTop="2rem">
          <B2Med>Template</B2Med>
          <Select
            value={this.props.selectedTemplateURI}
            options={this.props.templates.map((template) => ({ value: template.uri }))}
            onChange={(v) => this.handleTemplateSelect(v)}
            fullWidth
          />
        </Box>

        <FlexBox marginTop="4rem" flexDirection="column" gap="1rem">
          <Button onClick={this.props.onTemplateInsert} block type="primary">
            Insert
          </Button>
          <Button onClick={this.handleExport} block type="primary">
            Export
          </Button>
          <Button onClick={this.props.handleValidate} block type="primary">
            Validate
          </Button>
          <Button onClick={this.props.onTemplateExtract} block type="primary">
            Extract
          </Button>
        </FlexBox>
      </div>
    );
  }
}

export default Menu;
