import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './ViewRow.css';

const ViewRow = ({ viewRow, index, handleRowChange }) => {
  console.log('zz', viewRow);
  return (
    <Container className="viewRow">
      <Form as={Row}>
        <Form.Group className="mb-3" controlId="template.uri">
          <Form.Label column md="1">
            Schema
          </Form.Label>
          <Col md="5">
            <Form.Control
              type="text"
              value={viewRow.schemaName}
              onChange={(event) => handleRowChange(index, 'schemaName', event.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group className="mb-3" controlId="template.uri">
          <Form.Label column md="1">
            View
          </Form.Label>
          <Col md="5">
            <Form.Control
              type="text"
              placeholder={viewRow.viewName}
              onChange={(event) => handleRowChange(index, 'viewName', event.target.value)}
            />
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default ViewRow;
