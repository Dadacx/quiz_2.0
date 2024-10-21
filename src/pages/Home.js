import "../styles/Home.css"
import { Link } from "react-router-dom";
import ThemeSwitch from '../components/ThemeSwitch'

const Home = (props) => {
  return (
    <div className="box">
      <ThemeSwitch />
        <p className="menu">MENU</p>
        <Link className="confirm" to="/quiz_2.0/learn">UCZ SIĘ</Link>
        <Link className="confirm" to="/quiz_2.0/quiz">QUIZ</Link>
        {/*<Link className="confirm" to="/quiz_2.0/settings">USTAWIENIA</Link>*/}
    </div>
  );
}

export default Home;