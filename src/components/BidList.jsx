import { useState, useEffect } from 'react'
//import { Button } from 'react-bootstrap';

const BidList = ({AuctionId, showHighestOnly}) => {
    const [bids, setBids] = useState([]); 
    const [higestBid, setHighestBid] = useState(null);

    useEffect(() =>{
        fetch(`https://auctioneer.azurewebsites.net/bid/x1y/${AuctionId}`)
         .then(res=> res.json())
         .then(data =>{
            console.log("Fetched bids:", data); 
            setBids(data);
            if(data.length>0){
                const maxBid =Math.max(...data.map(bid => bid.Amount))
                console.log("Max bid:", maxBid);
                setHighestBid(maxBid);
            } else {
                // If there are no bids, set highestBid to null
                setHighestBid(null);
              }
         })
         .catch(error =>{
            console.error('Error fetching bids: ', error);
         });
    }, [AuctionId])

    return (
        <>
          {showHighestOnly && higestBid !== null ? (
            <div>
              <p style={{ color: 'red', backgroundColor: 'lightgrey'  }}><b>Final price: {higestBid}:- </b></p>
            </div>
          ) : (
            <div>
              <p style={{ color: 'blue' }}><b>No bids</b></p>
            </div>
          )}
        </>
      );
  }
        

export default BidList
