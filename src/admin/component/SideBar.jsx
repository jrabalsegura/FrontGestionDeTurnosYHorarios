import { AppRegistration, Forest, FunctionsOutlined, PercentOutlined, Person,Schedule} from "@mui/icons-material"
import { Box, Drawer, Toolbar, Typography, List, ListItem, ListItemText, ListItemButton, ListItemIcon, Grid } from "@mui/material"
import { useDispatch } from "react-redux";
import { setShowUsersView } from "../../store/admin/adminScreenSlice";

export const SideBar = ({ drawerWidth = 240, openSidebar, setOpenSidebar }) => {

    const dispatch = useDispatch();

    return (
        <Box
            component='nav'
            sx={{ width: drawerWidth, 
                flexShrink: {sm: 0}, 
                display: { xs: openSidebar ? 'block' : 'none', tablet: 'block' },
                position: 'relative'
            }}
        >
            <Drawer
                variant="permanent"
                open
                sx={{
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth},
                    position: 'fixed',
                    top: { xs: openSidebar ? '64px' : '0px', tablet: '0px' },
                    zIndex: 1
                }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component='div'>
                        AdminPage
                    </Typography>
                </Toolbar>

                <List>
                     <ListItem key={'users'} disablePadding onClick={() => { setOpenSidebar(); dispatch(setShowUsersView()); }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <Person />
                            </ListItemIcon>
                            <Grid container>
                                <ListItemText primary={'Gestionar Usuarios'} />                                        
                            </Grid>
                        </ListItemButton>                      
                    </ListItem>

                    <ListItem key={'nomina'} disablePadding onClick={setOpenSidebar}>
                        <ListItemButton>
                            <ListItemIcon>
                                <PercentOutlined />
                            </ListItemIcon>
                            <Grid container>
                                <ListItemText primary={'Calcular nómina'} />                                        
                            </Grid>
                        </ListItemButton>                      
                    </ListItem>

                    <ListItem key={'finiquito'} disablePadding onClick={setOpenSidebar}>
                        <ListItemButton>
                            <ListItemIcon>
                                <FunctionsOutlined />
                            </ListItemIcon>
                            <Grid container>
                                <ListItemText primary={'Calcular finiquito'} />                                        
                            </Grid>
                        </ListItemButton>                      
                    </ListItem>

                    <ListItem key={'turnos'} disablePadding onClick={setOpenSidebar}>
                        <ListItemButton>
                            <ListItemIcon>
                                <Schedule />
                            </ListItemIcon>
                            <Grid container>
                                <ListItemText primary={'Asignar turnos'} />                                        
                            </Grid>
                        </ListItemButton>                      
                    </ListItem>

                    <ListItem key={'vacaciones'} disablePadding onClick={setOpenSidebar}>
                        <ListItemButton>
                            <ListItemIcon>
                                <Forest />
                            </ListItemIcon>
                            <Grid container>
                                <ListItemText primary={'Gestionar vacaciones'} />                                        
                            </Grid>
                        </ListItemButton>                      
                    </ListItem>

                    <ListItem key={'registro'} disablePadding onClick={setOpenSidebar}>
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

