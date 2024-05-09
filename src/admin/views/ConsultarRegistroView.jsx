import { Typography, List, ListItem, ListItemText, Button, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useGetEventos } from "../../hooks/useGetEventos";
import { format } from 'date-fns'; 
import { downloadFile } from "../../helpers/downloadFile";

export const ConsultarRegistroView = () => {
    const theme = useTheme();

    const { events, setEvents, isLoading, hasError } = useGetEventos();

    if (isLoading) {
        return <CircularProgress size={80} />
    }

    return (
        <>
            <List sx={{ width: '100%'}}>
                {events.length > 0 ? (
                    events.map(evento => (
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

