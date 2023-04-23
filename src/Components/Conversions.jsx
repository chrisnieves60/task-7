import { useState } from "react";
import axios from "axios";
const Conversions = () => {

    //States
    const [currencyValue, setCurrencyValue] = useState("");
    const [selectedCurrency, setSelectedCurrency] = useState(""); 
    const [btcConversion, setBtcConversion] = useState()

    //currency input
  const handleChange = (event) => {
    setCurrencyValue(event.target.value);
  };

  //selected currency
  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value)
  }; 

  //button used to perform conversion
  const handleClick = async () => {
    if(selectedCurrency == "Euro") {
      await axios.get("https://api.coindesk.com/v1/bpi/currentprice.json").then((data) => {
        setBtcConversion(currencyValue/parseFloat(data.data.bpi.EUR.rate.replace(",", "")))
    })
    }
    if(selectedCurrency == "USD") {
      await axios.get("https://api.coindesk.com/v1/bpi/currentprice.json").then((data) => {
        setBtcConversion(currencyValue/parseFloat(data.data.bpi.USD.rate.replace(",", "")))
    })
    }
    if(selectedCurrency == "GBP") {
      await axios.get("https://api.coindesk.com/v1/bpi/currentprice.json").then((data) => {
        setBtcConversion(currencyValue/parseFloat(data.data.bpi.GBP.rate.replace(",", "")))
    })
    }
  }

  const updateData = () => {
    const lastFetchTimestamp = localStorage.getItem("lastFetchTimestamp");

    if (
      lastFetchTimestamp &&
      Date.now() - lastFetchTimestamp < 5 * 60 * 1000
    ) {
      //If less than 5 minutes have passed, show an alert to the user
      alert("You can only fetch new data every 5 minutes.");
      return;
    } else {
      handleClick(); 
      localStorage.setItem("lastFetchTimestamp", Date.now());
    }
  };




    return(
        <div>
            <select value={selectedCurrency} onChange={handleCurrencyChange}>
                <option value="">Select a currency</option>
                <option value="Euro">Euro</option>
                <option value="GBP">GBP</option>
                <option value="USD">USD</option>
            </select>
            <input className="m-5" value = {currencyValue} onChange = {handleChange}/>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
               onClick={handleClick}>
                Convert
              </button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-5" onClick={updateData}>Update Data</button>
            <br/>
            <p className="text-white">{btcConversion==undefined ? '' : 'BTC:'} {btcConversion}</p>
        </div>
    )
}

export default Conversions