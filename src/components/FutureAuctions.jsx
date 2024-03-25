import React, { useState, useEffect} from 'react'
import DeleteAuction from './DeleteAuction';



function FutureAuctions() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://auctioneer.azurewebsites.net/auction/x1y/')
      .then(response => response.json()) // Parse response as JSON
      .then(data => {
        // Filter auctions where the StartSate and endDate is future
        const today = new Date();
          const futureAuctionsData = data.filter(auction =>{
            const startDate =new Date(auction.StartDate);
            const endDate = new Date(auction.EndDate);
            return startDate > today && endDate >today
          });
          setData(futureAuctionsData)
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, [data]); // whenever data changes updating the view with the latest data

  const handleDelete = (auctionId) =>{
    setData(prevData => prevData.filter(auction => auction.auctionId !==auctionId ))
  }

  return (
    <div>
      {data.map((item, index) => (
       
        <div key={index} className='Card'> 
       {/* <Link key={item.AuctionId} to={"/auctiondetails/" + item.AuctionID}> */}
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
          {/* </Link> */}
           {/* <Button variant='danger'>Delete Auction</Button> */}
          <DeleteAuction auctionId={item.AuctionID} onDelete={handleDelete}/>
        </div>
       
      ))}
     
    </div>
    
  );
}

export default FutureAuctions;