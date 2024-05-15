import { adminScreenSlice, setNothingSelectedView, setShowUsersView, setAddUserView, setEditUserView, setCalcularNominaView, setSeeNominaView, setCalcularFiniquitoView, setSeeFiniquitoView, setAsignarTurnosView, setGestionarVacacionesView, setConsultarRegistroView, setShowNotificacionesView } from '../../src/store/admin/adminScreenSlice';

describe('Pruebas en adminScreenSlice', () => {
    const initialState = { screen: 'nothingSelectedView', props: null };

    test('debe de regresar el estado inicial', () => {
        expect(adminScreenSlice.getInitialState()).toEqual(initialState);
    });

    test('debe de establecer la vista nothingSelectedView', () => {
        const state = adminScreenSlice.reducer(initialState, setNothingSelectedView());
        expect(state).toEqual({ screen: 'nothingSelectedView', props: null });
    });

    test('debe de establecer la vista showUsersView', () => {
        const state = adminScreenSlice.reducer(initialState, setShowUsersView());
        expect(state).toEqual({ screen: 'showUsersView', props: null });
    });

    test('debe de establecer la vista addUserView con props', () => {
        const props = { someData: 'data' };
        const state = adminScreenSlice.reducer(initialState, setAddUserView(props));
        expect(state).toEqual({ screen: 'addUserView', props });
    });

    test('debe de establecer la vista editUserView con props', () => {
        const props = { userId: '123' };
        const state = adminScreenSlice.reducer(initialState, setEditUserView(props));
        expect(state).toEqual({ screen: 'editUserView', props });
    });

    test('debe de establecer la vista calcularNominaView', () => {
        const state = adminScreenSlice.reducer(initialState, setCalcularNominaView());
        expect(state).toEqual({ screen: 'calcularNominaView', props: null });
    });

    test('debe de establecer la vista seeNominaView con props', () => {
        const props = { nominaId: '456' };
        const state = adminScreenSlice.reducer(initialState, setSeeNominaView(props));
        expect(state).toEqual({ screen: 'seeNominaView', props });
    });

    test('debe de establecer la vista calcularFiniquitoView', () => {
        const state = adminScreenSlice.reducer(initialState, setCalcularFiniquitoView());
        expect(state).toEqual({ screen: 'calcularFiniquitoView', props: null });
    });

    test('debe de establecer la vista seeFiniquitoView con props', () => {
        const props = { finiquitoId: '789' };
        const state = adminScreenSlice.reducer(initialState, setSeeFiniquitoView(props));
        expect(state).toEqual({ screen: 'seeFiniquitoView', props });
    });

    test('debe de establecer la vista asignarTurnosView', () => {
        const state = adminScreenSlice.reducer(initialState, setAsignarTurnosView());
        expect(state).toEqual({ screen: 'asignarTurnosView', props: null });
    });

    test('debe de establecer la vista gestionarVacacionesView', () => {
        const state = adminScreenSlice.reducer(initialState, setGestionarVacacionesView());
        expect(state).toEqual({ screen: 'gestionarVacacionesView', props: null });
    });

    test('debe de establecer la vista consultarRegistroView', () => {
        const state = adminScreenSlice.reducer(initialState, setConsultarRegistroView());
        expect(state).toEqual({ screen: 'consultarRegistroView', props: null });
    });

    test('debe de establecer la vista showNotificacionesView', () => {
        const state = adminScreenSlice.reducer(initialState, setShowNotificacionesView());
        expect(state).toEqual({ screen: 'showNotificacionesView', props: null });
    });

});

