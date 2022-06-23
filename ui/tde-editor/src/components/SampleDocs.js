import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/esm/Form';
import './SampleDocs.css';

class SampleDocs extends React.Component {
  render() {
    return (
      <Container className="sampleDocs">
        <h2>Sample Documents</h2>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="template.uri">
            <Form.Label column md="2">
              URI
            </Form.Label>
            <Col md="7">
              <Form.Control type="text" placeholder="/content/doc1.json" />
            </Col>
            <Col md="1">
              <Button size="sm">View</Button>
            </Col>
            <Col md="1">
              <Button size="sm">Remove</Button>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="template.uri">
            <Col md="2">
              <Button className="add" size="sm">
                Add
              </Button>
            </Col>
            <Col md="10">
              <Form.Control as="textarea" rows={5} />
            </Col>
          </Form.Group>
        </Form>
      </Container>
    );
  }
}

export default SampleDocs;
