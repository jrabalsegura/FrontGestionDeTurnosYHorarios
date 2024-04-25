import { Navigate, Routes, Route } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { AdminRoutes } from '../admin/routes/AdminRoutes';
import { EmployeeRoutes } from '../employee/routes/EmployeeRoutes';

export const AppRouter = () => {

    const authStatus = 'not-authenticated'

    return (
        <Routes>
            {
                (authStatus === 'not-authenticated') ? 
                    <Route path='/auth/*' element={<AuthRoutes />} /> : 

                    //If user.name === 'admin' go to admin routes
                    //else go to employee routes
                    
                    <Route path='/*' element={<AdminRoutes />} />
            }
{/*             <Route path='/auth/*' element={<AuthRoutes />} />
 */}
            <Route path='/admin/*' element={<AdminRoutes />} />
            <Route path='/employee/*' element={<EmployeeRoutes />} /> 

            <Route path='/*' element={<Navigate to='/auth' />} />

            
        </Routes>
    );
}

