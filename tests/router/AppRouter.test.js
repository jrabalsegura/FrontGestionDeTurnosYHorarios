import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { AppRouter } from '../../src/router/AppRouter';

jest.mock('../../src/hooks/useAuthStore');

jest.mock('../../src/admin/pages/HomePage', () => ({
    HomePage: () => <h1>HomePage</h1>
}))

describe('Pruebas en <AppRouter />', () => {

    const mockCheckAuthToken = jest.fn();

    beforeEach(() => jest.clearAllMocks() );

    test('debe de mostrar la pantalla de carga y llamar checkAuthToken', () => {

        useAuthStore.mockReturnValue({
            status: 'checking',
            checkAuthToken: mockCheckAuthToken
        });

        render( <MemoryRouter>
                    <AppRouter />
                </MemoryRouter> )
        expect( mockCheckAuthToken ).toHaveBeenCalled();
    });

    test('debe de mostrar el login en caso de no estar autenticado', () => {
        
        useAuthStore.mockReturnValue({
            status: 'not-authenticated',
            checkAuthToken: mockCheckAuthToken
        });

        const { container } = render(
            <MemoryRouter initialEntries={['/auth2/algo/otracosa']}>
                <AppRouter />
            </MemoryRouter>
        );

        expect( screen.getByText('Accede a tu área privada') ).toBeTruthy();
        expect( container ).toMatchSnapshot(); 
    });

    test('debe de mostrar la homepage si estamos autenticados', () => {
        
        useAuthStore.mockReturnValue({
            status: 'authenticated',
            user: { name: 'admin', uid: '123' },
            checkAuthToken: mockCheckAuthToken
        });

        render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>
        );

        expect( screen.getByText('HomePage') ).toBeTruthy();       
    });   
});