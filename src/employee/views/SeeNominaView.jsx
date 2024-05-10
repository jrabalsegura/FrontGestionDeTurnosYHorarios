import { Button, Grid, Typography } from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import { downloadFile } from "../../helpers/downloadFile";
import { useAuthStore } from "../../hooks/useAuthStore";
import { setNominasView } from "../../store/employee/employeeScreenSlice";


export const SeeNominaView = () => {

    const {props} = useSelector(state => state.employeeScreen);
    const { user } = useAuthStore();
    const dispatch = useDispatch();
    console.log(props);

    //Ensure that the data we are disploying correspond to this user
    if (props.name !== user.name) {
        dispatch(setNominasView());
    }

    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const currentMonth = props.month; // January is 0, not 1
    const currentYear = props.year;

    return (
        <Grid width="70%">
            <Grid sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 5
            }}>
                <Typography variant="h4">{props.name}</Typography>
                <Typography variant="h6">{`${monthNames[currentMonth - 1]} ${currentYear}`}</Typography>
            </Grid>

            <Grid sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                marginTop: 5,
                padding: 5,
                paddingLeft: 8,
                paddingRight: 8,
                border: '3px solid #000',
                borderRadius: '10px'
            }}>
                <Grid sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around'
                }}>
                    <Typography variant="h6" width="70%">Salario base: </Typography>
                    <Typography variant="h6" width="30%" textAlign={'end'}>{`${props.baseSallary} €`}</Typography>
                </Grid>

                <Grid sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    marginTop: 2
                }}>
                    <Typography variant="h6" width="70%">Horas Extra: </Typography>
                    <Typography variant="h6" width="30%" textAlign={'end'}>{`${props.horasExtra} horas`}</Typography>
                </Grid>

                <Grid sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    marginTop: 2
                }}>
                    <Typography variant="h6" width="70%">Seguridad Social: </Typography>
                    <Typography variant="h6" width="30%" textAlign={'end'}>{`${props.socialSecurity} €`}</Typography>
                </Grid>

                <Grid sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    marginTop: 5
                }}>
                    <Typography variant="h6" width="70%">Pago: </Typography>
                    <Typography variant="h6" width="30%" textAlign={'end'}>{`${props.pago} €`}</Typography>
                </Grid>

            </Grid>

            <Grid container spacing={2} sx={{ mb: 2, mt: 8}} justifyContent="center" alignItems="center" width="100%">                
                <Button variant="contained" sx={{width: '40%'}} onClick={() => downloadFile(props.fileName)}>
                    <Typography>
                        Descargar
                    </Typography>
                </Button>                              
            </Grid>
        </Grid>

        
    )
}

