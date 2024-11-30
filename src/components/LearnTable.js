import "../styles/LearnTable.css"
import x from "../images/close.svg"

function search() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("search");
  filter = input.value.toUpperCase();
  table = document.getElementById("table");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
function sortTable(column) {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("table");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[column];
      y = rows[i + 1].getElementsByTagName("TD")[column];
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

const LearnTable = (props) => {
  return (
    <div className="list" id="list" style={{ visibility: props.TableVisibility }}>
      <div className="close" onClick={() => props.ChangeTableVisibility("hidden")}><img src={x} /></div>
      <div className="break"></div>
      <input id="search" className="search" onKeyUp={() => search()}></input>
      <table id="table" className="learnTable">
        <tbody>
          <tr key={0}><th onClick={() => sortTable(0)}>Pytanie</th><th onClick={() => sortTable(1)}>Odpowiedź</th></tr>
          {/* {props.data ? props.data.quiz.questions.map((p, i) => <tr key={i + 1}><td>{p}</td><td>{props.data.quiz.answers[i]}</td></tr>) : null} */}
          {props.data ? props.data.quiz.map((q,i) => i < props.questionsCount ? <tr key={q.id}>
            <td>{q.question}</td>
            <td>{q.answer}</td>
            </tr> : null) : null}
        </tbody>
      </table>
    </div>
  );
}

export default LearnTable;