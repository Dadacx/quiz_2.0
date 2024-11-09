const QuizzesListFetch = async () => {
    try {
        const res = await fetch(`https://frog02-20766.wykr.es/get_quizzes_list.php`);
        //if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        var data = await res.json();
        console.log(data)
  
        return data;
    } catch (error) {
        console.log('Error:', error);
        return [{ "status": "error", "message": `[ERROR: ${error.message}] Serwer jest niedostępny` }];
    }
  };
  
  export { QuizzesListFetch }