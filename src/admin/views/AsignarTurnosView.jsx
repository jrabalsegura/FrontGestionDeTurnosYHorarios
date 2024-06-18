import { Grid, Typography, FormControl, InputLabel, Select, MenuItem, Button, Box } from "@mui/material";
import { DateRange } from "react-date-range";
import { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import gestionApi from '../../api/gestionApi';
import Swal from "sweetalert2";
import { useGetUsers } from "../../hooks/useGetUsers";
import { es } from "date-fns/locale";

const initialForm = {
    turno: '',
    empleado: ''
}

const formValidation = {
    turno: [
        value => value !== '',
        "Seleccione un turno"
    ],
    empleado: [
        value => value !== '',
        "Seleccione un empleado"
    ]
}

export const AsignarTurnosView = () => {

    const { users, setUsers, isLoading, hasError } = useGetUsers();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const {empleado, turno, onInputChange, isFormValid} = useForm(initialForm, formValidation);

    const handleSubmit = async () => {

        try {
            //If the type is morning, start shoud be 08:00 and end 16:00
            // else if the type is afternoon, start shoud be 16:00 and end 00:00
            let start;
            let end;

            if (turno === 'morning') {
                start = new Date(state[0].startDate.setHours(8, 0, 0, 0));
                end = new Date(state[0].endDate.setHours(16, 0, 0, 0));
            } else if (turno === 'afternoon') {
                start = new Date(state[0].startDate.setHours(16, 0, 0, 0));
                end = new Date(state[0].endDate.setHours(23, 59, 0, 0));
            }
            const body = {
                type: turno,
                employeeId: empleado,
                start: start,
                end: end
            }
            await gestionApi.post(`/shifts/new`, body);
            setIsSubmitted(true);
        } catch (error) {
            Swal.fire('Error al intentar crear el turno', error.response.data.msg, 'error')
        }     
    }    

    const [state, setState] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
    ]);

    if (isSubmitted) {
        return (
            <Box sx={{ display: 'flex', width: '80%', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
                <Typography variant="h5">
                    {`Turno asignado correctamente!`}
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

    if (hasError) {
        return <Typography variant="h5">No se ha podido realizar la conexión a la base de datos. Vuelva a intentarlo más tarde.</Typography>
    }

    return (
        <Grid container sx={{display:'flex', flexDirection:{ sm: 'column', lg: 'row' }, alignItems:'center', justifyContent:'space-around'}}>
            <Grid container sx={{display:'flex', flexDirection:'column', alignItems:'center', width:{ xs: '100%', md: '70%', lg: '45%' }}}>
                <Typography variant="h5" marginTop={2} marginBottom={2}>Seleccione día</Typography>
                <DateRange
                    editableDateInputs={true}
                    onChange={item => setState([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={state}
                    locale={es}
                />
            </Grid>

            <Grid container sx={{display:'flex', flexDirection:'column', alignItems:'center', width:{ xs: '100%', md: '70%', lg: '45%' }}}>
                <FormControl fullWidth sx={{marginTop: 4, minWidth: 240}}>
                    <InputLabel id="demo-simple-select-label">Seleccione un turno</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={turno}
                        name="turno"
                        label="Selecciona un turno"
                        onChange={onInputChange}
                    >
                        <MenuItem key="morning" value="morning">Mañana</MenuItem>
                        <MenuItem key="afternoon" value="afternoon">Tarde</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{marginTop: 4, minWidth: 240}}>
                    <InputLabel id="demo-simple-select-label">Seleccione un empleado</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="empleado"
                        value={empleado}
                        label="Selecciona un empleado"
                        onChange={onInputChange}
                    >
                        {users.map(user => (
                            <MenuItem key={user._id} value={user._id}>{user.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Grid container spacing={2} sx={{ mb: 2, mt: 4, width: '100%'}} justifyContent="center" alignItems="center">
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained" sx={{ width: "50%" }} disabled={!isFormValid} onClick={handleSubmit}>
                            <Typography>
                                Confirmar
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

