import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './assets/pages/Home'
import Post from './assets/pages/Post'
import Login from './assets/pages/Login'
import Register from './assets/pages/Register'
import Search from './assets/pages/Search'
import Trending from './assets/pages/Trending'
import Profile from './assets/pages/Profile'
const App = () => {
  return (
    <Routes>
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/search' element={<Search/>}></Route>
      <Route path='/trending' element={<Trending/>}></Route>
      <Route path='/post/:post' element={<Post/>}></Route>
      {/* WITH ACCOUNT */}
      <Route path='/:uuid/home' element={<Home/>}></Route>
      <Route path='/:uuid/profile' element={<Profile/>}></Route>
      <Route path='/:uuid/search' element={<Search/>}></Route>
      <Route path='/:uuid/trending' element={<Trending/>}></Route>
      <Route path='/:uuid/post/:post' element={<Post/>}></Route>
    </Routes>
  )
}

export default App