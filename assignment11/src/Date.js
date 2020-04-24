import React from 'react'

const today  = new Date();
const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
const td = today.toLocaleDateString("en-US", options);

export default function _Date_() {
    return (
        <div className="Date">
            Last updated {td} 16:00 CET
        </div>
    ) 
}