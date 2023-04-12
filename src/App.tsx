import "./App.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Navbar from "./components/Navbar";
import videoBackground from "./assets/videos/CosmosVideoBackgrounds.mp4";
import HeroSection from "./components/HeroSection";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CharacterDetails from "./components/CharacterDetails";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <video autoPlay loop muted src={videoBackground}></video>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/character" element={<CharacterDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
