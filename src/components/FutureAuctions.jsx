import { useState, useEffect} from 'react'
import DeleteAuction from './DeleteAuction';
import { Form, Button, Alert } from 'react-bootstrap';



function FutureAuctions() {
  const [allAuctions, setAllAuctions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [forceRender, setForceRender] = useState(Math.random()); // Initial random value


  useEffect(() => {
    // Fetch auctions immediately on initial render
    fetchAuctions();
  
    return () => {}; // Empty cleanup
  }, []);
  
  useEffect(() => {
    //When user delete an auction delete the auction from view after 3 seccond
    if (forceRender) {
      const timeoutId = setTimeout(() => {
        fetchAuctions();
      }, 3000);
  
      return () => clearTimeout(timeoutId);
    }
  }, [forceRender]);


  const fetchAuctions = async () => {
    try{
    const response = await fetch('https://auctioneer.azurewebsites.net/auction/x1y/') 
      if (!response.ok) {
        throw new Error('Failed to fetch auctions');
      }  
         const data=await response.json(); // Parse response as JSON
        // Filter auctions where the StartSate and endDate is future
            const today = new Date();
            const futureAuctionsData = data.filter(auction =>{
            const startDate =new Date(auction.StartDate);
            const endDate = new Date(auction.EndDate);
            return startDate > today && endDate >today
          });
          setAllAuctions(futureAuctionsData)

      }catch(error) {
        console.error('Error fetching data: ', error);
      }
    };

  const handleDelete = (auctionId) =>{
    setAllAuctions(prevData => prevData.filter(auction => auction.auctionId !==auctionId ))
    setForceRender(Math.random()); // Update forceRender to trigger re-render
  }

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

  console.log(allAuctions.length) // 0 if none. 

  return (
    <div>
      {allAuctions.length === 0 ? (
        <Alert variant='warning'> There is no Upcoming Auction. You can create{' '} <Alert.Link href="/newauction">New Auction</Alert.Link>!</Alert>
      ) : (
        <div>
          <div className="search-container mt-5 p-5  fixed-top d-flex justify-content-center ">
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
  
          <div className="search-results mt-5 p-5">
            {searchTerm !== '' ? (
                <div>
                  {searchResults.map((item) => (
                    <div key={item.AuctionID} className='Card'>
                      <ul>
                        <b>{item.AuctionID}</b>
                        <h2>{item.Title}</h2>
                        <div><b>Starting price: </b><b>{item.StartingPrice}:-</b></div>
                        <p><b>Description: </b>{item.Description}</p>
                        <div>Seller: <b>{item.CreatedBy}</b></div>
                        <p><b>Startdate:</b> {item.StartDate}</p>
                        <p><b>Enddate: </b>{item.EndDate}</p>
                        <DeleteAuction auctionId={item.AuctionID} onDelete={handleDelete} />
                      </ul>
                    </div>
                  ))}
                </div>
                )
                 : (
                  <div>
                  {allAuctions.map((item, index) => (
                    <div key={index} className='Card'>
                      <ul>
                        <b>{item.AuctionID}</b>
                        <h2>{item.Title}</h2>
                        <div><b>Starting price: </b><b>{item.StartingPrice}:-</b></div>
                        <p><b>Description: </b>{item.Description}</p>
                        <div>Seller: <b>{item.CreatedBy}</b></div>
                        <p><b>Startdate:</b> {item.StartDate}</p>
                        <p><b>Enddate: </b>{item.EndDate}</p>
                        <DeleteAuction auctionId={item.AuctionID} onDelete={handleDelete} />
                      </ul>
                    </div>
                  ))}
                </div>
                )}
              
          </div>
        </div>
      )}
    </div>
  );
} 

export default FutureAuctions;