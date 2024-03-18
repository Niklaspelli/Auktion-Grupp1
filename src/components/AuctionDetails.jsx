import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function AuctionDetails() {
    const [data, setData] = useState([]);
    const location = useLocation();

    const fetchDetails = async (id) => {
        try {
            const api = await fetch(`https://auctioneer.azurewebsites.net/auction/x1y/?i=${id}`);
            const detailData = await api.json();
            console.log(detailData); // Log the data to see its structure
            if (detailData && detailData.length > 0) {
                setData(detailData); // Assuming the data is an array
            } else {
                console.error('No details found for ID:', id);
                setData([]);
            }
        } catch (error) {
            console.error('Error fetching auction details:', error);
        }
    };

    useEffect(() => {
        const lastPartOfLocationPath = location.pathname.split('/').slice(-1)[0];
        fetchDetails(lastPartOfLocationPath);
    }, [location]);

    return (
        <div>
            {data.map((item, index) => (
                <div key={index} className='Card'>
                    <ul>
                        <b>{item.AuctionID}</b>
                        <h2>{item.Title}</h2>
                        <div><b>Starting price: </b><b>{item.StartingPrice}:-</b></div>
                        <p><b>Description: </b>{item.Description}</p>
                        <div>Seller: <b>{item.CreatedBy}</b></div>
                        <p><b>Startdate:</b> {item.StartDate}</p>
                        <p><b>Enddate: </b>{item.EndDate}</p>
                        <input/>
                        <button>Bid</button>
                        {/* Render other properties here if needed */}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default AuctionDetails;