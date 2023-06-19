import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Pokemons from './pages/Pokemons';
import Owned from "./pages/Owned";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pokemons />} />
        <Route path="/owned" element={<Owned />} />
      </Routes>
    </Router>
  )
}

export default App;
