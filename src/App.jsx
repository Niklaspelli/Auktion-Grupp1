import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom'
import './App.css'
import MyNav from './components/nav/MyNav'
import NewAuktion from './components/newAuktion';
import AuctionHome from './components/AuctionHome';
import AuctionPast from './components/AuctionPast';
import AuctionDetails from './components/AuctionDetails';


function App() {
  

  return (
    <>
    <MyNav />
    <Routes>
       <Route path="/NewAuktion" element={<NewAuktion/>} />
        <Route path="/" element={<AuctionHome/>} />
        <Route path="/notcurrent" element={<AuctionPast/>} />
        <Route path="/auctiondetails/:id" element={<AuctionDetails />} />

    </Routes>
    </>
  )
}

export default App