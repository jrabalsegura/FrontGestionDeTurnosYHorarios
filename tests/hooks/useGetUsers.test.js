import { renderHook, act, waitFor } from '@testing-library/react';
import { useGetUsers } from '../../src/hooks/useGetUsers';
import gestionApi from '../../src/api/gestionApi';
import Swal from 'sweetalert2';

jest.mock('../../src/api/gestionApi');
jest.mock('sweetalert2');

describe('Pruebas en useGetUsers', () => {

    const mockUsers = [
        { id: 1, name: 'User 1' },
        { id: 2, name: 'User 2' }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('debe de regresar los valores por defecto', () => {
        const { result } = renderHook(() => useGetUsers());
        expect(result.current).toEqual({
            users: [],
            isLoading: true,
            hasError: false,
            setUsers: expect.any(Function)
        });
    });

    test('debe de cargar los usuarios correctamente', async () => {
        gestionApi.get.mockResolvedValue({ data: { employees: mockUsers } });

        const { result } = renderHook(() => useGetUsers());

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.users).toEqual(mockUsers);
        expect(result.current.hasError).toBe(false);
    });

    test('debe de manejar el error al cargar los usuarios', async () => {
        const errorMessage = 'Network Error';
        gestionApi.get.mockRejectedValue(new Error(errorMessage));

        const { result } = renderHook(() => useGetUsers());

        act(() => {
            result.current.setUsers([]);
        });

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.hasError).toBe(true);
        expect(result.current.users).toEqual([]);
        expect(Swal.fire).toHaveBeenCalledWith('Error al intentar obtener los usuarios', errorMessage, 'error');
    });

});