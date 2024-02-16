import React, { useEffect, useState } from "react";
// import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "../../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "./Converter.css";
import { countryList } from "../data/codes";
// console.log(countryList);

const Converter = () => {
  const BASE_URL =
    "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
  const [CountryCode1, setCountryCode1] = useState("US");
  const [CountryCode2, setCountryCode2] = useState("IN");
  const [select1, setSelect1] = useState("USD");
  const [select2, setSelect2] = useState("INR");
  const [amount, setAmount] = useState(1);
  const [finalVal, setFinalVal] = useState(0);

  const handleFlagChange = (e) => {
    //  console.log(e.target.value);
    setFinalVal(0);
    console.log(e.target.name);
    if (e.target.name === "from") {
      let currcode = e.target.value;
      let counCode = countryList[currcode];
      setCountryCode1(counCode);
      setSelect1(e.target.value);
    } else if (e.target.name === "to") {
      let currcode = e.target.value;
      let counCode = countryList[currcode];
      setCountryCode2(counCode);
      setSelect2(e.target.value);
    }
    // console.log(counCode);
  };

  //   useEffect(() => {
  //     const URL = `${BASE_URL}/${select1.toLowerCase()}/${select2.toLowerCase()}.json`;
  //     console.log("Running");
  //   }, [select1, select2]);

  //   useEffect(() => {
  //     (async () => {
  //       const URL = `${BASE_URL}/${select1.toLowerCase()}/${select2.toLowerCase()}.json`;
  //       // console.log(URL);
  //       let response = await fetch(URL);
  //       // console.log(response);
  //       let data = await response.json();
  //       // console.log(data);
  //       let rate = data[select2.toLowerCase()];
  //       // console.log(rate);
  //       let finalVal = amount * rate;
  //       console.log(amount);
  //       console.log(finalVal);
  //       setFinalVal(finalVal);
  //     })();
  //   }, [amount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(amount);
    // console.log(BASE_URL);
    // console.log(CountryCode1.toLowerCase());
    // console.log(CountryCode2.toLowerCase());
    // console.log(select1.toLowerCase());
    // console.log(select2.toLowerCase());
    if (amount === "" || amount < 1) {
      setAmount(1);
      console.log(amount); //Here  setAmount is Asynchronous function . Here, value prints the previous value which is delay in updating value
    }

    //Hew we took the below code and kept inside useEffect() which is dependent on amount.

    const URL = `${BASE_URL}/${select1.toLowerCase()}/${select2.toLowerCase()}.json`;
    // console.log(URL);
    let response = await fetch(URL);
    // console.log(response);
    let data = await response.json();
    // console.log(data);
    let rate = data[select2.toLowerCase()];
    // console.log(rate);
    let finalVal = amount * rate;
    console.log(amount);
    console.log(finalVal);
    setFinalVal(finalVal);
  };

  return (
    <div className="container-box">
      <h2>Currency Converter</h2>
      <form>
        <div className="amount">
          <p>Enter Amount</p>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="dropdown">
          <div className="from">
            <p>From</p>
            <div className="select-container">
              <img
                src={`https://flagsapi.com/${CountryCode1}/flat/64.png`}
                alt=""
              />
              <select name="from" value={select1} onChange={handleFlagChange}>
                {/* <option value="USD">USD</option>
                    <option value="INR">INR</option>
                    <option value="EUR">EUR</option>
                    <option value="AUD">AUD</option> */}

                {Object.keys(countryList).map((currcode) => (
                  <option key={currcode} value={currcode}>
                    {currcode}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <i className="fa-solid fa-arrow-right-arrow-left"></i>
          <div className="from">
            <p>To</p>
            <div className="select-container">
              <img
                src={`https://flagsapi.com/${CountryCode2}/flat/64.png`}
                alt=""
              />
              <select name="to" value={select2} onChange={handleFlagChange}>
                {/* <option value="USD">USD</option>
                <option value="INR">INR</option>
                <option value="EUR">EUR</option>
                <option value="AUD">AUD</option> */}
                {Object.keys(countryList).map((currcode) => (
                  <option key={currcode} value={currcode}>
                    {currcode}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="msg">
          {finalVal ? `${amount} ${select1} = ${finalVal} ${select2}` : ""}
        </div>
        <button onClick={handleSubmit}>Get Exchange Rate</button>
      </form>
    </div>
  );
};

export default Converter;
