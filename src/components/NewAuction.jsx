import React, { useState } from "react";


const NewAuktion = () => {  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [groupCode, setGroupCode] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [createdBy, setCreatedBy] = useState("");


  const API_POST = "https://auctioneer.azurewebsites.net/auction/x1y"

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch( API_POST, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Title: title,
            Description: description,
            StartDate: startDate,
            EndDate: endDate,
            GroupCode: groupCode,
            StartingPrice: startingPrice,
            CreatedBy: createdBy,
          }),
        }
      );
      console.log(response);
      setTitle("");
      setDescription("");
      setStartDate("");
      setEndDate("");
      setGroupCode("");
      setStartingPrice("");
      setCreatedBy("");

    } catch (error) {
      console.error("fetch error:");
    }
  };

  return (
    <form onSubmit={handleSubmit}>

    <label for="title">Title:</label>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

    <label for = "description">Description</label>
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

    <label for = "StartDate">Start Date</label>
      <input
        type="datetime-local"
        placeholder="Start Date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

    <label for = "endDate">End Date</label>
      <input
        type="datetime-local"
        placeholder="End Date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />

    <label for = "groupCode">Group Code</label>
      <input
        type="text"
        placeholder="Group Code"
        value={groupCode}
        onChange={(e) => setGroupCode(e.target.value)}
      />

    <label for = "startingPrice">Starting price:</label>
      <input
        type="number"
        placeholder="Starting Price"
        value={startingPrice}
        onChange={(e) => setStartingPrice(e.target.value)}
      />

    <label for = "createdBy">Create By:</label>
      <input
        type="text"
        placeholder="Created By"
        value={createdBy}
        onChange={(e) => setCreatedBy(e.target.value)}
      />

      <button type="submit">Post Auction</button>
    </form>
  );
};

export default NewAuktion;