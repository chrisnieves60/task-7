import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';


const Navbar = () => {

  const [utcTime, setUtcTime] = useState([]); 

  const getAPI = async () => {
    await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json').then((data) => {
      console.log(data.data.time.updated)
      setUtcTime(data.data.time.updated)
    })
  } 

  useEffect(() => {
    getAPI();
  }, []);




  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  
  useEffect(() => {
    const interval = setInterval(() => {
      getAPI();
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  return (
    <nav className="bg-gray-800">
  <ul class="flex">
  <li class="mr-6">
    <a class="text-blue-500 hover:text-blue-800" href="/ConversionRates">Conversion Rates</a>
  </li>
  <li class="mr-6">
    <a class="text-blue-500 hover:text-blue-800" href="/Conversions">Conversions</a>
  </li>
  <p class="ml-auto text-white">{utcTime} - {currentTime.toLocaleTimeString()} Browser</p>
</ul>

</nav>
  );
};

export default Navbar;
