import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Typography } from "@mui/material";
import { addDays } from 'date-fns';
import { localizer, getMessagesEs } from '../helpers/';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import gestionApi from '../../api/gestionApi';

{/*
const shifts = [{
    title: 'Shift 1',
    start: new Date(),
    end: addDays(new Date(), 2)
}];
*/}


const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
        //red for morning, blue for afternoon and green for holidays
        backgroundColor: `${event.title === 'morning' ? 'red' : event.title === 'afternoon' ? 'blue' : 'green'}`,
        borderRadius: '2px',
        opacity: 0.8,
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textTransform: 'capitalize'
    };
    return { style };
}

export const CalendarView = () => {

    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [shifts, setShifts] = useState([]);
    const [holidays, setHolidays] = useState([]);

    useEffect(() => {
        const fetchShifts = async () => {
            const response = await gestionApi.get(`shifts/${user.uid}`);
            console.log(response);

            //I have to map the shifts to the format of the calendar
            const shifts = response.data.shifts.map(shift => ({
                title: shift.type,
                start: new Date(shift.start),
                end: new Date(shift.end),
            }));
            setShifts(shifts);
        }
        fetchShifts();
    }, [user.uid]);

    useEffect(() => {
        const fetchHolidays = async () => {
            const response = await gestionApi.get(`holidays/${user.uid}`);
            console.log(response);

            //Map holidays to events format
            const holidays = response.data.holidays.map(holiday => ({
                title: 'Holidays',
                start: new Date(holiday.startDate),
                end: new Date(holiday.endDate)
            }));
            setHolidays(holidays);
        }
        fetchHolidays();
    }, [user.uid]);

    const handleDoubleClickEvent = (event) => {
        // Check if the double-clicked event is of type 'morning' or 'afternoon'
        if (event.title === 'morning' || event.title === 'afternoon') {
            console.log('Double-clicked on a morning or afternoon event:', event);
            // Perform actions here based on the event
        }
    };

    return (
        <>
            <Calendar
                culture='es'
                localizer={localizer}
                //join shigts and holidays for events   
                events={shifts.concat(holidays)}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 180px)', backgroundColor: 'white', width: '100%', minWidth: '500' }}
                messages={getMessagesEs()}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={handleDoubleClickEvent}
                selectable={true}
            />
        </>
    )
}

