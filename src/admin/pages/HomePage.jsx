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
            case 'calcularNominaView':
                return <CalcularNominaView />;
            case 'seeNominaView':
                return <SeeNominaView />;
            case 'calcularFiniquitoView':
                return <CalcularFiniquitoView />;
            case 'seeFiniquitoView':
                return <SeeFiniquitoView />;
            case 'asignarTurnosView':
                return <AsignarTurnosView />;
            case 'gestionarVacacionesView':
                return <GestionarVacacionesView />;
            case 'consultarRegistroView':
                return <ConsultarRegistroView />;
            case 'showNotificacionesView':
                return <ShowNotificacionesView />;
            default:
                return <NothingSelectedView />;
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
