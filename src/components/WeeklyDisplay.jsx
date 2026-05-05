import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

const toF = (c) => Math.round(((c - 273.15) * 9 / 5) + 32);
const mpsToMph = (m) => Math.round(m * 2.237);

const formatDay = (isoString) => {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

export const groupByDay = (list) => {
    const days = {};
    list.forEach((item) => {
        const date = item.dt_txt.split(' ')[0]; 
        if (!days[date]) days[date] = [];
        days[date].push(item);
    });
    return Object.entries(days).map(([date, items]) => ({
        date,
        tempMin: Math.min(...items.map(i => i.main.temp_min)),
        tempMax: Math.max(...items.map(i => i.main.temp_max)),
        pop: Math.max(...items.map(i => i.pop)), // highest precip chance of the day
        windSpeed: items[Math.floor(items.length / 2)].wind.speed, // midday wind
    }));
};

export default function WeeklyDisplay({ weather }) {
    const grouped = groupByDay(weather?.list ?? []);

    return (
        <>
            {weather ?
                <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 2 }}>
                    <CardContent>
                        <Typography variant="h5">5-Day Forecast</Typography>

                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            {grouped.map((day) => (
                                <Box key={day.date} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="text.secondary" sx={{ width: 100 }}>
                                        {formatDay(day.date)}
                                    </Typography>
                                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.25, width: 70, whiteSpace: 'nowrap' }}>
                                        💧{Math.round(day.pop * 100)}%
                                    </Typography>
                                    <Typography variant="body2" sx={{ width: 56, textAlign: 'right' }}>
                                        {mpsToMph(day.windSpeed)} mph
                                    </Typography>
                                    <Typography variant="body1" fontWeight={600} sx={{ width: 80, textAlign: 'right' }}>
                                        {toF(day.tempMin)}° – {toF(day.tempMax)}°
                                    </Typography>
                                </Box>
                            ))}
                        </Box>

                    </CardContent>
                </Card>
                : <CircularProgress aria-label="Loading…" />}
        </>
    );
}