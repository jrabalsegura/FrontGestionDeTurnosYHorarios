import { Button, Grid, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { calcNomina } from "../../helpers/calcNomina";
import { useEffect } from "react";
import gestionApi from "../../api/gestionApi";
import { downloadFile } from "../../helpers/downloadFile";

export const SeeNominaView = () => {

    const {props} = useSelector(state => state.adminScreen);

    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const now = new Date();
    const currentMonth = now.getMonth() + 1; // January is 0, not 1
    const currentYear = now.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

    const {baseSallary, socialSecurity, pago} = calcNomina(props.hourlySallary, props.extraHours, daysInMonth);

    let fileName = '';

    //Creamos nomina cuando se calculan estos valores
    useEffect(() => {
        const createNomina = async () => {
            try {
                const response = await gestionApi.post('/nominas/new', {
                    employeeId: props._id,
                    employeeName: props.name,
                    month: currentMonth,
                    year: currentYear,
                    baseSallary,
                    horasExtra: props.extraHours,
                    socialSecurity,
                    pago
                });
                console.log(response);
                fileName = response.data.nomina.fileName;
                console.log(fileName);
            } catch (error) {
                fileName = error.response.data.existingNomina.fileName;
                console.error('Error creating Nomina:', error);
                //Swal.fire('Error al intentar crear la nomina', error.response.data.msg, 'error')
            }
        };

        createNomina();
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
                    <Typography variant="h6" width="30%" textAlign={'end'}>{`${baseSallary} €`}</Typography>
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
                    <Typography variant="h6" width="30%" textAlign={'end'}>{`${props.extraHours} horas`}</Typography>
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
                    <Typography variant="h6" width="30%" textAlign={'end'}>{`${socialSecurity} €`}</Typography>
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
                    <Typography variant="h6" width="30%" textAlign={'end'}>{`${pago} €`}</Typography>
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

