import gestionApi from '../../api/gestionApi';

export const getUsers = async () => {

    try {
        const response = await gestionApi.get('/employees');
        return response.data.employees;
    } catch (error) {
        console.log(error);
    }
}

