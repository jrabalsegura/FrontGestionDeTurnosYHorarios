import { Grid, Typography } from "@mui/material"

export const NothingSelectedView = () => {
    return (
        <>
            <Grid item xs={12}>
                <Typography variant="h5" sx={{ color: 'white' }}>
                    Seleccione una opción
                </Typography>
            </Grid>
        </>
    )
}

