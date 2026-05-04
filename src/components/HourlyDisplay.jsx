import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

const toF = (c) => Math.round(c * 9 / 5 + 32);
const mpsToMph = (m) => Math.round(m * 2.237);

const formatHour = (isoString) => {
    const d = new Date(isoString);
    const hr = d.getHours();
    if (hr === 0) return '12 AM';
    if (hr < 12) return `${hr} AM`;
    if (hr === 12) return '12 PM';
    return `${hr - 12} PM`;
};

export default function HourlyDisplay({ weather }) {
    const intervals = weather?.data?.timelines?.[0]?.intervals ?? [];

    return (
        <>
            {weather ?
                <Card sx={{ maxWidth: 600, mx: 'auto', mt: 2, p: 2 }}>
                    <CardContent>
                        <Typography variant="h5">Hourly Forecast</Typography>

                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ display: 'flex', overflowX: 'auto', gap: 2, pb: 1 }}>
                            {intervals.slice(0, 12).map((interval) => {
                                const v = interval.values;
                                return (
                                    <Box key={interval.startTime} sx={{ minWidth: 64, textAlign: 'center', flexShrink: 0 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            {formatHour(interval.startTime)}
                                        </Typography>
                                        <Typography variant="body1" fontWeight={600}>
                                            {toF(v.temperature)}°F
                                        </Typography>
                                        <Typography variant="body2">💧{v.precipitationProbability}%</Typography>
                                        <Typography variant="body2">{mpsToMph(v.windSpeed)} mph</Typography>
                                    </Box>
                                );
                            })}
                        </Box>

                    </CardContent>
                </Card>
                : <CircularProgress aria-label="Loading…" />}
        </>
    );
}