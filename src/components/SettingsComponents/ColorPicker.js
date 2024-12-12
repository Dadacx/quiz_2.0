import React, { useState, useId } from 'react';

const ColorPicker = ({ defaultColor, onColorChange, disabled, titleOnDisabled }) => {
    const [color, setColor] = useState(defaultColor);
    const id = useId();
    const handleColorChange = (event) => {
        const newColor = event.target.value;
        setColor(newColor);

        if (onColorChange) {
            onColorChange(newColor);
        }
    };
    const styles = {
        colorPickerContainer: (disabled) => ({
          width: '102px',
          border: '1px solid var(--color_picker_border)',
          padding: '5px',
          borderRadius: '4px',
          display: 'inline-flex',
          alignItems: 'center',
          fontFamily: 'Arial, sans-serif',
          fontSize: '16px',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.6 : 1,
        }),
        colorBox: (color, disabled) => ({
          width: '25px',
          height: '25px',
          borderRadius: '4px',
          border: '1px solid var(--color_picker_border)',
          boxShadow: '0 0 3px rgba(0, 0, 0, 0.2)',
          backgroundColor: color,
          cursor: disabled ? 'not-allowed' : 'pointer',
        }),
        colorCode: (disabled) => ({
          padding: '2px 8px',
          fontSize: '14px',
          textTransform: 'uppercase',
          color: 'var(--text_color)',
          opacity: disabled ? 0.6 : 1,
          userSelect: 'none'
        }),
        colorInput: {
          position: 'relative',
          top: '18.8px',
          left: '-6.3px',
          zIndex: 10,
          padding: '0',
          width: '0',
          height: '0',
          border: '0',
        },
      };

    return (
        <div style={styles.colorPickerContainer(disabled)} 
        onClick={() => !disabled && document.getElementById(id).click()}
        title={disabled ? titleOnDisabled : ''}>
            <input type="color" style={styles.colorInput} id={id} value={color} onChange={handleColorChange} disabled={disabled} />
            <label>
                <div style={{ ...styles.colorBox(color,disabled)}}></div>
            </label>
            <div style={styles.colorCode(disabled)}>{color}</div>
        </div>
    );
};

export default ColorPicker;