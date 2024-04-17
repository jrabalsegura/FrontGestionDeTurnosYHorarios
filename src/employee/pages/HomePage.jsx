import { Grid } from "@mui/material";
import { EmployeeLayout } from "../layout/EmployeeLayout";
import { NothingSelectedView, EditUserView, CalendarView } from "../views";

export const HomePage = () => {
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
                <CalendarView />
            </Grid>
        </EmployeeLayout>
    );
}

