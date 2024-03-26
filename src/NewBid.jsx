
import Bid from "./Bid";

const NewBid = () => {
  // Example auctionId and itemId
  const AuctionID = "x1y";
  const Amount = "";

  return (
    <div>
      <h2>Place Your Bid</h2>
      <Bid AuctionID={AuctionID} Amount={Amount} />
    </div>
  );
};

export default NewBid;