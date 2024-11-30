
import { Link } from "react-router-dom";
import SetTitle from "../components/SetTitle";
import { useParams } from 'react-router-dom';
import ArrowLeftIcon from '../components/ArrowLeftIcon'
import EditQuiz from "../components/EditQuiz";
import { useEffect, useState } from "react";

const Manage = ({ data, setQuizName, setReloadData }) => {
  SetTitle('Zarządzaj')
  const { quiz } = useParams(); // Wyciągamy parametr z URL
  useEffect(() => {
    setQuizName(quiz)
  }, []);
  // const [mode,setMode] = useState(null)
  // var component
  // switch (mode) {
  //   case 'edit':
  //     component = <EditQuiz data={data} setMode={setMode} setReloadData={setReloadData} />
  //     break;
  //   default:
  //     break;
  // }
  return (
    <EditQuiz data={data} setReloadData={setReloadData} quiz={quiz} />
    // <>
    // {component}
    // <div className="box">
    //     <Link className="arrow_back" to={`/${quiz}/home`}><ArrowLeftIcon width={40} height={40} color="var(--text_color)" /></Link>
    //     <button className="confirm" onClick={() => setMode('edit')}>Edytuj pytania</button>
    //   </div>
    //   </>
  );
}

export default Manage;