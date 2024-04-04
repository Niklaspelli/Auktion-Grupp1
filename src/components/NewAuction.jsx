import { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import styled from "styled-components";

const NewAuction = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [groupCode, setGroupCode] = useState("x1y");
  const [startingPrice, setStartingPrice] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const API_POST = "https://auctioneer.azurewebsites.net/auction/x1y";

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if any input fields are empty
    if (!title || !description || !startDate || !endDate || !startingPrice || !createdBy) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

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

      if (response.ok) {
        setStatus("SUCCESS");
        setTitle("");
        setDescription("");
        setStartDate("");
        setEndDate("");
        setStartingPrice("");
        setCreatedBy("");
        setErrorMessage(""); // Clear any previous error messages
      } else {
        console.error("Failed to post auction");
        setStatus("ERROR");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setStatus("ERROR");
    }
  };
  
  useEffect(() => {
    if (status === "SUCCESS" || status === "ERROR") {
      const timeout = setTimeout(() => {
        setStatus("");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [status]);


  return (
    <Container>
    <h2>Create New Auction</h2>
    
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
          value={startingPrice}
          onChange={(e) => setStartingPrice(e.target.value)}
        />
        <label htmlFor="floatingInputCustom">Starting Price</label>
      </Form.Floating>

      <label htmlFor="StartDate" className="mb-3 p-2">
        Start Date
      </label>
      <input
      
        type="datetime-local"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      <label htmlFor="endDate" className="mb-3 p-2">
        End Date
      </label>
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

      <Button variant="success" type="submit" onClick={(e) => handleSubmit(e)}>
        Post Auction
      </Button>

      {status === "SUCCESS" && (
        <Message>
          <p>Your auction has been successfully posted!</p>
       </Message>
      )}
        {status === "ERROR" && (
        <MessageError>
          <p>Failed to post auction. Please try again later.</p>
       </MessageError>
      )}
       {errorMessage && (
        <MessageError>
          {errorMessage}
        </MessageError>
      )}
      
    </Container>
  );
};




export default NewAuction;

 const Message = styled.div`
  color: green;
  font-weight: bold;
`; 

const MessageError = styled.div`
  color: red;
  font-weight: bold;
`;