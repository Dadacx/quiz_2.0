import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
    const defaultConfig = {
        theme: 'dark',
        lightBox: { on: 0, color: [255, 255, 255] },
        progressBar: { progressColor: '#74c25c', background: '#c0c0c0', color: '#ffffff', display: 'Pytanie: %x/%y (%p.1%)' },
        hotkeys: { next: ['ArrowRight',null], previous: ['ArrowLeft',null], showAnswer: ['Space', 'ArrowDown'] }
    }
    const [config, setConfig] = useState(JSON.parse(localStorage.getItem('quizConfig')) || defaultConfig)
    document.querySelector("body").setAttribute("data-theme", config.theme)
function updateFromConfig() {
        var r = document.querySelector(':root')
        r.style.setProperty('--box_light', `rgba(${config.lightBox.color[0]},${config.lightBox.color[1]},${config.lightBox.color[2]},${config.lightBox.on})`)
        r.style.setProperty('--progress_bar_background', config.progressBar.background)
        r.style.setProperty('--progress', config.progressBar.progressColor)
        r.style.setProperty('--progress_bar_color', config.progressBar.color)
}
updateFromConfig()
    const configRef = useRef(config);
    useEffect(() => {
        configRef.current = config;
    }, [config]);
    useEffect(() => {
        const handleUnload = (e) => {
            localStorage.setItem('quizConfig', JSON.stringify(configRef.current))
        };
        window.addEventListener('beforeunload', handleUnload);

        return () => {
            window.removeEventListener('beforeunload', handleUnload);
        };
    }, []);

    return (
        <ConfigContext.Provider value={{ config, setConfig, defaultConfig, updateFromConfig }}>
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfig = () => {
    return useContext(ConfigContext);
};