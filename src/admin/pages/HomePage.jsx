import { Typography } from "@mui/material"
import { AdminLayout } from "../layout/AdminLayout";
import { AddUserView, EditUserView, NothingSelectedView, ShowUsersView } from "../views";


export const HomePage = () => {
    return (
        <AdminLayout>
            {/* <NothingSelectedView /> */}
            {/* <ShowUsersView /> */}
            {/* <AddUserView /> */}
            <EditUserView />
        </AdminLayout>
    );
}


