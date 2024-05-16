import { Grid, Typography, FormControl, InputLabel, Select, MenuItem, Button, CircularProgress } from "@mui/material"
import { useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { setSeeNominaView } from "../../store/admin/adminScreenSlice";
import { useGetUsers } from "../../hooks/useGetUsers";
import gestionApi from "../../api/gestionApi";
import { useState } from "react";

const initialForm = {
    user: ''
}

const formValidation = {
    user: [
        value => value !== "",
        "Selecciona un empleado"
    ]
}

export const CalcularNominaView = () => {

    const { users, setUsers, isLoading, hasError } = useGetUsers();
    const dispatch = useDispatch();
    const [dispatchLoading, setDispatchLoading] = useState(false);

    const {user, onInputChange, isFormValid, userValid} = useForm(initialForm, formValidation);

    const handleSubmit = async () => {

        setDispatchLoading(true);

        /* const now = new Date();
        const currentMonth = now.getMonth() + 1; // January is 0, not 1
        const currentYear = now.getFullYear();
        const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

        const {baseSallary, socialSecurity, pago} = calcNomina(user.hourlySallary, user.extraHours, daysInMonth); */

        let nomina = '';

        try {
            const response = await gestionApi.post('/nominas/new', {
                user
            });
            console.log(response);
            nomina = response.data.nomina;
            console.log(nomina);
        } catch (error) {
            nomina = error.response.data.existingNomina;

            console.error('Error creating Nomina:', error);
            //Swal.fire('Error al intentar crear la nomina', error.response.data.msg, 'error')
        }
        nomina.employeeName = user.name;
        setDispatchLoading(false);
        dispatch(setSeeNominaView(nomina));
    }

    if (isLoading || dispatchLoading) {
        return <CircularProgress size={80} />
    }

    if (hasError) {
        return <Typography variant="h5">No se ha podido realizar la conexión a la base de datos. Vuelva a intentarlo más tarde.</Typography>
    }

    return (
        <>
            <Grid item xs={12}>
                <Typography variant="h5" textAlign="center">
                    Calcular nómina
                </Typography>

                <FormControl fullWidth sx={{marginTop: 8, minWidth: 360}}>
                    <InputLabel id="demo-simple-select-label">Selecciona un empleado</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={user}
                        name="user"
                        label="Selecciona un empleado"
                        onChange={onInputChange}                    
                    >
                        {users.map(user => (
                            <MenuItem key={user._id} value={user}>{user.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Grid container spacing={2} sx={{ mb: 2, mt: 8}} justifyContent="center">
                    <Grid item xs={12}>
                        <Button variant="contained" fullWidth disabled={!isFormValid} onClick={handleSubmit}>
                            <Typography>
                                Calcular
                            </Typography>
                        </Button>
                    </Grid>
                    
                </Grid>
            </Grid>
        </>
    )
}