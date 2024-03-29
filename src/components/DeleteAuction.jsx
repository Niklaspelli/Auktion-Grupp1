import React from 'react'
import { Button } from 'react-bootstrap';

const DeleteAuction = ({auctionId, onDelete}) => {

const handleDelete = () => {
  
    fetch(`https://auctioneer.azurewebsites.net/auction/x1y/${auctionId}`, {
      method: 'DELETE'
    })
     .then(res =>{
        if(res.ok){
            onDelete(auctionId); // notify the parent component that the acution was deleted
        } else {
            console.error("Failed to delete an auction");
        }
     })
     .catch (err =>{
        console.error ("Error occurred :", err )

     });
    }

  return (
    <Button variant='danger' onClick={handleDelete}>Delete Auction</Button>
  );
}

export default DeleteAuction

