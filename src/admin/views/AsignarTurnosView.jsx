import { Grid, Typography, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import { DateRange } from "react-date-range";
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { getUsers } from '../helpers';
import gestionApi from '../../api/gestionApi';

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

    const [users, setUsers] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const {empleado, turno, onInputChange, isFormValid} = useForm(initialForm, formValidation);

    useEffect(() => {
        const fetchUsers = async () => {
            const fetchedUsers = await getUsers();
            setUsers(fetchedUsers);
        };
        fetchUsers();
        console.log(users);
    }, []);

    const handleSubmit = async () => {

        try {
            //Create JSon with values from name, username, password and sallary to send
            const body = {
                type: turno,
                employeeId: empleado,
                start: state[0].startDate,
                end: state[0].endDate
            }
            const response = await gestionApi.post(`/shifts/new`, body);
            console.log(response);
            setIsSubmitted(true);
        } catch (error) {
            console.log(error);
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
            <Typography variant="h5" sx={{ mt: 2 }}>
                Turno asignado correctamente!
            </Typography>
        )
    }


    return (
        <Grid container sx={{display:'flex', flexDirection:{ sm: 'column', lg: 'row' }, alignItems:'center', justifyContent:'space-around'}}>
            <Grid container sx={{display:'flex', flexDirection:'column', alignItems:'center', width:{ xs: '100%', md: '70%', lg: '45%' }}}>
                <Typography variant="h5" marginTop={5} marginBottom={5}>Selecciona día</Typography>
                <DateRange
                    editableDateInputs={true}
                    onChange={item => setState([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={state}
                />
            </Grid>

            <Grid container sx={{display:'flex', flexDirection:'column', alignItems:'center', width:{ xs: '100%', md: '70%', lg: '45%' }}}>
                <FormControl fullWidth sx={{marginTop: 8, minWidth: 240}}>
                    <InputLabel id="demo-simple-select-label">Selecciona un turno</InputLabel>
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

                <FormControl fullWidth sx={{marginTop: 8, minWidth: 240}}>
                    <InputLabel id="demo-simple-select-label">Selecciona un empleado</InputLabel>
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

                <Grid container spacing={2} sx={{ mb: 2, mt: 8, width: '100%'}} justifyContent="center" alignItems="center">
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

