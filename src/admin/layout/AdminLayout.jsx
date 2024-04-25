import { Box, Toolbar } from "@mui/material";
import { NavBar, SideBar } from "../component";
import { useState } from "react";

const drawerWidth = 240;

export const AdminLayout = ({ children }) => {

    //Add state that will be used to toggle the sidebar
    const [openSidebar, setOpenSidebar] = useState(false);

    const handleDrawerToggle = () => {
        console.log('handleDrawerToggle');
        setOpenSidebar(!openSidebar);
    }

    return (
        <Box sx={{ display: 'flex' }}>
            
            {/* Navbar */}
            <NavBar drawerWidth={drawerWidth} setOpenSidebar={handleDrawerToggle} />

            {/* Sidebar */}
            <SideBar drawerWidth={drawerWidth} openSidebar={openSidebar} setOpenSidebar={handleDrawerToggle} />


            {/* Main */}
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {children}
            </Box>


        </Box>
    )
}

