import { useState, useEffect } from "react";
import gestionApi from "../api/gestionApi";
import Swal from "sweetalert2";

export const useGetHolidays = ({ id }) => {
    const [holidays, setHolidays] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const fetchHolidays = async () => {
            try {
                setIsLoading(true);
                const response = await gestionApi.get(`/holidays/${id}`);
                console.log(response)

                const adaptedHolidays = response.data.holidays.map(holiday => ({
                    title: 'Holidays',
                    start: new Date(holiday.startDate),
                    end: new Date(holiday.endDate),
                }));
                setHolidays(adaptedHolidays);
            } catch (error) {
                setHasError(true);
                console.log(error);
                Swal.fire('Error al intentar obtener las vacaciones', error.message, 'error')
            } finally {
                setIsLoading(false);
            }
        };
        fetchHolidays();
    }, []);

    return {
        holidays,
        isLoading,
        hasError,
        setHolidays
    }
}