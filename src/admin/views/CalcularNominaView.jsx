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
    const {user, onInputChange, isFormValid} = useForm(initialForm, formValidation);

    const handleSubmit = async () => {

        setDispatchLoading(true);
        
        let nomina = '';

        try {
            const response = await gestionApi.post('/nominas/new', {
                user
            });
            nomina = response.data.nomina;
        } catch (error) {
            nomina = error.response.data.existingNomina;
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