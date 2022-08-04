import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/esm/Form';
import './SampleDocs.css';

class SampleDocs extends React.Component {
  constructor(props) {
    super(props);
    this.viewDoc = this.viewDoc.bind(this);
    this.state = {
      currentURI: '',
      currentViewedDoc: ''
    };
  }

  handleURIChange(uri) {
    this.setState({ currentURI: uri });
  }

  addURI(uri) {
    this.props.addURI(this.state.currentURI);
    this.setState({ currentURI: '' });
  }

  viewDoc(uri) {
    console.log('SampleDocs; viewDoc');
    fetch(`/api/document?contentDB=${this.props.contentDB}&uri=${uri}`, {
      method: 'GET',
      headers: this.props.authHeaders
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log('/api/document call succeeded');
          // TODO: handle XML content
          this.setState({
            currentViewedDoc: JSON.stringify(result)
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(`templates call failed: ${error}`);
          this.setState({
            currentViewedDoc: `Unable to load ${uri}`
          });
        }
      );
  }

  render() {
    return (
      <Container className="sampleDocs">
        <h2>Sample Documents</h2>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="template.uri">
            <Form.Label column md="2">
              URI
            </Form.Label>
            <Col md="7">
              <Form.Control
                type="text"
                value={this.state.currentURI}
                onChange={(event) => this.handleURIChange(event.target.value)}
              />
            </Col>
            <Col md="2">
              <Button className="add" size="sm" onClick={(e) => this.addURI()}>
                Add
              </Button>
            </Col>
          </Form.Group>
          {this.props.uris.map((uri) => (
            <Form.Group as={Row} className="mb-3" controlId="template.uri" enabled="false">
              <Form.Label column md="2">
                URI
              </Form.Label>
              <Col md="7">
                <Form.Control type="text" value={uri} />
              </Col>
              <Col md="1">
                <Button size="sm" onClick={() => this.viewDoc(uri)}>
                  View
                </Button>
              </Col>
              <Col md="1">
                <Button size="sm">Remove</Button>
              </Col>
            </Form.Group>
          ))}
          <Form.Group as={Row} className="mb-3" controlId="template.uri">
            <Col md="10">
              <Form.Control as="textarea" rows={5} value={this.state.currentViewedDoc} />
            </Col>
          </Form.Group>
        </Form>
      </Container>
    );
  }
}

export default SampleDocs;
