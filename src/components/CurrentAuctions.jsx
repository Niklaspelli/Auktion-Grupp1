import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

function CurrentAuctions() {
  const [dataAuctions, setDataAuctions] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredAuctions, setFilteredAuctions] = useState([]);
  const inputRef = useRef();

  console.log('rerender')

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
      console.log('fetch')
    } catch (error) {
      console.error("Error fetching", error);
      setDataAuctions([]);
      //setFilteredAuctions([]);
    }
  };


  const handleSearch = (e) => {
    const searchTerm = inputRef.current.value;
    setSearch(searchTerm)
    console.log('term', searchTerm)

    const filteredItems = dataAuctions.filter((auction) => {

      // .some() = true om minst 1 "item" matchar 
      return Object.values(auction).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    });

    console.log('filtered auctions',filteredAuctions)
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
        <Button variant="outline-success" onClick={handleSearch}>Search</Button> 
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





// import { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom';
// import { Button } from 'react-bootstrap';
// import Form from 'react-bootstrap/Form';

// function CurrentAuctions() {
//   const [dataAuctions, setDataAuctions] = useState([]);
//   const [search, setSearch] = useState(""); // control input value
//   const [filteredAuctions, setFilteredAuctions] = useState([])

//   useEffect(() => {
//     fetchAuctions();
//   }, []); //

//   // För att undvika onödig belastning till server så hämtar vi data en gång och sätter i state (data),
//   // när vi söker så filtrerar vi data state och uppdaterar filtreringen i eget/nytt state.

//   const fetchAuctions = async () => {
//     try {
//       const response = await fetch('https://auctioneer.azurewebsites.net/auction/x1y/' + search);
//       const data = await response.json()

//       if (data) {
//          setDataAuctions(data)
//          setFilteredAuctions(data)
//       }
//       else {
//         setDataAuctions([]);
//         setFilteredAuctions([])
//       }
//     }
//     catch (error) { /* empty */ }
//   };

// //Johanna 3
// const handleInputChange = (e) => {
//   const searchTerm = e.target.value;
//   setSearch(searchTerm)

//   //filter
//   const filteredItems = dataAuctions.filter(auction => {
//     return Object.values(auction).some(value =>
//       typeof value === 'string' && value.toLowerCase().includes(search.toLowerCase())
//     );
//   });

//   //return filteredItems;
//   setFilteredAuctions(filteredItems);
// }

//   return (
//     <div>
//       <div className="mt-5"></div>
//       <Form className="d-flex flex-grow-1 justify-content-end">
//         <Form.Control
//           type="search"
//           placeholder="Search"
//           className="me-2"
//           aria-label="Search"
//           value={search} // that word been typed
//           onChange={handleInputChange} // the search input change
//         />
//         {/* <Button variant="outline-success" onClick={handleSearch}>Search</Button> */}
//       </Form>

//       {
//         (filteredAuctions && dataAuctions.length > 0) ? (
//           dataAuctions.map((item, index) => (

//         // (!specificAuction && data.length > 0)
//         //   ? data.map((item, index) => (

//             <div key={index} className='Card'>
//               <Link key={item.AuctionId} to={"/auctiondetails/" + item.AuctionID}>
//                 <ul>
//                   <b>{item.AuctionID}</b>
//                   <h2>{item.Title}</h2>
//                   <div><b>Starting price: </b><b>{item.StartingPrice}:-</b></div>
//                   <p><b>Description: </b>{item.Description}</p>
//                 </ul></Link>
//             </div>))
//          ) : (
//             <p>No auctions found</p>
//           // {JSON.stringify(filteredAuctions)}
//           )
//       }
//     </div>
//   );
// }

// export default CurrentAuctions;

// import { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom';
// import { Button } from 'react-bootstrap';
// import Form from 'react-bootstrap/Form';

// function CurrentAuctions() {
//   const [data, setData] = useState([]);
//   const [search, setSearch] = useState("");
//   const [specificAuction, setSpecificAuction] = useState(null);

//   const [filteredAuctions, setFilteredAuctions] = useState([])

//   useEffect(() => {
//     fetchAuctions();
//   }, []);

//   const fetchAuctions = async () => {
//     try {
//       const response = await fetch('https://auctioneer.azurewebsites.net/auction/x1y/' + search);
//       const data = await response.json()
//       console.log(data);
//       if (data) {
//         setData(data)
//       }
//       else {
//         setData([]);
//       }
//     }
//     catch (error) { /* empty */ }
//   };

//   const handleInputSearch = (e) => {
//     const searchAuction = (e.target.value);
//      setSearch(searchAuction)

//     const filtered = data.filter((value) =>
//     value.toLowerCase().includes(search.toLocaleLowerCase())
//     );
//     setFilteredAuctions(filtered);
//   }
// // //Johanna 3
// // const handleSearch = () => {
// //   const filteredAuctions = data.filter(auction => {
// //     return Object.values(auction).some(value =>
// //       typeof value === 'string' && value.toLowerCase().includes(search.toLowerCase())
// //     );
// //   });
// //   console.log(filteredAuctions)
// //   return filteredAuctions;
// // }

//   // function handleSearch() {
//   //   const searchedAuction = data.filter(d => {
//   //     return d.AuctionID === parseInt(search)
//   //   })
//   //   setSpecificAuction(searchedAuction);
//   // }

//   // function handleChange(e) {
//   //   e.preventDefault()
//   //   setSearch(e.target.value);
//   // }

//   return (
//     <div>
//       <div className="mt-5"></div>
//       <Form className="d-flex flex-grow-1 justify-content-end">
//         <Form.Control
//           type="search"
//           placeholder="Search"
//           className="me-2"
//           aria-label="Search"
//           value={search}
//           onChange={handleInputSearch}
//         />
//         {/* <Button variant="outline-success" onClick={handleSearch}>Search</Button> */}
//       </Form>

//       {
//         filteredAuctions.length > 0 ? (
//           filteredAuctions.map((item, index) => (

//         // (!specificAuction && data.length > 0)
//         //   ? data.map((item, index) => (

//             <div key={index} className='Card'>
//               <Link key={item.AuctionId} to={"/auctiondetails/" + item.AuctionID}>

//                 <ul>
//                   <b>{item.AuctionID}</b>
//                   <h2>{item.Title}</h2>
//                   <div><b>Starting price: </b><b>{item.StartingPrice}:-</b></div>
//                   <p><b>Description: </b>{item.Description}</p>

//                   <div>Seller: <b>{item.CreatedBy}</b></div>
//                   <p><b>Startdate:</b> {item.StartDate}</p>
//                   <p><b>Enddate: </b>{item.EndDate}</p>

//                   {/* Render other properties here if needed */}
//                 </ul></Link>
//             </div>))

//          ) : (
//             <p>No auctions found</p>
//           // <>{JSON.stringify(specificAuction)}</>
//           )
//       }

//     </div>

//   );
// }

// export default CurrentAuctions;

// useEffect(() => {
//     fetch('https://auctioneer.azurewebsites.net/auction/x1y/'+ search)
//       .then(response => response.json()) // Parse response as JSON
//       .then(data => {
//         // Filter auctions where the StartDate is today or before, and the EndDate is today or in the future.
//         const today = new Date();
//         const currentAuctionsData = data.filter(auction => {
//           const startDate = new Date(auction.StartDate);
//           const endDate = new Date(auction.EndDate);
//           return startDate <= today && endDate >= today;
//         });
//         setData(currentAuctionsData)
//       })
//       .catch(error => {
//         console.error('Error fetching data: ', error);
//       });
//   fetchAuctions();
// }, []);

// // Johanna 1
//   function handleSearch() {
//     if (!search) {
//       // If search is empty, reset specificAuction and fetch all auctions
//       setSpecificAuction(null);
//       fetchAuctions();
//       return;
//     }

//     // Johanna 1
//    const searchedAuctions = data.filter(auction => {
//       // Check if the search term matches any auction attribute
//       return Object.values(auction).some(value =>
//         typeof value === 'string' && value.toLowerCase().includes(search.toLowerCase())
//       );
//     });
//     setSpecificAuction(searchedAuctions);
//   }

// johanna 2
// const handleSearch = (e) => {
//   setSearch(e.target.value);
// }

// const filteredAuctions = data.filter(auction => {
//   // Filter based on auction attributes
//   return Object.values(auction).some(value =>
//     typeof value === 'string' && value.toLowerCase().includes(search.toLowerCase())
//   );
// });

//

// //Johanna 3
// const handleSearch = () => {
//   const filteredAuctions = data.filter(auction => {
//     return Object.values(auction).some(value =>
//       typeof value === 'string' && value.toLowerCase().includes(search.toLowerCase())
//     );
//   });
//   console.log(filteredAuctions)
//   return filteredAuctions;
// }
