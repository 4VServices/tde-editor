import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './ViewRow.css';

class ViewRow extends React.Component {
  render() {
    return (
      <Container className="viewRow">
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="template.uri">
            <Form.Label column md="2">
              Schema
            </Form.Label>
            <Col md="10">
              <Form.Control
                type="text"
                value={this.props.viewRow.schemaName}
                onChange={(event) => this.props.handleRowChange(this.props.index, 'schemaName', event.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="template.uri">
            <Form.Label column md="2">
              View
            </Form.Label>
            <Col md="10">
              <Form.Control
                type="text"
                placeholder={this.props.viewRow.viewName}
                onChange={(event) => this.props.handleRowChange(this.props.index, 'viewName', event.target.value)}
              />
            </Col>
          </Form.Group>
        </Form>
        <div>{this.props.viewRow.schemaName}</div>
      </Container>
    );
  }
}

export default ViewRow;
