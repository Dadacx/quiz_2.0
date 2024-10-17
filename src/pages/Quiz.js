import '../styles/Quiz.css'
import { useState } from "react";
import { Link } from "react-router-dom";
import { Loading, calculatePercent, isDataLoaded, randomizeQuestions } from "../components/Functions";

function Loaded(props) {
  const [showAnswer, setShowAnswer] = useState(false)
  const percent = calculatePercent(props.index, props.data)
  return (
    <div className="box">
      {props.index < props.data.odp.length ? <div className="progress-bar">
        <div className="progress" style={{width:percent}}> Pytanie: {props.index + 1}/{props.data.odp.length}{" (" + percent + ") "}</div>
      </div> : null}
      <p className="pytanie">{props.index < props.data.odp.length ? props.data.pytania[props.index] : null}</p>
      <p className={showAnswer ? 'odp_active' : 'odp'} style={{ visibility: props.isCorrect ? 'hidden' : 'visible' }} 
         onClick={() => setShowAnswer(true)}>{showAnswer ? props.data.odp[props.index] : 'Pokaż poprawną odpowiedź'}</p>
    </div>
  )
}

const Quiz = (props) => {
  const [index, changeIndex] = useState(0)
  const [data, setData] = useState({})
  const [isCorrect, setIsCorrect] = useState(false)

  if (isDataLoaded(props.data) && data.odp === undefined) {
    setData(randomizeQuestions(props.data))
  }
    return (<>
      <input className="debug" type="number" value={index} max={isDataLoaded(data) ? data.odp.length : 100} min={0} onChange={(e) => changeIndex(parseInt(e.target.value))}></input>
    {isDataLoaded(data) ? <Loaded data={data} index={index} isCorrect={isCorrect} /> : <Loading />}
    <Link className="confirm" id="menu" to="/">WRÓĆ DO MENU</Link>
    </>);
  }
  
  export default Quiz;