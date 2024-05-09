import { useState, useEffect } from "react";
import gestionApi from "../api/gestionApi";
import Swal from "sweetalert2";

export const useGetUsers = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await gestionApi.get('/employees');
                setUsers(response.data.employees);
            } catch (error) {
                setHasError(true);
                setIsLoading(false);
                console.log(error);
                Swal.fire('Error al intentar obtener los usuarios', error.message, 'error')
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

