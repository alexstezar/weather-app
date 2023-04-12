import startBg from "./pictures/start_bg.jpg";
import clearDay from "./pictures/clearDay_bg.jpg";
import cloudsDay from "./pictures/cloudsDay_bg.jpg";
import rainDay from "./pictures/rainDay_bg.jpg";
import sunnyDay from "./pictures/sunnyDay_bg.jpg";
import clearNight from "./pictures/clearNight_bg.jpg";
import notclearNight from "./pictures/notclearNight_bg.jpg";
import React, {useState, useEffect} from "react";
import axios from "axios";
///import UilReact from "@iconscout/react-unicons/icons/uil-react"
import {
    UilTemperature,
    UilTear,
    UilWind,
} from "@iconscout/react-unicons"
import FavoriteCities from "./components/FavoriteCities";



function App() {


    const [data, setData] = useState({});
    const [location, setLocation] = useState('');
    const [theme, setTheme] = useState(startBg);
    const [forecastData, setForecastData] = useState([]);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=afd21f85d53737015ccf714380d168fc`
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=afd21f85d53737015ccf714380d168fc`
    const searchLocation = (event) => {
        if (event.key === 'Enter') {
            axios.get(url).then((response) => {
                setData(response.data)
                console.log(response.data)
                setThemeFeature(response.data)
            });
            axios.get(forecastUrl).then((response) =>{
                const forecastList = response.data.list.filter((weather) => {
                    return new Date(weather.dt_txt).getHours() === 12;
                })
                setForecastData(forecastList);
            })
            setLocation('')
        }
    }

    const getDateName = (dateString) => {
        var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var d = new Date(dateString);
        return days[d.getDay()];
    }

    const setThemeFeature = (data) => {
        const time = Math.floor(new Date().getTime() / 1000);
        if(data.sys.sunrise <= time && data.sys.sunset >= time){
            if(data.weather[0].main === "Clear") setTheme(clearDay);
            else if(data.weather[0].main === "Clouds") setTheme(cloudsDay);
            else if(data.weather[0].main === "Rain") setTheme(rainDay);
            else if(data.weather[0].main === "Sunny") setTheme(sunnyDay);
        }
        else{
            if(data.weather[0].main === "Clear") setTheme(clearNight);
            else setTheme(notclearNight);
        }

    }

    const getFavouriteLocation = (city) => {

        const newUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=afd21f85d53737015ccf714380d168fc`;
        const newforecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=afd21f85d53737015ccf714380d168fc`

        axios.get(newUrl).then((response) => {
            setData(response.data)
            console.log(response.data)
            setThemeFeature(response.data)
        });
        axios.get(newforecastUrl).then((response) =>{
            const forecastList = response.data.list.filter((weather) => {
                return new Date(weather.dt_txt).getHours() === 12;
            })
            setForecastData(forecastList);
        })
        setLocation('')
    }

    return (
        <div className="app" style={{backgroundImage: `url(${theme})`}}>
            <div className="container">
                <div className="top">
                    <div className="favorites">
                        <h3>List of favorites cities</h3>
                        <FavoriteCities sendCity = {getFavouriteLocation}/>
                    </div>
                </div>


                <div className="middle">
                    <div className="search">
                        <input value={location}
                           onChange={event => setLocation(event.target.value)}
                           onKeyPress={searchLocation}
                           placeholder='Enter Location'
                           type="text"
                        />
                    </div>

                    <div className="location">
                        <h1>{data.name}</h1>
                    </div>

                    <div className="details">
                        <div className="description">
                            {data.weather ? <p>{data.weather[0].main}</p> : null}
                        </div>

                        <div className="temperature">
                            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
                        </div>

                        {data.name != undefined &&

                            <div className="more">
                                <div className="feels_like">
                                    <UilTemperature size={15}/>
                                    <p1>Feels Like: </p1>
                                    {data.main ? <p1 className='bold'>{data.main.feels_like.toFixed()} °C</p1> : null}
                                </div>

                                <div className="wind_speed">
                                    <UilWind size={15}/>
                                    <p1>Wind: </p1>
                                    {data.wind ? <p1 className='bold'>{data.wind.speed.toFixed()} Km/h</p1> : null}
                                </div>

                                <div className="humidity">
                                    <UilTear size={15}/>
                                    <p1>Humidity: </p1>
                                    {data.main ? <p1 className='bold'>{data.main.humidity}%</p1> : null}
                                </div>
                            </div>
                        }
                    </div>
                </div>


                <div className="bottom">
                    {forecastData.length != 0 &&
                        <div className="hourlyForecast">
                            <h3>Daily Forecast</h3>
                            <hr />
                        </div>
                    }
                    {forecastData.length != 0 &&
                        <div className="forecast">
                            {
                                forecastData.map((dayWeather) =>(
                                    <div>
                                        <p>{getDateName(dayWeather.dt_txt)}</p>
                                        <p>{dayWeather.main.feels_like.toFixed()} °C</p>
                                    </div>
                            ))}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}


export default App;
