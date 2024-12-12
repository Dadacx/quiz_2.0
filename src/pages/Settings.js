import "../styles/Settings.css"
import { useConfig } from '../components/ConfigContext';
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import SetTitle from "../components/SetTitle";
import ArrowLeftIcon from '../components/ArrowLeftIcon'
import ThemeSwitch from '../components/ThemeSwitch'
import LightBox from "../components/SettingsComponents/LightBox";
import ProgressBar from "../components/SettingsComponents/ProgressBar";
import Hotkeys from "../components/SettingsComponents/Hotkeys";
import x from '../images/close.svg'

const Settings = () => {
    const [settings, setSettings] = useState(null)
    const { config, setConfig, defaultConfig, updateFromConfig } = useConfig()

    var component
    switch (settings) {
        case 'light_box':
            component = <LightBox />
            break;
        case 'progress_bar':
            component = <ProgressBar />
            break;
        case 'hotkeys':
            component = <Hotkeys />
            break;
        default:
            break;
    }
    updateFromConfig()
    SetTitle('Ustawienia')
    const { quiz } = useParams();
    return (<>
        {component}
        {settings ? <div className="close" onClick={() => setSettings(null)}><img alt="close_icon" src={x} /></div> : null}
        <div className="box">
            <ThemeSwitch setConfig={setConfig} />
            <Link className="arrow_back" to={`/${quiz}/home`}><ArrowLeftIcon width={40} height={40} color="var(--text_color)" /></Link>
            <p className="menu">USTAWIENIA</p>
            <button disabled={settings ? true : false} className="confirm" style={{marginTop:'inherit'}} onClick={() => setSettings('light_box')}>Podświetlenie boxa</button>
            <button disabled={settings ? true : false} className="confirm" onClick={() => setSettings('progress_bar')}>Progress bar</button>
            <button disabled={settings ? true : false} className="confirm" onClick={() => setSettings('hotkeys')}>Skróty klawiszowe</button>
            <button disabled={settings ? true : false} className="confirm" onClick={() => setConfig(defaultConfig)}>Przywróć domyślne</button>
        </div></>
    )
}

export default Settings