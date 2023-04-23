import axios from "axios";
import { useEffect, useState } from "react";

const ConversionRates = () => {
  const [sort, setSort] = useState(null);
  const [rates, setRates] = useState([]);
  // Get the stored timestamp from local storage

  const getConversionData = async () => {
    await axios
      .get("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then(({ data }) => {
        const ratesArr = [
          {
            currency: "USD",
            rate: 1 / parseFloat(data.bpi.USD.rate.replace(",", "")),
            btcRate: data.bpi.USD.rate,
          },
          {
            currency: "EUR",
            rate: 1 / parseFloat(data.bpi.EUR.rate.replace(",", "")),
            btcRate: data.bpi.EUR.rate,
          },
          {
            currency: "GBP",
            rate: 1 / parseFloat(data.bpi.GBP.rate.replace(",", "")),
            btcRate: data.bpi.GBP.rate,
          },
        ];

        setRates(ratesArr);
      });
  };

  const updateData = () => {
    const lastFetchTimestamp = localStorage.getItem("lastFetchTimestamp");

    if (lastFetchTimestamp && Date.now() - lastFetchTimestamp < 5 * 60 * 1000) {
      //If less than 5 minutes have passed, show an alert to the user
      alert("You can only fetch new data every 5 minutes.");
      return;
    } else {
      getConversionData();
      localStorage.setItem("lastFetchTimestamp", Date.now());
    }
  };

  useEffect(() => {
    // This function will run on the first render of the component
    getConversionData();
  }, []);

  const sortData = () => {
    const sortedRates = [...rates];
    const isAscending = sort === "asc";
    sortedRates.sort((a, b) => {
      if (isAscending) {
        return a.rate < b.rate ? -1 : 1; //descending order
      } else {
        return a.rate > b.rate ? -1 : 1; //ascending order
      }
    });
    setRates(sortedRates);
    setSort(isAscending ? "desc" : "asc");
  };

  return (
    <div>
      {rates.map((rate, index) => (
        <li key={index} data-testid={rate.currency} className="text-gray-400">
          {`1 ${rate.currency} to ${rate.rate} BTC, 1 BTC to ${rate.btcRate} ${rate.currency}`}
        </li>
      ))}
      <br />
      <button
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        onClick={updateData}
      >
        Refresh
      </button>
      <button
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow ml-5"
        onClick={sortData}
      >
        Sort
      </button>
    </div>
  );
};

export default ConversionRates;
