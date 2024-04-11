import { Google } from "@mui/icons-material";
import { Button, Typography, Grid, TextField } from "@mui/material";

export const LoginPage = () => {
    return (
        <>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
            >
                <Grid item
                    className="box-shadow"
                    xs={3}
                    sx={{ backgroundColor: 'white', padding: 3, borderRadius: 2, width: {md: 450} }}
                >
                    <Typography variant="h5" sx={{ mb: 1 }}>
                        Login
                    </Typography>

                    <form>

                        <Grid container>
                            <Grid item xs={12} sx={{ mt: 2 }}>
                                <TextField 
                                    label="Username"
                                    type="text"
                                    placeholder="username"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ mt: 2 }}>
                                <TextField 
                                    label="Contraseña"
                                    type="password"
                                    placeholder="password"
                                    fullWidth
                                />
                            </Grid>

                            <Grid container spacing={2} sx={{ mb: 2, mt: 1 }} justifyContent="center">
                                <Grid item xs={12} sm={6}>
                                    <Button variant="contained" fullWidth>
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

