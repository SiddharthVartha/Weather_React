import { useState } from 'react';
import styles from './index.module.css';
import clear from "./asset/clear.gif";
import cloudy from "./asset/cloudy.gif";
import rainy from "./asset/rainy.gif";
import snow from "./asset/snow.gif";
import thunderstrom from "./asset/thunderstrom.gif";
import drizzle from "./asset/drizzle.gif";
function App() {
  const [weatherData, setWeatheerData] = useState({});
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = dd + '/' + mm + '/' + yyyy;
  const handleInput = async () => {
    var YourAPI="Enter Your API"
    var toSearch = document.querySelector('input').value;
    var api = `https://api.openweathermap.org/data/2.5/weather?q=${toSearch}&appid=${YourAPI}`;
    var finaldata = await fetch(api);
    var finaldata = await finaldata.json()
    console.log(finaldata);
    setWeatheerData({ ...finaldata });
    var bdy=document.querySelector("body");
    if(finaldata.weather[0].main=="Rain"){
    bdy.style.backgroundImage=`url(${rainy})`
    }
    else if(finaldata.weather[0].main=="Thunderstorm"){
      bdy.style.backgroundImage=`url(${thunderstrom})`
    }
    else if(finaldata.weather[0].main=="Drizzle"){
      bdy.style.backgroundImage=`url(${drizzle})`
    }
    else if(finaldata.weather[0].main=="Snow"){
      bdy.style.backgroundImage=`url(${snow})`
    }
    else if(finaldata.weather[0].main=="Clear"){
      bdy.style.backgroundImage=`url(${clear})`
    }
    else if(finaldata.weather[0].main=="Clouds"){
      bdy.style.backgroundImage=`url(${cloudy})`
    }
    else{
      bdy.style.backgroundImage=``
    }
  }
  return (
    <div className={`${styles.dashboard}`}>
      <header>
      <div className={styles.searchBox}>
        <input type="text" placeholder='Enter Location'/><button onClick={handleInput}>Click</button>
      </div>
        <div className="f fe">
          <div className={styles.heading}>
            <h5 className={styles.date}>{today}</h5>
            {weatherData.weather ? <div className={styles.maindesc}><img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}></img><h2 className={styles.title}>{weatherData.weather[0].main}</h2></div> : null}
          </div>
        </div>
        {weatherData.main?
        <div className={styles.weather}> 
          <div>
            <strong>{Math.floor(weatherData.main.temp-273.15)}°C</strong>
            <p>Temp</p>
          </div>
          <div>
            <strong>{weatherData.main.humidity}%</strong>
            <p>Humidity</p>
          </div>
          <div>
            <strong>{weatherData.wind.speed}m/s</strong>
            <p>WindSpeed</p>
          </div> 
        </div>: null}
      </header>
    </div>
  );
}

export default App;
