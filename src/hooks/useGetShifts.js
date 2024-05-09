import { useState, useEffect } from "react";
import gestionApi from "../api/gestionApi";
import Swal from "sweetalert2";

export const useGetShifts = ({ id }) => {
    const [shifts, setShifts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const fetchShifts = async () => {
            try {
                setIsLoading(true);
                const response = await gestionApi.get(`/shifts/${id}`);

                const adaptedShifts = response.data.shifts.map(shift => ({
                    title: shift.type,
                    start: new Date(shift.start),
                    end: new Date(shift.end),
                }));
                setShifts(adaptedShifts);
            } catch (error) {
                setHasError(true);
                console.log(error);
                Swal.fire('Error al intentar obtener los turnos', error.message, 'error')
            } finally {
                setIsLoading(false);
            }
        };
        fetchShifts();
    }, []);

    return {
        shifts,
        isLoading,
        hasError,
        setShifts
    }
}
