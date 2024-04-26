import { Grid} from "@mui/material"
import { AdminLayout } from "../layout/AdminLayout";
import { AddUserView, ShowNotificacionesView, ConsultarRegistroView, EditUserView, GestionarVacacionesView, NothingSelectedView, ShowUsersView, CalcularNominaView, SeeNominaView, CalcularFiniquitoView, SeeFiniquitoView, AsignarTurnosView } from "../views";
import { useSelector } from "react-redux";

export const HomePage = () => {

    const { screen, props } = useSelector(state => state.adminScreen);
    
    const renderView = () => {
        switch (screen) {
            case 'nothingSelectedView':
                return <NothingSelectedView />;
            case 'showUsersView':
                return <ShowUsersView />;
            default:
                return null;
        }
    };

    return (
        <AdminLayout>
            
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="flex-start"
                backgroundColor="secondary.light"
                sx={{ minHeight: 'calc(100vh - 120px)', padding: 4, borderRadius: 3 }}
            >
                {renderView()}
            </Grid>
            
        </AdminLayout>
    );
}
