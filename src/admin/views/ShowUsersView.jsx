import { Add, Delete, Edit } from "@mui/icons-material"
import { Fab, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"

export const ShowUsersView = () => {
    const theme = useTheme()
    return (
        <>
            <List sx={{ width: '100%'}}>
                <ListItem key={'1'} sx={{ 
                    width: '100%', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    border: `3px solid ${theme.palette.primary.main}`, 
                    borderRadius: 3, 
                    padding: 2,
                    marginBottom: 2 
                    }}>
                    <ListItemText primary="Jose Ruiz"sx={{ width: '80%'}} />
                    <Grid container sx={{ width: '20%' }} justifyContent="flex-end">
                        <ListItemIcon>
                            <Edit/>
                        </ListItemIcon>
                        <ListItemIcon>
                            <Delete />
                        </ListItemIcon>
                    </Grid>
                </ListItem>

                <ListItem key={'1'} sx={{ 
                    width: '100%', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    border: `3px solid ${theme.palette.primary.main}`, 
                    borderRadius: 3, 
                    padding: 2,
                    marginBottom: 2 
                    }}>
                    <ListItemText primary="Leonie Cañas"  sx={{ width: '80%' }}/>
                    <Grid container sx={{ width: '20%' }} justifyContent="flex-end">
                        <ListItemIcon>
                            <Edit />
                        </ListItemIcon>
                        <ListItemIcon>
                            <Delete />
                        </ListItemIcon>
                    </Grid>
                </ListItem>

                <ListItem key={'1'} sx={{ 
                    width: '100%', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    border: `3px solid ${theme.palette.primary.main}`, 
                    borderRadius: 3, 
                    padding: 2,
                    marginBottom: 2 
                    }}>
                    <ListItemText primary="Alicia García" sx={{ width: '80%' }} />
                    <Grid container sx={{ width: '20%' }} justifyContent="flex-end">
                        <ListItemIcon>
                            <Edit />
                        </ListItemIcon>
                        <ListItemIcon>
                            <Delete />
                        </ListItemIcon>
                    </Grid>
                </ListItem>
            </List>

            <Fab color="primary" aria-label="add" sx={{ marginTop: 4 }}>
                <Add color="secondary.light" />
            </Fab>
        </>
    )
}
