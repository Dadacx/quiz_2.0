import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeContext";
import './styles/main.css'
import ThemeSwitch from "./components/ThemeSwitch";
import Home from './pages/Home'
import Settings from "./pages/Settings";
import Learn from "./pages/Learn"
import Quiz from './pages/Quiz'
import Page2 from './pages/Page2'
import Fetch from "./components/Fetch";

function App() {
  let data = Fetch()

  return (
    <ThemeProvider>
    <div className="container">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<>
        <div style={{ position: "absolute", left: "20%", zoom:0.6 }}><ThemeSwitch /></div>
        <Outlet /></>}>
          <Route index element={<Home />} />
          <Route path="settings" element={<Settings />} />
          <Route path="learn" element={<Learn data={data}/>} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="page2" element={<Page2 />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
    </ThemeProvider>
  );
}

export default App;