import { Routes, Route } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { AdminRoutes } from '../admin/routes/AdminRoutes';
import { EmployeeRoutes } from '../employee/routes/EmployeeRoutes';

export const AppRouter = () => {
    return (
        <Routes>
            <Route path='/auth/*' element={<AuthRoutes />} />

            <Route path='/admin/*' element={<AdminRoutes />} />
            <Route path='/employee/*' element={<EmployeeRoutes />} />

            
        </Routes>
    );
}

