import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from "styled-components";

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
`;

const Message = styled.div`
  color: green;
  font-weight: bold;
`;

function DeleteAuction() {
    const [data, setData] = useState({});
    const [bids, setBids] = useState([]);
    const [message, setMessage] = useState(""); // State to store the message
    const location = useLocation();

    const fetchDetails = async (AuctionID) => {
        try {
            const auctionResponse = await fetch(`https://auctioneer.azurewebsites.net/auction/x1y/${AuctionID}`);
            const detailData = await auctionResponse.json();
            if (Object.keys(detailData).length > 0) {
                setData(detailData);
            } else {
                console.error('No details found for ID:', AuctionID);
                setData({});
            }

            const bidsResponse = await fetch(`https://auctioneer.azurewebsites.net/bid/x1y/${AuctionID}`);
            const bidsData = await bidsResponse.json();
            if (Array.isArray(bidsData)) {
                setBids(bidsData);
            } else {
                console.error('Error fetching bids for auction:', AuctionID);
                setBids([]);
            }
        } catch (error) {
            console.error('Error fetching auction details:', error);
        }
    };

    useEffect(() => {
        const lastPartOfLocationPath = location.pathname.split('/').slice(-1)[0];
        fetchDetails(lastPartOfLocationPath);
    }, [location]);

    const handleDelete = async () => {
        try {
            if (bids.length === 0) {
                const response = await fetch(`https://auctioneer.azurewebsites.net/auction/x1y/${data.AuctionID}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    setMessage("Auction has been successfully deleted"); // Set message state
                    // Handle UI update or navigation after successful deletion
                } else {
                    console.error("Failed to delete auction");
                    // Handle error condition, such as displaying an error message to the user
                }
            } else {
                setMessage("Cannot delete auction with existing bids"); // Set message state
                // Handle UI update or error message indicating that auction cannot be deleted
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    return (
        <div>
            {message && <Message>{message}</Message>} {/* Display message if message state is not empty */}
            <DeleteButton onClick={handleDelete}>Delete Auction</DeleteButton>
        </div>
    );
}

export default DeleteAuction;