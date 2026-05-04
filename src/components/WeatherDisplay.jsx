import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { capitalizeFirstLetter } from '../services/cap';

export default function WeatherDisplay({ location, weather }) {

    const toF = (k) => Math.round((k - 273.15) * 9 / 5 + 32);
    const iconCode = weather?.weather[0]?.icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    return (
        <>
            {weather ?
                <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 2 }}>
                    <CardContent>
                        <Typography variant="h5">{location.city}, {location.state}</Typography>

                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                            <Typography variant="h2">{toF(weather.main.temp)}°F</Typography>

                            <Box
                                component="img"
                                src={iconUrl}
                                alt={weather.weather[0].description}
                                sx={{ width: 80, height: 80 }}
                            />

                            <Box>
                                <Typography variant="body1">
                                    {capitalizeFirstLetter(weather.weather[0].description)}
                                </Typography>
                            </Box>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Grid container spacing={10} sx={{ justifyContent: 'center' }}>
                            <Grid item xs={6} sx={{ textAlign: 'center' }}><Typography variant="body2">Humidity</Typography><Typography>{weather.main.humidity}%</Typography></Grid>
                            <Grid item xs={6} sx={{ textAlign: 'center' }}><Typography variant="body2">Wind</Typography><Typography>{Math.round(weather.wind.speed * 2.237)} mph</Typography></Grid>
                            <Grid item xs={6} sx={{ textAlign: 'center' }}><Typography variant="body2">Feels Like</Typography><Typography>{toF(weather.main.feels_like)}°F</Typography></Grid>
                            <Grid item xs={6} sx={{ textAlign: 'center' }}><Typography variant="body2">Visibility</Typography><Typography>{Math.round(weather.visibility / 1609)} mi</Typography></Grid>
                        </Grid>

                    </CardContent>
                </Card>
                : <CircularProgress aria-label="Loading…" />}
        </>
    );
};