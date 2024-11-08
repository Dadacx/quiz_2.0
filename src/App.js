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
import TestFetch from "./components/TestFetch";

function App() {
  const [lightBox, setLightBox] = useState(localStorage.getItem("lightBox") || { on: 0, color: [255, 255, 255] })
  let data = Fetch()

  TestFetch()

  // Dev-tools 
  if (document.querySelector('div.container') !== null) {
    //   const button = document.querySelector('div.container')
    //   button.addEventListener('click', startClicking);
    // }
    // let clickCount = 0;
    // let timer
    // function onClickingComplete() {
    //   if (window.getComputedStyle(document.querySelector('div.dev-tools')).display === 'block') {
    //     document.styleSheets[0].insertRule('div.dev-tools { display: none; }', document.styleSheets[0].cssRules.length);
    //     alert("Dev Toolsy zostały wyłączone");
    //   } else {
    //     document.styleSheets[0].insertRule('div.dev-tools { display: block; }', document.styleSheets[0].cssRules.length);
    //     alert("Dev Toolsy zostały włączone");
    //   }
    // }
    // function startClicking() {
    //   clickCount++;
    //   if (clickCount === 1) {
    //     timer = setTimeout(() => {
    //       clickCount = 0;
    //     }, 5000);
    //   }
    //   if (clickCount === 5) {
    //     onClickingComplete()
    //     clickCount = 0;
    //     clearTimeout(timer);
    //   }
    // Pobieramy przycisk z dokumentu (załóżmy, że ma id="button")
    const button = document.querySelector('div.container')
    let holdTimeout; // Zmienna do przechowywania timeoutu

    // Funkcja, która zostanie wywołana po 5 sekundach przytrzymania przycisku
    function onHoldComplete() {
      if (window.getComputedStyle(document.querySelector('div.dev-tools')).display === 'block') {
            document.styleSheets[0].insertRule('div.dev-tools { display: none; }', document.styleSheets[0].cssRules.length);
            alert("Dev Toolsy zostały wyłączone");
          } else {
            document.styleSheets[0].insertRule('div.dev-tools { display: block; }', document.styleSheets[0].cssRules.length);
            alert("Dev Toolsy zostały włączone");
          }
    }

    button.addEventListener('mousedown', startHold);
    button.addEventListener('mouseup', cancelHold);
    button.addEventListener('mouseleave', cancelHold);
    button.addEventListener('touchstart', startHold);
    button.addEventListener('touchend', cancelHold);
    
    function startHold() {
      holdTimeout = setTimeout(onHoldComplete, 5000);
    }
    
    function cancelHold() {
      clearTimeout(holdTimeout);
    }
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