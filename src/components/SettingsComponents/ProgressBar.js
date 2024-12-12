import { useState, useEffect, useRef } from 'react';
import { useConfig } from '../ConfigContext';
import { progressBarText } from "../Functions"
import ColorPicker from "./ColorPicker"

const ProgressBar = () => {
    const { config, setConfig } = useConfig()
    const [progressBar, setProgressBar] = useState(config.progressBar)
    const progressBarRef = useRef(progressBar);
    useEffect(() => {
        progressBarRef.current = progressBar;
    }, [progressBar]);

    useEffect(() => {
        return () => {
            setConfig((prevConfig) => ({
                ...prevConfig,
                progressBar: progressBarRef.current,
            }));
        };
    });
    const handleProgressColorChange = (newColor) => {
        setProgressBar({ ...progressBar, progressColor: newColor })
    };
    const handleBackgroundChange = (newColor) => {
        setProgressBar({ ...progressBar, background: newColor })
    };
    const handleColorChange = (newColor) => {
        setProgressBar({ ...progressBar, color: newColor })
    };
    var percent = 67.3684
    const ile = 64
    const na = 95
    const text = progressBarText(progressBar.display,ile,na,percent)
    return (
        <div className="settingsBox">
            <h2>Progress bar</h2>
            <div className="progress-bar" style={{background: progressBar.background}}>
                <div className="progress" style={{ width: percent + '%', background: progressBar.progressColor, color: progressBar.color, transition: '0s' }}> {text} </div>
            </div>
            <div className="btns">
                <ColorPicker defaultColor={progressBar.progressColor}
                    onColorChange={handleProgressColorChange} />
                <ColorPicker defaultColor={progressBar.background}
                    onColorChange={handleBackgroundChange} />
                <ColorPicker defaultColor={progressBar.color}
                    onColorChange={handleColorChange} />
                    <input value={progressBar.display} className='settingsInput'
                    title='%x - numer aktualnego pytania&#013;%y - ilość pytań&#013;%p - procent postępu&#013;%p.1 = zaokrąglenie procentu (od 1 do 4)'
                    onChange={(e) => setProgressBar({...progressBar,display: e.currentTarget.value})} />
            </div>
        </div>
    )
}

export default ProgressBar 