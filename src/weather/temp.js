
import React, { useEffect, useState } from 'react'
import Weathercard from "./weathercard";
import  './style.css';

const Temp = () => {
    const [searchValue,SetsearchValue]=useState("pune");
    const [tepmInfo,SetTepmInfo]=useState({});

    const getWeatherInfo = async () => {
        try{
           
            let url=` https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=aeab2f578c9b40eba407d684eb0c90e5`;
            const res = await fetch(url);
            const data =await res.json();
            const {temp, pressure, humidity} = data.main;
            const {main: weathermood} = data.weather[0];
            const {name} = data;
            const {speed}=data.wind;
            const {country, sunset}=data.sys;

            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,
              };  
              SetTepmInfo(myNewWeatherInfo);
        }
        catch(error){
            console.log(error);
        }

    };
    useEffect(() => {
        getWeatherInfo();
      }, []);
  return (
   <>
   <div className="wrap">
       <div className="search">
           <input type="search" placeholder="search..." autofocus id="search" value={searchValue} onChange={(e)=>SetsearchValue(e.target.value)} className="searchTerm"/>
            <button className="searchButton" type="button" onClick={getWeatherInfo}>Search</button>
       </div>
   </div>
   <Weathercard {...tepmInfo} />

   </>
  );
};

export default Temp;




