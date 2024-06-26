import { MenuOutlined, LogoutOutlined, Update } from "@mui/icons-material";
import { AppBar, Toolbar, IconButton, Grid, Typography, Badge } from "@mui/material";
import { useDispatch } from "react-redux";
import { setNothingSelectedView } from "../../store/employee/employeeScreenSlice";
import { useAuthStore } from "../../hooks/useAuthStore";

export const NavBar = ({ drawerWidth = 240, setOpenSidebar }) => {

    const dispatch = useDispatch();
    const { startLogout, user } = useAuthStore();

    return (
        <AppBar
            position="fixed"
            sx={{ width: { tablet: `calc(100% - ${drawerWidth}px)` }, 
            ml: { tablet: `${drawerWidth}px` } }}
        >

            <Toolbar>
                <IconButton
                    color="inherit"
                    edge="start"
                    sx={{ mr: 2, display: { tablet: 'none' } }}
                    onClick={setOpenSidebar}
                >
                    <MenuOutlined />
                </IconButton>

                <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                    <Grid item xs={8} md={4} container direction='row' justifyContent='space-between' alignItems='center'>
                        <IconButton
                            color="inherit"
                            onClick={() => {dispatch(setNothingSelectedView())}}
                            sx={{ display: { xs: 'none', mobile: 'block' } }}
                        >
                            <Update fontSize="large" />
                        </IconButton>
                        <Typography variant="p" noWrap component='div' sx={{textTransform: 'capitalize'}}>{user.name}</Typography>
                    </Grid>
                    <Grid item xs={4} mobile={3} md={2} xl={1} container direction='row' justifyContent='space-between' alignItems='center'>
                        {/*<Badge badgeContent={2} color="error" sx={{ '& .MuiBadge-badge': { right: 8, top: 13 }}}>
                            <IconButton sx={{color: 'white'}}>
                                <NotificationsOutlined />                           
                            </IconButton>
    </Badge>*/}
                        <IconButton color="error" onClick={startLogout}>
                            <LogoutOutlined />
                        </IconButton>
                    </Grid>
                    
                </Grid>
            </Toolbar>

        </AppBar>
    )
}