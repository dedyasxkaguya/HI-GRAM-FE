import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './assets/pages/Home'
import Post from './assets/pages/v2/Post'
import Login from './assets/pages/Login'
import Register from './assets/pages/Register'
import Search from './assets/pages/Search'
import Trending from './assets/pages/Trending'
import Profile from './assets/pages/v2/Profile'
import Userfollow from './assets/pages/v2/Userfollow'
import Create from './assets/pages/v2/Create'
import Userprofile from './assets/pages/v2/Userprofile'
import Update from './assets/pages/Update'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/:name' element={<Userprofile/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>
      <Route path='/update' element={<Update/>}></Route>
      <Route path='/create' element={<Create/>}></Route>
      <Route path='/profile/follow' element={<Userfollow/>}></Route>
      {/* <Route path='/profile/:type' element={<Userfollow/>}></Route> */}
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/search' element={<Search/>}></Route>
      <Route path='/trending' element={<Trending/>}></Route>
      <Route path='/post/:post' element={<Post/>}></Route>
      {/* WITH ACCOUNT */}
      {/* <Route path='/:uuid/home' element={<Home/>}></Route>
      <Route path='/:uuid/profile' element={<Profile/>}></Route>
      <Route path='/:uuid/search' element={<Search/>}></Route>
      <Route path='/:uuid/trending' element={<Trending/>}></Route>
      <Route path='/:uuid/post/:post' element={<Post/>}></Route> */}
    </Routes>
  )
}

export default App