import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import './ViewRows.css';
import ViewRow from './ViewRow';
import ExtractedRows from './ExtractedRows';

class ViewRows extends React.Component {
  render() {
    return (
      <Container className="viewRows">
        <h3>View Rows</h3>
        {this.props.rowsSpec &&
          this.props.rowsSpec.map((row, index) => (
            <ViewRow viewRow={row} index={index} handleRowChange={this.props.handleRowChange} />
          ))}
        <Button>Add Row</Button>
        <ExtractedRows />
      </Container>
    );
  }
}

export default ViewRows;
