import "./App.css";
import Map from "./Map/components/Map";
import Home from "./Home/components/Home";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { GlobalProvider } from "./GlobalPrompt";

function App() {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <div className="App">
          <Routes>
            <Route index element={<Home />} />
            <Route path="app" element={<Map />} />
          </Routes>
        </div>
      </GlobalProvider>
    </BrowserRouter>
  );
}

export default App;
