import { useState, useEffect } from "react";
import gestionApi from "../api/gestionApi";
import Swal from "sweetalert2";

export const useGetEventos = () => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setIsLoading(true);
                const response = await gestionApi.get('/eventosTrabajo');
                const events = response.data.eventos;
                setEvents(events);
            } catch (error) {
                setHasError(true);
                console.log(error);
                Swal.fire('Error al intentar obtener los eventos', error.message, 'error')
            } finally {
                setIsLoading(false);
            }
        };
        fetchEvents();
    }, []);

    return {
        events,
        isLoading,
        hasError,
        setEvents
    }
}
