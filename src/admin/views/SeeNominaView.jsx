import { Button, Grid, Typography } from "@mui/material"


export const SeeNominaView = () => {
    return (
        <Grid width="70%">
            <Grid sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 5
            }}>
                <Typography variant="h4">Leonie Cañas</Typography>
                <Typography variant="h6">Marzo 2024</Typography>
            </Grid>

            <Grid sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                marginTop: 5,
                padding: 5,
                paddingLeft: 8,
                paddingRight: 8,
                border: '3px solid #000',
                borderRadius: '10px'
            }}>
                <Grid sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around'
                }}>
                    <Typography variant="h6" width="70%">Salario base: </Typography>
                    <Typography variant="h6" width="30%" textAlign={'end'}>1500 €</Typography>
                </Grid>

                <Grid sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    marginTop: 2
                }}>
                    <Typography variant="h6" width="70%">Horas Extra: </Typography>
                    <Typography variant="h6" width="30%" textAlign={'end'}>48 horas</Typography>
                </Grid>

                <Grid sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    marginTop: 2
                }}>
                    <Typography variant="h6" width="70%">Seguridad Social: </Typography>
                    <Typography variant="h6" width="30%" textAlign={'end'}>330,15 €</Typography>
                </Grid>

                <Grid sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    marginTop: 5
                }}>
                    <Typography variant="h6" width="70%">Pago: </Typography>
                    <Typography variant="h6" width="30%" textAlign={'end'}>2129,85 €</Typography>
                </Grid>

            </Grid>

            <Grid container spacing={2} sx={{ mb: 2, mt: 8}} justifyContent="center" alignItems="center" width="100%">                
                <Button variant="contained" sx={{width: '40%'}}>
                    <Typography>
                        Descargar
                    </Typography>
                </Button>                              
            </Grid>
        </Grid>

        
    )
}

