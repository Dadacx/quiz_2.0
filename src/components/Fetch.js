const QuizzesListFetch = async () => {
    try {
        const res = await fetch(`https://frog02-20766.wykr.es/quiz/get_quizzes_list.php`);
        //if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        var data = await res.json();
        // console.log(data)
        return data;
    } catch (error) {
        console.error('Error:', error);
        return { "status": "error", "message": `[ERROR: ${error.message}] Serwer jest niedostępny` };
    }
  };

  const QuizFetch = async (name) => {
    try {
        const res = await fetch(`https://frog02-20766.wykr.es/quiz/get_quiz.php?name=${name}`);
        //if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        var data = await res.json();
        // console.log(data)
        return data;
    } catch (error) {
        console.error('Error:', error);
        return { "status": "error", "message": `[ERROR: ${error.message}] Serwer jest niedostępny` };
    }
  };
  const EditFetch = async (editedData) => {
    try {
        const res = await fetch(`https://frog02-20766.wykr.es/quiz/edit.php`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json" // ustawienie nagłówka na JSON
            },
            body: JSON.stringify(editedData) // konwersja danych do formatu JSON
          });
        //if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        var data = await res.json();
        // console.log(data)
        return data;
    } catch (error) {
        console.error('Error:', error);
        return { "status": "error", "message": `[ERROR: ${error.message}] Serwer jest niedostępny` };
    }
  };
  
  export { QuizzesListFetch, QuizFetch, EditFetch }
