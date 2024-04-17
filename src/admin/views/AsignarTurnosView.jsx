import { Grid, Typography, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import { DateRange } from "react-date-range";
import { useState } from 'react';


export const AsignarTurnosView = () => {

    const [state, setState] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);

    return (
        <Grid container sx={{display:'flex', flexDirection:{ sm: 'column', lg: 'row' }, alignItems:'center', justifyContent:'space-around'}}>
            <Grid container sx={{display:'flex', flexDirection:'column', alignItems:'center', width:{ xs: '100%', md: '70%', lg: '45%' }}}>
                <Typography variant="h5" marginTop={5} marginBottom={5}>Selecciona día</Typography>
                <DateRange
                    editableDateInputs={true}
                    onChange={item => setState([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={state}
                />
            </Grid>

            <Grid container sx={{display:'flex', flexDirection:'column', alignItems:'center', width:{ xs: '100%', md: '70%', lg: '45%' }}}>
                <FormControl fullWidth sx={{marginTop: 8, minWidth: 240}}>
                    <InputLabel id="demo-simple-select-label">Selecciona un turno</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={"Mañana"}
                        label="Selecciona un turno"
                        onChange={() => {console.log("Working")}}
                    >
                        <MenuItem value={"Mañana"}>Mañana</MenuItem>
                        <MenuItem value={"Tarde"}>Tarde</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{marginTop: 8, minWidth: 240}}>
                    <InputLabel id="demo-simple-select-label">Selecciona un empleado</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={"Leonie Cañas"}
                        label="Selecciona un empleado"
                        onChange={() => {console.log("Working")}}
                    >
                        <MenuItem value={"Jose Ruiz"}>Jose Ruiz</MenuItem>
                        <MenuItem value={"Leonie Cañas"}>Leonie Cañas</MenuItem>
                        <MenuItem value={"Alicia García"}>Alicia García</MenuItem>
                    </Select>
                </FormControl>

                <Grid container spacing={2} sx={{ mb: 2, mt: 8, width: '100%'}} justifyContent="center" alignItems="center">
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained" sx={{ width: "50%" }}>
                            <Typography>
                                Confirmar
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

        </Grid>
    )
}

