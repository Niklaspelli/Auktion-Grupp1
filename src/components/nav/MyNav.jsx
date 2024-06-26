import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './MyNav.css'


function MyNav() {


  return (
    <Navbar expand="lg" className="bg-body-tertiary" fixed="top" style={{ zIndex: '1000' }}>
      <Container fluid>
        <Navbar.Brand className="lobster-regular" href="#">My Auction</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '120px' }}
            navbarScroll
          >
            <Nav.Link href="/">Ongoing</Nav.Link>
            <Nav.Link href="/notcurrent">Completed</Nav.Link>
            <Nav.Link href="/future">Upcoming</Nav.Link>
            <Nav.Link href="/newauction">Create New Auction</Nav.Link>

          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNav;

