import { Grid } from "@mui/material";
import { EmployeeLayout } from "../layout/EmployeeLayout";
import { NothingSelectedView, EditUserView, NominasView, CalendarView, CalculadoraView, SolicitarVacacionesView } from "../views";
import { Modal } from "../component";
import { useSelector } from "react-redux";

export const HomePage = () => {

    const { screen, props } = useSelector(state => state.employeeScreen);

    const renderView = () => {
        switch (screen) {
            case 'nothingSelectedView':
                return <NothingSelectedView />;
            case 'editUserView':
                return <EditUserView />;
            case 'calendarView':
                return <CalendarView />;
            case 'nominasView':
                return <NominasView />;
            case 'calculadoraView':
                return <CalculadoraView />;
            case 'solicitarVacacionesView':
                return <SolicitarVacacionesView />;
            default:
                return <NothingSelectedView />;
        }
    }

    return (
        <EmployeeLayout>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="flex-start"
                backgroundColor="secondary.light"
                sx={{ minHeight: 'calc(100vh - 120px)', padding: 4, borderRadius: 3 }}
            >
                {/* <NothingSelectedView /> */}
                {/* <EditUserView /> */}
                {/* <CalendarView /> */}
                {/* <Modal /> */}
                {/* <NominasView /> */}
                {/* <CalculadoraView /> */}
                {/*<SolicitarVacacionesView />*/}

                {renderView()}
            </Grid>
        </EmployeeLayout>
    );
}

