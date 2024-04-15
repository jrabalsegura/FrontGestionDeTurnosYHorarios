import { Grid, Typography } from "@mui/material"
import { AdminLayout } from "../layout/AdminLayout";
import { AddUserView, EditUserView, NothingSelectedView, ShowUsersView, CalcularNominaView } from "../views";


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
                <CalcularNominaView />

            </Grid>
            
        </AdminLayout>
    );
}


