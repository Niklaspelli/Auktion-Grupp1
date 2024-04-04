import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

const DeleteAuction = ({ auctionId, onDelete }) => {
  const [deleted, setDeleted] = useState(false); // State to manage whether the auction is deleted
  const [message, setMessage] = useState(""); // State to manage the message

  useEffect(() => {
    let timeout;
    if (message) {
      timeout = setTimeout(() => {
        setMessage(""); // Clear the message after 3000 milliseconds (3 seconds)
      }, 9000);
    }
    return () => clearTimeout(timeout); // Cleanup the timeout
  }, [message]);

  const handleDelete = () => {
    fetch(`https://auctioneer.azurewebsites.net/auction/x1y/${auctionId}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.ok) {
          onDelete(auctionId); // Notify the parent component that the auction was deleted
          console.log(auctionId)
          setDeleted(true); // Set the state to indicate that the auction has been deleted
          setMessage("Auction has been deleted"); // Set message
        } else {
          console.error("Failed to delete an auction");
          setMessage("Failed to delete the auction"); // Set error message
        }
      })
      .catch(err => {
        console.error("Error occurred:", err);
        setMessage("Failed to delete the auction"); // Set error message
      });
  };

  return (
    <div>
      {!deleted ? ( // Render the button if the auction is not deleted
        <Button variant='danger' onClick={handleDelete}>Delete Auction</Button>
      ) : (
        <MessageError>{message}</MessageError> // Render the message if the auction is deleted
      )}
    </div>
  );
};

export default DeleteAuction;

const MessageError = styled.div`
  color: red;
  font-weight: bold;
`;