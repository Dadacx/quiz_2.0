import "../styles/Home.css"
import { Link } from "react-router-dom";
import ThemeSwitch from '../components/ThemeSwitch'
import SetTitle from "../components/SetTitle";
import { useParams } from 'react-router-dom';

const Home = (props) => {
  SetTitle('Home')
  const { dane } = useParams(); // Wyciągamy parametr z URL
  return (
    <div className="box">
      <p>Otrzymane dane: {dane}</p>
      {/* <ThemeSwitch /> */}
        <p className="menu">MENU</p>
        <Link className="confirm" to="/learn">UCZ SIĘ</Link>
        <Link className="confirm" to="/quiz">QUIZ</Link>
        <Link className="confirm" to="/settings">USTAWIENIA</Link>
    </div>
  );
}

export default Home;