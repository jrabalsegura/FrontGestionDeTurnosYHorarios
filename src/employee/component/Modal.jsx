import { AttachFile } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";

export const Modal = () => {
    return (
        <Grid container sx={{
            backgroundColor: 'secondary.dark',
            width: 300,
            height: 300,
            borderRadius: 5,
            border: '2px solid black',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'start',
            gap: 2,
        }}>
            <TextField variant="outlined" color="primary" placeholder="Motivo de la ausencia" sx={{ border: '2px solid', borderRadius: 2}}
                inputProps={{
                    style: { textAlign: 'center' }
                }}
                InputLabelProps={{
                    style: { textAlign: 'center', width: '100%' }
                }}
            />
            <Button variant="outlined" sx={{
                width: '80%',
                borderColor: 'primary.main',
                color: 'primary.dark',
                border: '2px solid black',
                borderRadius: 2,
                '&:hover': {
                    color: 'black',
                    border: '2px solid black'
                }
            }}>
                <IconButton><AttachFile/></IconButton>
                <Typography>Adjuntar</Typography>
            </Button>

            <Button variant="outlined" sx={{
                width: '60%',
                height: 50,
                borderColor: 'primary',
                color: 'primary.dark',
                border: '2px solid black',
                borderRadius: 2,
                marginTop: 8,
                '&:hover': {
                    color: 'black',
                    border: '2px solid black'
                }
            }}>
                <Typography>Notificar</Typography>
            </Button>
        </Grid>
    )
}
