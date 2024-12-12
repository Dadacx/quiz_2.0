import "../styles/Learn.css"
import LernTable from "../components/LearnTable";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loading, calculatePercent, randomizeQuestions, progressBarText } from "../components/Functions";
import { useConfig } from '../components/ConfigContext';
import SetTitle from "../components/SetTitle";
import { useParams } from 'react-router-dom';

function Loaded(props) {
  const { config, setConfig } = useConfig()
  var percent = calculatePercent(props.index, props.data.answers.length - 1,4)
  return (
    <div className="box" onClick={() => props.ChangeOdpVisibility('visible')}>
      {props.index < props.data.answers.length ? <div className="progress-bar">
        <div className="progress" style={{ width: percent + '%' }}> {progressBarText(config.progressBar.display,props.index + 1,props.data.answers.length,percent)} </div>
      </div> : null}
      <p className="lern" id="lern">{props.index < props.data.answers.length ? props.data.questions[props.index] : "KONIEC"}</p>
      <p className="odp_lern" id="odp_lern" style={{ visibility: props.OdpVisibility }}>{props.index < props.data.answers.length ? props.data.answers[props.index] : ''}</p>
    </div>
  )
}
const Learn = (props) => {
  SetTitle('Ucz się')
  const { config, setConfig } = useConfig()
  const [TableVisibility, ChangeTableVisibility] = useState("hidden")
  const [index, changeIndex] = useState(0)
  const [answerVisibility, ChangeAnswerVisibility] = useState("hidden")
  const [data, setData] = useState(null)
  const [tableData, setTableData] = useState(null)
  const { quiz } = useParams(); // Wyciągamy parametr z URL

  useEffect(() => {
    props.setQuizName(quiz)
  }, [quiz]);
  useEffect(() => {
    const handleKeyUp = (e) => {
      if (config.hotkeys.showAnswer.includes(e.code)) {
        ChangeAnswerVisibility('visible');
      }
      if (config.hotkeys.next.includes(e.code)) {
        changeQuestion(1); // Odwołuje się do aktualnej wersji changeQuestion
      }
      if (config.hotkeys.previous.includes(e.code)) {
        changeQuestion(-1);
      }
    };
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [data]); // Dodaj odpowiednie zależności

  function changeQuestion(value) {
    if (data) {
      ChangeAnswerVisibility("hidden")
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
  if (props.data && props.data.status === 'success' && !data) {
    setTableData(props.data)
    var questions = []
    var answers = []
    props.data.quiz.map(item => {
      questions.push(item.question)
      answers.push(item.answer)
    })
    setData(randomizeQuestions({
      questions: questions,
      answers: answers
    }))
    console.log(props.data)
  }
  function changeLimit() {
    const from = document.querySelector("#from").value ? document.querySelector("#from").value - 1 : 0
    const to = document.querySelector("#to").value ? document.querySelector("#to").value - 1 : data.answers.length - 1

    const slicedData = props.data.quiz.slice(from, to + 1);
    const result = {
      questions: slicedData.map((item) => item.question),
      answers: slicedData.map((item) => item.answer)
    };
    setTableData((prevData) => ({
      ...prevData,
      quiz: slicedData,
    }))
    changeIndex(0);
    setData(randomizeQuestions(result))
    console.log(from,to)
  }
  return (<>
    <form className="limit" onSubmit={(e) => { e.preventDefault() }}>
      <input type="number" className="limit" id="from" placeholder="Od"/> <span>-</span> <input type="number" className="limit" id="to" placeholder="Do"/>
      <button style={{marginLeft: '10px'}} onClick={changeLimit}>Potwierdź</button>
    </form>
    <div className="dev-tools">
      <input type="number" value={index} max={data ? data.answers.length : 0} min={0} onChange={(e) => changeIndex(parseInt(e.target.value))}></input>
    </div>
    <LernTable data={tableData} TableVisibility={TableVisibility} ChangeTableVisibility={ChangeTableVisibility} />
    {data ? <Loaded data={data} index={index} OdpVisibility={answerVisibility} ChangeOdpVisibility={ChangeAnswerVisibility} /> : <Loading />}

    {(data && index < data.answers.length) ? <div className="next_prev_btns"><button className="confirm" id="next" onClick={() => changeQuestion(1)}>NASTĘPNY {">>"}</button>
      <button className="confirm" id="previous" onClick={() => changeQuestion(-1)}>{"<<"} POPRZEDNI</button></div> : null}

    {(data && index === data.answers.length) ? <button className="confirm" onClick={() => { changeIndex(0); setData(randomizeQuestions(data)) }}>JESZCZE RAZ</button> : null}
    <button className="confirm" id="list" onClick={() => ChangeTableVisibility("visible")}>LISTA PYTAŃ I ODPOWIEDZI</button>
    {(data && index === data.answers.length) ? <Link className="confirm" to={`/${quiz}/quiz`}>ROZWIĄŻ QUIZ</Link> : null}
    <Link className="confirm" id="menu" to={`/${quiz}/home`}>WRÓĆ DO MENU</Link>
  </>
  );
}

export default Learn;