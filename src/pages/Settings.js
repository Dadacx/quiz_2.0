import { Outlet, Link } from "react-router-dom";
import ArrowLeftIcon from '../components/ArrowLeftIcon'
import ThemeSwitch from '../components/ThemeSwitch'
import "../styles/Settings.css"

function Settings(props) {
    return (
        <div className="box">
        <Link className="arrow_back" to="/quiz_2.0/"><ArrowLeftIcon width={40} height={40} color="var(--text_color)" /></Link>
        <p className="menu">USTAWIENIA</p>
        <ThemeSwitch />
    </div>
    )
}

export default Settings