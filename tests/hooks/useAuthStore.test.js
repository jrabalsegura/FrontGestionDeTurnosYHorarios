import { act, renderHook } from '@testing-library/react';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import gestionApi from '../../src/api/gestionApi';
import { onChecking, onLogin, onLogout, clearErrorMessage, onUpdateUser } from '../../src/store';

jest.mock('../../src/api/gestionApi');

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const getMockStore = (initialState) => {
    return mockStore({
        auth: { ...initialState }
    });
};

describe('Pruebas en useAuthStore', () => {

    test('debe de regresar los valores por defecto', () => {
        const initialState = { status: 'checking', user: {}, errorMessage: null };
        const store = getMockStore(initialState);

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
        });

        expect(result.current).toEqual({
            status: initialState.status,
            user: initialState.user,
            errorMessage: initialState.errorMessage,
            isLoading: false,
            startLogin: expect.any(Function),
            checkAuthToken: expect.any(Function),
            startLogout: expect.any(Function),
            onUpdate: expect.any(Function),
        });
    });

    test('startLogin debe de realizar el login correctamente', async () => {
        const initialState = { status: 'not-authenticated', user: {}, errorMessage: null };
        const store = getMockStore(initialState);

        const loginResponse = {
            data: {
                token: 'ABC123',
                name: 'Test User',
                uid: '123',
                username: 'testuser'
            }
        };

        gestionApi.post.mockResolvedValue(loginResponse);

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
        });

        await act(async () => {
            await result.current.startLogin({ username: 'testuser', password: 'password' });
        });

        expect(localStorage.setItem).toHaveBeenCalledWith('token', loginResponse.data.token);
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));
        expect(store.getActions()).toContainEqual(onLogin({
            name: loginResponse.data.name,
            uid: loginResponse.data.uid,
            username: loginResponse.data.username
        }));
    });

    test('startLogin debe de fallar con credenciales incorrectas', async () => {
        const initialState = { status: 'not-authenticated', user: {}, errorMessage: null };
        const store = getMockStore(initialState);

        gestionApi.post.mockRejectedValue(new Error('Credenciales incorrectas'));

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
        });

        await act(async () => {
            await result.current.startLogin({ username: 'wronguser', password: 'wrongpassword' });
        });

        expect(store.getActions()).toContainEqual(onLogout('Credenciales incorrectas'));
        expect(store.getActions()).toContainEqual(clearErrorMessage());
    });

    test('checkAuthToken debe de renovar el token correctamente', async () => {
        const initialState = { status: 'authenticated', user: {}, errorMessage: null };
        const store = getMockStore(initialState);

        const renewResponse = {
            data: {
                ok: true,
                token: 'NEW_TOKEN',
                name: 'Test User',
                uid: '123',
                username: 'testuser'
            }
        };

        gestionApi.get.mockResolvedValue(renewResponse);

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
        });

        await act(async () => {
            await result.current.checkAuthToken();
        });

        expect(localStorage.setItem).toHaveBeenCalledWith('token', renewResponse.data.token);
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));
        expect(store.getActions()).toContainEqual(onLogin({
            name: renewResponse.data.name,
            uid: renewResponse.data.uid,
            username: renewResponse.data.username
        }));
    });

    test('checkAuthToken debe de fallar si no hay token', async () => {
        const initialState = { status: 'not-authenticated', user: {}, errorMessage: null };
        const store = getMockStore(initialState);

        localStorage.removeItem('token');

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
        });

        await act(async () => {
            await result.current.checkAuthToken();
        });

        expect(store.getActions()).toContainEqual(onLogout());
    });

    test('startLogout debe de realizar el logout correctamente', async () => {
        const initialState = { status: 'authenticated', user: { name: 'Test User', uid: '123' }, errorMessage: null };
        const store = getMockStore(initialState);

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
        });

        await act(async () => {
            await result.current.startLogout();
        });

        expect(localStorage.removeItem).toHaveBeenCalledWith('token');
        expect(localStorage.removeItem).toHaveBeenCalledWith('token-init-date');
        expect(store.getActions()).toContainEqual(onLogout());
    });

    test('onUpdate debe de actualizar el usuario correctamente', async () => {
        const initialState = { status: 'authenticated', user: { name: 'Test User', uid: '123' }, errorMessage: null };
        const store = getMockStore(initialState);

        const updateResponse = {
            data: {
                ok: true,
                name: 'Updated User',
                uid: '123',
                username: 'updateduser'
            }
        };

        gestionApi.put.mockResolvedValue(updateResponse);

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
        });

        await act(async () => {
            await result.current.onUpdate({ name: 'Updated User', username: 'updateduser' });
        });

        expect(store.getActions()).toContainEqual(onUpdateUser({
            name: updateResponse.data.name,
            uid: updateResponse.data.uid,
            username: updateResponse.data.username
        }));
    });

});