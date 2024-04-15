import { Grid, Typography, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material"

export const CalcularNominaView = () => {
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
                        value={"Leonie Cañas"}
                        label="Selecciona un empleado"
                        onChange={() => {console.log("Working")}}
                    >
                        <MenuItem value={"Jose Ruiz"}>Jose Ruiz</MenuItem>
                        <MenuItem value={"Leonie Cañas"}>Leonie Cañas</MenuItem>
                        <MenuItem value={"Alicia García"}>Alicia García</MenuItem>
                    </Select>
                </FormControl>

                <Grid container spacing={2} sx={{ mb: 2, mt: 8}} justifyContent="center">
                    <Grid item xs={12}>
                        <Button variant="contained" fullWidth>
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