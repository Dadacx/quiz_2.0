import '../styles/Quiz.css'
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Loading, calculatePercent, isDataLoaded, randomizeQuestions } from "../components/Functions";

function Loaded(props) {
  const percent = calculatePercent(props.index, props.data.odp.length - 1)
  return (
    <div className="box">
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
  window.addEventListener('beforeunload', (e) => e.preventDefault());
  const [index, setIndex] = useState(0)
  const [data, setData] = useState({})
  const [isCorrect, setIsCorrect] = useState(true)
  const [showAnswer, setShowAnswer] = useState(false)
  const [incorrect, setIncorrect] = useState(0)
  const userOdp = useRef(null)

  const End = () => {
    const correct = data.odp.length - incorrect
    const percent = calculatePercent(correct, data.odp.length, 2)
    return (
      <>
      <div className="box">
        {percent >= 75 ? <h2 style={{ color: '#48b914' }}>Gratulacje!</h2> : null}
        {percent > 35 && percent < 75 ? <h2 style={{ color: '#e6b000' }}>Mogło być lepiej :/</h2> : null}
        {percent <= 35 ? <h2 style={{ color: 'red' }}>Nie tym razem ¯\_(ツ)_/¯</h2> : null}
        <p style={percent >= 75 ? {color: '#48b914'} : percent <= 35 ? {color: 'red'} : { color: '#e6b000' }} class="wynik">Ukończyłeś Quiz z wynikiem: {percent}%</p>
        <span class="correct">Liczba poprawnych odpowiedzi: {correct}</span>
        <span class="incorrect">Liczba niepoprawnych odpowiedzi: {incorrect}</span>
      </div>
      <button class="confirm" onClick={again} >JESZCZE RAZ!</button>
      <Link className="confirm" id="menu" to="/">WRÓĆ DO MENU</Link>
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
    if (userOdp.current.value.toLowerCase() === data.odp[index].toLowerCase()) {
      setIndex((e) => e + 1)
      setIsCorrect(true)
      userOdp.current.value = ''
      setShowAnswer(false)
    } else {
      setIsCorrect(false)
      setIncorrect((e) => e + 1)
    }
    document.querySelector('input.userOdp').focus()
  }

  if (isDataLoaded(props.data) && data.odp === undefined) {
    setData(randomizeQuestions(props.data))
  }
  return (<>
    {(isDataLoaded(data) && index === data.odp.length) ? <End /> :
      <><input className="debug" type="number" value={index} max={isDataLoaded(data) ? data.odp.length : 100} min={0} onChange={(e) => setIndex(parseInt(e.target.value))}></input>
        <p style={{ color: 'red' }}>Złe: {incorrect}</p>
        {isDataLoaded(data) ? <Loaded data={data} index={index} isCorrect={isCorrect} showAnswer={showAnswer} setShowAnswer={setShowAnswer} /> : <Loading />}
        <form onSubmit={(e) => { e.preventDefault(); check() }}>
          <input autoFocus='true' type="text" class={!isCorrect ? 'userOdp shake' : "userOdp"} ref={userOdp} autocomplete="off" placeholder="Tu wpisz odpowiedź" />
        </form>
        <p className="blad" style={{ visibility: isCorrect ? 'hidden' : 'visible' }}>Zła odpowiedź</p>
        <button className="confirm" onClick={check}>SPRAWDŹ</button>
        <button className="confirm" onClick={() => window.open('/', '_top')}>WRÓĆ DO MENU</button></>}
  </>);
}

export default Quiz;