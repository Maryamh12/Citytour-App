import { useState } from 'react'
import { Link, Routes, Route } from 'react-router-dom'

import './App.css'
import Main from './components/Main'
import Navbar from './components/Navbar'
import Footer from './components/Footer' 
import Login from  './components/Login' 
import Register from './components/Register'
import Tourbrows from './components/Tourbrows'
import CreatStory from './components/CreatStory'
import UpdateStory from './components/UpdateStory'
function App() {
  const [count, setCount] = useState(false)
  const [fetchingComment , setFetchingComment] = useState(false);

  return (
    <div className="App">
      <div className={count ? "backgroundContainer" : "noBackground"}>
     <Navbar count={count} setCount={setCount}/>
     <Routes>
      <Route path='/' element={<Main count={count} setCount={setCount}/>}/>
      <Route path='/login' element={<Login count={count} setCount={setCount}/>}/>
      <Route path='/Register' element={<Register count={count} setCount={setCount}/>}/>
      <Route path='/tourbrows' element={<Tourbrows count={count} setCount={setCount}  fetchingComment={fetchingComment} setFetchingComment={setFetchingComment}/>}/>
      <Route path='/createstory/:id' element={<CreatStory count={count} setCount={setCount} fetchingComment={fetchingComment} setFetchingComment={setFetchingComment}/>}/>
      <Route path='/story/:cityId/:storyId' element={<UpdateStory count={count} setCount={setCount} fetchingComment={fetchingComment} setFetchingComment={setFetchingComment}/>}/>
     </Routes>
     </div>
     <Footer/>
     
    </div>
  )
}

export default App;
