import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import image from "../assets/image.jpg";


function CurrentAuctions() {
  const [allAuctions, setAllAuctions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch all auctions and save them as an array
    fetchAuctions();
  }, []);

  const fetchAuctions = async () => {
    try {
      const response = await fetch('https://auctioneer.azurewebsites.net/auction/x1y/');
      if (!response.ok) {
        throw new Error('Failed to fetch auctions');
      }
      const data = await response.json();
      const today = new Date();
      const currentAuctionsData = data.filter(auction => {
      const startDate = new Date(auction.StartDate);
      const endDate = new Date(auction.EndDate);
      return startDate <= today && endDate >= today;
        });

      setAllAuctions(currentAuctionsData)
    } catch (error) {
      console.error('Error fetching auctions: ', error);
    }
  };

  const handleSearch = () => {
    // Filter the allAuctions array based on the searchTerm
    const results = allAuctions.filter(auction =>
      auction.AuctionID.toString().includes(searchTerm.toLowerCase())||
      auction.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      auction.CreatedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      auction.StartDate.includes(searchTerm) ||  
      auction.EndDate.includes(searchTerm) ||  
      auction.StartingPrice.toString().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div>
      <div className="search-container mt-5 p-2  fixed-top d-flex justify-content-center bg-body-tertiary">
        <Form className="d-flex ">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2  form-control-sx "
            style={{ width: '300px' }}
            aria-label="Search"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <Button variant="success" onClick={handleSearch}>Search</Button>
        </Form>
      </div>

     <div className="search-results mt-5 p-5 ">
      {searchTerm !== '' ? (
        <div className="d-flex flex-wrap justify-content-center">
          {searchResults.map((item) => (
            <Card key={item.AuctionID} style={{ width: '25rem', margin: '5px' }}>
              <Card.Body>
              <Card.Img variant="top" src={image} />
              <Card.Title>{item.Title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{item.AuctionID}</Card.Subtitle>
              <Card.Text>{item.Description}</Card.Text>
              <Card.Text>Starting price: {item.StartingPrice}</Card.Text>
              <Card.Text>Seller: {item.CreatedBy}</Card.Text>
              <Card.Text>Start date: {item.StartDate}</Card.Text>
              <Card.Text>End date: {item.EndDate}</Card.Text>
              <Link key={item.AuctionID}  to={`/auctiondetails/${item.AuctionID}`}>
                  <Button variant="primary">View details</Button>
              </Link>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
      <div className="d-flex flex-wrap justify-content-center">
      {allAuctions.map((auction) => (
        <Card key={auction.AuctionID} style={{ width: '25rem', margin: '5px' }}>
          <Card.Body>
          <Card.Img variant="top" src={image} />
            <Card.Title>{auction.Title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{auction.AuctionID}</Card.Subtitle>
            <Card.Text>{auction.Description}</Card.Text>
            <Card.Text>Starting price: {auction.StartingPrice}</Card.Text>
            <Card.Text>Seller: {auction.CreatedBy}</Card.Text>
            <Card.Text>Start date: {auction.StartDate}</Card.Text>
            <Card.Text>End date: {auction.EndDate}</Card.Text>
            <Link to={`/auctiondetails/${auction.AuctionID}`}>
              <Button variant="primary">View details</Button>
            </Link>
          </Card.Body>
        </Card>
      ))}
    </div>
    )}
    </div>
    </div>
  );
}

export default CurrentAuctions;