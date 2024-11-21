import "../styles/Home.css"
import { Link } from "react-router-dom";
import SetTitle from "../components/SetTitle";
import { useParams } from 'react-router-dom';

import ArrowLeftIcon from '../components/ArrowLeftIcon'

const Home = ({ setQuizName, error }) => {
  SetTitle('Home')
  const { quiz } = useParams(); // Wyciągamy parametr z URL
  setQuizName(quiz)
  return (
    <div className="box">
      <Link className="arrow_back" title="Wybierz inny quiz" to="/"><ArrowLeftIcon width={40} height={40} color="var(--text_color)" /></Link>
      {/* <p className="menu">MENU</p> */}
      <p className="menu">Wybrany quiz: {quiz}</p>
      {!error ? <><Link className="confirm" to={`/${quiz}/learn`}>UCZ SIĘ</Link>
      <Link className="confirm" to={`/${quiz}/quiz`}>QUIZ</Link>
      <Link className="confirm" to={`/${quiz}/settings`}>USTAWIENIA</Link></> : 
      <p className="error">{error}</p>}
    </div>
  );
}

export default Home;