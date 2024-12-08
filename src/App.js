import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeContext";
import './styles/main.css'
import ThemeSwitch from "./components/ThemeSwitch";
import Start from "./pages/Start";
import Home from './pages/Home'
import Settings from "./pages/Settings";
import Learn from "./pages/Learn"
import Quiz from './pages/Quiz'
import Manage from "./pages/Manage";
import { useState, useEffect } from "react";
import { QuizFetch } from "./components/Fetch";

function App() {
  const [lightBox, setLightBox] = useState(localStorage.getItem("lightBox") || { on: 0, color: [255, 255, 255] })
  const [quizName, setQuizName] = useState(null)
  const [reloadData, setReloadData] = useState(true)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await QuizFetch(quizName);
      if(fetchedData.status === 'error') {
        setError(fetchedData)
        setData(null);
      } else {
        setError(null)
        setData(fetchedData);
      }
    };
    if (quizName) {
      fetchData();
    }
  }, [quizName, reloadData]);

  // Dev-tools 
  function toggleDevTools() {
    if (window.getComputedStyle(document.querySelector('div.dev-tools')).display === 'block') {
      document.styleSheets[0].insertRule('div.dev-tools { display: none; }', document.styleSheets[0].cssRules.length);
      return "Dev Toolsy zostały wyłączone"
    } else {
      document.styleSheets[0].insertRule('div.dev-tools { display: block; }', document.styleSheets[0].cssRules.length);
      return "Dev Toolsy zostały włączone"
    }
  }
  useEffect(() => {
    window.toggleDevTools = toggleDevTools;
  }, []);
  // Dev-tools
  console.log(data)
  return (
    <ThemeProvider>
      <div className="container">
        <BrowserRouter basename="/quiz_2.0">
          <Routes>
            <Route path="/" element={<>
              <div className="dev-tools" style={{ left: 'unset' }}><div id="dev_tools" style={{ zoom: 0.6 }}><ThemeSwitch /></div>
              <button onClick={() => console.log(toggleDevTools())}>Wyłącz Dev-Toolsy</button>
              </div>
              <Outlet /></>}>
              <Route index element={<Start setData={setData} setError={setError} setQuizName={setQuizName}/>} />
              <Route path="/:quiz/home" element={<Home setQuizName={setQuizName} error={error} data={data}/>} />
              <Route path=":quiz/settings" element={<Settings lightBox={lightBox} setLightBox={setLightBox} />} />
              <Route path="/:quiz/learn" element={<Learn data={data} setQuizName={setQuizName} />} />
              <Route path="/:quiz/quiz" element={<Quiz data={data} setQuizName={setQuizName} lightBox={lightBox} />} />
              <Route path="/:quiz/manage" element={<Manage data={data} setQuizName={setQuizName} setReloadData={setReloadData} />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;