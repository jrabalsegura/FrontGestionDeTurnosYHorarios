import { Typography, List, ListItem, Button, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchNotifications, removeNotificacion } from "../../store/admin/notificacionesSlice";
import { downloadFile } from "../../helpers/downloadFile";
import { setGestionarVacacionesView } from "../../store/admin/adminScreenSlice";
import gestionApi from "../../api/gestionApi";
import Swal from "sweetalert2";

export const ShowNotificacionesView = () => {
    const theme = useTheme();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchNotifications());
    }, [dispatch]);

    const notifications = useSelector((state) => state.notificaciones.notificaciones);

    const deleteNotification = async (id) => {
        try {
            const response = await gestionApi.delete(`/notificaciones/${id}`);
            dispatch(removeNotificacion(id));
        } catch (error) {
            console.log(error);
            Swal.fire('Error al intentar eliminar la notificacion', error.message, 'error')
        }       
    }

    return (
        <>
            <List sx={{ width: '100%'}}>

                {/*Map the notifications to list items, based on the notification kind, holiday or ausencia*/}
                {notifications.map((notification) => (
                    notification.type === 'holiday' ? (
                        <ListItem key={notification._id} sx={{ 
                            width: '100%', 
                            display: 'flex', 
                            flexDirection: { xs: 'column', md: 'row' },
                            justifyContent: 'space-between', 
                            border: `3px solid ${theme.palette.primary.dark}`, 
                            borderRadius: 3, 
                            padding: 2,
                            marginBottom: 2 
                            }}>
                            
                            <Grid container  justifyContent="space-around">
                                <Typography variant="h6">Solicitud vacaciones</Typography>
                                <Typography variant="h6">{notification.name}</Typography>
                            </Grid>
        
                            <Grid container justifyContent="space-around">
                                <Button variant="contained" sx={{mt: { xs: 2, md: 0 } }} onClick={() => dispatch(setGestionarVacacionesView())}> 
                                    <Typography>
                                        Gestionar
                                    </Typography>
                                </Button>
                            </Grid>
                        </ListItem>
                    ) : (
                        <ListItem key={notification._id} sx={{ 
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
                                <Typography variant="h6">{`Ausencia ${notification.name}`}</Typography>
                                <Typography variant="h6">{new Date(notification.startDate).toLocaleDateString('en-GB')}</Typography>
                            </Grid>
        
                            <Grid container justifyContent="space-around">
                                <Button variant="contained" sx={{mt: { xs: 2, md: 0 } }} disabled={!notification.justificante} onClick={() => downloadFile(notification.justificante)}> 
                                    <Typography>
                                        Descargar justificante
                                    </Typography>
                                </Button>
                                <Button variant="contained" sx={{mt: { xs: 2, md: 0 } }} onClick={() => deleteNotification(notification._id)}> 
                                    <Typography>
                                        Ok
                                    </Typography>
                                </Button>
                            </Grid>
                        </ListItem>
                    )
                ))}
            </List>
        </>
    )
}

