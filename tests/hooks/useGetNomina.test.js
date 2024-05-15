import { renderHook, act, waitFor } from '@testing-library/react';
import { useGetNomina } from '../../src/hooks/useGetNomina';
import gestionApi from '../../src/api/gestionApi';
import Swal from 'sweetalert2';

jest.mock('../../src/api/gestionApi');
jest.mock('sweetalert2');

describe('Pruebas en useGetNomina', () => {

    const mockNomina = { id: 1, amount: 1000 };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('debe de regresar los valores por defecto', () => {
        const { result } = renderHook(() => useGetNomina({ params: { employeeId: 1, month: '01', year: '2023' } }));
        expect(result.current).toEqual({
            nomina: [null],
            isLoading: true,
            hasError: false,
            setNomina: expect.any(Function)
        });
    });

    test('debe de cargar la nomina correctamente', async () => {
        gestionApi.get.mockResolvedValue({ data: { nomina: [mockNomina] } });

        const { result } = renderHook(() => useGetNomina({ params: { employeeId: 1, month: '01', year: '2023' } }));

        expect(result.current.isLoading).toBe(true);

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.nomina).toEqual(mockNomina);
        expect(result.current.hasError).toBe(false);
    });

    test('debe de manejar el error al cargar la nomina', async () => {
        const errorMessage = 'Network Error';
        gestionApi.get.mockRejectedValue(new Error(errorMessage));

        const { result } = renderHook(() => useGetNomina({ params: { employeeId: 1, month: '01', year: '2023' } }));

        expect(result.current.isLoading).toBe(true);

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.hasError).toBe(true);
        expect(result.current.nomina).toBeNull();
    });

});