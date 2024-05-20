import { authSlice, clearErrorMessage, onLogin, onLogout } from '../../src/store/auth/authSlice';


describe('Pruebas en authSlice', () => {

    const initialState = { status: 'checking', user: {}, errorMessage: undefined };
    const authenticatedState = { status: 'authenticated', user: { name: 'Test User', uid: '123' }, errorMessage: undefined };
    
    test('debe de regresar el estado inicial', () => {
        expect( authSlice.getInitialState() ).toEqual( initialState );
    });

    test('debe de realizar un login', () => {
        
        const state = authSlice.reducer( initialState, onLogin( { username: 'admin@admin.com', password: '12345678' } ) );
        expect( state ).toEqual({
            status: 'authenticated',
            user: { username: 'admin@admin.com', password: '12345678' },
            errorMessage: undefined
        })
    });

    test('debe de realizar el logout', () => {
        const state = authSlice.reducer( authenticatedState, onLogout() );
        expect( state ).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: undefined
        });
    });

    test('debe de realizar el logout', () => {
        const errorMessage = 'Credenciales no válidas'
        const state = authSlice.reducer( authenticatedState, onLogout(errorMessage) );
        expect( state ).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: errorMessage
        });
    });

    test('debe de limpiar el mensaje de error', () => {

        const errorMessage = 'Credenciales no válidas'
        const state = authSlice.reducer( authenticatedState, onLogout(errorMessage) );
        const newState = authSlice.reducer( state, clearErrorMessage() )

        expect( newState.errorMessage ).toBe( undefined );
        
    });

});