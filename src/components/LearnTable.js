import "../styles/LearnTable.css"
import { useState } from "react";

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
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[column];
      y = rows[i + 1].getElementsByTagName("TD")[column];
      //check if the two rows should switch place:
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        //if so, mark as a switch and break the loop:
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
    <div className="list" id="list" style={{visibility:props.TableVisibility}}>
      <div className="close" onClick={() => props.ChangeTableVisibility("hidden")}>+</div>
      <div className="break"></div>
      <input id="search" className="search" onKeyUp={() => search()}></input>
      <table id="table" className="learnTable">
        <tr><th onClick={() => sortTable(0)}>Pytanie</th><th onClick={() => sortTable(1)}>Odpowiedź</th></tr>
        {props.data.odp != undefined ? props.data.pytania.flatMap((p,i) =><tr><td>{p}</td><td>{props.data.odp[i]}</td></tr>) : null}
      </table>
    </div>
  );
}

export default LearnTable;