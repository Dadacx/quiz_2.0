import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeContext";
import './styles/main.css'
import ThemeSwitch from "./components/ThemeSwitch";
import Home from './pages/Home'
import Settings from "./pages/Settings";
import Learn from "./pages/Learn"
import Quiz from './pages/Quiz'
import Fetch from "./components/Fetch";

function App() {
  let data = Fetch()

  return (
    <ThemeProvider>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<>
              <div className="debug" style={{ position: "absolute", left: "20%", zoom: 0.6 }}><ThemeSwitch /></div>
              <Outlet /></>}>
              <Route index element={<Home />} />
              <Route path="settings" element={<Settings />} />
              <Route path="learn" element={<Learn data={data} />} />
              <Route path="quiz" element={<Quiz data={data} />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;