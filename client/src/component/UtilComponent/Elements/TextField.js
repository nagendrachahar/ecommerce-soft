import React from 'react';

export const TextField = ({Type, Name, Value, Placeholder, Func}) => {
    return (
        
        <input type={Type} name={Name} value={Value} className="textfield" placeholder={Placeholder} onChange={Func} />
        
    )
}
