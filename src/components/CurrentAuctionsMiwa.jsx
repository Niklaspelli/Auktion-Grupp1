import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';


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
      auction.EndDate.includes(searchTerm)
    );
    setSearchResults(results);
  };

  return (
    <div>
      <div className="search-container mt-5 p-3 bg-white fixed-top d-flex justify-content-center ">
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
          <Button variant="outline-success" onClick={handleSearch}>Search</Button>
        </Form>
      </div>

     <div className="search-results mt-5 p-5 ">
      {searchTerm !== '' ? (
        <div>
          {searchResults.map((item) => (
            <div key={item.AuctionID} className='Card'>
              <Link key={item.AuctionID} to={"/auctiondetails/" + item.AuctionID}>
                <ul>
                  <b>{item.AuctionID}</b>
                  <h2>{item.Title}</h2>
                  <div><b>Starting price: </b><b>{item.StartingPrice}:-</b></div>
                  <p><b>Description: </b>{item.Description}</p>
                  <div>Seller: <b>{item.CreatedBy}</b></div>
                  <p><b>Startdate:</b> {item.StartDate}</p>
                  <p><b>Enddate: </b>{item.EndDate}</p>
                  {/* Render other properties here if needed */}
                </ul>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {allAuctions.map((item, index) => (
            <div key={index} className='Card'>
              <Link key={item.AuctionId} to={"/auctiondetails/" + item.AuctionID}>
                <ul>
                  <b>{item.AuctionID}</b>
                  <h2>{item.Title}</h2>
                  <div><b>Starting price: </b><b>{item.StartingPrice}:-</b></div>
                  <p><b>Description: </b>{item.Description}</p>
                  <div>Seller: <b>{item.CreatedBy}</b></div>
                  <p><b>Startdate:</b> {item.StartDate}</p>
                  <p><b>Enddate: </b>{item.EndDate}</p>
                  {/* Render other properties here if needed */}
                </ul>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}

export default CurrentAuctions;
