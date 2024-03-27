import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

function CurrentAuctions() {
  const [dataAuctions, setDataAuctions] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredAuctions, setFilteredAuctions] = useState([]);
  const inputRef = useRef();

  console.log("rerender");

  useEffect(() => {
    // fetch('https://auctioneer.azurewebsites.net/auction/x1y/'+ search)
    //   .then(response => response.json()) // Parse response as JSON
    //   .then(data => {
    //     // Filter auctions where the StartDate is today or before, and the EndDate is today or in the future.
    //     const today = new Date();
    //     const currentAuctionsData = data.filter(auction => {
    //       const startDate = new Date(auction.StartDate);
    //       const endDate = new Date(auction.EndDate);
    //       return startDate <= today && endDate >= today;
    //     });
    //     setDataAuctions(currentAuctionsData)
    //   })
    //   .catch(error => {
    //     console.error('Error fetching data: ', error);
    //   });
    fetchAuctions();
  }, []);

  const fetchAuctions = async () => {
    try {
      const response = await fetch(
        "https://auctioneer.azurewebsites.net/auction/x1y/" + search
      );
      const data = await response.json();
      setDataAuctions(data);
      setFilteredAuctions(data);
    } catch (error) {
      console.error("Error fetching", error);
      setDataAuctions([]);
      //setFilteredAuctions([]);
    }
  };

  const handleSearch = (e) => {
    const searchTerm = inputRef.current.value;
    setSearch(searchTerm);
    console.log("term", searchTerm);

    const filteredItems = dataAuctions.filter((auction) => {
      // .some() = true om minst 1 "item" matchar
      return Object.values(auction).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    console.log("filtered auctions", filteredAuctions);
    setFilteredAuctions(filteredItems);
  };

  return (
    <div>
      <div className="mt-5"></div>
      <Form className="d-flex flex-grow-1 justify-content-end">
        <Form.Control
          type="search"
          ref={inputRef}
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          // value={search}
          // onChange={handleSearch}
        />
        <Button variant="outline-success" onClick={handleSearch}>
          Search
        </Button>
      </Form>

      {filteredAuctions.length > 0 ? (
        filteredAuctions.map((item, index) => (
          <div key={index} className="Card">
            <Link key={item.AuctionId} to={"/auctiondetails/" + item.AuctionID}>
              <ul>
                <b>{item.AuctionID}</b>
                <h2>{item.Title}</h2>
                <div>
                  <b>Starting price: </b>
                  <b>{item.StartingPrice}:-</b>
                </div>
                <p>
                  <b>Description: </b>
                  {item.Description}
                </p>
                <div>
                  Seller: <b>{item.CreatedBy}</b>
                </div>
                <p>
                  <b>Startdate:</b> {item.StartDate}
                </p>
                <p>
                  <b>Enddate: </b>
                  {item.EndDate}
                </p>
              </ul>
            </Link>
          </div>
        ))
      ) : (
        <p>No auctions found</p>
      )}
    </div>
  );
}

export default CurrentAuctions;