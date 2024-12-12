import { useState, useEffect, useRef } from "react";
import { useConfig } from '../ConfigContext';
import { hexToRgb, rgbToHex } from "../Functions"
import ColorPicker from "./ColorPicker"

const LightBox = () => {
    const { config, setConfig } = useConfig()
    const [lightBox, setLightBox] = useState(config.lightBox)
    const lightBoxRef = useRef(lightBox);
    useEffect(() => {
        lightBoxRef.current = lightBox;
    }, [lightBox]);

    useEffect(() => {
        return () => {
            setConfig((prevConfig) => ({
                ...prevConfig,
                lightBox: lightBoxRef.current,
            }));
        };
    }, []);
    const handleColorChange = (newColor) => {
        setLightBox({ ...lightBox, color: hexToRgb(newColor) })
    };
    var r = document.querySelector(':root')
    r.style.setProperty('--box_light', `rgba(${lightBox.color[0]},${lightBox.color[1]},${lightBox.color[2]},${lightBox.on})`)
    return (
        <div className="settingsBox">
            <h2>Podświetlenie boxa</h2>
            <div className="btns">
                <label className="toggler-wrapper style-21">
                    <input type="checkbox" checked={lightBox.on === 1 ? true : false} onChange={() => setLightBox({ ...lightBox, on: lightBox.on === 1 ? 0 : 1 })} />
                    <div className="toggler-slider">
                        <div className="toggler-knob"></div>
                    </div>
                </label>
                <ColorPicker defaultColor={rgbToHex(lightBox.color[0], lightBox.color[1], lightBox.color[2])}
                    onColorChange={handleColorChange}
                    disabled={lightBox.on === 0 ? true : false} titleOnDisabled='Włącz podświetlenie boxa zanim zmienisz kolor' />
            </div>
        </div>
    )
}

export default LightBox 