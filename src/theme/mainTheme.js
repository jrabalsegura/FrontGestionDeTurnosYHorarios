import { createTheme } from "@mui/material";
import { grey, orange, teal, deepPurple } from '@mui/material/colors';

export const mainTheme = createTheme({
    palette: {
        primary: {
            main: teal[700], // A modern, soothing teal
            contrastText: '#ffffff'
        },
        secondary: {
            main: deepPurple[100], // A vibrant, contemporary purple
            contrastText: '#ffffff'
        },
        error: {
            main: orange[900], // A deep, intense orange for errors
        },
        background: {
            default: grey[50], // A very light grey, clean and modern
            paper: grey[100]
        },
        text: {
            primary: grey[900], // Very dark grey for high contrast text
            secondary: grey[600] // Medium grey for secondary text
        }
    }
});