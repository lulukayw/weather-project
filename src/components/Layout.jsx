import LocationInput from './LocationInput';
import WeatherDisplay from './WeatherDisplay';
import Header from './Header';
import { useState } from 'react';

export default function Layout() {
    const [location, setLocation] = useState(null);

    return (
        <>
            <Header />
            {location ? <WeatherDisplay location={location} /> : <LocationInput onLocationSubmit={setLocation} />}
        </>
    );
}