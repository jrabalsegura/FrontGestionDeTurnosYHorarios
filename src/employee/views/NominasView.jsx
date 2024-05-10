import React, { useState } from 'react';
import { Typography, Button, CircularProgress } from "@mui/material"
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { useDispatch } from 'react-redux';
import { setSeeNominaView } from '../../store/employee/employeeScreenSlice';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useGetNomina } from '../../hooks/useGetNomina';


dayjs.locale('es');

export const NominasView = () => {
    const [selectedDate, setSelectedDate] = useState(dayjs());

    const { user } = useAuthStore();
    const dispatch = useDispatch();

    const handleDateChange = (newDate) => {       
        setSelectedDate(newDate);
    };

    const params = {
        employeeId: user.uid,
        month: selectedDate.month() + 1,
        year: selectedDate.year()
    };

    const { nomina, isLoading, hasError } = useGetNomina({params});

    const handleClick = () => {
        //Add fetchUser.name to nomina object
        const nominaWithName = {
            ...nomina,
            name: user.name
        };
        dispatch(setSeeNominaView(nominaWithName));
    }

    return (
        <>
            <Typography variant="h4" marginBottom={4}>
                Selecciona mes y año
            </Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                    views={['month', 'year']}
                    openTo="month"
                    value={selectedDate}
                    onChange={handleDateChange}
                />
            </LocalizationProvider>

            <Button variant="contained" sx={{width: '240px', height: '40px', mt: 5}} disabled={!nomina} onClick={() => handleClick()}>
                    <Typography>Ver</Typography>
                </Button>

            {isLoading ? (
                <CircularProgress size={80} />
            ) : (
                <>                   
                    {!nomina && <Typography variant="h6" marginTop={5}>No hay nómina para el mes seleccionado</Typography>}
                </>
            )}
        </>
    )
}

