import { Button, Grid, TextField, Typography } from "@mui/material"

export const EditUserView = () => {
    return (
        <>
            
            <Typography variant="h5" sx={{ mb: 1 }}>
                Edita tu Información
            </Typography>

            <form>

                <Grid container justifyContent="center">
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField 
                            label="Nombre"
                            type="text"
                            placeholder="nombre"
                            fullWidth
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 5 }}>
                        <TextField 
                            label="Username"
                            type="text"
                            placeholder="username"
                            fullWidth
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 5 }}>
                        <TextField 
                            label="Contraseña"
                            type="password"
                            placeholder="password"
                            fullWidth
                            variant="standard"
                        />
                    </Grid>

                    <Grid container spacing={2} sx={{ mb: 2, mt: 5 }} justifyContent="center"style={{ width: '30%' }}>
                        <Grid item xs={12}>
                            <Button variant="contained" fullWidth>
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

