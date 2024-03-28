import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function CurrentAuctions() {
  const [allAuctions, setAllAuctions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch all auctions and save them as an array
    fetchAuctions();
  }, []);

  const fetchAuctions = async () => {
    try {
      const response = await fetch('https://auctioneer.azurewebsites.net/auction/x1y/');
      const data = await response.json();
      setAllAuctions(data);
    } catch (error) {
      console.error('Error fetching auctions: ', error);
    }
  };

  const handleSearch = () => {
    // Filter the allAuctions array based on the searchTerm
    const results = allAuctions.filter(auction =>
      auction.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      auction.AuctionID.toString().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by title or ID"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        {searchResults.map(auction => (
          <div key={auction.AuctionID}>
            <h2>{auction.Title}</h2>
            <p>{auction.Description}</p>
            <p>ID: {auction.AuctionID}</p>
            <p>Starting Price: {auction.StartingPrice}</p>
            <p>Created By: {auction.CreatedBy}</p>
            {/* Render other auction details here */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CurrentAuctions;
