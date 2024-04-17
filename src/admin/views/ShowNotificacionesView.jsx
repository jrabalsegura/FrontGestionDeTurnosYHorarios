import { Typography, List, ListItem, Button, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const ShowNotificacionesView = () => {
    const theme = useTheme();
    return (
        <>
            <List sx={{ width: '100%'}}>
                <ListItem key={'1'} sx={{ 
                    width: '100%', 
                    display: 'flex', 
                    flexDirection: { xs: 'column', md: 'row' },  // Change flex direction based on screen size
                    justifyContent: 'space-between', 
                    border: `3px solid ${theme.palette.primary.dark}`, 
                    borderRadius: 3, 
                    padding: 2,
                    marginBottom: 2 
                    }}>
                    
                    <Grid container  justifyContent="space-around">
                        <Typography variant="h6">Ausencia Leonie Cañas</Typography>
                        <Typography variant="h6">Mañana - 15/03/2024</Typography>
                    </Grid>

                    <Grid container justifyContent="space-around">
                        <Button variant="contained" sx={{mt: { xs: 2, md: 0 } }}> 
                            <Typography>
                                Descargar justificante
                            </Typography>
                        </Button>
                    </Grid>
                </ListItem>

                <ListItem key={'2'} sx={{ 
                    width: '100%', 
                    display: 'flex', 
                    flexDirection: { xs: 'column', md: 'row' },  // Change flex direction based on screen size
                    justifyContent: 'space-between', 
                    border: `3px solid ${theme.palette.primary.dark}`, 
                    borderRadius: 3, 
                    padding: 2,
                    marginBottom: 2 
                    }}>
                    
                    <Grid container  justifyContent="space-around">
                        <Typography variant="h6">Solicitud vacaciones</Typography>
                        <Typography variant="h6">Jose Ruiz</Typography>
                    </Grid>

                    <Grid container justifyContent="space-around">
                        <Button variant="contained" sx={{mt: { xs: 2, md: 0 } }}> 
                            <Typography>
                                Gestionar
                            </Typography>
                        </Button>
                    </Grid>
                </ListItem>
            </List>
        </>
    )
}

