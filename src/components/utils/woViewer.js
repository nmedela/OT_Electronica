import React from 'react';
import { useEffect } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormWorkOrder from './../utils/formWorkOrder'
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';

const styleRoot = {
    width: '100%',
    flexGrow: 1,
}
export default function WoViewer(props) {
    const [open, setOpen] = React.useState(false);
    const [workOrder, setWorkOrder] = React.useState(null);

    // const [message, setMessage] = React.useState('')
    useEffect(() => {
        setOpen(props.open);
        // setMessage(props.message)
    })

    const handleClose = (value) => {
        // setOpen(false)
        props.handleClose(value)
    };
    const refresh = () => {
        // setOpen(false)
        props.refresh()
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={'paper'}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth={'md'}
            >
                <DialogTitle id="alert-dialog-title">{`Orden de trabajo`}</DialogTitle>
                <DialogContent>
                    <Grid container justify='center' style={styleRoot} spacing={2} >
                        <Grid item xs={12}>
                            <FormWorkOrder id={props.id} refresh={refresh} />
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>

                    <Button onClick={() => handleClose(false)} color="primary">
                    <Link to={`/lector/${props.id}`} style={{ textDecoration:'none', color: 'gray' }} >
                        Ver pdf
                    </Link>
          </Button>
                    <Button onClick={() => handleClose(false)} color="primary">
                        Cerrar
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}