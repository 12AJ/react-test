import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ListPage from './listPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ListPage/>
  </StrictMode>,
)
