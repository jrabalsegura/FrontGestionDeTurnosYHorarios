import { Typography, List, ListItem, Button, Grid, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { downloadFile } from "../../helpers/downloadFile";
import { setGestionarVacacionesView } from "../../store/admin/adminScreenSlice";
import gestionApi from "../../api/gestionApi";
import Swal from "sweetalert2";
import { useGetNotificaciones } from "../../hooks/useGetNotificaciones";

export const ShowNotificacionesView = () => {
    const theme = useTheme();

    const dispatch = useDispatch();

    const { notificaciones, filterNotificacion, isLoading, hasError } = useGetNotificaciones();

    const deleteNotification = async (id) => {
        try {
            const response = await gestionApi.delete(`/notificaciones/${id}`);
            filterNotificacion(id);
        } catch (error) {
            console.log(error);
            Swal.fire('Error al intentar eliminar la notificacion', error.message, 'error')
        }       
    }

    if (isLoading) {
        return <CircularProgress size={80} />
    }

    if (hasError) {
        return <Typography variant="h5">No se ha podido realizar la conexión a la base de datos. Vuelva a intentarlo más tarde.</Typography>
    }

    return (
        <>
            <List sx={{ width: '100%'}}>
                {notificaciones.length > 0 ? (
                    notificaciones.map((notification) => (
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
                    ))
                ) : (
                    <Typography variant="h5" sx={{ mt: 2, textAlign: 'center' }}>
                        No hay notificaciones para mostrar
                    </Typography>
                )}
            </List>
        </>
    )
}

