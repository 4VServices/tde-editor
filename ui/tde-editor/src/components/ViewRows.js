import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import './ViewRows.css';
import ViewRow from './ViewRow';
import ExtractedRows from './ExtractedRows';

const ViewRows = ({ extractedData, rowsSpec, onRowChange }) => {
  return (
    <Container className="viewRows">
      <h2>View Rows</h2>
      {rowsSpec && rowsSpec.map((row, index) => <ViewRow viewRow={row} index={index} handleRowChange={onRowChange} />)}
      <Button>Add Row</Button>
      <ExtractedRows extractedData={extractedData} rowsSpec={rowsSpec} />
    </Container>
  );
};

export default ViewRows;
