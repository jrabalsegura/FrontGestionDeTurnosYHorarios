import { useDispatch, useSelector } from "react-redux"
import gestionApi from "../api/gestionApi"
import { onChecking, onLogin, onLogout, clearErrorMessage, onUpdateUser } from "../store"
import { useState } from "react"


export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const startLogin = async ({ username, password }) => {
        dispatch(onChecking())
        console.log(username, password)
        //dispatch(login(username, password))

        try {
            setIsLoading(true);
            const { data } = await gestionApi.post('/auth/', { username, password })
            console.log(data)
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name: data.name, uid: data.uid, username: data.username}))

        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10);
        } finally {
            setIsLoading(false);
        }
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if(!token) return dispatch(onLogout());

        try {
            setIsLoading(true);
            const { data } = await gestionApi.get('/auth/renew');
            if (data.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('token-init-date', new Date().getTime());
                dispatch(onLogin({name: data.name, uid: data.uid, username: data.username}))
            } else {
                dispatch(onLogout());
            }
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        } finally {
            setIsLoading(false);
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    }

    const onUpdate = async (updatedUser) => {
        dispatch(onUpdateUser({name: updatedUser.name, uid: updatedUser._id, username: updatedUser.username})); // Update user details in the Redux store

    }

    return {
        status,
        user,
        errorMessage,
        isLoading,
        startLogin,
        checkAuthToken,
        startLogout,
        onUpdate
    }
}

