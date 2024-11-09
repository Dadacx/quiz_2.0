import "../styles/Start.css"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SetTitle from "../components/SetTitle";
import { QuizzesListFetch } from "../components/Fetch";

const Start = (props) => {
  SetTitle('Start')
  const [quizzesList, setQuizzesList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await QuizzesListFetch();
      setQuizzesList(fetchedData);
    };
    fetchData();
  }, []);
  return (
    <div className="box quizzes-list-box">
      <p className="menu">Wybierz quiz</p>
      <div className="quizzes-list">
        <Link className="confirm quiz" to="/home">HOME</Link>
        <Link className="confirm quiz" to="/home">HOMghgfhfnds  giudgfjdggn sdfgnsfghf g g shg dgngE</Link>
        <Link className="confirm quiz" to="/home">HOME</Link>
        <Link className="confirm quiz" to="/home">Jakaś testowa nazwa quizu</Link>
        <Link className="confirm quiz" to="/home">HOME</Link>
        <Link className="confirm quiz" to="/home">HOME</Link>
        <Link className="confirm quiz" to="/home">HOME</Link>
        <Link className="confirm quiz" to="/home">HOME</Link>
        <Link className="confirm quiz" to="/home">HOME</Link>
      </div>
    </div>
  );
}

export default Start;