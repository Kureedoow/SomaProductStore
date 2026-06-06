
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import {BrowserRouter} from 'react-router-dom'
createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <BrowserRouter>
    <ChakraProvider>
      <App />
    </ChakraProvider>
      </BrowserRouter>
  </React.StrictMode>,
)
