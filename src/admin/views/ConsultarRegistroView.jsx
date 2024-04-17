import { Typography, List, ListItem, ListItemText, Button, ListItemIcon, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const ConsultarRegistroView = () => {
    const theme = useTheme();
    return (
        <>
            <List sx={{ width: '100%'}}>
                <ListItem key={'1'} sx={{ 
                    width: '100%', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    border: `3px solid ${theme.palette.primary.dark}`, 
                    borderRadius: 3, 
                    padding: 2,
                    paddingLeft: 5,
                    paddingRight: 5,
                    marginBottom: 2 
                    }}>
                    <ListItemText primary="Jose Ruiz entra" />
                    <ListItemText primary="08:03"sx={{ textAlign:"end"}} />
                </ListItem>

                <ListItem key={'2'} sx={{ 
                    width: '100%', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    border: `3px solid ${theme.palette.primary.dark}`, 
                    borderRadius: 3, 
                    padding: 2,
                    paddingLeft: 5,
                    paddingRight: 5,
                    marginBottom: 2 
                    }}>
                    <ListItemText primary="Alicia García sale" />
                    <ListItemText primary="23:56"sx={{ textAlign:"end"}} />
                </ListItem>

                <ListItem key={'3'} sx={{ 
                    width: '100%', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    border: `3px solid ${theme.palette.primary.dark}`, 
                    borderRadius: 3, 
                    padding: 2,
                    paddingLeft: 5,
                    paddingRight: 5,
                    marginBottom: 2 
                    }}>
                    <ListItemText primary="Leonie Cañas sale" />
                    <ListItemText primary="23:54"sx={{ textAlign:"end"}} />
                </ListItem>
            </List>

            <Button variant="contained" sx={{ width: "30%" }}>
                <Typography>
                    Descargar
                </Typography>
            </Button>
        </>
    )
}

