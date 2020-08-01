import React from 'react';
import { useEffect } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Confirm(props) {
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('')
    useEffect(() => {
        setOpen(props.open);
        setMessage(props.message)
    })

    const handleClose = (value) => {
        props.handleClose(value)
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Atención!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose(false)} color="primary">
                        Cancelar
          </Button>
                    <Button onClick={() => handleClose(true)} color="primary" autoFocus>
                        Aceptar
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}