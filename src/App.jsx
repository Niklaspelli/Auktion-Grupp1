import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom'
import './App.css'
import MyNav from './components/nav/MyNav'
import AuctionHome from './components/AuctionHome';
import AuctionPast from './components/AuctionPast';
import AuctionDetails from './components/AuctionDetails';

function App() {
  

  return (
    <>
    <MyNav />
    <Routes>

        <Route path="/" element={<AuctionHome/>} />
        <Route path="/notcurrent" element={<AuctionPast/>} />
        <Route path="/auction-details/:id" element={<AuctionDetails />} />

    </Routes>
    </>
  )
}

export default App