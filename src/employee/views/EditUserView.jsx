import { Alert, Button, Grid, TextField, Typography, Box } from "@mui/material"
import { useState, useEffect } from "react"
import { useFocus } from "../../hooks/useFocus"
import gestionApi from "../../api/gestionApi";
import { useForm } from "../../hooks/useForm";
import { useAuthStore } from "../../hooks/useAuthStore";
import Swal from "sweetalert2";

const formValidations = {
    name: [
        value => value.trim().length > 0,
        'Name is required'
    ],
    username: [
        value => value.trim().length > 0, // Checks that the username is not empty
        'Username is required'
    ],
    password: [
        value => value.length >= 6, // Checks that the password has at least 6 characters
        'Password must be at least 6 characters'
    ]
};

export const EditUserView = () => {

    const { user, onUpdate } = useAuthStore();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [nameRef, nameIsFocused] = useFocus();
    const [usernameRef, usernameIsFocused] = useFocus();
    const [passwordRef, passwordIsFocused] = useFocus();    

    const [initialValues, setInitialValues] = useState({
        name: '',
        username: '',
        password: ''
    });

    useEffect(() => {
        setInitialValues({
            name: user.name || '',
            username: user.username || '',
            password: ''
        });
    }, [user]); 

    const onSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const body = {
                name: name,
                username: username,
                password: password,
                hourlySallary: user.hourlySallary
            }
            const response = await gestionApi.put(`/employees/${user.uid}`, body);
            setIsSubmitted(true);
            onUpdate(response.data.employee);
        } catch (error) {
            Swal.fire('Error al intentar actualizar al usuario', error.response.data.msg, 'error');
        }
    }

    const {
        name,
        username,
        password,
        onInputChange,
        isFormValid,
        nameValid,
        usernameValid,
        passwordValid
    } = useForm(initialValues, formValidations);

    if (isSubmitted) {
        return (
            <Box sx={{ display: 'flex', width: '80%', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
                <Typography variant="h5">
                    {`Gracias por actualizar tu información ${user.name}!`}
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
            <Typography variant="h5" sx={{ mb: 1 }}>
                Edita tu Información
            </Typography>

            <form onSubmit={onSubmit}>

            <Grid container justifyContent="center">
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField 
                            label="Nombre"
                            type="text"
                            placeholder="nombre"
                            fullWidth
                            variant="standard"
                            name="name"
                            value={name}
                            onChange={onInputChange}
                            inputRef={nameRef}
                        />
                        <div style={{ height: '24px' }}>
                            {nameIsFocused && nameValid && <Alert severity="error">Name is required</Alert>}
                        </div>
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 5 }}>
                        <TextField 
                            label="Username"
                            type="text"
                            placeholder="username"
                            fullWidth
                            variant="standard"
                            name="username"
                            value={username}
                            onChange={onInputChange}
                            inputRef={usernameRef}
                        />
                        <div style={{ height: '24px' }}>
                            {usernameIsFocused && usernameValid && <Alert severity="error">Username is required</Alert>}
                        </div>
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 5 }}>
                        <TextField 
                            label="Contraseña"
                            type="password"
                            placeholder="password"
                            fullWidth
                            variant="standard"
                            name="password"
                            value={password}
                            onChange={onInputChange}
                            inputRef={passwordRef}
                        />
                        <div style={{ height: '24px' }}>
                            {passwordIsFocused && passwordValid && <Alert severity="error">Password is required</Alert>}
                        </div>
                    </Grid>

                    <Grid container spacing={2} sx={{ mb: 2, mt: 5 }} justifyContent="center"style={{ width: '30%' }}>
                        <Grid item xs={12}>
                            <Button variant="contained" fullWidth type="submit" disabled={!isFormValid}>
                                <Typography>
                                    Guardar
                                </Typography>
                            </Button>
                        </Grid>
                        
                    </Grid>
                </Grid>
            </form>               
        </>
    )
}

