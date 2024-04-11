import { AppRegistration, Forest, FunctionsOutlined, PercentOutlined, Person,Schedule} from "@mui/icons-material"
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
                     <ListItem key={'users'} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <Person />
                            </ListItemIcon>
                            <Grid container>
                                <ListItemText primary={'Gestionar Usuarios'} />                                        
                            </Grid>
                        </ListItemButton>                      
                    </ListItem>

                    <ListItem key={'nomina'} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <PercentOutlined />
                            </ListItemIcon>
                            <Grid container>
                                <ListItemText primary={'Calcular nómina'} />                                        
                            </Grid>
                        </ListItemButton>                      
                    </ListItem>

                    <ListItem key={'finiquito'} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <FunctionsOutlined />
                            </ListItemIcon>
                            <Grid container>
                                <ListItemText primary={'Calcular finiquito'} />                                        
                            </Grid>
                        </ListItemButton>                      
                    </ListItem>

                    <ListItem key={'turnos'} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <Schedule />
                            </ListItemIcon>
                            <Grid container>
                                <ListItemText primary={'Asignar turnos'} />                                        
                            </Grid>
                        </ListItemButton>                      
                    </ListItem>

                    <ListItem key={'vacaciones'} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <Forest />
                            </ListItemIcon>
                            <Grid container>
                                <ListItemText primary={'Gestionar vacaciones'} />                                        
                            </Grid>
                        </ListItemButton>                      
                    </ListItem>

                    <ListItem key={'registro'} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <AppRegistration />
                            </ListItemIcon>
                            <Grid container>
                                <ListItemText primary={'Consultar registro'} />                                        
                            </Grid>
                        </ListItemButton>                      
                    </ListItem>
                </List>
            </Drawer>
        </Box>
    )
}

