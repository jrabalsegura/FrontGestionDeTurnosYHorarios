import gestionApi from '../../api/gestionApi';

export const getNotifications = async () => {

    try {
        const response = await gestionApi.get('/notificaciones');
        return response.data.notifications;
    } catch (error) {
        console.log(error);
    }
}