import React, { useState } from 'react';


export const InputFile = ({Name, Placeholder, Func}) => {
    const [focus] = useState(true);
    
    return (
        <div className="form-control-wrapper">
            <label htmlFor={Name} className={focus ? "form-control-focus" : "null"}>{Placeholder}</label>
            <input type="file" name={Name} 
                id={Name} 
                onChange={Func} />
        </div>
    )
}
