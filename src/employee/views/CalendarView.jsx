import { CircularProgress, Typography } from '@mui/material';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { localizer, getMessagesEs } from '../helpers/';
import { useCallback, useState, useRef } from 'react';
import { Modal } from '../component/Modal';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useGetShifts } from '../../hooks/useGetShifts';
import { useGetHolidays } from '../../hooks/useGetHolidays';



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

    const { user } = useAuthStore();

    const { shifts, isLoading: isLoadingShifts, hasError: hasErrorShifts, setShifts } = useGetShifts({ id: user.uid });
    const { holidays, isLoading: isLoadingHolidays, hasError: hasErrorHolidays, setHolidays } = useGetHolidays({ id: user.uid });
    const [date, setDate] = useState(null);

    const ref = useRef(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);


    const handleSelectSlot = (slotInfo) => {
        // slotInfo contains start and end date of the clicked slot
        const clickedDate = slotInfo.start;
        console.log('Slot selected:', clickedDate);
        setDate(clickedDate);
    
        // Now check if this date falls within any of the existing events
        const relevantEvent = shifts.concat(holidays).find(event => {
            // Create a new Date object from clickedDate and add 16 hours
            const adjustedClickedDate = new Date(clickedDate);
            adjustedClickedDate.setHours(clickedDate.getHours() + 16);

            return adjustedClickedDate >= event.start && adjustedClickedDate <= event.end &&
                (event.title === 'morning' || event.title === 'afternoon');
        });
    
        if (relevantEvent) {
            setDate(clickedDate); // Set the exact clicked date
            openModal();
        }
    };

    useOnClickOutside(ref, closeModal);

    if (isLoadingShifts || isLoadingHolidays) {
        return <CircularProgress size={80} />
    }

    if (hasErrorShifts || hasErrorHolidays) {
        return <Typography variant="h5">No se ha podido realizar la conexión a la base de datos. Vuelva a intentarlo más tarde.</Typography>
    }

    return (
        <>
            <div ref={ref}>
                <Modal
                    isModalOpen={isModalOpen}
                    closeModal={closeModal}
                    id={user.uid}
                    username={user.name}
                    date={date}
                />
            
            </div>
            <Calendar
                width='100%'
                culture='es'
                localizer={localizer}
                //join shigts and holidays for events   
                events={shifts.concat(holidays)}
                startAccessor="start"
                endAccessor="end"
                style={{ opacity: isModalOpen ? 0.2 : 1, transition: 'opacity 0.5s', height: 'calc(100vh - 180px)', backgroundColor: 'white', width: '100%', minWidth: '500' }}
                messages={getMessagesEs()}
                eventPropGetter={eventStyleGetter}
                onSelectSlot={handleSelectSlot}
                selectable={true}
            />
        </>
    )
}



