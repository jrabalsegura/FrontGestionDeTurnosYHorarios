import { List, ListItem, Grid, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { getNotifications } from "../helpers";
import gestionApi from "../../api/gestionApi";

export const GestionarVacacionesView = () => {
    const theme = useTheme()
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            const fetchedNotifications = await getNotifications();
            setNotifications(fetchedNotifications);
        };
        fetchNotifications();
    }, []);

    

    //Filter notifications because I just need the type: "holidays"
    const holidays = notifications.filter(notification => notification.type === 'holiday');

    const handleApprove = async (holiday) => {
        console.log(holiday);
        try {
            //Create JSon with values from name, username, password and sallary to send
            const body = {
                startDate: holiday.startDate,
                endDate: holiday.endDate,
                employeeId: holiday.employeeId
            }
            const response = await gestionApi.post(`/holidays/new`, body);
            console.log(response);

            // Borrar notificacion
            deleteNotification(holiday._id);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteNotification = async (id) => {
        try {
            const response = await gestionApi.delete(`/notificaciones/${id}`);
            console.log(response);
            setNotifications(notifications.filter(notification => notification._id !== id));
        } catch (error) {
            console.log(error);
        }
        
    }

    return (
        <>
            <List sx={{ width: '100%'}}>

                {/* Map notificacionts to the ListItems */}
                {holidays.map(holiday => (
                    <ListItem key={holiday._id} sx={{ 
                        width: '100%', 
                        display: 'flex', 
                        flexDirection: { xs: 'column', md: 'row' },  // Change flex direction based on screen size
                        justifyContent: 'space-between', 
                        border: `3px solid ${theme.palette.primary.dark}`, 
                        borderRadius: 3, 
                        padding: 2,
                        marginBottom: 2 
                        }}>
                        
                        <Grid container  justifyContent="space-around">
                            <Typography variant="h6">{holiday.name}</Typography>
                            <Typography variant="h6">
                                {new Date(holiday.startDate).toLocaleDateString('en-GB')} - 
                                {new Date(holiday.endDate).toLocaleDateString('en-GB')}
                            </Typography>
                        </Grid>
    
                        <Grid container justifyContent="space-around">
                            <Button variant="contained" sx={{mt: { xs: 2, md: 0 } }} onClick={() => handleApprove(holiday)}> 
                                <Typography>
                                    Aprobar
                                </Typography>
                            </Button>
                            <Button variant="contained" color="error" sx={{mt: { xs: 2, md: 0 } }} onClick={() => deleteNotification(holiday._id)}>
                                <Typography>
                                    Declinar
                                </Typography>
                            </Button>
                        </Grid>
                    </ListItem>
                ))}
            </List>
        </>
    )
}

