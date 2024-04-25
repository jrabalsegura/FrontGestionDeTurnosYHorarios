import { Grid, TextField, Button, Typography, InputAdornment } from "@mui/material"

export const CalculadoraView = () => {
    return (
        <>
            <form>

                <Grid container justifyContent="center">
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField 
                            label="Salario base"
                            type="number"
                            placeholder="15"
                            fullWidth
                            variant="standard"
                            InputProps={{
                                endAdornment: <InputAdornment position="end">€ / hora</InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 5 }}>
                        <TextField 
                            label="Horas Extra"
                            type="number"
                            placeholder="10"
                            fullWidth
                            variant="standard"
                            InputProps={{
                                endAdornment: <InputAdornment position="end">horas</InputAdornment>,
                            }}
                        />
                    </Grid>
                    
                </Grid>

            </form>

            <Typography variant="h5" marginTop={10}>Salario estimado</Typography>
            <Typography variant="h5" marginTop={2}>0,00 €</Typography>
        </>
    )
}


