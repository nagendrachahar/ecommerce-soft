import React from 'react';

export const Submit = ({isSubmit}) => {
    return (
        
        <input type="submit" disabled={isSubmit} value="Login" className="submit_btn" /> 
        
    )
}
