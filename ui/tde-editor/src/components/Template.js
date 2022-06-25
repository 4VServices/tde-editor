import React from 'react';
import './Template.css';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Template extends React.Component {
  render() {
    return (
      <Container className="template">
        <h2>Template</h2>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="template.uri">
            <Form.Label column md="2">
              URI
            </Form.Label>
            <Col md="10">
              <Form.Control
                type="text"
                placeholder={this.props.templateURI}
                onChange={(event) => this.props.handleURIChange(event.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="template.description">
            <Form.Label column md="2">
              Description
            </Form.Label>
            <Col md="10">
              <Form.Control
                type="textarea"
                rows={3}
                placeholder={this.props.description}
                onChange={(event) => this.props.handleDescriptionChange(event.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="template.collection">
            <Form.Label column md="2">
              Collection
            </Form.Label>
            <Col md="10">
              <Form.Control
                type="text"
                placeholder={this.props.collection}
                onChange={(event) => this.props.handleCollectionChange(event.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="template.directory">
            <Form.Label column md="2">
              Directory
            </Form.Label>
            <Col md="10">
              <Form.Control type="text" placeholder="" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="template.context">
            <Form.Label column md="2">
              Context
            </Form.Label>
            <Col md="10">
              <Form.Control
                type="text"
                placeholder={this.props.context}
                onChange={(event) => this.props.handleContextChange(event.target.value)}
              />
            </Col>
          </Form.Group>
        </Form>
      </Container>
    );
  }
}

export default Template;
