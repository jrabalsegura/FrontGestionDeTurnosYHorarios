import { useState, useEffect } from "react";
import gestionApi from "../api/gestionApi";
import Swal from "sweetalert2";

export const useGetNomina = ( {params} ) => {
    const [nomina, setNomina] = useState([null]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const fetchNomina = async () => {
            try {
                setIsLoading(true);
                const response = await gestionApi.get(`/nominas`, {params});
                setNomina(response.data.nomina[0]);
            } catch (error) {
                setHasError(true);
                setNomina(null);
            } finally {
                setIsLoading(false);
            }
        };
        fetchNomina();
    }, [params.employeeId, params.month, params.year]);

    return {
        nomina,
        isLoading,
        hasError,
        setNomina
    }
}

