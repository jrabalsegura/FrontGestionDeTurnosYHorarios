import { renderHook, waitFor } from '@testing-library/react';
import { useGetShifts } from '../../src/hooks/useGetShifts';
import gestionApi from '../../src/api/gestionApi';
import Swal from 'sweetalert2';

jest.mock('../../src/api/gestionApi');
jest.mock('sweetalert2');

describe('Pruebas en useGetShifts', () => {

    const mockShifts = [
        { type: 'morning', start: '2023-01-01T08:00:00Z', end: '2023-01-01T12:00:00Z' },
        { type: 'afternoon', start: '2023-01-01T13:00:00Z', end: '2023-01-01T17:00:00Z' }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('debe de regresar los valores por defecto', () => {
        const { result } = renderHook(() => useGetShifts({ id: 1 }));
        expect(result.current).toEqual({
            shifts: [],
            isLoading: true,
            hasError: false,
            setShifts: expect.any(Function)
        });
    });

    test('debe de cargar los turnos correctamente', async () => {
        gestionApi.get.mockResolvedValue({ data: { shifts: mockShifts } });

        const { result } = renderHook(() => useGetShifts({ id: 1 }));

        expect(result.current.isLoading).toBe(true);

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        const adaptedShifts = mockShifts.map(shift => ({
            title: shift.type === 'morning' ? 'Mañana' : shift.type === 'afternoon' ? 'Tarde' : shift.type,
            start: new Date(shift.start),
            end: new Date(shift.end),
        }));

        expect(result.current.shifts).toEqual(adaptedShifts);
        expect(result.current.hasError).toBe(false);
    });

    test('debe de manejar el error al cargar los turnos', async () => {
        const errorMessage = 'Network Error';
        gestionApi.get.mockRejectedValue(new Error(errorMessage));

        const { result } = renderHook(() => useGetShifts({ id: 1 }));

        expect(result.current.isLoading).toBe(true);

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.shifts).toEqual([]);
        expect(Swal.fire).toHaveBeenCalledWith('Error al intentar obtener los turnos', errorMessage, 'error');
    });

});