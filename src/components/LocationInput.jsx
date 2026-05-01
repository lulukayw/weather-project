import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { capitalizeFirstLetter } from '../services/cap';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';

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
            <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
                <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        sx={{ width: '100%' }}
                    >
                        <TextField
                            label="City"
                            variant="outlined"
                            sx={{ flex: 1 }}
                            onChange={(e) => setCity(capitalizeFirstLetter(e.target.value))}
                        />

                        <TextField
                            select
                            label="State"
                            sx={{ flex: 1 }}
                            onChange={(e) => setState(e.target.value)}
                        >
                            {Object.entries(states).map(([code, name]) => (
                                <MenuItem key={code} value={code}>{name}</MenuItem>
                            ))}
                        </TextField>

                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            sx={{ height: 56, minWidth: '80px' }}
                        >
                            Go
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </>
    )
}