import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import './ExtractedTriples.css';

class Triples extends React.Component {
  render() {
    return (
      <Container className="extractedTriples">
        <h3>Extracted Triples</h3>
        <div>No rows found</div>
      </Container>
    );
  }
}

export default Triples;
