import { useState, useEffect } from "react";
import { EditFetch } from "./Fetch";
import "../styles/EditQuiz.css"
import x from "../images/close.svg"
import save_icon from "../images/save.svg"

import { useNavigate } from 'react-router-dom';

const EditQuiz = ({ data, setMode, setReloadData, quiz }) => {
  const [tempData, setTempData] = useState(null)
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
    const answer = prompt("Wpisz odpowiedź")

    setTempData((prevData) => ({
      ...prevData, // Zachowaj pozostałe pola z obiektu data
      quiz: [...prevData.quiz, { id: '', question: question, answer: answer }], // Dodaj nowy obiekt do quiz
    }));
  }
  function editRow(id) {
    const row = tempData.quiz.find((item) => item.id === id)
    const newQuestion = prompt("Wpisz nowe pytanie", row.question) || row.question
    const newAnswer = prompt("Wpisz nową odpowiedź", row.answer) || row.answer
    setTempData((prevData) => ({
      ...prevData,
      quiz: prevData.quiz.map((item) =>
        item.id === id ? { ...item, ...{ question: newQuestion, answer: newAnswer } } : item
      ),
    }));
  }
  function deleteRow(id) {
    const confirm = window.confirm("Na pewno chcesz usunąć to pytanie?")
    if (confirm) {
      setTempData((prevData) => ({
        ...prevData,
        quiz: prevData.quiz.filter((item) => item.id !== id),
      }));
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
      <div className="break"></div>
      <table className="editTable">
        <tbody>
          <tr key={0}><th>ID</th><th>Pytanie</th><th>Odpowiedź</th><th>Akcja</th></tr>
          <tr><td className="add" colSpan={4} onClick={addRow}>Dodaj pytanie</td></tr>
          {tempData ? tempData.quiz.map(item => <tr key={item.id}>
            <td className="id">{item.id}</td>
            <td>{item.question}</td>
            <td>{item.answer}</td>
            <td className="action">
              <span onClick={() => editRow(item.id)}>Edytuj</span>
              <span onClick={() => deleteRow(item.id)}>Usuń</span>
            </td>
          </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}

export default EditQuiz;