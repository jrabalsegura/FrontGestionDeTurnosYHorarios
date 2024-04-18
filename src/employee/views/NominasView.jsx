import { Typography, Button } from "@mui/material"

import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

dayjs.locale('es');

export const NominasView = () => {
    return (
        <>
            <Typography variant="h4" marginBottom={4}>
                Seleccione nómina deseada..
            </Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar views={['month', 'year']} openTo="month" />
            </LocalizationProvider>

            <Button variant="contained" sx={{width: '240px', height: '40px'}}>
                <Typography>Descargar</Typography>
            </Button>
        </>
    )
}

