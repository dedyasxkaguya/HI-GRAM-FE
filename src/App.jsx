import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './assets/pages/Home'
import Post from './assets/pages/Post'
import Login from './assets/pages/Login'
import Register from './assets/pages/Register'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/post/:post' element={<Post/>}></Route>
      {/* WITH ACCOUNT */}
      <Route path='/:uuid' element={<Home/>}></Route>
      <Route path='/:uuid/post/:post' element={<Post/>}></Route>
    </Routes>
  )
}

export default App