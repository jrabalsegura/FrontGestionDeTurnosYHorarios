import { Calculate, CalendarMonth, HolidayVillage, Paid, Person, AccountCircle} from "@mui/icons-material"
import { Box, Drawer, Toolbar, Typography, List, ListItem, ListItemText, ListItemButton, ListItemIcon, Grid } from "@mui/material"
import { useDispatch } from "react-redux";
import { setEditUserView, setCalendarView, setNominasView, setCalculadoraView, setSolicitarVacacionesView } from "../../store/employee/employeeScreenSlice";

export const SideBar = ({ drawerWidth = 240, openSidebar, setOpenSidebar }) => {

    const dispatch = useDispatch();

    return (
        <Box
            component='nav'
            sx={{ width: drawerWidth, 
                flexShrink: {sm: 0}, 
                display: { xs: openSidebar ? 'block' : 'none', tablet: 'block' },
                position: 'relative',
                zIndex: 900
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
                    <Typography variant="h6" noWrap component='div' sx={{display: 'flex', alignItems: 'center'}}>
                        <AccountCircle sx={{fontSize: '30px', marginRight: '10px'}} />
                        Empleado
                    </Typography>
                </Toolbar>

                <List>
                     <ListItem key={'edit'} disablePadding onClick={() => {setOpenSidebar(); dispatch(setEditUserView())}}>
                        <ListItemButton>
                            <ListItemIcon>
                                <Person />
                            </ListItemIcon>
                            <Grid container>
                                <ListItemText primary={'Editar información'} />                                        
                            </Grid>
                        </ListItemButton>                      
                    </ListItem>

                    <ListItem key={'turnos'} disablePadding onClick={() => {setOpenSidebar(); dispatch(setCalendarView())}}>
                        <ListItemButton>
                            <ListItemIcon>
                                <CalendarMonth />
                            </ListItemIcon>
                            <Grid container>
                                <ListItemText primary={'Calendario turnos'} />                                        
                            </Grid>
                        </ListItemButton>                      
                    </ListItem>

                    <ListItem key={'nominas'} disablePadding onClick={() => {setOpenSidebar(); dispatch(setNominasView())}}>
                        <ListItemButton>
                            <ListItemIcon>
                                <Paid />
                            </ListItemIcon>
                            <Grid container>
                                <ListItemText primary={'Nominas anteriores'} />                                        
                            </Grid>
                        </ListItemButton>                      
                    </ListItem>

                    <ListItem key={'calculadora'} disablePadding onClick={() => {setOpenSidebar(); dispatch(setCalculadoraView())}}>
                        <ListItemButton>
                            <ListItemIcon>
                                <Calculate />
                            </ListItemIcon>
                            <Grid container>
                                <ListItemText primary={'Calculadora nómina'} />                                        
                            </Grid>
                        </ListItemButton>                      
                    </ListItem>

                    <ListItem key={'vacaciones'} disablePadding onClick={() => {setOpenSidebar(); dispatch(setSolicitarVacacionesView())}}>
                        <ListItemButton>
                            <ListItemIcon>
                                <HolidayVillage />
                            </ListItemIcon>
                            <Grid container>
                                <ListItemText primary={'Solicitar vacaciones'} />                                        
                            </Grid>
                        </ListItemButton>                      
                    </ListItem>
                </List>
            </Drawer>
        </Box>
    )
}

