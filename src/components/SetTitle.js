import { useEffect } from "react";

const SetTitle = (title) => {
    useEffect(() => {
        document.title = `QUIZ | ${title}`
    },[])
}

export default SetTitle