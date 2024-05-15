import { renderHook, act, waitFor } from '@testing-library/react';
import { useGetEventos } from '../../src/hooks/useGetEventos';
import gestionApi from '../../src/api/gestionApi';
import Swal from 'sweetalert2';

jest.mock('../../src/api/gestionApi');
jest.mock('sweetalert2');

describe('Pruebas en useGetEventos', () => {

    const mockEvents = [
        { id: 1, name: 'Evento 1' },
        { id: 2, name: 'Evento 2' }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('debe de regresar los valores por defecto', () => {
        const { result } = renderHook(() => useGetEventos());
        expect(result.current).toEqual({
            events: [],
            isLoading: true,
            hasError: false,
            setEvents: expect.any(Function)
        });
    });

    test('debe de cargar los eventos correctamente', async () => {
        gestionApi.get.mockResolvedValue({ data: { eventos: mockEvents } });
        const { result } = renderHook(() => useGetEventos());

        

        expect(result.current.isLoading).toBe(true);

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.events).toEqual(mockEvents);
        expect(result.current.hasError).toBe(false);
    });

    test('debe de manejar el error al cargar los eventos', async () => {
        const errorMessage = 'Network Error';
        gestionApi.get.mockRejectedValue(new Error(errorMessage));

        const { result } = renderHook(() => useGetEventos());

        expect(result.current.isLoading).toBe(true);

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.hasError).toBe(true);
        expect(result.current.events).toEqual([]);
        expect(Swal.fire).toHaveBeenCalledWith('Error al intentar obtener los eventos', errorMessage, 'error');
    });

});