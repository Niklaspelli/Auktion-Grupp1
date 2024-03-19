import React, { useState } from "react";

const Bid = ({ AuctionID, Amount, GroupCode, BidID }) => {
  const [amount, setAmount] = useState("");
  const [bidder, setBidder] = useState("");
  const [groupcode, setGroupCode] = useState("");
  const [auctionID, setAuctionID] = useState("");
  const [bidID, setBidID] = useState("");

  const API_POST = `https://auctioneer.azurewebsites.net/bid/x1y/${Amount}}`;

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic bid validation
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      alert("Please enter a valid bid amount.");
      return;
    }

    try {
      const response = await fetch(API_POST, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          BidID: bidID,
          AuctionID: auctionID,
          Amount: amount,
          Bidder: bidder,
          GroupCode: groupcode,
        }),
      });

      if (response.ok) {
        alert("Bid placed successfully!");
        setAmount("");
        setBidder("");
        setGroupCode("");
        setAuctionID("");
        setBidID("");
      } else {
        console.error("Failed to place bid:", response.statusText);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Failed to place bid. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Bid amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Bidder"
        value={bidder}
        onChange={(e) => setBidder(e.target.value)}
      />
      <input
        type="text"
        placeholder="GroupCode"
        value={groupcode}
        onChange={(e) => setGroupCode(e.target.value)}
      />
      {/* Input fields for AuctionID and BidID */}
      {/* <input
        type="text"
        placeholder="Auction ID"
        value={auctionID}
        onChange={(e) => setAuctionID(e.target.value)}
      />
      <input
        type="text"
        placeholder="Bid ID"
        value={bidID}
        onChange={(e) => setBidID(e.target.value)}
      /> */}
      <button type="submit">Bid</button>
    </form>
  );
};

export default Bid;