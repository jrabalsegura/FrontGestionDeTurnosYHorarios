import { Button, Typography, Grid, TextField, Alert, CircularProgress } from "@mui/material";
import { useForm } from "../../hooks/useForm";
import { useFocus } from "../../hooks/useFocus";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useEffect } from "react";
import Swal from "sweetalert2";

const loginFormFields = {
    username: '',
    password: ''
}

const formValidations = {
    username: [
        value => value.trim().length > 0, // Checks that the username is not empty
        'Username is required'
    ],
    password: [
        value => value.length >= 6, // Checks that the password has at least 6 characters
        'Password must be at least 6 characters'
    ]
};

export const LoginPage = () => {

    const { username, password, onInputChange, isLoading, isFormValid, usernameValid, passwordValid } = useForm(loginFormFields, formValidations);
    const {startLogin, errorMessage } = useAuthStore();
    const [usernameRef, usernameIsFocused] = useFocus();
    const [passwordRef, passwordIsFocused] = useFocus();

    const onSubmit = (e) => {
        e.preventDefault()
        startLogin({username, password})
    }

    useEffect(() => {
        if(errorMessage) {
            Swal.fire('Error en la autenticación', errorMessage, 'error')
        }
    }, [errorMessage])

    if (isLoading) {
        return <CircularProgress size={80} />
    }

    return (
        <>
            <Grid
                container
                spacing={0}
                direction={{ xs: 'column', md: 'row' }}
                alignItems="center"
                justifyContent="space-around"
                sx={{ minHeight: '100vh', padding: 4 }}
            >

                <Grid item
                    className="box-shadow"
                    
                    sx={{ 
                        backgroundColor: "secondary.light", 
                        padding: 3, 
                        borderRadius: 2, 
                        width: { xs: '100%', md: 600, lg: 600, xl: 600 }, 
                        maxWidth: 450,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center', 
                        alignItems: 'center',
                        height: { xs:292 }
                    }}
                >
                    <Typography variant="h3" sx={{ mb: 1, textAlign: 'center', fontFamily: 'Comic Sans MS' }}>
                        Sistema de Gestión de Turnos y Horarios
                    </Typography>

                </Grid>

                <Grid item
                    className="box-shadow"
                    sx={{ 
                        backgroundColor: 'secondary.light', 
                        padding: 3, 
                        borderRadius: 2, 
                        width: {md: 350, lg: 350, xl: 350},
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        height: {md: 600} 
                    }}
                >
                    <Typography variant="h5" sx={{ mb: 1 }}>
                        Accede a tu área privada
                    </Typography>

                    <form onSubmit={onSubmit}>
                        <Grid container>
                            <Grid item xs={12} sx={{ mt: 2 }}>
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
                                    {passwordIsFocused && passwordValid && <Alert severity="error">Password must be at least 6 characters</Alert>}
                                </div>
                            </Grid>

                            <Grid container spacing={2} sx={{ mb: 2, mt: 5 }} justifyContent="center">
                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" fullWidth disabled={!isFormValid}>
                                        <Typography>
                                            Login
                                        </Typography>
                                    </Button>
                                </Grid>
                                
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </>
    );
}

