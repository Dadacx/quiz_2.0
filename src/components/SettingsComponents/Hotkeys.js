import { useState, useEffect, useRef } from "react";
import { useConfig } from '../ConfigContext';

const Hotkeys = () => {
    const { config, setConfig, defaultConfig } = useConfig()
    const [hotkeys, setHotkeys] = useState(config.hotkeys)
    const [key, setKey] = useState(null)
    const hotkeysRef = useRef(hotkeys);
    useEffect(() => {
        hotkeysRef.current = hotkeys;
    }, [hotkeys]);
    useEffect(() => {
        return () => {
            setConfig((prevConfig) => ({
                ...prevConfig,
                hotkeys: hotkeysRef.current,
            }));
        };
    }, []);
    function displayHotkey(key) {
        const keyMap = {
            Digit0: '0', Digit1: '1', Digit2: '2', Digit3: '3', Digit4: '4',
            Digit5: '5', Digit6: '6', Digit7: '7', Digit8: '8', Digit9: '9',
            Minus: '-', Equal: '=', BracketLeft: '[', BracketRight: ']',
            Semicolon: ';', Quote: "'", Backslash: '\\', Comma: ',', Period: '.', Slash: '/',
            Backquote: '`',
            Numpad0: 'Num0', Numpad1: 'Num1', Numpad2: 'Num2', Numpad3: 'Num3',
            Numpad4: 'Num4', Numpad5: 'Num5', Numpad6: 'Num6', Numpad7: 'Num7',
            Numpad8: 'Num8', Numpad9: 'Num9', NumpadAdd: 'Num+', NumpadSubtract: 'Num-', NumpadEnter: 'NumEnter',
            NumpadMultiply: 'Num*', NumpadDivide: 'Num/', NumpadDecimal: 'Num.',
            ShiftLeft: 'Lewy Shift', ShiftRight: 'Prawy Shift', ControlLeft: 'Lewy Ctrl', ControlRight: 'Prawy Ctrl',
            AltLeft: 'Lewy Alt', AltRight: 'Prawy Alt', ArrowLeft: 'Strzałka w lewo', ArrowRight: 'Strzałka w prawo',
            ArrowUp: 'Strzałka w górę', ArrowDown: 'Strzałka w dół', Space: 'Spacja',
        };
        if (key === 'test') return <span className="blinking">{">\u00A0\u00A0\u00A0\u00A0\u00A0<"}</span>
        if (key === null) {
            return '[Brak]'
        } else if (key.startsWith('Key')) {
            return key.replace('Key', ''); // Convert KeyA -> A, KeyB -> B
        } else if (key in keyMap) {
            return keyMap[key];
        } else {
            return key; // Fallback to original code if not in map
        }
    }

    function handleChangeHotkey() {
        return new Promise((resolve) => {
            const handleKeyDown = (e) => {
                document.removeEventListener('keyup', handleKeyDown);
                resolve(e.code);
            };

            document.addEventListener('keyup', handleKeyDown);
        });
    }

    async function changeHotkey(hotkey, index) {
        setHotkeys({
            ...hotkeys,
            [hotkey]: hotkeys[hotkey].map((key, i) => i === index ? 'test' : key)
        });
        var newHotkey = await handleChangeHotkey();
        newHotkey = newHotkey === 'Delete' ? null : newHotkey;
        setHotkeys({
            ...hotkeys,
            [hotkey]: hotkeys[hotkey].map((key, i) => i === index ? newHotkey : key)
        });
    }

    return (
        <div className="settingsBox">
            <h2>Skróty klawiszowe</h2>
            <div className="hotkeyBox">
                <span>Następne pytanie</span>
                <div className="hotkeyBtns">
                    <span onClick={() => changeHotkey('next', 0)}>{displayHotkey(hotkeys.next[0])}</span>
                    <span onClick={() => changeHotkey('next', 1)}>{displayHotkey(hotkeys.next[1])}</span>
                </div>
            </div>
            <div className="hotkeyBox">
                <span>Poprzednie pytanie</span>
                <div className="hotkeyBtns">
                    <span onClick={() => changeHotkey('previous', 0)}>{displayHotkey(hotkeys.previous[0])}</span>
                    <span onClick={() => changeHotkey('previous', 1)}>{displayHotkey(hotkeys.previous[1])}</span>
                </div>
            </div>
            <div className="hotkeyBox">
                <span>Pokaż odpowiedź</span>
                <div className="hotkeyBtns">
                    <span onClick={() => changeHotkey('showAnswer', 0)}>{displayHotkey(hotkeys.showAnswer[0])}</span>
                    <span onClick={() => changeHotkey('showAnswer', 1)}>{displayHotkey(hotkeys.showAnswer[1])}</span>
                </div>
            </div>
        </div>
    )
}

export default Hotkeys 