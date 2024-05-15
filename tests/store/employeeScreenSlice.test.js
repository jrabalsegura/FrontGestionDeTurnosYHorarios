import { employeeScreenSlice, setNothingSelectedView, setEditUserView, setCalendarView, setNominasView, setCalculadoraView, setSolicitarVacacionesView, setSeeNominaView } from '../../src/store/employee/employeeScreenSlice';

describe('Pruebas en employeeScreenSlice', () => {
    const initialState = { screen: 'nothingSelectedView', props: null };

    test('debe de regresar el estado inicial', () => {
        expect(employeeScreenSlice.getInitialState()).toEqual(initialState);
    });

    test('debe de establecer la vista nothingSelectedView', () => {
        const state = employeeScreenSlice.reducer(initialState, setNothingSelectedView());
        expect(state).toEqual({ screen: 'nothingSelectedView', props: null });
    });

    test('debe de establecer la vista editUserView', () => {
        const state = employeeScreenSlice.reducer(initialState, setEditUserView());
        expect(state).toEqual({ screen: 'editUserView', props: null });
    });

    test('debe de establecer la vista calendarView', () => {
        const state = employeeScreenSlice.reducer(initialState, setCalendarView());
        expect(state).toEqual({ screen: 'calendarView', props: null });
    });

    test('debe de establecer la vista nominasView', () => {
        const state = employeeScreenSlice.reducer(initialState, setNominasView());
        expect(state).toEqual({ screen: 'nominasView', props: null });
    });

    test('debe de establecer la vista calculadoraView', () => {
        const state = employeeScreenSlice.reducer(initialState, setCalculadoraView());
        expect(state).toEqual({ screen: 'calculadoraView', props: null });
    });

    test('debe de establecer la vista solicitarVacacionesView', () => {
        const state = employeeScreenSlice.reducer(initialState, setSolicitarVacacionesView());
        expect(state).toEqual({ screen: 'solicitarVacacionesView', props: null });
    });

    test('debe de establecer la vista seeNominaView con props', () => {
        const props = { nominaId: '123' };
        const state = employeeScreenSlice.reducer(initialState, setSeeNominaView(props));
        expect(state).toEqual({ screen: 'seeNominaView', props });
    });
});