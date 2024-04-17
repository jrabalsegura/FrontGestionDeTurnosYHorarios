import { MenuOutlined, LogoutOutlined, NotificationsOutlined } from "@mui/icons-material";
import { AppBar, Toolbar, IconButton, Grid, Typography, Badge } from "@mui/material";

export const NavBar = ({ drawerWidth = 240 }) => {
    return (
        <AppBar
            position="fixed"
            sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, 
            ml: { sm: `${drawerWidth}px` } }}
        >

            <Toolbar>
                <IconButton
                    color="inherit"
                    edge="start"
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuOutlined />
                </IconButton>

                <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                    <Grid container direction='row' justifyContent='space-between' alignItems='center' width='25vh'>
                        <Typography variant="h6" noWrap component='div'>EmployeePage</Typography>
                        <Typography variant="p" noWrap component='div'>Name</Typography>
                    </Grid>
                    <Grid container direction='row' justifyContent='space-between' alignItems='center' width='12vh'>
                        <Badge badgeContent={2} color="error" sx={{ '& .MuiBadge-badge': { right: 8, top: 13 }}}>
                            <IconButton sx={{color: 'white'}}>
                                <NotificationsOutlined />                           
                            </IconButton>
                        </Badge>
                        <IconButton color="error">
                            <LogoutOutlined />
                        </IconButton>
                    </Grid>
                    
                </Grid>
            </Toolbar>

        </AppBar>
    )
}