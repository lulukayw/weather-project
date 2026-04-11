import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { useState } from 'react';

const states = {
    AL: "Alabama",
    AK: "Alaska",
    AZ: "Arizona",
    AR: "Arkansas",
    CA: "California",
    CO: "Colorado",
    CT: "Connecticut",
    DE: "Delaware",
    FL: "Florida",
    GA: "Georgia",
    HI: "Hawaii",
    ID: "Idaho",
    IL: "Illinois",
    IN: "Indiana",
    IA: "Iowa",
    KS: "Kansas",
    KY: "Kentucky",
    LA: "Louisiana",
    ME: "Maine",
    MD: "Maryland",
    MA: "Massachusetts",
    MI: "Michigan",
    MN: "Minnesota",
    MS: "Mississippi",
    MO: "Missouri",
    MT: "Montana",
    NE: "Nebraska",
    NV: "Nevada",
    NH: "New Hampshire",
    NJ: "New Jersey",
    NM: "New Mexico",
    NY: "New York",
    NC: "North Carolina",
    ND: "North Dakota",
    OH: "Ohio",
    OK: "Oklahoma",
    OR: "Oregon",
    PA: "Pennsylvania",
    RI: "Rhode Island",
    SC: "South Carolina",
    SD: "South Dakota",
    TN: "Tennessee",
    TX: "Texas",
    UT: "Utah",
    VT: "Vermont",
    VA: "Virginia",
    WA: "Washington",
    WV: "West Virginia",
    WI: "Wisconsin",
    WY: "Wyoming"
};

export default function LocationInput({ onLocationSubmit }) {
    const [city, setCity] = useState("");
    const [state, setState] = useState("");

    const handleSubmit = () => {
        if (!city || !state) return;
        onLocationSubmit({
            city,
            state,
            country: "US",
        });
    };

    return (
        <>
            <p>Location Input</p>
            <TextField id="outlined-basic" label="City" variant="outlined" onChange={(e) => setCity(e.target.value)} />
            <TextField
                id="outlined-select"
                select
                label="State"
                sx={{ minWidth: 200 }} 
                onChange={(e) => setState(e.target.value)}
            >
                {Object.entries(states).map(([code, name]) => (
                    <MenuItem key={code} value={code}>
                        {name}
                    </MenuItem>
                ))}
            </TextField>
            <Button variant="contained" onClick={handleSubmit}>Go</Button>
        </>
    )
}