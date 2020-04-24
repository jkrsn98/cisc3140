import React, {useEffect, useState} from 'react';
import './App.css';
import CROW from './CROW';
import Header from './Header';
import Footer from './Footer';
import _Date_ from './Date';
const DEFAULT_API_URL= "https://api.exchangeratesapi.io/latest?base=USD&symbols=GBP,EUR,RUB,CNY,HKD,JPY,KRW";
const API_URL = "https://api.exchangeratesapi.io/latest";

function App() {
  const [cOptions, setCOptions] = useState([]);
  const [exchangeRate, setRate] = useState(-99);
  const [fromC, setFromC] = useState();
  const [toC, setToC] = useState();
  const [amt, setAmt] = useState('1');
  console.log(exchangeRate);
  const [fromOrTo, setFromOrTo] = useState(true);


  var toAmt, fromAmt;
  if(fromOrTo){
    fromAmt=amt;
    toAmt = amt*exchangeRate;
  }else{
    toAmt=amt;
    fromAmt=amt/exchangeRate;
  }


  useEffect( () => {
    fetch(DEFAULT_API_URL).then(res=>res.json()).then(data=>{
      console.log(data);
      const firstCurrency=Object.keys(data.rates)[0];
      setCOptions(
        [data.base, ...Object.keys(data.rates)]
      );
      setFromC(
        data.base
      );
      setToC(
        Object.keys(data.rates)[0]
      );
      setRate(
        data.rates[firstCurrency]
      );
    });

  }, []);


  useEffect( () => {
    if(fromC!=null&&toC!=null){
    fetch(API_URL + "?base="+fromC+"&symbols="+toC)
      .then(res=>res.json())
      .then(data=>setRate(data.rates[toC]))
    }
  }, [fromC, toC]);


  function handleFromChange(e){
    setAmt(e.target.value);
    setFromOrTo(true);
  }

  function handleToChange(e){
    setAmt(e.target.value);
    setFromOrTo(false);
  }


  return (
    <>
      <Header/>
      <div className="main">
        <CROW
          cOptions={cOptions}
          c={fromC}
          changeC={e => setFromC(e.target.value)}
          changeAmt={handleFromChange}
          amt={fromAmt}
        />
        <div id="equals">=</div>
        <CROW
          cOptions={cOptions}
          c={toC}
          changeC={e => setToC(e.target.value)}
          changeAmt={handleToChange}
          amt={toAmt}
        />
      </div>
      <_Date_/>

      <Footer/>
    </>
  );
  
}

export default App;