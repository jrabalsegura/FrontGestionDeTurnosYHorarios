import { Grid, Button, Typography } from "@mui/material"
import { red, grey, green } from "@mui/material/colors"

export const NothingSelectedView = () => {
    return (
        <>
            <Grid container xs={12} flexDirection='column' alignItems='center'>
                <Button 
                    item 
                    variant="contained" 
                    fullWidth
                    sx={{
                        maxWidth: 480, 
                        height: 120,
                        border: '2px solid black', 
                        borderRadius: 5,
                        backgroundColor: green[300],
                        color: grey[900],
                        marginTop: 8
                    }}>

                    <Typography variant="h4">Entrada</Typography>
                </Button>

                <Button 
                    item 
                    variant="contained" 
                    fullWidth
                    sx={{
                        maxWidth: 480, 
                        height: 120,
                        border: '2px solid black', 
                        borderRadius: 5,
                        backgroundColor: red[200],
                        color: grey[900],
                        marginTop: 8
                    }}>

                    <Typography variant="h4">Salida</Typography>
                </Button>
            </Grid>
        </>
    )
}
