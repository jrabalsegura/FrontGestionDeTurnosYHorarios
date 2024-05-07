import { AttachFile, Close } from "@mui/icons-material";
import { Button, Grid, IconButton, Input, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import gestionApi from "../../api/gestionApi";


const initialValues = {
    reason: ''
}

export const Modal = ({isModalOpen, closeModal, id, username, date}) => {

    if(!isModalOpen) return null;

    const [file, setFile] = useState(null);

    function handleChangeFile(e) {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
        } else {
            console.log("No file selected.");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(reason, file);

        let justificante = '';

        if (file) {
            const formData = new FormData();
            formData.append('reason', reason);
            formData.append('file', file);
            formData.append('date', date);

            const config = {
                headers: {
                'content-type': 'multipart/form-data',
                },
            };

            const response = await gestionApi.post('/upload', formData, config);

            justificante = response.data.fileName;
        }
        //Crear ausencia
        
        const body = {
            employeeId: id,
            date,
            motivo: reason,
            justificante,
            name: username
        }
        console.log(body);
        const createAusencia = await gestionApi.post('/ausencias/new', body);
        console.log(createAusencia);

        setIsSubmitted(true);
        //Cerrar modal
        //closeModal();
    }

    const [isSubmitted, setIsSubmitted] = useState(false);

    

    const {
        reason,
        onInputChange
    } = useForm(initialValues);

    return (
        <Grid container sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)', // Centers the modal
            width: 300, // Set a fixed width or use percentage
            height: 360, // Set a fixed height or use percentage
            backgroundColor: 'secondary.dark',
            borderRadius: 5,
            border: '2px solid black',
            p: 2,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            zIndex: 1000 // High z-index to ensure it's on top of other elements
        }}>
            <Grid container justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5">{date.toLocaleDateString()}</Typography>
                <IconButton onClick={closeModal}>
                    <Close />
                </IconButton>
            </Grid>

            {isSubmitted ? (
                <Typography variant="h5" sx={{ textAlign: 'center', width: '100%', mb: 5 }}>
                    Gracias por notificar su ausencia
                </Typography>
            ) : (
                <form onSubmit={handleSubmit}>
                    <Grid
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'start',
                            gap: 2,
                        }}
                    >
                        <TextField 
                            variant="outlined" 
                            color="primary" 
                            placeholder="Motivo de la ausencia" 
                            sx={{ border: '2px solid', borderRadius: 2}}
                            inputProps={{
                                style: { textAlign: 'center' }
                            }}
                            InputLabelProps={{
                                style: { textAlign: 'center', width: '100%' }
                            }}
                            name="reason"
                            value={reason}
                            onChange={onInputChange}
                        />
                        <Button 
                            variant="outlined" 
                            sx={{
                                width: '100%',
                                borderColor: 'primary.main',
                                color: 'primary.dark',
                                border: '2px solid black',
                                borderRadius: 2,
                                boxShadow: '2px 2px 2px black',
                                '&:hover': {
                                    color: 'black',
                                    border: '2px solid black'
                                }                       
                            }}
                            component="label"
                        >
                            <input
                                type="file"
                                onChange={handleChangeFile}
                                hidden
                            />
                            <IconButton><AttachFile/></IconButton>
                            <Typography sx={{textTransform: 'none'}}>{file ? `${file.name.slice(0, 15)}${file.name.length > 15 ? '...' : ''}` : "ADJUNTAR"}</Typography>
                        </Button>

                        <Button variant="outlined" type="submit" sx={{
                            width: '80%',
                            height: 50,
                            borderColor: 'primary',
                            color: 'primary.dark',
                            border: '2px solid black',
                            borderRadius: 2,
                            marginTop: 8,
                            boxShadow: '2px 2px 2px black',
                            '&:hover': {
                                color: 'black',
                                border: '2px solid black'
                            }
                        }}>
                            <Typography>Notificar</Typography>
                        </Button>
                    </Grid>
                </form>
            )}
        </Grid>
    )
}

