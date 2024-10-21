import { useState } from "react";
var i = 0
function Loading() {
    const [loading, changeLoading] = useState("Ładuję")
    setTimeout(() => {
        changeLoading(loading + ".")
        i++
        if (i > 3) {
            i = 0
            changeLoading("Ładuję")
        }
    }, 500)
    return (
        <div className="box">
            <p className="lern" id="lern">{loading}</p>
        </div>
    )
}

function calculatePercent(value1, value2, round=1) {
    var percent = value1 / (value2) * 100
    return +(Math.round(percent + `e+${round}`) + `e-${round}`)
}

function isDataLoaded(data) {
    if (data.odp === undefined) {
        return false
    } else {
        return true
    }
}
function randomizeQuestions(obj) {
    const length = obj.pytania.length;
    let indices = Array.from({ length }, (_, i) => i);

    for (let i = length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[randomIndex]] = [indices[randomIndex], indices[i]];
    }

    const randomizedFirstArray = indices.map(i => obj.pytania[i]);
    const randomizedSecondArray = indices.map(i => obj.odp[i]);

    console.log("randomize")
    return {
        pytania: randomizedFirstArray,
        odp: randomizedSecondArray
    };
}

export { Loading, calculatePercent, isDataLoaded, randomizeQuestions }