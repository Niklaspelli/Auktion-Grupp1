import React, { useState } from "react";
//import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const NewAuktion = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [groupCode, setGroupCode] = useState("x1y");
  const [startingPrice, setStartingPrice] = useState("");
  const [createdBy, setCreatedBy] = useState("");

  const API_POST = "https://auctioneer.azurewebsites.net/auction/x1y";

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(API_POST, {
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
      });
      console.log(response);
      setTitle("");
      setDescription("");
      setStartDate("");
      setEndDate("");
      setStartingPrice("");
      setCreatedBy("");
    } catch (error) {
      console.error("fetch error:");
    }
  };

  return (
    <>
      <Form.Floating className="mb-3">
        <Form.Control
          id="floatingInputCustom"
          type="text"
          placeholder=""
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="floatingInputCustom">Title</label>
      </Form.Floating>

      <Form.Floating className="mb-3">
        <Form.Control
          id="floatingInputCustom"
          as="textarea"
          placeholder=""
          style={{ height: "100px" }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="floatingInputCustom">Describe product here</label>
      </Form.Floating>

      <Form.Floating className="mb-3">
        <Form.Control
          id="floatingInputCustom"
          type="text"
          placeholder=""
          value={groupCode}
          onChange={(e) => setGroupCode(e.target.value)}
        />
        <label htmlFor="floatingInputCustom">Title</label>
      </Form.Floating>

      <Form.Floating className="mb-3">
        <Form.Control
          id="floatingInputCustom"
          type="text"
          placeholder=""
          value={startingPrice}
          onChange={(e) => setStartingPrice(e.target.value)}
        />
        <label htmlFor="floatingInputCustom">Starting Price</label>
      </Form.Floating>

      <div label htmlFor="StartDate">
        Start Date
      </div>
      <input
        type="datetime-local"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      <div label htmlFor="endDate">
        End Date
      </div>
      <input
        type="datetime-local"
        placeholder="End Date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />

      <Form.Floating className="mb-3">
        <Form.Control
          id="floatingInputCustom"
          type="text"
          placeholder=""
          value={createdBy}
          onChange={(e) => setCreatedBy(e.target.value)}
        />
        <label htmlFor="floatingInputCustom">Created by</label>
      </Form.Floating>

      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Post Auction
      </button>
    </>
  );
};

export default NewAuktion;

{
  /* <label for="title">Title:</label>
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
      /> */
}
