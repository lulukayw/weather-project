import LocationInput from './LocationInput';
import WeatherDisplay from './WeatherDisplay';
import HourlyDisplay from './HourlyDisplay';
import Header from './Header';
import { useState, useEffect } from 'react';
import { getCurrentWeather, getHourlyWeather } from '../services/api';

export default function Layout() {
    const [location, setLocation] = useState(null);
    const [weather, setWeather] = useState(null);
    const [hourlyWeather, setHourlyWeather] = useState(null);

    useEffect(() => {
        async function fetchWeather() {
            const data = await getCurrentWeather(location);
            setWeather(data);
            
            const hourlyData = await getHourlyWeather(location);
            setHourlyWeather(hourlyData);
        }

        if (location) {
            fetchWeather();
        }
    }, [location]);

    return (
        <>
            <Header />
            {location ? (
                <>
                    <WeatherDisplay location={location} weather={weather} />
                    <HourlyDisplay weather={hourlyWeather} />
                </>
            ) : (
                <LocationInput onLocationSubmit={setLocation} />
            )}
        </>
    );
}