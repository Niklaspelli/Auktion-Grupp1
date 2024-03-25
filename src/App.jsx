import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom'
import './App.css'
import MyNav from './components/nav/MyNav'
import AuctionHome from './components/AuctionHome';
import AuctionPast from './components/AuctionPast';
import AuctionDetails from './components/AuctionDetails';
import AuctionCreate from './components/AuctionCreate';
import AuctionFuture from './components/AuctionFuture';

function App() {
  

  return (
    <>
    <MyNav />
    <Routes>
        <Route path="/newauction" element={<AuctionCreate/>} />
        <Route path="/" element={<AuctionHome/>} />
        <Route path="/notcurrent" element={<AuctionPast/>} />
        <Route path="/future" element={<AuctionFuture />} />
        <Route path="/auctiondetails/:id" element={<AuctionDetails />} />
    </Routes>
    </>
  )
}

export default App