import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function Header() {
    const [mode, setMode] = useState(true);

    const toggleMode = () => {
        setMode((prevMode) => !prevMode);
    };

    return (
        <>
            <ToggleButton
                value="color-mode"
                aria-label="toggle theme"
                onClick={toggleMode}
            >
                {mode ? <LightModeIcon /> : <DarkModeIcon />}
            </ToggleButton>
        </>
    );
}