import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Typography } from "@mui/material";
import { addDays } from 'date-fns';
import { localizer, getMessagesEs } from '../helpers/';

const shifts = [{
    title: 'Shift 1',
    start: new Date(),
    end: addDays(new Date(), 2)
}];

const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
        backgroundColor: 'red',
        borderRadius: '2px',
        opacity: 0.8,
        color: 'white',
    };
    return { style };
}

export const CalendarView = () => {
    return (
        <>
            <Calendar
                culture='es'
                localizer={localizer}
                events={shifts}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 180px)', backgroundColor: 'white', width: '100%', minWidth: '500' }}
                messages={getMessagesEs()}
                eventPropGetter={eventStyleGetter}
            />
        </>
    )
}

