import "../styles/Home.css"
import { Link } from "react-router-dom";
import SetTitle from "../components/SetTitle";
import { useParams } from 'react-router-dom';
import { Loading } from "../components/Functions";
import ArrowLeftIcon from '../components/ArrowLeftIcon'
import { useEffect } from "react";

const Home = ({ setQuizName, error, data }) => {
  SetTitle('Home')
  const { quiz } = useParams(); // Wyciągamy parametr z URL
  useEffect(() => {
    setQuizName(quiz)
  }, []);
  return (
    <>
    {(!error && !data) ? <Loading /> :
      <div className="box">
        <Link className="arrow_back" title="Wybierz inny quiz" to="/">
          <ArrowLeftIcon width={40} height={40} color="var(--text_color)" />
        </Link>
        <p className="menu">Wybrany quiz: {!error ? data?.display_name : error?.display_name}</p>
        {!error && data ? <><Link className="confirm" to={`/${quiz}/learn`} style={{ marginTop: 'inherit' }}>UCZ SIĘ</Link>
          <Link className="confirm" to={`/${quiz}/quiz`}>QUIZ</Link>
          <Link className="confirm" to={`/${quiz}/settings`}>USTAWIENIA</Link>
          <Link className="confirm" to={`/${quiz}/manage`}>ZARZĄDZAJ QUIZEM</Link></> :
          error ? <p className="error">{error.message}</p> : null}
      </div>}</>
  );
}

export default Home;