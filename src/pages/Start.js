import "../styles/Start.css"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SetTitle from "../components/SetTitle";
import { QuizzesListFetch } from "../components/Fetch";

const Start = (props) => {
  SetTitle('Start')
  const [quizzesList, setQuizzesList] = useState(null);
  const [error, setError] = useState(null);

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
        {quizzesList !== null ? quizzesList.data.map(item =>
          <Link className="confirm quiz" to={`${item.name}/home`}>{item.display_name}</Link>
        ) : null}
      </div>
    </div>
  );
}

export default Start;