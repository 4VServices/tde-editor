import React from 'react';
import './ExtractedRows.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Menu from './Menu.js';
import Template from './Template.js';
import SampleDocs from './SampleDocs.js';
import Variables from './Variables.js';
import ViewRows from './ViewRows.js';
import Triples from './Triples.js';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.handleContentDbChange = this.handleContentDbChange.bind(this);
    this.handleTemplateChange = this.handleTemplateChange.bind(this);
    this.state = { contentDBs: [], selectedContentDb: 'select', templates: [], selectedTemplateURI: '' };
  }

  buildHeaders() {
    let base64 = require('base-64');
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + base64.encode('admin:admin'));
    return headers;
  }

  handleContentDbChange(dbName) {
    this.setState({ selectedContentDb: dbName });
    this.getTemplates(dbName);
  }

  handleTemplateChange(templateURI) {
    this.setState({ selectedTemplateURI: templateURI });
  }

  getTemplates(dbName) {
    fetch(`/api/tde/templates?contentDB=${dbName}`, {
      method: 'GET',
      headers: this.buildHeaders(),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(`templates call succeeded: ${JSON.stringify(result)}`);
          this.setState({
            isLoaded: true,
            templates: result.templates,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(`templates call failed: ${error}`);
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  componentDidMount() {
    fetch('/api/databases', {
      method: 'GET',
      headers: this.buildHeaders(),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            contentDBs: result,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(`databases call failed: ${error}`);
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    return (
      <Row>
        <Col md="auto">
          <Menu
            contentDBs={this.state.contentDBs}
            onContentDbSelected={this.handleContentDbChange}
            selectedContentDb={this.state.selectedContentDb}
            templates={this.state.templates}
            onTemplateSelected={this.handleTemplateChange}
            selectedTemplateURI={this.state.selectedTemplateURI}
          ></Menu>
        </Col>
        <Col>
          <Row>
            <Template />
          </Row>
          <Row>
            <SampleDocs />
          </Row>
          <Row>
            <Variables />
          </Row>
          <Row>
            <ViewRows />
          </Row>
          <Row>
            <Triples />
          </Row>
        </Col>
      </Row>
    );
  }
}

export default Editor;
