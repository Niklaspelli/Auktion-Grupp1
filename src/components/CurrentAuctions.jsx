import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import {Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form'; 


function CurrentAuctions() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");


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
  }, []);

  const fetchAuctions  = async ()=>{

        try{
          const response = await fetch('https://auctioneer.azurewebsites.net/auction/x1y/'+ search);
          const data = await response.json()
          console.log(data);
          if (data) {
            setData(data)

          }

          else {
            setData([]);
          }
}
        catch(error){

        }
  };
  function handleSearch() {
    fetchAuctions();
  }

  function handleChange(e) {
    e.preventDefault()
    setSearch(e.target.value);
    console.log(search);

  }
  return (
    <div>
      <Form className="d-flex flex-grow-1 justify-content-end">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          value = {search}
          onChange={handleChange}

        />
        <Button variant="outline-success" onClick={handleSearch}>Search</Button>
      </Form>

     {
      data.length
      ? data.map((item,index) => (

        <div key={index}className='Card'>
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
            </ul></Link>
        </div>))

      : <h1>Hej</h1>
      }

    </div>

  );
}

export default CurrentAuctions;