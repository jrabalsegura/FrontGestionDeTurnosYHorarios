import { renderHook, act, waitFor } from '@testing-library/react';
import { useGetHolidays } from '../../src/hooks/useGetHolidays';
import gestionApi from '../../src/api/gestionApi';
import Swal from 'sweetalert2';

jest.mock('../../src/api/gestionApi');
jest.mock('sweetalert2');

describe('Pruebas en useGetHolidays', () => {

    const mockHolidays = [
        { startDate: '2023-12-24', endDate: '2023-12-25' },
        { startDate: '2023-12-31', endDate: '2024-01-01' }
    ];

    const adaptedHolidays = mockHolidays.map(holiday => ({
        title: 'Vacaciones',
        start: new Date(holiday.startDate),
        end: new Date(holiday.endDate),
    }));

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('debe de regresar los valores por defecto', () => {
        const { result } = renderHook(() => useGetHolidays({ id: 1 }));
        expect(result.current).toEqual({
            holidays: [],
            isLoading: true,
            hasError: false,
            setHolidays: expect.any(Function)
        });
    });

    test('debe de cargar los holidays correctamente', async () => {
        gestionApi.get.mockResolvedValue({ data: { holidays: mockHolidays } });

        const { result } = renderHook(() => useGetHolidays({ id: 1 }));

        expect(result.current.isLoading).toBe(true);

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.holidays).toEqual(adaptedHolidays);
        expect(result.current.hasError).toBe(false);
    });

    test('debe de manejar el error al cargar los holidays', async () => {
        const errorMessage = 'Network Error';
        gestionApi.get.mockRejectedValue(new Error(errorMessage));

        const { result } = renderHook(() => useGetHolidays({ id: 1 }));

        expect(result.current.isLoading).toBe(true);

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.hasError).toBe(true);
        expect(result.current.holidays).toEqual([]);
        expect(Swal.fire).toHaveBeenCalledWith('Error al intentar obtener las vacaciones', errorMessage, 'error');
    });

});