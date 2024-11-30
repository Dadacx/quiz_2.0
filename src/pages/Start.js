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
    props.setData(null)
    props.setError(null)
    props.setQuizName(null)
    const fetchData = async () => {
      const fetchedData = await QuizzesListFetch();
      console.log(fetchedData)
      if(fetchedData.status === 'error') {
        setError(fetchedData.message)
        setQuizzesList(null);
      } else {
        setError(null)
        setQuizzesList(fetchedData);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="box quizzes-list-box">
      <p className="menu">Wybierz quiz</p>
      <div className="quizzes-list">
        {quizzesList ? quizzesList.data.map(item =>
          <Link key={item.id} className="confirm quiz" to={`${item.name}/home`}>{item.display_name}</Link>
        ) : <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default Start;