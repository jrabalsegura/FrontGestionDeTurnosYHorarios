import { Typography } from "@mui/material"
import { AdminLayout } from "../layout/AdminLayout";
import { NothingSelectedView } from "../views";


export const HomePage = () => {
    return (
        <AdminLayout>
            {/* <Typography>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident quidem ab qui non corporis hic cumque, aspernatur ipsum vero, maiores dignissimos fugit? Illo sequi ipsam eaque necessitatibus officiis autem similique?
            </Typography> */}
            <NothingSelectedView />
        </AdminLayout>
    );
}


