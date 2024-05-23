import { Navigate, Routes, Route } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { AdminRoutes } from '../admin/routes/AdminRoutes';
import { EmployeeRoutes } from '../employee/routes/EmployeeRoutes';
import { useAuthStore } from '../hooks/useAuthStore';
import { useEffect, useState } from 'react'; 

export const AppRouter = () => {
    const {status, checkAuthToken, user} = useAuthStore();

    useEffect(() => {
        checkAuthToken(); 
    }, [])

    return (
        <Routes>
            {
                (status === 'not-authenticated') ? 
                    (
                        <>
                            <Route path='/auth/*' element={<AuthRoutes />} />
                            <Route path='/*' element={<Navigate to='/auth/' />} />
                        </>
                    ) : 
                    (status === 'authenticated' && user.name === 'admin') ?
                        <>
                            <Route path='/admin/*' element={<AdminRoutes />} />
                            <Route path='/*' element={<Navigate to='/admin' />} />
                        </>
                     :
                    (status === 'authenticated' && user.name !== 'admin') ?
                        <>
                            <Route path='/employee/*' element={<EmployeeRoutes />} />
                            <Route path='/*' element={<Navigate to='/employee' />} />
                        </>
                        :
                        <>
                            <Route path='/*' element={<Navigate to='/auth/' />} /> 
                        </>
            }      
        </Routes>
    );
}
