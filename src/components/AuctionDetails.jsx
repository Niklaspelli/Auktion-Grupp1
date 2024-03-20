import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


function AuctionDetails() {
    const [data, setData] = useState({});//old:[]
    const location = useLocation();

    const [bid, setBid] = useState('');
    const [bidder, setBidder] = useState('');
    const [groupCode, setGroupCode] = useState('x1y');

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



// // BID Johanna Lagt till -->

  const handleSubmit = async (e, AuctionID) => {
    e.preventDefault();

    try {
      fetch('https://auctioneer.azurewebsites.net/bid/x1y', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Amount: bid,
            AuctionID: AuctionID, 
            Bidder: bidder,
            GroupCode: groupCode,
          }, console.log(AuctionID)),
        }
      );
      setBid("");
      setBidder('');
      
    } catch (error) {
      console.error("fetch error:");
    }
  };

// BID ---> END


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
                        {/* <input/>
                        <button>Bid</button> */}
                        {/* Render other properties here if needed */}
                    </ul>


                   {/* Johanna lagt till  */}
                    <form>
                        <input
                          type="bid"
                          placeholder="Bid"
                          value={bid}
                          onChange={(e)=> setBid(e.target.value)}
                        />

                        <input
                          type="text"
                          placeholder="Group Code"
                          value={groupCode}
                          onChange={(e) => setGroupCode(e.target.value)}
                        /> 

                        <input
                          type="text"
                          placeholder="bidder"
                          value={bidder}
                          onChange={(e) => setBidder(e.target.value)}
                        /> 
                           
                    {/* <button type="submit">Post Bid</button> */}
                    <button type="submit" onClick={(e) => handleSubmit(e, data.AuctionID)}>Post Bid</button>
                    </form>

                </div>
            {/* ))} */}
        </div>
    );
}    

export default AuctionDetails;