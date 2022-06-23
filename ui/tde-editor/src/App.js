import logo from './logo.png';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

import Menu from './components/Menu.js';
import Template from './components/Template.js';
import SampleDocs from './components/SampleDocs.js';
import Variables from './components/Variables.js';
import ViewRows from './components/ViewRows.js';
import Triples from './components/Triples.js';

function App() {
  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <img src={logo} className="App-logo" alt="logo" />
          </Col>
          <Col>TDE Template Editor</Col>
          <Col>Built by 4V Services</Col>
        </Row>
        <Row>
          <Col md="auto">
            <Menu></Menu>
          </Col>
          <Col>
            <Row>
              <Template />
            </Row>
            <Row>
              <SampleDocs />
            </Row>
            <Row>
              <Variables />
            </Row>
            <Row>
              <ViewRows />
            </Row>
            <Row>
              <Triples />
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
