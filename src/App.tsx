import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Editor } from './Editor'
import { Navbar, Container, Nav } from 'react-bootstrap';

function App() {
  return (
    <div>
      <Header/>
      <Editor/>
    </div>
  )
}

function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="#home">Poetxt</Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse> */}
      </Container>
    </Navbar>
  );
}

export default App
