import React, { useEffect, useState } from 'react'
import "./style.css"
import Weathercard from './weathercard'

const Temp = () => {
const[searchValue, setSearchValue]=useState("Faisalabad")
const[tempInfo,setTempInfo]=useState({})
const getWeatherInfo= async () =>{
try {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=0684b58912b81fc5ada68845de40f363`;
  const res = await fetch(url);
  const data= await res.json();
  console.log(data)
  // main object  destructring
  const {temp, humidity, pressure} = data.main;
  const {main:weathermood}= data.weather[0];
  const {name}=data;
  const{speed} = data.wind;
  const {country,sunset}= data.sys;

  const myNewWeatherInfo={
    temp, humidity, pressure,weathermood,name,speed,country,sunset
  }
  setTempInfo(myNewWeatherInfo)
 
} catch (error) {
  console.log(error)
}
};
useEffect(()=>{
  getWeatherInfo();
},[]);
  return (
    <>
{/* search bar */}
     <div className="wrap">
        <div className="search">
            <input type="search" placeholder='search' id='search'  className='search' value={searchValue} onChange={(e)=>setSearchValue(e.target.value)}/>
       <button  type="button" className='searchButton' onClick={getWeatherInfo}>Search</button>
        </div>
        </div> 
       <Weathercard tempInfo={tempInfo}/>
    </>
  )
}

export default Temp
