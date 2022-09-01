import React, { useState } from 'react';
import './ExtractedRows.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast';

import Menu from './Menu.js';
import Template from './Template.js';
import SampleDocs from './SampleDocs.js';
import Variables from './Variables.js';
import ViewRows from './ViewRows.js';
import Triples from './Triples.js';

function defaultTemplate() {
  return {
    template: {
      context: '',
      collections: []
    }
  };
}

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.handleContentDbChange = this.handleContentDbChange.bind(this);
    this.handleTemplateChange = this.handleTemplateChange.bind(this);
    this.handleURIChange = this.handleURIChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleContextChange = this.handleContextChange.bind(this);
    this.handleCollectionChange = this.handleCollectionChange.bind(this);
    this.handleValidate = this.handleValidate.bind(this);
    this.handleTemplateExtract = this.handleTemplateExtract.bind(this);
    this.addURI = this.addURI.bind(this);
    this.toggleShowNotification = this.toggleShowNotification.bind(this);
    this.state = {
      contentDBs: [],
      selectedContentDb: 'select',
      templates: [],
      selectedTemplateURI: '',
      templateJSON: defaultTemplate(),
      msgHeader: '',
      msgBody: '',
      showNotification: false,
      sampleURIs: [],
      extractedData: null
    };
  }

  toggleShowNotification() {
    this.setState({ showNotification: !this.state.showNotification });
  }

  buildAuthHeaders() {
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
    this.getTemplate(this.state.selectedContentDb, templateURI);
  }

  handleURIChange(templateURI) {
    this.setState({ selectedTemplateURI: templateURI });
  }

  addURI(contentURI) {
    this.setState({ sampleURIs: this.state.sampleURIs.concat(contentURI) });
  }

  handleDescriptionChange(description) {
    let template = this.state.templateJSON;
    template.template.description = description;
    this.setState({ templateJSON: template });
  }

  handleContextChange(context) {
    let template = this.state.templateJSON;
    template.template.context = context;
    this.setState({ templateJSON: template });
  }

  handleCollectionChange(collection) {
    let template = this.state.templateJSON;
    template.template.collections = [collection];
    this.setState({ templateJSON: template });
  }

  handleRowChange(changedIndex, property, value) {
    let template = this.state.templateJSON;
    template.template.rows.map((row, index) => {
      if (index === changedIndex) {
        row[property] = value;
      }
      return row;
    });
  }

  handleValidate() {
    let headers = this.buildAuthHeaders();
    headers.append('Content-Type', 'application/json');
    fetch(`/api/tde/template/validate`, {
      method: 'POST',
      headers,
      body: JSON.stringify(this.state.templateJSON)
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(`validation call succeeded: ${JSON.stringify(result)}`);
          console.log(`This template ${result.valid ? 'is' : 'is not'} valid`);
          let body = `This template ${result.valid ? 'is' : 'is not'} valid`;
          if (!result.valid) {
            body += '\n' + result.message;
          }
          this.setState({
            msgHeader: 'Validation',
            msgBody: body,
            showNotification: true
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(`validation call failed: ${error}`);
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  handleTemplateExtract() {
    if (this.state.sampleURIs.length > 0) {
      console.log('Editor.js; handleTemplateExtract');
      let headers = this.buildAuthHeaders();
      headers.append('Content-Type', 'application/json');
      let uriParam = this.state.sampleURIs.map((uri) => `uri=${uri}`).join('&');
      fetch(`/api/tde/template/extract?${uriParam}&contentDB=${this.state.selectedContentDb}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(this.state.templateJSON)
      })
        .then((res) => res.json())
        .then(
          (result) => {
            console.log(`extraction call succeeded: ${JSON.stringify(result)}`);
            this.setState({
              msgHeader: 'Extraction',
              msgBody: 'Extraction succeeded',
              showNotification: true,
              extractedData: result
            });
          },
          (error) => {
            console.log(`extraction call failed: ${error}`);
            this.setState({
              isLoaded: true,
              error,
              extractedData: null
            });
          }
        );
    } else {
      this.setState({
        msgHeader: 'Extraction',
        msgBody: 'Add the URI of at least one sample document before running extract',
        showNotification: true
      });
    }
  }

  getTemplates(dbName) {
    fetch(`/api/tde/templates?contentDB=${dbName}`, {
      method: 'GET',
      headers: this.buildAuthHeaders()
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(`templates call succeeded: ${JSON.stringify(result)}`);
          this.setState({
            isLoaded: true,
            templates: result.templates
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(`templates call failed: ${error}`);
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  getTemplate(dbName, templateURI) {
    fetch(`/api/tde/template/get?contentDB=${dbName}&templateURI=${templateURI}`, {
      method: 'GET',
      headers: this.buildAuthHeaders()
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log('template call succeeded');
          this.setState({
            isLoaded: true,
            templateJSON: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(`templates call failed: ${error}`);
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  componentDidMount() {
    fetch('/api/databases', {
      method: 'GET',
      headers: this.buildAuthHeaders()
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            contentDBs: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(`databases call failed: ${error}`);
          this.setState({
            isLoaded: true,
            error
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
            onTemplateExtract={this.handleTemplateExtract}
            selectedTemplateURI={this.state.selectedTemplateURI}
            handleValidate={this.handleValidate}
          ></Menu>
          <Toast show={this.state.showNotification} onClose={this.toggleShowNotification}>
            <Toast.Header>
              <strong className="me-auto">{this.state.msgHeader}</strong>
            </Toast.Header>
            <Toast.Body>{this.state.msgBody}</Toast.Body>
          </Toast>
        </Col>
        <Col>
          <Row>
            <Template
              templateURI={this.state.selectedTemplateURI}
              context={this.state.templateJSON.template.context}
              collection={this.state.templateJSON.template.collections}
              description={this.state.templateJSON.template.description}
              handleURIChange={this.handleURIChange}
              handleDescriptionChange={this.handleDescriptionChange}
              handleContextChange={this.handleContextChange}
              handleCollectionChange={this.handleCollectionChange}
              handleRowChange={this.handleRowChange}
            />
          </Row>
          <Row>
            <SampleDocs
              uris={this.state.sampleURIs}
              addURI={this.addURI}
              authHeaders={this.buildAuthHeaders()}
              contentDB={this.state.selectedContentDb}
            />
          </Row>
          <Row>
            <Variables />
          </Row>
          <Row>
            <ViewRows rowsSpec={this.state.templateJSON.template.rows} extractedData={this.state.extractedData} />
          </Row>
          <Row>
            <Triples rowsSpec={this.state.templateJSON.template.rows} extractedData={this.state.extractedData} />
          </Row>
        </Col>
      </Row>
    );
  }
}

export default Editor;
