import '../styles/Quiz.css'
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loading, calculatePercent, isDataLoaded, randomizeQuestions } from "../components/Functions";
import SetTitle from '../components/SetTitle';
import QuizLogTable from '../components/QuizLogTable'

function Loaded(props) {
  const percent = calculatePercent(props.index, props.data.odp.length - 1)
  return (
    <div className="box quiz-box">
      {props.index < props.data.odp.length ? <div className="progress-bar">
        <div className="progress" style={{ width: percent + '%' }}> Pytanie: {props.index + 1}/{props.data.odp.length}{" (" + percent + "%) "}</div>
      </div> : null}
      <p className="pytanie">{props.index < props.data.odp.length ? props.data.pytania[props.index] : null}</p>
      <p className={props.showAnswer ? 'odp_active' : 'odp'} style={{ visibility: props.isCorrect ? 'hidden' : 'visible' }}
        onClick={() => props.setShowAnswer(true)}>{props.showAnswer ? props.data.odp[props.index] : 'Pokaż poprawną odpowiedź'}</p>
    </div>
  )
}

const Quiz = (props) => {
  SetTitle('Quiz')
  const [logTableVisibility, setLogTableVisibility] = useState("hidden")
  const [index, setIndex] = useState(0)
  const [data, setData] = useState({})
  const [isCorrect, setIsCorrect] = useState(true)
  const [showAnswer, setShowAnswer] = useState(false)
  const [incorrect, setIncorrect] = useState(0)
  const [quizLog, setQuizLog] = useState([])
  const userOdp = useRef(null)

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
    if (isDataLoaded(data) && document.querySelector('input.userOdp') != undefined && isVisible) document.querySelector('input.userOdp').value = data.odp[index]
    
    return (
      <div className='dev-tools'>
        <input type="number" value={index} max={isDataLoaded(data) ? data.odp.length : 100} min={0} onChange={(e) => setIndex(parseInt(e.target.value))}></input>
        <p style={{ color: 'red' }}>Złe: {incorrect}</p>
        <p>Odp: {isDataLoaded(data) ? data.odp[index] : null}</p>
      </div>
    )
  }
  const End = () => {
    const correct = data.odp.length - incorrect
    const percent = calculatePercent(correct, data.odp.length, 2)
    return (
      <>
        <QuizLogTable logTableVisibility={logTableVisibility} setLogTableVisibility={setLogTableVisibility} log={quizLog} />
        <div className="box">
          {percent >= 75 ? <h2 style={{ color: '#48b914' }}>Gratulacje!</h2> : null}
          {percent > 35 && percent < 75 ? <h2 style={{ color: '#e6b000' }}>Mogło być lepiej :/</h2> : null}
          {percent <= 35 ? <h2 style={{ color: 'red' }}>Nie tym razem ¯\_(ツ)_/¯</h2> : null}
          <p style={percent >= 75 ? { color: '#48b914' } : percent <= 35 ? { color: 'red' } : { color: '#e6b000' }} class="wynik">Ukończyłeś Quiz z wynikiem: {percent}%</p>
          <span className="correct">Liczba poprawnych odpowiedzi: {correct}</span>
          <span className="incorrect">Liczba niepoprawnych odpowiedzi: {incorrect}</span>
        </div>
        <button className="confirm" onClick={again} >JESZCZE RAZ!</button>
        <button className="confirm" onClick={() => setLogTableVisibility('visible')} >POKAŻ LOG QUIZU</button>
        <Link className="confirm" id="menu" to="/quiz_2.0/">WRÓĆ DO MENU</Link>
      </>
    );
  }
  function again() {
    setIndex(0)
    setData(randomizeQuestions(data))
    setIsCorrect(true)
    setShowAnswer(false)
    setIncorrect(0)
  }
  function check() {
    if (userOdp.current.value !== '') {
      if (userOdp.current.value.toLowerCase().trim() === data.odp[index].toLowerCase()) {
        console.log(`Pytanie: ${data.pytania[index]}\nOdp użytkownika: ${userOdp.current.value}`)
        let log = { pytanie: data.pytania[index], odp: data.odp[index], userOdp: userOdp.current.value, isCorrect: true }
        setQuizLog([...quizLog, log])
        setIndex((e) => e + 1)
        setIsCorrect(true)
        userOdp.current.value = ''
        setShowAnswer(false)
      } else {
        console.error(`Pytanie: ${data.pytania[index]}\nOdp użytkownika: ${userOdp.current.value}\nPoprawna odp: ${data.odp[index]}`)
        let log = { pytanie: data.pytania[index], odp: data.odp[index], userOdp: userOdp.current.value, isCorrect: false }
        setQuizLog([...quizLog, log])
        setIsCorrect(false)
        setIncorrect((e) => e + 1)
      }
    }
    document.querySelector('input.userOdp').focus()
  }

  if (isDataLoaded(props.data) && data.odp === undefined) {
    setData(randomizeQuestions(props.data))
  }
  return (<>
    {(isDataLoaded(data) && index === data.odp.length) ? <End /> :
      <>
        <DevTools />
        {isDataLoaded(data) ? <Loaded data={data} index={index} isCorrect={isCorrect} showAnswer={showAnswer} setShowAnswer={setShowAnswer} /> : <Loading />}
        <form className='userOdp' onSubmit={(e) => { e.preventDefault(); check() }}>
          <input autoFocus={true} type="text" className={!isCorrect ? 'userOdp shake' : "userOdp"} ref={userOdp} autoComplete="off" placeholder="Tu wpisz odpowiedź" />
        </form>
        <p className="blad" style={{ visibility: isCorrect ? 'hidden' : 'visible' }}>Zła odpowiedź</p>
        <button className="confirm" onClick={check}>SPRAWDŹ</button>
        <button className="confirm" onClick={() => window.open('/quiz_2.0', '_top')}>WRÓĆ DO MENU</button></>}
  </>);
}

export default Quiz;