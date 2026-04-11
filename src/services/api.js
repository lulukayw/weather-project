const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const getLocationData = async (q) => {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${q.city},${q.state},${q.country}&limit=1&appid=${API_KEY}`; 
    try {
        const results = await fetch(`${url}`);
        const data = await results.json();
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
}