import { Grid, Button, Typography } from "@mui/material"
import { red, grey, green } from "@mui/material/colors"
import { useSelector } from "react-redux"
import { useState } from "react"
import gestionApi from "../../api/gestionApi"
import { useAuthStore } from "../../hooks/useAuthStore";

export const NothingSelectedView = () => {

    const [isSubmitted, setIsSubmitted] = useState(false);

    //Get user from authSlice
    const { user } = useAuthStore();

    const handleClick = async (event) => {
        const body = {
            type: event,
            employeeId: user.uid,
            date: new Date(),
            name: user.name,
        }
        try {
            const response = await gestionApi.post('/eventosTrabajo/new', body);
            setIsSubmitted(true);
            console.log(response)
        } catch (error) {
            console.log(error)
        }

    }
    if (isSubmitted) {
        return (
            <Typography variant="h5" sx={{ mt: 2 }}>
                Evento registrado en el sistema!
            </Typography>
        )
    }
    return (
        <>
            <Grid container flexDirection='column' alignItems='center'>
                <Button 
                    variant="contained" 
                    fullWidth
                    sx={{
                        maxWidth: 480, 
                        height: 120,
                        border: '2px solid black', 
                        borderRadius: 5,
                        backgroundColor: green[300],
                        color: grey[900],
                        marginTop: 8
                    }}
                    onClick={() => handleClick('checkin')}
                    >

                    <Typography variant="h4">Entrada</Typography>
                </Button>

                <Button 
                    variant="contained" 
                    fullWidth
                    sx={{
                        maxWidth: 480, 
                        height: 120,
                        border: '2px solid black', 
                        borderRadius: 5,
                        backgroundColor: red[200],
                        color: grey[900],
                        marginTop: 8
                    }}
                    onClick={() => handleClick('checkout')}>

                    <Typography variant="h4">Salida</Typography>
                </Button>
            </Grid>
        </>
    )
}
