import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function AuctionDetails() {
    const [data, setData] = useState({});//old:[]
    const location = useLocation();

    const fetchDetails = async (AuctionID) => {
        try {
            const api = await fetch(`https://auctioneer.azurewebsites.net/auction/x1y/${AuctionID}`);
            const detailData = await api.json();
            console.log(detailData); // Log the data to see its structure
            //the detailData returned from the API is not an array but "an object".
            if (Object.keys(detailData).length > 0) { // Here need to rewrite old: detailData && detailData.length > 0
                setData(detailData); // Assuming the data is an array
            } else {
                console.error('No details found for ID:', AuctionID);
                setData({}); //old:[]
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
            {/* {data.map((item, index) => ( // This data is not array*/}
                <div className='Card'>
                    <ul>
                        <b>{data.AuctionID}</b>
                        <h2>{data.Title}</h2>
                        <div><b>Starting price: </b><b>{data.StartingPrice}:-</b></div>
                        <p><b>Description: </b>{data.Description}</p>
                        <div>Seller: <b>{data.CreatedBy}</b></div>
                        <p><b>Startdate:</b> {data.StartDate}</p>
                        <p><b>Enddate: </b>{data.EndDate}</p>
                        <input/>
                        <button>Bid</button>
                        {/* Render other properties here if needed */}
                    </ul>
                </div>
            {/* ))} */}
        </div>
    );
}    

export default AuctionDetails;