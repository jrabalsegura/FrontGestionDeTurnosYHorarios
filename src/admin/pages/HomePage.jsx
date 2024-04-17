import { Grid} from "@mui/material"
import { AdminLayout } from "../layout/AdminLayout";
import { AddUserView, ShowNotificacionesView, ConsultarRegistroView, EditUserView, GestionarVacacionesView, NothingSelectedView, ShowUsersView, CalcularNominaView, SeeNominaView, CalcularFiniquitoView, SeeFiniquitoView, AsignarTurnosView } from "../views";


export const HomePage = () => {
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
                {/* <NothingSelectedView /> */}
                {/* <ShowUsersView /> */}
                {/* <AddUserView /> */}
                {/* <EditUserView />  */}
                {/* <CalcularNominaView /> */}
                {/* <SeeNominaView /> */}
                {/* <CalcularFiniquitoView /> */}
                {/* <SeeFiniquitoView /> */}
                {/* <AsignarTurnosView /> */}
                {/* <GestionarVacacionesView /> */}
                {/* <ConsultarRegistroView /> */}
                <ShowNotificacionesView />

            </Grid>
            
        </AdminLayout>
    );
}


