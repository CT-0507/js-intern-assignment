import {memo} from 'react'
import './btn.css'

const Customebtn = memo(({type, color, onClick}) => {
    return (
        <button className={"btn-round center"} style={color &&{backgroundColor: `var(--${color})`, display: "inline"}} onClick={onClick}>
            <img style={{display: 'flex', padding: "5px", height: "auto", maxWidth: "100%"}} src={`./src/assets/${type}.png`} alt="button icon" />
        </button>
    );
})

export default Customebtn