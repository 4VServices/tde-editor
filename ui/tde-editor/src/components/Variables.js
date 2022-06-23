import React from 'react';
import './Variables.css';
import Variable from './Variable.js';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

class Variables extends React.Component {
  render() {
    return (
      <Container className="variables">
        <h2>Variables</h2>
        <Button size="sm">Add Variable</Button>
      </Container>
    );
  }
}

export default Variables;
