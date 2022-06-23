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
              <Form.Control type="text" placeholder="/tde/myTemplate.json" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="template.description">
            <Form.Label column md="2">
              Description
            </Form.Label>
            <Col md="10">
              <Form.Control as="textarea" rows={3} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="template.collection">
            <Form.Label column md="2">
              Collection
            </Form.Label>
            <Col md="10">
              <Form.Control type="text" placeholder="" />
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
              <Form.Control type="text" placeholder="/" />
            </Col>
          </Form.Group>
        </Form>
      </Container>
    );
  }
}

export default Template;
