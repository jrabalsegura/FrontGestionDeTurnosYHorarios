import { MenuOutlined, LogoutOutlined, NotificationsOutlined } from "@mui/icons-material";
import { AppBar, Toolbar, IconButton, Grid, Typography, Badge } from "@mui/material";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useDispatch } from "react-redux";
import { setNothingSelectedView, setShowNotificacionesView } from "../../store/admin/adminScreenSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchNotifications } from "../../store/admin/notificacionesSlice";

export const NavBar = ({ drawerWidth = 240, setOpenSidebar }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchNotifications());
    }, [dispatch]);

    const notifications = useSelector((state) => state.notificaciones.notificaciones);  

    const { startLogout, user} = useAuthStore();
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
                    <Grid container direction='row' justifyContent='space-between' alignItems='center' xs={8} mobile={6} md={4}>
                        <Typography variant="h6" noWrap component='div' sx={{cursor: 'pointer', display: { xs: 'none', mobile: 'block' }}} onClick={() => {dispatch(setNothingSelectedView())}}>AdminPage</Typography>
                        <Typography variant="p" noWrap component='div'>{user.name}</Typography>
                    </Grid>
                    <Grid container direction='row' justifyContent='space-between' alignItems='center' xs={4} mobile={3} md={2} xl={1}>
                        <Badge badgeContent={notifications.length} color="error" sx={{ '& .MuiBadge-badge': { right: 8, top: 13 }}}>
                            <IconButton sx={{color: 'white'}} onClick={() => dispatch(setShowNotificacionesView())}>
                                <NotificationsOutlined />                           
                            </IconButton>
                        </Badge>
                        <IconButton color="error" onClick={startLogout}>
                            <LogoutOutlined />
                        </IconButton>
                    </Grid>
                    
                </Grid>
            </Toolbar>

        </AppBar>
    )
}


