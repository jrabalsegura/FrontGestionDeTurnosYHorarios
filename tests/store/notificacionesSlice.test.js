import { notificacionesSlice, onfetchedNotifications, removeNotificacion } from '../../src/store/admin/notificacionesSlice';

describe('Pruebas en notificacionesSlice', () => {
    const initialState = { notificaciones: [] };

    test('debe de regresar el estado inicial', () => {
        expect(notificacionesSlice.getInitialState()).toEqual(initialState);
    });

    test('debe de establecer las notificaciones con onfetchedNotifications', () => {
        const notificaciones = [
            { _id: '1', mensaje: 'Notificación 1' },
            { _id: '2', mensaje: 'Notificación 2' },
        ];
        const state = notificacionesSlice.reducer(initialState, onfetchedNotifications(notificaciones));
        expect(state).toEqual({ notificaciones });
    });

    test('debe de eliminar una notificación con removeNotificacion', () => {
        const notificaciones = [
            { _id: '1', mensaje: 'Notificación 1' },
            { _id: '2', mensaje: 'Notificación 2' },
        ];
        const state = notificacionesSlice.reducer({ notificaciones }, removeNotificacion('1'));
        expect(state).toEqual({ notificaciones: [{ _id: '2', mensaje: 'Notificación 2' }] });
    });
});