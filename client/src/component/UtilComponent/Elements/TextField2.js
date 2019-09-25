import React, { useState, useEffect } from 'react';


export const Input = ({Type, Name, Value, Placeholder, Func}) => {
    const [focus, setFocus] = useState(false);

    useEffect(() => {
        if(Value !== "" && Value !== undefined){
            setFocus(true);
        }
    }, [Value]);
    
    return (
        <div className="form-control-wrapper">
            <label htmlFor={Name} className={focus ? "form-control-focus" : "null"}>{Placeholder}</label>
            <input type={Type} name={Name} 
                id={Name} 
                value={Value === undefined ? "" : Value} 
                onFocus={() => setFocus(true)} 
                onBlur={() => setFocus(Value !== "" ? true : false)} 
                onChange={Func} />
        </div>
        
    )
}
