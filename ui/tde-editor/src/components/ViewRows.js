import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import './ViewRows.css';
import ExtractedRows from './ExtractedRows';

class ViewRows extends React.Component {
  render() {
    return (
      <Container className="viewRows">
        <h3>View Rows</h3>
        <Button>Add Row</Button>
        <ExtractedRows />
      </Container>
    );
  }
}

export default ViewRows;
