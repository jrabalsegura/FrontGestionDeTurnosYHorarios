import { Grid, Typography, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material"
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUsers } from "../helpers";
import { useForm } from "../../hooks/useForm";

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

    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();

    const {user, onInputChange, isFormValid, userValid} = useForm(initialForm, formValidation);

    useEffect(() => {
        const fetchUsers = async () => {
            const fetchedUsers = await getUsers();
            setUsers(fetchedUsers);
        };
        fetchUsers();
        console.log(users);
    }, []);

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
                            <MenuItem key={user._id} value={user.name}>{user.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Grid container spacing={2} sx={{ mb: 2, mt: 8}} justifyContent="center">
                    <Grid item xs={12}>
                        <Button variant="contained" fullWidth disabled={!isFormValid}>
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