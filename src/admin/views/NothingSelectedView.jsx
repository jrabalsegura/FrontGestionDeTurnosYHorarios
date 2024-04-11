import { Grid, Typography } from "@mui/material"

export const NothingSelectedView = () => {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: 'calc(100vh - 120px)', backgroundColor: 'primary.main', padding: 4, borderRadius: 3 }}
        >
            <Grid item xs={12}>
                <Typography variant="h5" sx={{ color: 'white' }}>
                    Seleccione una opción
                </Typography>
            </Grid>
        </Grid>
    )
}

