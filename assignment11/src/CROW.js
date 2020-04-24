import React from 'react'

export default function CROW(props) {
  const{
    cOptions,
    c,
    changeC,
    amt,
    changeAmt
  } = props;
  return (
    <div>
      <input type="number" pattern="[0-9]*" inputMode="numeric" maxLength="16" className="input" value={amt} onChange={changeAmt}/>
      <select value={c} id="button" onChange={changeC}>
        {cOptions.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}