import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Alert, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import AuctionCreate from './AuctionCreate';


function CurrentAuctions({searchTerm}) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [specificAuction, setSpecificAuction] = useState(null);

  useEffect(() => {
    //   fetch('https://auctioneer.azurewebsites.net/auction/x1y/'+ search)
    //     .then(response => response.json()) // Parse response as JSON
    //     .then(data => {
    //       // Filter auctions where the StartDate is today or before, and the EndDate is today or in the future.
    //       const today = new Date();
    //       const currentAuctionsData = data.filter(auction => {
    //         const startDate = new Date(auction.StartDate);
    //         const endDate = new Date(auction.EndDate);
    //         return startDate <= today && endDate >= today;
    //       });
    //       setData(currentAuctionsData)
    //     })
    //     .catch(error => {
    //       console.error('Error fetching data: ', error);
    //     });
    fetchAuctions();
  }, [searchTerm]);

  /* const fetchAuctions = async () => {
    try {
      //const response = await fetch('https://auctioneer.azurewebsites.net/auction/x1y/'+search);
      
      const response = await fetch(`https://auctioneer.azurewebsites.net/auction/x1y/15`);
      console.log(searchTerm)
      const data = await response.json();
      console.log(data);
  
      // Check if data is an array before filtering
    if (Array.isArray(data)) {
      const today = new Date();
      const currentAuctionsData = data.filter(auction => {
        const startDate = new Date(auction.StartDate);
        const endDate = new Date(auction.EndDate);
        return startDate <= today && endDate >= today;
      });
  
      if (currentAuctionsData.length > 0) {
        setData(currentAuctionsData);
      } else {
        setData([]);
      }
    } else {
      // Handle case where data is not an array
      console.error('Invalid data format: expected an array');
    }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };
 */

/*   const fetchAuctions = async () => {
    try {
      let apiUrl = 'https://auctioneer.azurewebsites.net/auction/x1y/';
      if (searchTerm.trim() !== '') {
        apiUrl += searchTerm; // Append search term to API URL if it's not empty
      }
  
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data); // Log the data received from the API
  
      // Check if data is an array of auctions
      if (Array.isArray(data)) {
        // Filter auctions to get only current ones
        const today = new Date();
        const currentAuctionsData = data.filter(auction => {
          const startDate = new Date(auction.StartDate);
          const endDate = new Date(auction.EndDate);
          return startDate <= today && endDate >= today;
        });
  
        setData(currentAuctionsData); // Set filtered data to state
      } else {
        setData(data); // Set data to state
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };
   */
  
  const fetchAuctions = async () => {
    try {
      let apiUrl = 'https://auctioneer.azurewebsites.net/auction/x1y/';
      if (searchTerm.trim() !== '') {
        apiUrl += searchTerm; // Append search term to API URL if it's not empty
      }
  
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data); // Log the data received from the API
  
      // Check if data is an array of auctions
      if (Array.isArray(data)) {
        // Filter auctions to get only current ones
        const today = new Date();
        const currentAuctionsData = data.filter(auction => {
          const startDate = new Date(auction.StartDate);
          const endDate = new Date(auction.EndDate);
          return startDate <= today && endDate >= today;
        });
  
        setData(currentAuctionsData); // Set filtered data to state
      } else {
        setData(data); // Set data to state
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };
  
  





 /*  function handleSearch() {
    const searchedAuction = data.filter(d => {
      return d.AuctionID === parseInt(search)
    })
    setSpecificAuction(searchedAuction);
  }

  function handleChange(e) {
    e.preventDefault()
    setSearch(e.target.value);

  }  
   return (
    <div>
       <div className="mt-5"></div>
      <Form className="d-flex flex-grow-1 justify-content-end">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          value={search}
          onChange={handleChange}
        />
        <Button variant="outline-success" onClick={handleSearch}>Search</Button>
      </Form> 

      {
        (!specificAuction && data.length > 0)
          ? data.map((item, index) => (

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

                  
                </ul></Link>
            </div>))

          : (<>{JSON.stringify(specificAuction)}</>)
      }

    </div>

  ); */

  /* return (
    <div>
      {data.map((item, index) => (
       
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

          
          </ul></Link>
        </div>
       
      ))}
     
    </div>
    
  ); */

  return (
    <div>
      {/*Check if data exists and is an object but not an array */}
      {data && typeof data === 'object' && !Array.isArray(data) ? (
        <div className='Card'> 
          <Link key={data.AuctionId} to={"/auctiondetails/" + data.AuctionID}>
            <ul>
              <b>{data.AuctionID}</b>
              <h2>{data.Title}</h2>
              <div><b>Starting price: </b><b>{data.StartingPrice}:-</b></div>
              <p><b>Description: </b>{data.Description}</p>
              <div>Seller: <b>{data.CreatedBy}</b></div>
              <p><b>Startdate:</b> {data.StartDate}</p>
              <p><b>Enddate: </b>{data.EndDate}</p>
              {/* Render other properties here if needed */}
            </ul>
          </Link>
        </div>
      ) : (
        Array.isArray(data) ? (
          data.map((item, index) => (
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
          ))
        ) : (
          <Alert variant='warning'>{searchTerm ? 'Auction with the searched ID not found' : 'There is no Ongoing Auction'}</Alert>
        )
      )}
    </div>
  );
  

}

export default CurrentAuctions;
