import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import './Triples.css';
import ExtractedTriples from './ExtractedTriples';

const Triples = ({ rowsSpec, extractedData }) => {
  return (
    <Container className="triples">
      <h2>Triples</h2>
      <Button>Add Triple</Button>
      <ExtractedTriples extractedData={extractedData} />
    </Container>
  );
};

export default Triples;
