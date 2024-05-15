import { renderHook, act, waitFor } from '@testing-library/react';
import { useGetNotificaciones } from '../../src/hooks/useGetNotificaciones';
import gestionApi from '../../src/api/gestionApi';
import Swal from 'sweetalert2';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { onfetchedNotifications } from '../../src/store/admin/notificacionesSlice';

jest.mock('../../src/api/gestionApi');
jest.mock('sweetalert2');

// Create a mock store
const mockStore = configureStore([]);
const store = mockStore({
  notificaciones: {
    notificaciones: [],
    isLoading: false,
    hasError: false
  }
});

describe('Pruebas en useGetNotificaciones', () => {

    const mockNotificaciones = [
        { id: 1, message: 'Notificación 1' },
        { id: 2, message: 'Notificación 2' }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        store.clearActions();
    });

    test('debe de regresar los valores por defecto', () => {
        const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
        const { result } = renderHook(() => useGetNotificaciones(), { wrapper });
        expect(result.current).toEqual({
            notificaciones: [],
            isLoading: true,
            hasError: false,
            filterNotificacion: expect.any(Function)
        });
    });

    test('debe de cargar las notificaciones correctamente', async () => {
        gestionApi.get.mockResolvedValue({ data: { notifications: mockNotificaciones } });
        const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
        const { result } = renderHook(() => useGetNotificaciones(), { wrapper });

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        const actions = store.getActions();
        expect(actions).toContainEqual(onfetchedNotifications(mockNotificaciones));
        //expect(result.current.notificaciones).toEqual(mockNotificaciones);
        expect(result.current.hasError).toBe(false);
    });

    test('debe de manejar el error al cargar las notificaciones', async () => {
        const errorMessage = 'Network Error';
        gestionApi.get.mockRejectedValue(new Error(errorMessage));
        const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
        const { result } = renderHook(() => useGetNotificaciones(), { wrapper });


        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        const actions = store.getActions();
        expect(actions).not.toContainEqual(onfetchedNotifications(mockNotificaciones));
        expect(result.current.hasError).toBe(true);
        expect(Swal.fire).toHaveBeenCalledWith('Error al intentar obtener las notificaciones', errorMessage, 'error');
    });

});