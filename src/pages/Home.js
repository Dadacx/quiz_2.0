import "../styles/Home.css"
import { Link } from "react-router-dom";
import { useEffect } from "react";
import ThemeSwitch from '../components/ThemeSwitch'
import SetTitle from "../components/SetTitle";
import { QuizFetch } from "../components/Fetch";
import { useParams } from 'react-router-dom';

const Home = ({ setData}) => {
  SetTitle('Home')
  const { quiz } = useParams(); // Wyciągamy parametr z URL
  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await QuizFetch(quiz);
      setData(fetchedData);
    };
    fetchData();
  }, []);
  return (
    <div className="box">
      <p>Otrzymane dane: {quiz}</p>
      {/* <ThemeSwitch /> */}
        <p className="menu">MENU</p>
        <Link className="confirm" to="/learn">UCZ SIĘ</Link>
        <Link className="confirm" to="/quiz">QUIZ</Link>
        <Link className="confirm" to="/settings">USTAWIENIA</Link>
    </div>
  );
}

export default Home;