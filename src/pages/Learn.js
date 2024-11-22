import "../styles/Learn.css"
import LernTable from "../components/LearnTable";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loading, calculatePercent, randomizeQuestions } from "../components/Functions";
import SetTitle from "../components/SetTitle";
import { useParams } from 'react-router-dom';

function Loaded(props) {
  const percent = calculatePercent(props.index, props.questionsCount - 1)
  return (
    <div className="box" onClick={() => props.ChangeAnswerVisibility('visible')}>
      {props.index < props.questionsCount ? <div className="progress-bar">
        <div className="progress" style={{ width: percent + '%' }}> Pytanie: {props.index + 1}/{props.questionsCount}{" (" + percent + "%) "}</div>
      </div> : null}
      <p className="lern" id="lern">{props.index < props.questionsCount ? props.data.questions[props.index] : "KONIEC"}</p>
      <p className="odp_lern" id="odp_lern" style={{ visibility: props.OdpVisibility }}>{props.index < props.questionsCount ? props.data.answers[props.index] : ''}</p>
    </div>
  )
}
const Learn = (props) => {
  SetTitle('Ucz się')
  const [TableVisibility, ChangeTableVisibility] = useState("hidden")
  const [index, changeIndex] = useState(0)
  const [answerVisibility, ChangeAnswerVisibility] = useState("hidden")
  const [data, setData] = useState(null)
  const [questionsCount, setQuestionsCount] = useState(0)
  const questionsCountInput = useRef(data?.answers.length)
  const { quiz } = useParams(); // Wyciągamy parametr z URL
  useEffect(() => {
    const handleKeyUp = (e) => {
      if (e.key === " " || e.key === "ArrowDown") {
        ChangeAnswerVisibility('visible');
      }
      if (e.key === "ArrowRight") {
        changeQuestion(1); // Odwołuje się do aktualnej wersji changeQuestion
      }
      if (e.key === "ArrowLeft") {
        changeQuestion(-1);
      }
    };
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [data, questionsCount]); // Dodaj odpowiednie zależności
  function changeQuestion(value) {
    if (data) {
      ChangeAnswerVisibility("hidden")
      changeIndex((index) => {
        const newIndex = index + value;
        if (newIndex < 0) {
          return 0;
        } else if (newIndex >= questionsCount) {
          return questionsCount;
        } else {
          return newIndex;
        }
      });
    }
  }
  if (props.data && props.data.status === 'success' && !data) {
    var questions = []
    var answers = []
    setQuestionsCount(props.data.quiz.length)
    props.data.quiz.map(item => {
      questions.push(item.question)
      answers.push(item.answer)
    })
    setData(randomizeQuestions({
      questions: questions,
      answers: answers
    }))
  } else {
    props.setQuizName(quiz)
  }
  function test() {
    var questions = []
    var answers = []
    setQuestionsCount(questionsCountInput.current.value)
    changeIndex(0)
    ChangeAnswerVisibility('hidden')
    for (let i = 0; i < questionsCountInput.current.value; i++) {
      questions.push(props.data.quiz[i].question)
      answers.push(props.data.quiz[i].answer)
    }
    setData(randomizeQuestions({
      questions: questions,
      answers: answers
    }))
  }
  return (<>
    <form className="limit" onSubmit={(e) => { e.preventDefault(); test() }}>
      <input type="number" ref={questionsCountInput} placeholder="Ilość pytań od początku" />
    </form>
    <div className="dev-tools">
      <input type="number" value={index} max={data ? questionsCount : 0} min={0} onChange={(e) => changeIndex(parseInt(e.target.value))}></input>
    </div>
    <LernTable data={props.data} TableVisibility={TableVisibility} ChangeTableVisibility={ChangeTableVisibility} questionsCount={questionsCount} />
    {data ? <Loaded data={data} index={index} OdpVisibility={answerVisibility} ChangeAnswerVisibility={ChangeAnswerVisibility} questionsCount={questionsCount} /> : <Loading />}

    {(data && index < questionsCount) ? <div className="next_prev_btns"><button className="confirm" id="next" onClick={() => changeQuestion(1)}>NASTĘPNY {">>"}</button>
      <button className="confirm" id="previous" onClick={() => changeQuestion(-1)}>{"<<"} POPRZEDNI</button></div> : null}

    {(data && index === questionsCount) ? <button className="confirm" onClick={() => { changeIndex(0); setData(randomizeQuestions(data)) }}>JESZCZE RAZ</button> : null}
    <button className="confirm" id="list" onClick={() => ChangeTableVisibility("visible")}>LISTA PYTAŃ I ODPOWIEDZI</button>
    {(data && index === questionsCount) ? <Link className="confirm" to={`/${quiz}/quiz`}>ROZWIĄŻ QUIZ</Link> : null}
    <Link className="confirm" id="menu" to={`/${quiz}/home`}>WRÓĆ DO MENU</Link>
  </>
  );
}

export default Learn;