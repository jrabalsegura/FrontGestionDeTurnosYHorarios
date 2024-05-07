import React, { useState } from 'react';
import { Typography, Button } from "@mui/material"
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import gestionApi from '../../api/gestionApi';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setSeeNominaView } from '../../store/employee/employeeScreenSlice';

dayjs.locale('es');

export const NominasView = () => {
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [nomina, setNomina] = useState(null);

    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [fetchUser, setFetchUser] = useState({}); // State to hold fetched user data

    //Get name info from api with the id
    useEffect(() => {
        async function fetchData() {
            console.log(user.uid);
            try {
                const response = await gestionApi.get(`employees/${user.uid}`);
                setFetchUser(response.data.employee); // Update state with fetched data
                console.log(response.data.employee);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        }
        fetchData();
    }, [user.uid]);

    const handleDateChange = (newDate) => {
        
        setSelectedDate(newDate);
        console.log(newDate);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const params = {
                    employeeId: user.uid,
                    month: selectedDate.month() + 1,
                    year: selectedDate.year()
                };
                console.log(params);
                const response = await gestionApi.get(`/nominas`, { params });
                setNomina(response.data.nomina[0]);
                console.log(response);
            } catch (error) {
                console.error('Failed to fetch data:', error);
                setNomina(null);
            }
        }

        fetchData();
    }, [user.uid, selectedDate]);

    const handleClick = () => {
        //Add fetchUser.name to nomina object
        const nominaWithName = {
            ...nomina,
            name: fetchUser.name
        };
        dispatch(setSeeNominaView(nominaWithName));
    }

    return (
        <>
            <Typography variant="h4" marginBottom={4}>
                Seleccione nómina deseada..
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
                <Typography>Descargar</Typography>
            </Button>
            {!nomina && <Typography variant="h6">No hay nómina para el mes seleccionado</Typography>}
        </>
    )
}

