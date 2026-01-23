import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import './scss/styles.scss'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap'
// import 'bootstrap-icons'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
