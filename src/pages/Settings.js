import { Link } from "react-router-dom";
import ArrowLeftIcon from '../components/ArrowLeftIcon'
import ThemeSwitch from '../components/ThemeSwitch'
import "../styles/Settings.css"
import SetTitle from "../components/SetTitle";
import { useParams } from 'react-router-dom';

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [parseInt(result[1], 16),parseInt(result[2], 16), parseInt(result[3], 16)] : null;
  }
  function rgbToHex(r, g, b) {
    const red = r.toString(16).padStart(2, '0');
    const green = g.toString(16).padStart(2, '0');
    const blue = b.toString(16).padStart(2, '0');

    return `#${red}${green}${blue}`;
}

const Settings = ({lightBox, setLightBox}) => {
    var r = document.querySelector(':root')
    r.style.setProperty('--box_light', `rgba(${lightBox.color[0]},${lightBox.color[1]},${lightBox.color[2]},${lightBox.on})`)
    SetTitle('Ustawienia')
    const { quiz } = useParams();
    return (
        <div className="box">
            <ThemeSwitch />
            <Link className="arrow_back" to={`/${quiz}/home`}><ArrowLeftIcon width={40} height={40} color="var(--text_color)" /></Link>
            <p className="menu">USTAWIENIA</p>
            <div className="light_box">
                <span>Podświetlenie boxa</span>
                <input type="checkbox" checked={lightBox.on === 1 ? true : false} onChange={() => setLightBox({...lightBox, on: lightBox.on === 1 ? 0 : 1})} />
                <input type="color" value={rgbToHex(lightBox.color[0],lightBox.color[1],lightBox.color[2])} onChange={(e) => setLightBox({...lightBox, color: hexToRgb(e.target.value)})} disabled={lightBox.on === 0 ? true : false} />
            </div>
        </div>
    )
}

export default Settings