import { TurnedInNot } from "@mui/icons-material"
import { Box, Drawer, Toolbar, Typography, List, ListItem, ListItemText, ListItemButton, ListItemIcon, Grid } from "@mui/material"


export const SideBar = ({ drawerWidth = 240 }) => {
    return (
        <Box
            component='nav'
            sx={{ width: drawerWidth, flexShrink: {sm: 0}}}
        >
            <Drawer
                variant="permanent"
                open
                sx={{
                    display: { xs: 'block'},
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component='div'>
                        AdminPage
                    </Typography>
                </Toolbar>

                <List>
                    {
                        ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'].map(month => (
                            <ListItem key={month} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <TurnedInNot />
                                    </ListItemIcon>
                                    <Grid container>
                                        <ListItemText primary={month} />                                        
                                    </Grid>
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </List>
            </Drawer>
        </Box>
    )
}

