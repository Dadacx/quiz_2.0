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
  const [lightBox, setLightBox] = useState(localStorage.getItem("lightBox") || { on: 0, color: [255, 255, 255] })
  let data = Fetch()

  // Dev-tools 
  if (document.getElementById('dev_tools') !== null) {
    const button = document.getElementById('dev_tools');
    button.addEventListener('mousedown', startHold);
    button.addEventListener('mouseup', cancelHold);
    button.addEventListener('mouseleave', cancelHold);
    button.addEventListener('touchstart', startHold);
    button.addEventListener('touchend', cancelHold);
  }
  let holdTimeout; // Zmienna do przechowywania timeoutu
  function onHoldComplete() {
    if(window.getComputedStyle(document.querySelector('div.dev-tools')).display === 'block') {
      document.styleSheets[0].insertRule('div.dev-tools { display: none; }', document.styleSheets[0].cssRules.length);
    } else {
      document.styleSheets[0].insertRule('div.dev-tools { display: block; }', document.styleSheets[0].cssRules.length);
    }
    alert("Przycisk był trzymany przez 5 sekund!");
  }
  function startHold() {
    holdTimeout = setTimeout(onHoldComplete, 5000);
  }
  function cancelHold() {
    clearTimeout(holdTimeout);
  }
  // Dev-tools

  return (
    <ThemeProvider>
      <div className="container">
        <BrowserRouter basename="/quiz_2.0">
          <Routes>
            <Route path="/" element={<>
              <div className="dev-tools" style={{ left: 'unset' }}><div id="dev_tools" style={{ zoom: 0.6 }}><ThemeSwitch /></div></div>
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