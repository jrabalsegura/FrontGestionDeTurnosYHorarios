import { createTheme } from "@mui/material";
import { grey, orange, teal, deepPurple } from '@mui/material/colors';

export const mainTheme = createTheme({
    palette: {
        primary: {
            main: teal[500], // A modern, soothing teal
            contrastText: '#ffffff',
            extralight: teal[300]
        },
        secondary: {
            main: deepPurple[50], // A vibrant, contemporary purple
            dark: deepPurple[100],
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
            secondary: grey[600], // Medium grey for secondary text
            light: grey[50]
        }
    }
});
