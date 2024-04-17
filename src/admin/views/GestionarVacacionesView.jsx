import { List, ListItem, Grid, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const GestionarVacacionesView = () => {
    const theme = useTheme()
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
                        <Typography variant="h6">Jose Ruiz</Typography>
                        <Typography variant="h6">15/04/2024  -  20/04/2024</Typography>
                    </Grid>

                    <Grid container justifyContent="space-around">
                        <Button variant="contained" sx={{mt: { xs: 2, md: 0 } }}> 
                            <Typography>
                                Aprobar
                            </Typography>
                        </Button>
                        <Button variant="contained" color="error" sx={{mt: { xs: 2, md: 0 } }}>
                            <Typography>
                                Declinar
                            </Typography>
                        </Button>
                    </Grid>
                </ListItem>
            </List>
        </>
    )
}

