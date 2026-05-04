const API_KEY_WEATHER = import.meta.env.VITE_WEATHER_API_KEY;
const API_KEY_HOURLY = import.meta.env.VITE_HOURLY_API_KEY;

const getLocationData = async (q) => {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${q.city},${q.state},${q.country}&limit=1&appid=${API_KEY_WEATHER}`;
    try {
        const results = await fetch(`${url}`);
        const data = await results.json();
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const getCurrentWeather = async (q) => {
    const location = await getLocationData(q);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location[0].lat}&lon=${location[0].lon}&appid=${API_KEY_WEATHER}`;
    try {
        const results = await fetch(`${url}`);
        const data = await results.json();
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const getHourlyWeather = async (q) => {
    const location = await getLocationData(q);

    const url = `https://api.tomorrow.io/v4/timelines?location=${location[0].lat},${location[0].lon}&fields=temperature,humidity,windSpeed,precipitationProbability&timesteps=1h&units=metric&apikey=${API_KEY_HOURLY}`;

    try {
        const results = await fetch(url);
        const data = await results.json();

        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
}