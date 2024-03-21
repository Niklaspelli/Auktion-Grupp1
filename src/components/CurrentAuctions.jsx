import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom';


function CurrentAuctions() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://auctioneer.azurewebsites.net/auction/x1y/')
      .then(response => response.json()) // Parse response as JSON
      .then(data => {
        // Filter auctions where the StartDate is today or before, and the EndDate is today or in the future.
          const today = new Date();
          const currentAuctionsData = data.filter(auction =>{
            const startDate =new Date(auction.StartDate);
            const endDate = new Date(auction.EndDate);
            return startDate <= today && endDate >= today;
          });
          setData(currentAuctionsData)
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
      }, []);

  return (
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

          {/* Render other properties here if needed */}
          </ul></Link>
        </div>
       
      ))}
     
    </div>
    
  );
}

export default CurrentAuctions;




