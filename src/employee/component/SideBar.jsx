import { Calculate, CalendarMonth, HolidayVillage, Paid, Person} from "@mui/icons-material"
import { Box, Drawer, Toolbar, Typography, List, ListItem, ListItemText, ListItemButton, ListItemIcon, Grid } from "@mui/material"


export const SideBar = ({ drawerWidth = 240 }) => {
    return (
        <Box
            component='nav'
            sx={{ width: drawerWidth, flexShrink: {sm: 0}, display: { xs: 'none', tablet: 'block' }}}
        >
            <Drawer
                variant="permanent"
                open
                sx={{
                    
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component='div'>
                        EmployeePage
                    </Typography>
                </Toolbar>

                <List>
                     <ListItem key={'edit'} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <Person />
                            </ListItemIcon>
                            <Grid container>
                                <ListItemText primary={'Editar información'} />                                        
                            </Grid>
                        </ListItemButton>                      
                    </ListItem>

                    <ListItem key={'turnos'} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <CalendarMonth />
                            </ListItemIcon>
                            <Grid container>
                                <ListItemText primary={'Calendario turnos'} />                                        
                            </Grid>
                        </ListItemButton>                      
                    </ListItem>

                    <ListItem key={'nominas'} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <Paid />
                            </ListItemIcon>
                            <Grid container>
                                <ListItemText primary={'Nominas anteriores'} />                                        
                            </Grid>
                        </ListItemButton>                      
                    </ListItem>

                    <ListItem key={'calculadora'} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <Calculate />
                            </ListItemIcon>
                            <Grid container>
                                <ListItemText primary={'Calculadora nómina'} />                                        
                            </Grid>
                        </ListItemButton>                      
                    </ListItem>

                    <ListItem key={'vacaciones'} disablePadding>
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

