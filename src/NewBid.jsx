import React from "react";
import Bid from "./Bid";

const NewBid = () => {
  // Example auctionId and itemId
  const AuctionID = "x1y";
  const amount = 1;

  return (
    <div>
      <h2>Place Your Bid</h2>
      <Bid AuctionID={AuctionID} Amount={amount} />
    </div>
  );
};

export default NewBid;