import { useState, useEffect } from "react";
import gestionApi from "../api/gestionApi";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { onfetchedNotifications, removeNotificacion } from "../store/admin/notificacionesSlice";

export const useGetNotificaciones = () => {
    const { notificaciones } = useSelector((state) => state.notificaciones);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const fetchNotificaciones = async () => {
            try {
                setIsLoading(true);
                const response = await gestionApi.get('/notificaciones');
                dispatch(onfetchedNotifications(response.data.notifications));
            } catch (error) {
                setHasError(true);
                console.log(error);
                Swal.fire('Error al intentar obtener las notificaciones', error.message, 'error')
            } finally {
                setIsLoading(false);
            }
        };
        fetchNotificaciones();
    }, []);

    const filterNotificacion = (id) => {
        dispatch(removeNotificacion(id));
    }

    return {
        notificaciones,
        isLoading,
        hasError,
        filterNotificacion
    }
}

