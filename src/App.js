import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeContext";
import './styles/main.css'
import ThemeSwitch from "./components/ThemeSwitch";
import Home from './pages/Home'
import Settings from "./pages/Settings";
import Learn from "./pages/Learn"
import Quiz from './pages/Quiz'
import Fetch from "./components/Fetch";
import { useState } from "react";

function App() {
  const [lightBox, setLightBox] = useState(localStorage.getItem("lightBox") || {on: 0, color: [255,255,255]})
  let data = Fetch()

  return (
    <ThemeProvider>
      <div className="container">
        <BrowserRouter basename="/quiz_2.0">
          <Routes>
            <Route path="/" element={<>
              <div className="dev-tools" style={{left: 'unset'}}><div style={{zoom:0.6}}><ThemeSwitch /></div></div>
              <Outlet /></>}>
              <Route index element={<Home />} />
              <Route path="/settings" element={<Settings lightBox={lightBox} setLightBox={setLightBox} />} />
              <Route path="/learn" element={<Learn data={data} />} />
              <Route path="/quiz" element={<Quiz data={data} />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;