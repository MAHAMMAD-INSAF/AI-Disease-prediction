import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// Ensure Leaflet CSS and default icons are configured before any map mounts
import './setupLeaflet'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
