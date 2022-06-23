import logo from './logo.png';
import './App.css';
import Menu from './Menu.js';
import Container from 'react-bootstrap/Container';

function App() {
  return (
    <Container>
    <div className="App">
          <img src={logo} className="App-logo" alt="logo" />
          <div>TDE Template Editor</div>
          <div>Built by 4V Services</div>
      <Menu></Menu>
    </div>
    </Container>
  );
}

export default App;
