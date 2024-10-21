import "../styles/Learn.css"
import LernTable from "../components/LearnTable";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Loading, calculatePercent, isDataLoaded, randomizeQuestions } from "../components/Functions";

function Loaded(props) {
  const percent = calculatePercent(props.index, props.data.odp.length - 1)
  return (
    <div className="box" onClick={() => props.ChangeOdpVisibility('visible')}>
      {props.index < props.data.odp.length ? <div className="progress-bar">
        <div className="progress" style={{width:percent+'%'}}> Pytanie: {props.index + 1}/{props.data.odp.length}{" (" + percent + "%) "}</div>
      </div> : null}
      <p className="lern" id="lern">{props.index < props.data.odp.length ? props.data.pytania[props.index] : "KONIEC"}</p>
      <p className="odp_lern" id="odp_lern" style={{ visibility: props.OdpVisibility }}>{props.index < props.data.odp.length ? props.data.odp[props.index] : ''}</p>
    </div>
  )
}

const Learn = (props) => {
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
        } else if (newIndex >= data.odp.length) {
          return data.odp.length;
        } else {
          return newIndex;
        }
      });
    }
  }

  if (isDataLoaded(props.data) && data.odp === undefined) {
    setData(randomizeQuestions(props.data))
  }
  return (<>
    <input className="debug" type="number" value={index} max={isDataLoaded(data) ? data.odp.length : 100} min={0} onChange={(e) => changeIndex(parseInt(e.target.value))}></input>
    <LernTable data={props.data} TableVisibility={TableVisibility} ChangeTableVisibility={ChangeTableVisibility} />
    {isDataLoaded(data) ? <Loaded data={data} index={index} OdpVisibility={OdpVisibility} ChangeOdpVisibility={ChangeOdpVisibility} /> : <Loading />}

    {(isDataLoaded(data) && index < data.odp.length) ? <div className="next_prev_btns"><button className="confirm" id="next" onClick={() => changeQuestion(1)}>NASTĘPNY {">>"}</button>
      <button className="confirm" id="previous" onClick={() => changeQuestion(-1)}>{"<<"} POPRZEDNI</button></div> : null}

    {(isDataLoaded(data) && index === data.odp.length) ? <button className="confirm" onClick={() => { changeIndex(0); setData(randomizeQuestions(data)) }}>JESZCZE RAZ</button> : null}
    <button className="confirm" id="list" onClick={() => ChangeTableVisibility("visible")}>LISTA PYTAŃ I ODPOWIEDZI</button>
    {(isDataLoaded(data) && index === data.odp.length) ? <Link className="confirm" to="/quiz_2.0/quiz">ROZWIĄŻ QUIZ</Link> : null}
    <Link className="confirm" id="menu" to="/quiz_2.0/">WRÓĆ DO MENU</Link>
  </>
  );
}

export default Learn;