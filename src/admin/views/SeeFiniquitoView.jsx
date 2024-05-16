import { Button, Grid, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { calcFiniquito } from "../../helpers/calcFiniquito"
import { useEffect } from "react";
import gestionApi from "../../api/gestionApi";
import { downloadFile } from "../../helpers/downloadFile";

export const SeeFiniquitoView = () => {

    const {props} = useSelector(state => state.adminScreen);

    const {baseSallary, months, totalVacation, pago} = calcFiniquito(props.hourlySallary, props.startDate,props.holidays);

    let fileName = '';

    useEffect(() => {
        const createFiniquito = async () => {
            try {
                const response = await gestionApi.post('/nominas/newFiniquito', {
                    employeeId: props._id,
                    employeeName: props.name,
                    baseSallary,
                    months,
                    totalVacation,
                    pago
                });
                console.log(response);
                fileName = response.data.fileName;
            } catch (error) {
                console.log(error);
            }
        }
        createFiniquito();
    }, []);

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
                <Typography variant="h6">Cálculo finiquito</Typography>
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
                    <Typography variant="h6" width="30%" textAlign={'end'}>{baseSallary} €</Typography>
                </Grid>

                <Grid sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    marginTop: 2
                }}>
                    <Typography variant="h6" width="70%">Meses trabajados: </Typography>
                    <Typography variant="h6" width="30%" textAlign={'end'}>{months} meses</Typography>
                </Grid>

                <Grid sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    marginTop: 2
                }}>
                    <Typography variant="h6" width="70%">Liquidación vacaciones: </Typography>
                    <Typography variant="h6" width="30%" textAlign={'end'}>{totalVacation} €</Typography>
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
                    <Typography variant="h6" width="30%" textAlign={'end'}>{pago} €</Typography>
                </Grid>

            </Grid>

            <Grid container spacing={2} sx={{ mb: 2, mt: 8}} justifyContent="center" alignItems="center" width="100%">                
                <Button variant="contained" sx={{width: '40%'}} onClick={() => downloadFile(fileName)}>
                    <Typography>
                        Descargar
                    </Typography>
                </Button>                              
            </Grid>
        </Grid>

        
    )
}

