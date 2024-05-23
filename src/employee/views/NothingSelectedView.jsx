import { Grid, Button, Typography } from "@mui/material"
import { red, grey, green } from "@mui/material/colors"
import { useState } from "react"
import gestionApi from "../../api/gestionApi"
import { useAuthStore } from "../../hooks/useAuthStore";
import Swal from "sweetalert2";

export const NothingSelectedView = () => {

    const [isSubmitted, setIsSubmitted] = useState(false);
    const { user } = useAuthStore();

    const handleClick = async (event) => {
        const body = {
            type: event,
            employeeId: user.uid,
            date: new Date(),
            name: user.name,
        }

        try {
            await gestionApi.post('/eventosTrabajo/new', body);
            setIsSubmitted(true);
        } catch (error) {
            Swal.fire('Error al intentar registrar el evento', error.response.data.msg, 'error');
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
