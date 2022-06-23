import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import './Triples.css';
import ExtractedTriples from './ExtractedTriples';

class Triples extends React.Component {
  render() {
    return (
      <Container className="triples">
        <h2>Triples</h2>
        <Button>Add Triple</Button>
        <ExtractedTriples />
      </Container>
    );
  }
}

export default Triples;
