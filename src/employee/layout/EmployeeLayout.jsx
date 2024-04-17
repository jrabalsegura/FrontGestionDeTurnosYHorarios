import { Box, Toolbar } from "@mui/material";
import { NavBar, SideBar } from "../component";

const drawerWidth = 240;

export const EmployeeLayout = ({ children }) => {
    return (
        <Box sx={{ display: 'flex' }}>
            
            {/* Navbar */}
            <NavBar drawerWidth={drawerWidth} />

            {/* Sidebar */}
            <SideBar drawerWidth={drawerWidth} />


            {/* Main */}
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {children}
            </Box>


        </Box>
    )
}
