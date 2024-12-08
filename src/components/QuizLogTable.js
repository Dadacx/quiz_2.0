import "../styles/QuizLogTable.css"
import x from "../images/close.svg"

const QuizLogTable = (props) => {
  return (
    <div className="log" style={{ visibility: props.logTableVisibility }}>
      <div className="close" onClick={() => props.setLogTableVisibility("hidden")}><img src={x} /></div>
      <div className="break"></div>
      <table className="logTable" id="logTable">
        <tbody>
          <tr><th>Pytanie</th><th>Poprawna odpowiedź</th><th>Twoja odpowiedź</th></tr>
          {props.log.map(log => <tr className={log.isCorrect ? 'correct' : 'incorrect'}>
            <td>{log.pytanie}</td>
            <td>{log.odp}</td>
            <td>{log.userOdp}</td>
          </tr>)}
        </tbody>
      </table>
    </div>
  );
}

export default QuizLogTable;