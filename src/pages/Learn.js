import "../styles/Learn.css"
import LernTable from "../components/LearnTable";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Loading, calculatePercent, isDataLoaded, randomizeQuestions } from "../components/Functions";
import SetTitle from "../components/SetTitle";

function Loaded(props) {
  const percent = calculatePercent(props.index, props.data.answers.length - 1)
  return (
    <div className="box" onClick={() => props.ChangeOdpVisibility('visible')}>
      {props.index < props.data.answers.length ? <div className="progress-bar">
        <div className="progress" style={{width:percent+'%'}}> Pytanie: {props.index + 1}/{props.data.answers.length}{" (" + percent + "%) "}</div>
      </div> : null}
      <p className="lern" id="lern">{props.index < props.data.answers.length ? props.data.questions[props.index] : "KONIEC"}</p>
      <p className="odp_lern" id="odp_lern" style={{ visibility: props.OdpVisibility }}>{props.index < props.data.answers.length ? props.data.answers[props.index] : ''}</p>
    </div>
  )
}

const Learn = (props) => {
  SetTitle('Ucz się')
  const [TableVisibility, ChangeTableVisibility] = useState("hidden")
  const [index, changeIndex] = useState(0)
  const [OdpVisibility, ChangeOdpVisibility] = useState("hidden")
  const [data, setData] = useState({})
  function changeQuestion(value) {
    if (isDataLoaded(data)) {
      ChangeOdpVisibility("hidden")
      changeIndex((index) => {
        const newIndex = index + value;
        if (newIndex < 0) {
          return 0;
        } else if (newIndex >= data.answers.length) {
          return data.answers.length;
        } else {
          return newIndex;
        }
      });
    }
  }

  // if (isDataLoaded(props.data) && data.odp === undefined) {
  //   setData(randomizeQuestions(props.data))
  // }
  if (props.data.status === 'success') {
    var questions = []
    var answers = []
    props.data.quiz.map(item => {
      questions.push(item.question)
      answers.push(item.answer)
    })
    console.log(questions,answers)
    // setData(randomizeQuestions(props.data))
  }
  return (<>
    <div className="dev-tools">
    <input type="number" value={index} max={isDataLoaded(data) ? data.answers.length : 0} min={0} onChange={(e) => changeIndex(parseInt(e.target.value))}></input>
    </div>
    <LernTable data={props.data} TableVisibility={TableVisibility} ChangeTableVisibility={ChangeTableVisibility} />
    {isDataLoaded(data) ? <Loaded data={data} index={index} OdpVisibility={OdpVisibility} ChangeOdpVisibility={ChangeOdpVisibility} /> : <Loading />}

    {(isDataLoaded(data) && index < data.answers.length) ? <div className="next_prev_btns"><button className="confirm" id="next" onClick={() => changeQuestion(1)}>NASTĘPNY {">>"}</button>
      <button className="confirm" id="previous" onClick={() => changeQuestion(-1)}>{"<<"} POPRZEDNI</button></div> : null}

    {(isDataLoaded(data) && index === data.answers.length) ? <button className="confirm" onClick={() => { changeIndex(0); setData(randomizeQuestions(data)) }}>JESZCZE RAZ</button> : null}
    <button className="confirm" id="list" onClick={() => ChangeTableVisibility("visible")}>LISTA PYTAŃ I ODPOWIEDZI</button>
    {(isDataLoaded(data) && index === data.answers.length) ? <Link className="confirm" to="/quiz">ROZWIĄŻ QUIZ</Link> : null}
    <Link className="confirm" id="menu" to="/home">WRÓĆ DO MENU</Link>
  </>
  );
}

export default Learn;