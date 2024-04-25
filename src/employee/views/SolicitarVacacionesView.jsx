import { Grid, Typography, Button } from "@mui/material"
import { DateRange } from "react-date-range"
import { useState } from "react"
import { addDays } from "date-fns"

export const SolicitarVacacionesView = () => {

    const [state, setState] = useState([
        {
          startDate: new Date(),
          endDate: addDays(new Date(), 7),
          key: 'selection'
        }
      ]);

    return (
        <>
            <Grid container sx={{display:'flex', flexDirection:'column', alignItems:'center', marginBottom: 10, width:{ xs: '100%', md: '70%', lg: '45%' }}}>
                <Typography variant="h5" marginTop={5} marginBottom={5}>Selecciona el periodo deseado</Typography>
                <DateRange
                    editableDateInputs={true}
                    onChange={item => setState([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={state}
                />
            </Grid>

            <Button variant="contained" sx={{width: '240px', height: '40px'}}>
                <Typography>Solicitar</Typography>
            </Button>
        </>
    )
}


