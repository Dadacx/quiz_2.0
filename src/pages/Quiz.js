import '../styles/Quiz.css'
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loading, calculatePercent, randomizeQuestions } from "../components/Functions";
import SetTitle from '../components/SetTitle';
import QuizLogTable from '../components/QuizLogTable'
import { useParams } from 'react-router-dom';

function Loaded(props) {
  const percent = calculatePercent(props.index, props.data.answers.length - 1)
  return (
    <div className="box quiz-box">
      {props.index < props.data.answers.length ? <div className="progress-bar">
        <div className="progress" style={{ width: percent + '%' }}> Pytanie: {props.index + 1}/{props.data.answers.length}{" (" + percent + "%) "}</div>
      </div> : null}
      <p className="pytanie">{props.index < props.data.answers.length ? props.data.questions[props.index] : null}</p>
      <p className={props.showAnswer ? 'odp_active' : 'odp'} style={{ visibility: props.isCorrect ? 'hidden' : 'visible' }}
        onClick={() => props.setShowAnswer(true)}>{props.showAnswer ? props.data.answers[props.index] : 'Pokaż poprawną odpowiedź'}</p>
    </div>
  )
}

const Quiz = (props) => {
  SetTitle('Quiz')
  const [logTableVisibility, setLogTableVisibility] = useState("hidden")
  const [index, setIndex] = useState(0)
  const [data, setData] = useState(null)
  const [isCorrect, setIsCorrect] = useState(true)
  const [showAnswer, setShowAnswer] = useState(false)
  const [incorrect, setIncorrect] = useState(0)
  const [quizLog, setQuizLog] = useState([])
  const userOdp = useRef(null)
  const { quiz } = useParams(); // Wyciągamy parametr z URL

  useEffect(() => {
    props.setQuizName(quiz)
  }, [quiz]);
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const DevTools = () => {
    // automatyczne uzupełnianie inputa
    const isVisible = document.querySelector('div.dev-tools') !== null && window.getComputedStyle(document.querySelector('div.dev-tools')).display === 'block' ? true : false
    if (data && document.querySelector('input.userOdp') && isVisible) document.querySelector('input.userOdp').value = data.answers[index]

    return (
      <div className='dev-tools'>
        <input type="number" value={index} max={data ? data.answers.length : 100} min={0} onChange={(e) => setIndex(parseInt(e.target.value))}></input>
        <p style={{ color: 'red' }}>Złe: {incorrect}</p>
        <p>Odp: {data ? data.answers[index] : null}</p>
      </div>
    )
  }
  const End = () => {
    const correct = data.answers.length - incorrect
    const percent = calculatePercent(correct, data.answers.length, 2)
    return (
      <>
        <QuizLogTable logTableVisibility={logTableVisibility} setLogTableVisibility={setLogTableVisibility} log={quizLog} />
        <div className="box">
          {percent >= 75 ? <h2 style={{ color: '#48b914' }}>Gratulacje!</h2> : null}
          {percent > 35 && percent < 75 ? <h2 style={{ color: '#e6b000' }}>Mogło być lepiej :/</h2> : null}
          {percent <= 35 ? <h2 style={{ color: 'red' }}>Nie tym razem ¯\_(ツ)_/¯</h2> : null}
          <p style={percent >= 75 ? { color: '#48b914' } : percent <= 35 ? { color: 'red' } : { color: '#e6b000' }} className="wynik">Ukończyłeś Quiz z wynikiem: {percent}%</p>
          <span className="correct">Liczba poprawnych odpowiedzi: {correct}</span>
          <span className="incorrect">Liczba niepoprawnych odpowiedzi: {incorrect}</span>
        </div>
        <button className="confirm" onClick={again} >JESZCZE RAZ!</button>
        <button className="confirm" onClick={() => setLogTableVisibility('visible')} >POKAŻ LOG QUIZU</button>
        <Link className="confirm" id="menu" to={`/${quiz}/home`}>WRÓĆ DO MENU</Link>
      </>
    );
  }
  function again() {
    setIndex(0)
    setData(randomizeQuestions(data))
    setIsCorrect(true)
    setShowAnswer(false)
    setIncorrect(0)
    setQuizLog([])
  }
  function check() {
    if (userOdp.current.value !== '') {
      if (userOdp.current.value.toLowerCase().trim() === data.answers[index].toLowerCase()) {
        console.log(`Pytanie: ${data.questions[index]}\nOdp użytkownika: ${userOdp.current.value}`)
        let log = { pytanie: data.questions[index], odp: data.answers[index], userOdp: userOdp.current.value, isCorrect: true }
        setQuizLog([...quizLog, log])
        setIndex((e) => e + 1)
        setIsCorrect(true)
        userOdp.current.value = ''
        setShowAnswer(false)
      } else {
        console.error(`Pytanie: ${data.questions[index]}\nOdp użytkownika: ${userOdp.current.value}\nPoprawna odp: ${data.answers[index]}`)
        let log = { pytanie: data.questions[index], odp: data.answers[index], userOdp: userOdp.current.value, isCorrect: false }
        setQuizLog([...quizLog, log])
        setIsCorrect(false)
        setIncorrect((e) => e + 1)
      }
    }
    document.querySelector('input.userOdp').focus()
  }

  if (props.data && props.data.status === 'success' && !data) {
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
  }
  function changeLimit() {
    const from = document.querySelector("#from").value - 1
    const to = document.querySelector("#to").value - 1

    const slicedData = props.data.quiz.slice(from, to + 1);
    const result = {
      questions: slicedData.map((item) => item.question),
      answers: slicedData.map((item) => item.answer)
    };
    setData(randomizeQuestions(result))
    setIndex(0)
    setIsCorrect(true)
    setShowAnswer(false)
    setIncorrect(0)
    setQuizLog([])
  }
  return (<>
    {(data && index === data.answers.length) ? <End /> :
      <>
        <form className="limit" onSubmit={(e) => { e.preventDefault() }}>
          <input type="number" className="limit" id="from" placeholder="Od" /> <span>-</span> <input type="number" className="limit" id="to" placeholder="Do" />
          <button style={{ marginLeft: '10px' }} onClick={changeLimit}>Potwierdź</button>
        </form>
        <DevTools />
        {data ? <Loaded data={data} index={index} isCorrect={isCorrect} showAnswer={showAnswer} setShowAnswer={setShowAnswer} /> : <Loading />}
        <form className='userOdp' onSubmit={(e) => { e.preventDefault(); check() }}>
          <input autoFocus={true} type="text" className={!isCorrect ? 'userOdp shake' : "userOdp"} ref={userOdp} autoComplete="off" placeholder="Tu wpisz odpowiedź" />
        </form>
        <p className="blad" style={{ visibility: isCorrect ? 'hidden' : 'visible' }}>Zła odpowiedź</p>
        <button className="confirm" onClick={check}>SPRAWDŹ</button>
        <button className="confirm" onClick={() => window.open(`/quiz_2.0/${quiz}/home`, '_top')}>WRÓĆ DO MENU</button></>}
  </>);
}

export default Quiz;