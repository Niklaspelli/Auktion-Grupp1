import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


function MyNav({onSearch}) {
 const [searchTerm, setSearchTerm]= useEffect('');

 const handleSearch =() =>{
  onSearch(searchTerm);
 }


  return (
    <Navbar bg="primary" expand="lg" fixed="top" >
      <Container>
        <Navbar.Brand href="/">React-Exercise</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto  nav-link-custom">
            <Nav.Link href="/"  className='nav-link-custom'>Home</Nav.Link>
            <Nav.Link href="/usestete">Usestate</Nav.Link>
            <Nav.Link href="/props">Props</Nav.Link>
            <Nav.Link href="/useeffect">UseEffect</Nav.Link>
            <NavDropdown className='nav-dropdown-cunstom' title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="/todo">TodoList</NavDropdown.Item>
              <NavDropdown.Item href="/meal">Meal</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchTerm}
              onChange={(e)=> setSearchTerm(e.target.value)}
            />
            <Button variant="secondary"onClick={handleSearch} >Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNav;