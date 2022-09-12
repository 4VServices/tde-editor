import Editor from './components/Editor';
import styled from 'styled-components';
import { FlexBox } from './components/Box';
import { H1, H3 } from './components/common';
import logo from './logo.png';
import './style.css';

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

const Img = styled.img`
  height: 10vmin;
  pointer-events: none;
`;

function App() {
  return (
    <div className="App">
      <Container>
        <FlexBox width="100%" gap="4rem" margin="2rem 0">
          <div className="left">
            <FlexBox justifyContent="space-between">
              <Img src={logo} className="App-logo" alt="logo" />
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
