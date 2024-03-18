import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom';


function PastAuctions() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://auctioneer.azurewebsites.net/auction/x1y/')
      .then(response => response.json()) // Parse response as JSON
      .then(data => {
       /* This is to filter past auctions EndDate is yesterday or before  */
          const filteredData = data.filter(i =>{
          const endData = new Date(i.EndDate);
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() -1);
          return endData <= yesterday;
           });
          setData(filteredData);// Set the filterdata in state:/
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  return (
    <div>
      {data.map((item, index) => (
       
        <div key={index} className='Card'> 
       <Link key={item.AuctionId} to={"/Auction-Details/" + item.AuctionID}>
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

export default PastAuctions;




