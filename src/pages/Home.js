import "../styles/Home.css"
import { Link } from "react-router-dom";
import ThemeSwitch from '../components/ThemeSwitch'
import SetTitle from "../components/SetTitle";

const Home = (props) => {
  SetTitle('Home')
  return (
    <div className="box">
      <ThemeSwitch />
        <p className="menu">MENU</p>
        <Link className="confirm" to="/learn">UCZ SIĘ</Link>
        <Link className="confirm" to="/quiz">QUIZ</Link>
        <Link className="confirm" to="/settings">USTAWIENIA</Link>
    </div>
  );
}

export default Home;