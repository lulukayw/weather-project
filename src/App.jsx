import { useState, useEffect } from 'react';
import { getLocationData } from './services/api';

function App() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    async function fetchLocation() {
      const data = await getLocationData({
        city: "Charlottesville",
        state: "VA",
        country: "US",
      });

      setLocation(data);
    }

    fetchLocation();
  }, []);

  return (
    <>
      <p>{ location ? JSON.stringify(location) : 'Loading...' }</p>
    </>
  )
}

export default App
