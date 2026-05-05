const API_KEY_WEATHER = import.meta.env.VITE_WEATHER_API_KEY;
const API_KEY_HOURLY = import.meta.env.VITE_HOURLY_API_KEY;
const API_KEY_NEWS = import.meta.env.VITE_NEWS_API_KEY;

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


export const getAllData = async (q) => {
    const location = await getLocationData(q);
    if (!location || location.length === 0) return null;

    const lat = location[0].lat;
    const lon = location[0].lon;

    try {
        const [currentRes, forecastRes, hourlyRes, newsRes] = await Promise.all([
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY_WEATHER}`),
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY_WEATHER}`),
            fetch(`https://api.tomorrow.io/v4/timelines?location=${lat},${lon}&fields=temperature,humidity,windSpeed,precipitationProbability&timesteps=1h&units=metric&apikey=${API_KEY_HOURLY}`),
            fetch(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${API_KEY_NEWS}`)
        ]);

        const [current, forecast, hourly, news] = await Promise.all([
            currentRes.json(),
            forecastRes.json(),
            hourlyRes.json(),
            newsRes.json()
        ]);

        return { current, forecast, hourly, news };
    } catch (error) {
        console.log(error);
        return null;
    }
}
