import { List, ListItem, Grid, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { addDays } from "date-fns";
import gestionApi from "../../api/gestionApi";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useGetNotificaciones } from "../../hooks/useGetNotificaciones";

export const GestionarVacacionesView = () => {
    const theme = useTheme()
    const dispatch = useDispatch();
    const { notificaciones, filterNotificacion, isLoading, hasError } = useGetNotificaciones();

    {/*

    useEffect(() => {
        dispatch(fetchNotifications());
    }, [dispatch]);

const notifications = useSelector(state => state.notificaciones.notificaciones);*/}
    //Filter notifications because I just need the type: "holidays"
    const holidays = notificaciones.filter(notification => notification.type === 'holiday');

    const handleApprove = async (holiday) => {
        try {
            //Create JSon with values from name, username, password and sallary to send
            const body = {
                startDate: holiday.startDate,
                endDate: addDays(holiday.endDate, 1),
                employeeId: holiday.employeeId
            }
            const response = await gestionApi.post(`/holidays/new`, body);

            // Borrar notificacion
            deleteNotification(holiday._id);
        } catch (error) {
            console.log(error);
            Swal.fire('Error al intentar aprobar las vacaciones', error.message, 'error')
        }
    }

    const deleteNotification = async (id) => {
        try {
            const response = await gestionApi.delete(`/notificaciones/${id}`);
            //dispatch(removeNotificacion(id));
            filterNotificacion(id);
        } catch (error) {
            console.log(error);
            Swal.fire('Error al intentar eliminar las vacaciones', error.message, 'error')
        }       
    }

    return (
        <>
            <List sx={{ width: '100%'}}>
                {holidays.length > 0 ? (
                    holidays.map(holiday => (
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
                    ))
                ) : (
                    <Typography variant="h5" sx={{ mt: 2, textAlign: 'center' }}>
                        No hay vacaciones que gestionar
                    </Typography>
                )}
            </List>
        </>
    )
}

