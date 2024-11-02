import { Link } from "react-router-dom";
import ArrowLeftIcon from '../components/ArrowLeftIcon'
import ThemeSwitch from '../components/ThemeSwitch'
import "../styles/Settings.css"
import SetTitle from "../components/SetTitle";

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [parseInt(result[1], 16),parseInt(result[2], 16), parseInt(result[3], 16)] : null;
  }

function Settings({lightBox, setLightBox}) {
    var r = document.querySelector(':root')
    r.style.setProperty('--box_light', `rgba(${lightBox.color[0]},${lightBox.color[1]},${lightBox.color[2]},${lightBox.on})`)
    // localStorage.setItem("lightBox","dark")
    SetTitle('Ustawienia')
    return (
        <div className="box">
            <ThemeSwitch />
            <Link className="arrow_back" to="/"><ArrowLeftIcon width={40} height={40} color="var(--text_color)" /></Link>
            <p className="menu">USTAWIENIA</p>
            <div className="light_box">
                <span>Podświetlenie boxa</span>
                <input type="checkbox" checked={lightBox.on === 1 ? true : false} onChange={() => setLightBox({...lightBox, on: lightBox.on === 1 ? 0 : 1})} />
                <input type="color" onChange={(e) => setLightBox({...lightBox, color: hexToRgb(e.target.value)})} disabled={lightBox.on === 0 ? true : false} />
            </div>
        </div>
    )
}

export default Settings