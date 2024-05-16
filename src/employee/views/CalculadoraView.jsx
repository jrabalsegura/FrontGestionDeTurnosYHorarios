import { Alert, Grid, TextField, Button, Typography, InputAdornment } from "@mui/material"
import { useForm } from "../../hooks/useForm";
import { calcNomina } from "../../helpers/calcNomina";

const initialFormFields = {
    hourlySallary: 15,
    extraHours: 0
}

const formValidations = {
    hourlySallary: [
        value => value > 0,
        'El salario base debe ser mayor que 0'
    ],
    extraHours: [
        value => value >= 0,
        'Las horas extra no pueden ser negativas'
    ]
}

export const CalculadoraView = () => {

    const now = new Date();
    const currentMonth = now.getMonth() + 1; // January is 0, not 1
    const currentYear = now.getFullYear();     
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

    const { 
        hourlySallary, 
        extraHours, 
        onInputChange, 
        isFormValid, 
        hourlySallaryValid, 
        extraHoursValid 
    } = useForm(initialFormFields, formValidations);

    
    let totalSallary = 0;
    if (isFormValid) {
        // Convert hourlySallary to float
        const hourlySallaryFloat = parseFloat(hourlySallary);

        const {baseSallary, socialSecurity, pago} = calcNomina(hourlySallaryFloat, extraHours, daysInMonth);
        totalSallary = pago;
    }

    return (
        <>
            <form>
                <Grid container justifyContent="center">
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField 
                            label="Salario base"
                            type="number"
                            placeholder="15"
                            fullWidth
                            variant="standard"
                            InputProps={{
                                endAdornment: <InputAdornment position="end">€ / hora</InputAdornment>,
                            }}
                            name="hourlySallary"
                            value={hourlySallary}
                            onChange={onInputChange}
                        />
                        <div style={{ height: '24px' }}>
                            {hourlySallaryValid && <Alert severity="error">The sallary must be greater than 0</Alert>}
                        </div>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 5 }}>
                        <TextField 
                            label="Horas Extra"
                            type="number"
                            placeholder="10"
                            fullWidth
                            variant="standard"
                            InputProps={{
                                endAdornment: <InputAdornment position="end">horas</InputAdornment>,
                            }}
                            name="extraHours"
                            value={extraHours}
                            onChange={onInputChange}
                        />
                        <div style={{ height: '24px' }}>
                            {extraHoursValid && <Alert severity="error">The hours cannot be less than 0</Alert>}
                        </div>
                    </Grid>
                    
                </Grid>

            </form>

            <Typography variant="h5" marginTop={10}>Salario estimado</Typography>
            <Typography variant="h3" marginTop={2}>{totalSallary.toFixed(2)} €</Typography>
        </>
    )
}

