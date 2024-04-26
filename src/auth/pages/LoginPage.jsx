
import { Button, Typography, Grid, TextField } from "@mui/material";
import { useForm } from "../../hooks/useForm";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useEffect } from "react";
import Swal from "sweetalert2";

const loginFormFields = {
    username: '',
    password: ''
}

export const LoginPage = () => {

    const { username, password, onInputChange } = useForm(loginFormFields);

    const {startLogin, errorMessage } = useAuthStore();

    const onSubmit = (e) => {
        e.preventDefault()
        startLogin({username, password})
    }

    useEffect(() => {
        if(errorMessage) {
            Swal.fire('Error en la autenticación', errorMessage, 'error')
        }
    }, [errorMessage])

    return (
        <>
            <Grid
                container
                spacing={0}
                direction={{ xs: 'column', md: 'row' }} // Stacks on small screens, side by side on medium and larger screens
                alignItems="center"
                justifyContent="space-around"
                sx={{ minHeight: '100vh', padding: 4 }}
            >

                <Grid item
                    className="box-shadow"
                    //xs={12} // Full width on small screens
                    //md={5} // Half width on medium and larger screens
                    //lg={4}
                    //xl={3}
                    sx={{ 
                        backgroundColor: "secondary.light", 
                        padding: 3, 
                        borderRadius: 2, 
                        width: { xs: '100%', md: 600, lg: 600, xl: 600 }, 
                        maxWidth: 450,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center', // Centers content vertically
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
                        justifyContent: 'space-around', // Centers content vertically
                        alignItems: 'center',
                        height: {md: 600} // Centers content horizontally
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
                                />
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
                                />
                            </Grid>

                            <Grid container spacing={2} sx={{ mb: 2, mt: 5 }} justifyContent="center">
                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" fullWidth>
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

