import { Add, Delete, Edit } from "@mui/icons-material"
import { Fab, Grid, List, ListItem, ListItemIcon, ListItemText, CircularProgress, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles";
import { useDispatch } from 'react-redux';
import { setEditUserView, setAddUserView } from "../../store/admin/adminScreenSlice";
import gestionApi from "../../api/gestionApi";
import Swal from "sweetalert2";
import { useGetUsers } from "../../hooks/useGetUsers";

export const ShowUsersView = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { users, setUsers, isLoading, hasError } = useGetUsers();
    console.log(gestionApi)

    const handleDelete = async (user) => {
        

        try {
            const response = await gestionApi.delete(`/employees/${user._id}`);
            console.log(response);
            // Update the users state to filter out the deleted user
            setUsers(users.filter(u => u._id !== user._id));
        } catch (error) {
            console.log(error);
            Swal.fire('Error al intentar borrar al usuario', error.message, 'error')
        }
    }

    if (isLoading) {
        return <CircularProgress size={80} />
    }

    if (hasError) {
        return <Typography variant="h5">No se ha podido realizar la conexión a la base de datos. Vuelva a intentarlo más tarde.</Typography>
    }

    return (
        <>
            <List sx={{ width: '100%'}}>

                {/* Map users to the listItems */}
                {users.map(user => (
                    <ListItem key={user._id} sx={{ 
                        width: '100%', 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        border: `3px solid ${theme.palette.primary.main}`, 
                        borderRadius: 3, 
                        padding: 2,
                        marginBottom: 2 
                        }}>
                        <ListItemText primary={user.name} sx={{ width: { xs: '60%', lg: '80%' } }} />
                        <Grid container sx={{ width: { xs: '40%', lg: '20%' } }} justifyContent="flex-end">
                            <ListItemIcon sx={{ cursor: 'pointer' }} onClick={() => dispatch(setEditUserView(user))}>
                                <Edit/>
                            </ListItemIcon>
                            <ListItemIcon sx={{ cursor: 'pointer' }} onClick={() => {handleDelete(user)}}>
                                <Delete />
                            </ListItemIcon>
                        </Grid>
                    </ListItem>
                ))}

                
            </List>

            <Fab color="primary" aria-label="add" sx={{ marginTop: 4 }} onClick={() => {dispatch(setAddUserView())}}>
                <Add color="secondary.light" />
            </Fab>
        </>
    )
}
