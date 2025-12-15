import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "/Users/sofyanalam/mirascope-app/src/styling/App.css";

const root = createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <App/>
  </StrictMode>
)