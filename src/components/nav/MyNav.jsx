import {Button} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import {useState } from 'react';


function MyNav({onSearch}) {
  const [searchTerm, setSearchTerm]= useState('');

  const handleSearch =() =>{
  onSearch(searchTerm);
 }
 

  return (
    <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
      <Container fluid>
        <Navbar.Brand href="#">My Auction</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Ongoing</Nav.Link>
            <Nav.Link href="/notcurrent">Completed</Nav.Link>
            <Nav.Link href="/future">Upcoming</Nav.Link>
            <Nav.Link href="/newauction">Create New Auction</Nav.Link>
            {/* <Nav.Link href="/meal-rating">new link</Nav.Link> */}

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