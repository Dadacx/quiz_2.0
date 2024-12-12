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
function round(value,round) {
    return +(Math.round(value + `e+${round}`) + `e-${round}`)
}
function progressBarText(text,ile,na,percent) {
    var message = text
    var index = message.indexOf('%p')
    var decimalPlace = 0
    if (message.charAt(index + 2) === '.') {
        decimalPlace = Number.parseInt(message.charAt(index + 3))
        if (decimalPlace === 0) message = message.slice(0, index + 2) + message.slice(index + 4)
        else if (decimalPlace > 4) decimalPlace = 4
        if(decimalPlace) message = message.slice(0, index + 2) + message.slice(index + 4)
    }
    return message.replace('%x', ile).replace('%y', na).replace('%p', round(percent, decimalPlace || 0))
}

function randomizeQuestions(obj) {
    const length = obj.questions.length;
    let indices = Array.from({ length }, (_, i) => i);

    for (let i = length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[randomIndex]] = [indices[randomIndex], indices[i]];
    }

    const randomizedFirstArray = indices.map(i => obj.questions[i]);
    const randomizedSecondArray = indices.map(i => obj.answers[i]);

    return {
        questions: randomizedFirstArray,
        answers: randomizedSecondArray
    };
}
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
}
function rgbToHex(r, g, b) {
    const red = r.toString(16).padStart(2, '0');
    const green = g.toString(16).padStart(2, '0');
    const blue = b.toString(16).padStart(2, '0');

    return `#${red}${green}${blue}`;
}
export { Loading, calculatePercent, round, progressBarText, randomizeQuestions, hexToRgb, rgbToHex }