import { useState, useEffect } from "react";
import gestionApi from "../api/gestionApi";
import Swal from "sweetalert2";

export const useGetUsers = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setIsLoading(true);
                const response = await gestionApi.get('/employees');
                setUsers(response.data.employees);
            } catch (error) {
                setHasError(true);
                console.log(error);
                Swal.fire('Error al intentar obtener los usuarios', error.message, 'error')
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, []);

    return {
        users,
        isLoading,
        hasError,
        setUsers
    }
}

