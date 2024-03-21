import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom'
import './App.css'
import MyNav from './components/nav/MyNav'
import NewAuktion from './components/newAuktion';
import AuctionHome from './components/AuctionHome';
import AuctionPast from './components/AuctionPast';
import AuctionDetails from './components/AuctionDetails';
import Fetch_useEfftct2 from './components/Fetch_useEfftct2';



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

  const [searchTerm, setSearchTerm]= Fetch_useEfftct2('');

  const handleSearch = (term) =>{
    setSearchTerm(term);

  <div>
  <MyNav onSearch={handleSearch} />
    <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/props' element={<Props_page/>}/>
     <Route 
     path='/useeffect' 
     element={<UseEffect_Page searchTerm={searchTerm}/>}
     />
     <Route path='/todo' element={<TodoList_Page/>}/>
     <Route path='/meal' element={<Meal_Page searchTerm={searchTerm}/>}/>
     <Route path="/meal-details/:mealId" element={<MealDetails />} />
    </Routes>

  </div>
  }


export default App