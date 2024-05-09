import { Typography, List, ListItem, ListItemText, Button, ListItemIcon, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import gestionApi from "../../api/gestionApi";
import { format } from 'date-fns'; // Added import for date-fns format function
import { downloadFile } from "../../helpers/downloadFile";
import Swal from "sweetalert2";

export const ConsultarRegistroView = () => {
    const theme = useTheme();
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        const getEvents = async () => {

            try {
                const response = await gestionApi.get('/eventosTrabajo');
                const events = response.data.eventos;
                setEventos(events);
            } catch (error) {
                console.log(error);
                Swal.fire('Error al intentar obtener los eventos', error.message, 'error')
            }
        }
        getEvents();
    }, []);

    console.log(eventos);

    return (
        <>
            <List sx={{ width: '100%'}}>
                {eventos.length > 0 ? (
                    eventos.map(evento => (
                        <ListItem key={evento._id} sx={{ 
                            width: '100%', 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            border: `3px solid ${theme.palette.primary.dark}`, 
                            borderRadius: 3, 
                            padding: 2,
                            paddingLeft: 5,
                            paddingRight: 5,
                            marginBottom: 2 
                        }}>
                            <ListItemText primary={evento.type === 'checkin' ? `${evento.name} entra` : `${evento.name} sale`} />
                            <ListItemText primary={format(new Date(evento.date), 'HH:mm dd-MM')} sx={{ textAlign:"end"}} />
                        </ListItem>
                    ))
                ) : (
                    <Typography sx={{ mt: 2, textAlign: 'center' }}>
                        No hay eventos para mostrar
                    </Typography>
                )}
            </List>

            <Button variant="contained" sx={{ width: "30%" }} onClick={() => downloadFile('events.txt')}>
                <Typography>
                    Descargar
                </Typography>
            </Button>
        </>
    )
}

