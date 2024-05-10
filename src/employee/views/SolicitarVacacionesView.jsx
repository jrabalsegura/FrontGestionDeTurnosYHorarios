import { Grid, Typography, Button, Alert, Box } from "@mui/material"
import { DateRange } from "react-date-range"
import { useState } from "react"
import { addDays, isAfter } from "date-fns"
import gestionApi from "../../api/gestionApi"
import { useAuthStore } from "../../hooks/useAuthStore"
import Swal from "sweetalert2";

export const SolicitarVacacionesView = () => {

    const [state, setState] = useState([
        {
          startDate: addDays(new Date(), 2),
          endDate: addDays(new Date(), 7),
          key: 'selection'
        }
    ]);
    const [error, setError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { user } = useAuthStore();

    const handleSelect = (ranges) => {
        const { selection } = ranges;
        const tomorrow = addDays(new Date(), 1);
        if (isAfter(selection.startDate, tomorrow)) {
            setState([selection]);
            setError('');
        } else {
            setError('La fecha de inicio debe ser posterior a mañana.');
        }
    };

    const handleSubmit = async () => {
        console.log(state[0]);

        const body = {
            type: 'holiday',
            employeeId: user.uid,
            startDate: state[0].startDate,
            endDate: state[0].endDate,
            name: user.name
        }

        try {
            const response = await gestionApi.post('notificaciones/new', body);
            setIsSubmitted(true);
        } catch (error) {
            console.error('Failed to send notification:', error);
            Swal.fire('Error al intentar solicitar las vacaciones', error.message, 'error');
        }
    };

    if (isSubmitted) {
        return (
            <Box sx={{ display: 'flex', width: '80%', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
                <Typography variant="h5">
                    {`Gracias por solicitar tus vacaciones ${user.name}!`}
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    sx={{ mt: 5 }}
                    onClick={() => setIsSubmitted(false)}
                >
                    Ok
                </Button>
            </Box>
        )
    }

    return (
        <>
            <Grid container sx={{display:'flex', flexDirection:'column', alignItems:'center', marginBottom: 5, width:{ xs: '100%', md: '70%', lg: '45%' }}}>
                <Typography variant="h5" marginTop={5} marginBottom={5}>Selecciona el periodo deseado</Typography>
                
                <DateRange
                    editableDateInputs={true}
                    onChange={handleSelect}
                    moveRangeOnFirstSelection={false}
                    ranges={state}
                />
                <div style={{height: '24px', marginTop: '10px'}}>
                    {error && <Alert severity="error">{error}</Alert>}
                </div>
            </Grid>
            

            <Button variant="contained" sx={{width: '240px', height: '40px'}} onClick={handleSubmit}>
                <Typography>Solicitar</Typography>
            </Button>
        </>
    )
}

