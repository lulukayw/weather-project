
import { useEffect } from 'react';

export default function HourlyDisplay({ weather }) {
    useEffect(() => {
        if (weather) {
            console.log('Weather API Response:', weather);
        }
    }, [weather]);

    return (
        <div style={{ padding: '20px', marginTop: '20px' }}>
            <h2>Hourly Display</h2>
            <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', overflow: 'auto', maxHeight: '400px' }}>
                {JSON.stringify(weather.hourly, null, 2)}
            </pre>
        </div>
    );
}