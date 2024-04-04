import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CurrentBid from './CurrentBid';
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import styled from "styled-components";
import DeleteAuction from "./DeleteAuction";



function AuctionDetails() {
    const [data, setData] = useState({});//old:[]
    const location = useLocation();

    const [bid, setBid] = useState('');
    const [bidder, setBidder] = useState('');
    const [groupCode, setGroupCode] = useState('x1y');
    const [errorMessage, setErrorMessage] = useState('');
    const [fetchTrigger, setFetchTrigger] = useState(false);

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


  const handleSubmit = async (e, AuctionID) => {
    e.preventDefault();

    try {
      const response =await fetch('https://auctioneer.azurewebsites.net/bid/x1y', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Amount: bid,
            AuctionID: AuctionID, 
            Bidder: bidder,
            GroupCode: groupCode,
          }),
        });
  
        if (!response.ok){
          if(response.status === 400 ) {
            const errorMessage = (await response.text()).replace("Bad Request", "Please try again!");
            setErrorMessage(errorMessage);
          }
        } else {
          setBid("");
          setBidder('');
          setFetchTrigger(prevState => !prevState);
        }
      } catch (error) {
        console.error("fetch error:");
      }
    };

    return (
        <div>
            
            <AuctionStyle>
                <div className='BidCard'>
                  
                    <ul>
                        <b>{data.AuctionID}</b>
                        <h2>{data.Title}</h2>
                        <div className="dropdown">
                        <button className="dropbtn">Current bid</button>
                         <div className="dropdown-content">
                            
                        <CurrentBid  auctionId ={data.AuctionID} fetchTrigger={fetchTrigger} />
                       
                        </div>
                        </div> 
                        <div><b>Starting price: </b>{data.StartingPrice}:-</div>
                        <p><b>Description: </b>{data.Description}</p>
                        <div>Seller: <b>{data.CreatedBy}</b></div>
                        <p><b>Startdate:</b> {data.StartDate}</p>
                        <p><b>Enddate: </b>{data.EndDate}</p>

                    </ul>

                    <h2>Place Your Bid</h2>
                
                   
                    <Form.Floating className="mb-3">
                    
                        <input
                          className='bidInput'
                          type="bid"
                          placeholder="Bid"
                          value={bid}
                          onChange={(e)=> setBid(e.target.value)}
                        />

                        <input
                          className='bidInput'
                          type="text"
                          placeholder="bidder"
                          value={bidder}
                          onChange={(e) => setBidder(e.target.value)}
                        /> 
                      </Form.Floating>     
                    {/* <button type="submit">Post Bid</button> */}
                    <Button variant="success" type="submit" onClick={(e) => handleSubmit(e, data.AuctionID)}>Post Bid</Button>{''}
                    
                    
                    {errorMessage && (
                        <div className="alert alert-danger position-relative" role="alert">
                          <button type="button" 
                                  className="btn-close position-absolute top-0 end-0 mt-1 me-2" 
                                  aria-label="Close" 
                                  onClick={() => setErrorMessage('')}>
                          </button>
                          <span className="d-block py-2 px-4">{errorMessage}</span>
                        </div>
                      )}
                     

                </div>
        </AuctionStyle>

        <DeleteAuction />

        

        </div>
        
    );
}    

export default AuctionDetails;


const AuctionStyle = styled.div`


.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 120px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1;
  overflow-y: auto; /* Enable vertical scrollbar */
  max-height: 100px; 
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:focus-within .dropdown-content {
  display: block;
}

.bidStyle {
  display: flex;
  justify-content: center;
  align-items: center;
 margin: 10px;


}
.bidInput  {
  margin: 5px;
}

.BidCard {
  width: 400px;
  height: 530px;
  margin: 2rem;
  border: 3px solid black;
  border-radius: 15%;
  justify-content: center;
  align-items: center;
  background-color: darkkhaki;
  
}

`;