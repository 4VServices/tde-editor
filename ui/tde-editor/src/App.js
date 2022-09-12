import logo from './logo.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Editor from './components/Editor';

import './style.css';
import styled from 'styled-components';
import { Box, FlexBox } from './components/Box';
import { H1, H2, H3 } from './components/common';

const Container = styled.div`
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;

  .left {
    width: 220px;
  }
  .right {
    flex-grow: 1;
  }
`;

function App() {
  return (
    <div className="App">
      <Container>
        <FlexBox width="100%">
          <div className="left">
            <FlexBox justifyContent="space-between">
              <img src={logo} className="App-logo" alt="logo" />
            </FlexBox>
          </div>
          <div className="right">
            <FlexBox justifyContent="space-between">
              <H1>TDE Template Editor</H1>
              <H3>
                Built by <a href="http://4VServices.com">4V Services</a>
              </H3>
            </FlexBox>
          </div>
        </FlexBox>

        <FlexBox width="100%">
          <Editor />
        </FlexBox>
      </Container>
    </div>
  );
}

export default App;
