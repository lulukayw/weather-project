import LocationInput from './LocationInput';
import WeatherDisplay from './WeatherDisplay';
import HourlyDisplay from './HourlyDisplay';
import Header from './Header';
import { useState, useEffect } from 'react';
import { getAllData } from '../services/api';
import WeeklyDisplay from './WeeklyDisplay';
import NewsDisplay from './NewsDisplay';

export default function Layout() {
    const [location, setLocation] = useState(null);
    const [weather, setWeather] = useState(null);
    const [hourlyWeather, setHourlyWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [news, setNews] = useState(null);

    useEffect(() => {
        async function fetchWeather() {
            const allData = await getAllData(location);
            if (allData) {
                setWeather(allData.current);
                setForecast(allData.forecast);
                setHourlyWeather(allData.hourly);
                setNews(allData.news);
            }
        }

        if (location) {
            fetchWeather();
        }
    }, [location]);

    return (
        <>
            {/* <Header /> */}
            {location ? (
                <>
                    <WeatherDisplay location={location} weather={weather} />
                    <HourlyDisplay weather={hourlyWeather} />
                    <WeeklyDisplay weather={forecast} />
                    <NewsDisplay news={news} />
                </>
            ) : (
                <LocationInput onLocationSubmit={setLocation} />
            )}
        </>
    );
}