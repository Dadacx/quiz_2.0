import { useState, useEffect } from "react";
import { EditFetch } from "./Fetch";
import "../styles/EditQuiz.css"
import x from "../images/close.svg"
import save_icon from "../images/save.svg"
import delete_icon from "../images/delete.svg"
import edit_icon from "../images/edit.svg"
import cancel_icon from "../images/cancel.svg"
import confirm_icon from "../images/confirm.svg"
import { useNavigate } from 'react-router-dom';

const EditQuiz = ({ data, setMode, setReloadData, quiz }) => {
  const [tempData, setTempData] = useState(null)
  const [multipleDelete, setMultipleDelete] = useState(false)
  if (data && !tempData) setTempData(data)
  const navigate = useNavigate();

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

  function findDifferences(obj1, obj2) {
    function isEqual(val1, val2) {
      if (typeof val1 !== typeof val2) return false;
      if (typeof val1 === 'object' && val1 !== null && val2 !== null) {
        if (Array.isArray(val1) && Array.isArray(val2)) {
          if (val1.length !== val2.length) return false;
          return val1.every((item, index) => isEqual(item, val2[index]));
        }
        const keys1 = Object.keys(val1);
        const keys2 = Object.keys(val2);
        if (keys1.length !== keys2.length) return false;
        return keys1.every(key => isEqual(val1[key], val2[key]));
      }
      return val1 === val2;
    }

    function getDifferences(val1, val2) {
      if (typeof val1 !== typeof val2) return { original: val1, edited: val2 };
      if (typeof val1 === 'object' && val1 !== null && val2 !== null) {
        const diffs = {};
        const keys = new Set([...Object.keys(val1), ...Object.keys(val2)]);
        keys.forEach(key => {
          if (!isEqual(val1[key], val2[key])) {
            diffs[key] = getDifferences(val1[key], val2[key]);
          }
        });
        return Object.keys(diffs).length > 0 ? diffs : null;
      }
      return val1 !== val2 ? { original: val1, edited: val2 } : null;
    }

    // Funkcja porównująca tablice, zwracająca różnice na podstawie `id`
    function compareArrays(arr1, arr2) {
      const diffs = [];
      const map1 = new Map(arr1.map(item => [item.id, item]));
      const map2 = new Map(arr2.map(item => [item.id, item]));

      // Przechodzimy przez wszystkie elementy w pierwszej tablicy
      map1.forEach((item1, id) => {
        const item2 = map2.get(id);
        if (item2) {
          const diff = getDifferences(item1, item2);
          if (diff) {
            diffs.push({ id, differences: diff });
          }
        } else {
          diffs.push({ id, differences: { original: item1, edited: null } });
        }
      });

      // Sprawdzamy, czy w drugiej tablicy są jakieś elementy, które nie występują w pierwszej
      map2.forEach((item2, id) => {
        if (!map1.has(id)) {
          diffs.push({ id, differences: { original: null, edited: item2 } });
        }
      });

      return diffs;
    }

    // Jeżeli obj1 i obj2 mają tablicę `quiz`, porównujemy je przy użyciu `compareArrays`
    if (Array.isArray(obj1.quiz) && Array.isArray(obj2.quiz)) {
      const quizDiffs = compareArrays(obj1.quiz, obj2.quiz);
      if (quizDiffs.length > 0) {
        return { quiz: quizDiffs };
      }
    }

    const differences = getDifferences(obj1, obj2);
    return differences || false;
  }
  function addRow() {
    const question = prompt("Wpisz pytanie")
    if(question === null) return;
    const answer = prompt("Wpisz odpowiedź")
    if(answer === null) return;

    setTempData((prevData) => ({
      ...prevData, // Zachowaj pozostałe pola z obiektu data
      quiz: [...prevData.quiz, { id: '', question: question, answer: answer }], // Dodaj nowy obiekt do quiz
    }));
  }
  function search() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("editTable");
    tr = table.getElementsByTagName("tr");
    for (i = 2; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[multipleDelete ? 2 : 1];
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
  function editRow(id) {
    const row = tempData.quiz.find((item) => item.id === id)
    const newQuestion = prompt("Wpisz nowe pytanie", row.question)
    if(newQuestion === null) return;
    const newAnswer = prompt("Wpisz nową odpowiedź", row.answer)
    if(newAnswer === null) return;
    setTempData((prevData) => ({
      ...prevData,
      quiz: prevData.quiz.map((item) =>
        item.id === id ? { ...item, ...{ question: newQuestion, answer: newAnswer } } : item
      ),
    }));
  }
  function deleteRow(id) {
    const confirm = window.confirm(`Czy na pewno chcesz usunąć pytanie '${tempData.quiz.find(x => x.id === id).question}'?`)
    if (confirm) {
      setTempData((prevData) => ({
        ...prevData,
        quiz: prevData.quiz.filter((item) => item.id !== id),
      }));
    }
  }
  function deleteMultipleRows() {
    const selectedRows = []
    document.querySelectorAll(".inp-cbx").forEach(item => item.checked ? selectedRows.push(item.value) : null)
    if (selectedRows.length > 0) {
      const confirm = window.confirm(`Czy na pewno chcesz usunąć pytania z ID: ${selectedRows.join(", ")}?`)
      if (confirm) {
        setMultipleDelete(false)
        setTempData((prevData) => ({
          ...prevData,
          quiz: prevData.quiz.filter((item) => !selectedRows.includes(item.id)),
        }));
      }
    }
  }
  function close() {
    if (findDifferences(data, tempData)) {
      if (window.confirm("Masz niezapisane zmiany. Czy na pewno chcesz wyjść?")) /*setMode(null)*/ navigate(`/${quiz}/home`)
    } else {
      // setMode(null)
      navigate(`/${quiz}/home`)
    }
  }
  function save() {
    const password = window.prompt("Podaj hasło");
    const updatedData = { ...tempData, password }; // Zaktualizowane dane
    // setTempData(updatedData);
    // console.log(updatedData); // Tutaj już nowa wartość
    EditFetch(updatedData).then((result) => {
      alert(result.message);
      if (result.status === "success") {
        setReloadData((e) => !e);
        navigate(`/${quiz}/home`)
      }
    });
  }

  console.log(tempData)
  return (
    <div className="edit">
      <div className="editBtns">
        <div className="editBtn btnSave" title="Zapisz" onClick={save}><img src={save_icon} alt="save_icon" /></div>
        <div className="editBtn" title="Zamknij" onClick={close}><img src={x} alt="close_icon" /></div>
      </div>
      <div className="inputs">
        <input type="text" className="name-inp" defaultValue={tempData?.display_name} disabled={tempData ? false : true} onBlur={(e) => {var value = e.currentTarget.value; setTempData((prevData) => ({
        ...prevData,
        display_name: value,
      }))}} placeholder="Nazwa quizu" />
        <input type="text" className="author-inp" defaultValue={tempData?.author} disabled={tempData ? false : true} onBlur={(e) => {var value = e.currentTarget.value; setTempData((prevData) => ({
        ...prevData,
        author: value,
      }))}} placeholder="Autor"/>
      </div>
      <input type="test" id="search" className="search" disabled={tempData ? false : true} onKeyUp={search} placeholder="Wyszukaj pytanie" autoComplete="off" />
      <table className="editTable" id="editTable">
        <tbody>
          <tr key={0}>{multipleDelete ? <th></th> : null}<th>ID</th><th>Pytanie</th><th>Odpowiedź</th><th>Akcja</th></tr>
          <tr>{multipleDelete ? <td></td> : null}<td className="add" colSpan={3} onClick={tempData ? addRow : null}>Dodaj pytanie</td><td className="action">
            {multipleDelete ? <><span onClick={deleteMultipleRows} title="Potwierdź"><img src={confirm_icon} alt="confirm_icon" /></span>
            <span onClick={() => setMultipleDelete(false)} title="Anuluj"><img src={cancel_icon} alt="cancel_icon" /></span></> :
            <span onClick={tempData ? () => setMultipleDelete(true) : null} title="Usuń kilka"><svg><use style={{"--text_color":"red"}} href={delete_icon+"#delete"}></use></svg></span>}
            </td></tr>
          {tempData ? tempData.quiz.map(item => <tr key={item.id}>
            {multipleDelete ? <td className="checkbox"><div className="checkbox-wrapper-4">
              <input value={item.id} className="inp-cbx" id={`checkbox${item.id}`} type="checkbox" />
              <label className="cbx" htmlFor={`checkbox${item.id}`}>
                <span><svg width="12px" height="10px"><use xlinkHref="#check-4"></use></svg></span>
              </label>
              <svg className="inline-svg">
                <symbol id="check-4" viewBox="0 0 12 10">
                  <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                </symbol>
              </svg>
            </div></td> : null}
            <td className="id">{item.id}</td>
            <td>{item.question}</td>
            <td>{item.answer}</td>
            <td className="action">
              <span onClick={() => editRow(item.id)}><svg><use href={edit_icon+"#edit"}></use></svg></span>
              <span onClick={() => deleteRow(item.id)}><svg><use href={delete_icon+"#delete"}></use></svg></span>
            </td>
          </tr>
          ) : Array.from({ length: 4 }, (_, index) => <tr key={-index}>
            <td><span className="loading"></span></td>
            <td><span className="loading"></span></td>
            <td><span className="loading"></span></td>
            <td className="action">
            <span><svg><use href={edit_icon+"#edit"}></use></svg></span>
            <span><svg><use href={delete_icon+"#delete"}></use></svg></span></td>
          </tr>)}
        </tbody>
      </table>
    </div>
  );
}

export default EditQuiz;