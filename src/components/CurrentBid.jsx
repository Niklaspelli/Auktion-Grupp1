import { useEffect, useState } from 'react';

function CurrentBid() {
    const [currentBid, setCurrentBid] = useState([]);

    const fetchDetails = async (AuctionID) => {
        try {
            const api = await fetch(`https://auctioneer.azurewebsites.net/bid/x1y/${AuctionID}`);
            const detailData = await api.json();
            console.log(detailData); // Log the data to see its structure
            if (Array.isArray(detailData) && detailData.length > 0) {
                setCurrentBid(detailData);
            } else {
                console.error('No bids found for ID:', AuctionID);
                setCurrentBid([]);
            }
        } catch (error) {
            console.error('Error fetching bid details:', error);
        }
    };

    useEffect(() => {
        const lastPartOfLocationPath = location.pathname.split('/').slice(-1)[0];
        fetchDetails(lastPartOfLocationPath);
    }, []);

    return (
        <div>
        {currentBid.length === 0 ? (
            <div>No bids at the moment</div>
        ) : (
            currentBid
                .sort((a, b) => b.Amount - a.Amount) // Sort bids by Amount in descending order
                .map((bid, index) => (
                    <div key={index}>
                        {bid.Amount}
                        <div>
                            {bid.Bidder}
                        </div>
                    </div>
                ))
        )}
    </div>
    )
}    

export default CurrentBid;


