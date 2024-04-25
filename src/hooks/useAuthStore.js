import { useDispatch, useSelector } from "react-redux"
import gestionApi from "../api/gestionApi"
import { onChecking, onLogin } from "../store"


export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({ username, password }) => {
        dispatch(onChecking())
        console.log(username, password)
        //dispatch(login(username, password))

        try {
            const { data } = await gestionApi.post('/auth/', { username, password })
            console.log(data)
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name: data.name, uid: data.uid}))

        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'))
        }
    }

    return {
        status,
        user,
        errorMessage,
        startLogin
    }
}

