import './App.css'
import Map from './Map/components/Map'
import Home from './Home/components/Home'
import { Route, BrowserRouter, Routes } from "react-router-dom"
import { GlobalProvider } from "./GlobalPrompt";

function App() {

  return (
    <>
    <GlobalProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<Map />} />
      </Routes>
    </BrowserRouter>
    </GlobalProvider>
    </>
  )
}

export default App
