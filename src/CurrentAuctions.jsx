import React, { useState, useEffect} from 'react'


function CurrentAuctions() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://auctioneer.azurewebsites.net/auction/x1y/')
      .then(response => response.json()) // Parse response as JSON
      .then(data => setData(data)) // Set the data in state
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  return (
    <div>
      {data.map((item, index) => (
        <div key={index} className='Card'>
          <ul>
          <b>{item.AuctionID}</b>
          <h2>{item.Title}</h2>
          <div><b>Starting price: </b><b>{item.StartingPrice}:-</b></div>
          <p><b>Description: </b>{item.Description}</p>
          
<div>Seller: <b>{item.CreatedBy}</b></div>
<p><b>Startdate:</b> {item.StartDate}</p>
<p><b>Enddate: </b>{item.EndDate}</p>
<input/>
<button>Bid</button>
          {/* Render other properties here if needed */}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default CurrentAuctions




