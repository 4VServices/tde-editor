import React from 'react';
import './ExtractedRows.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

class ExtractedRows extends React.Component {
  render() {
    return (
      <Container className="ExtractedRows">
        <h3>ExtractedRows</h3>
        <div>No rows found</div>
      </Container>
    );
  }
}

export default ExtractedRows;
