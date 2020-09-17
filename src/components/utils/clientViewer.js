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
import ListWorkOrder from './../utils/listWorkOrder'
import workOrderRepository from './../../services/workOrderRepository'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        width: '100%',
        maxWidth: 500,
    },
    text:{
        textDecoration:'none'
    }
});
const styleRoot = {
    width: '100%',
    flexGrow: 1,
}
export default function ClientViewer(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [workOrder, setWorkOrder] = React.useState([]);
    const [client, setClient] = React.useState(null);
    const [WOs, setWOs] = React.useState(null);

    // const [message, setMessage] = React.useState('')
    useEffect(() => {
        setClient(props.client)
        setOpen(props.open);
        if (open && client && !WOs) {
            // console.log("entra a buscar orders")
            getWorkOrders()
        }
        if (!open) {
            // console.log("salio")
            setWOs(null)
        }
        // setMessage(props.message)
    })

    const getWorkOrders = () => {
        workOrderRepository.getWorkOrdersByClient(props.client.id)
            .then((res) => {
                if(res){
                    setWOs(res.data.result)
                }
            })
    }
    const handleClose = (value) => {
        // setOpen(false)
        props.handleClose(value)
    };
    const newWorkOrderForClient = () => {
        props.history.push('/WO/new/' + client.id)
    }
    const refresh = () => {
        getWorkOrders()
        // setOpen(false)
        // props.refresh()
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
                <DialogTitle id="alert-dialog-title">{`Cliente ${client && client.name}`}</DialogTitle>
                <DialogContent>
                    <Grid container justify='center' style={styleRoot} spacing={2} >
                        <Grid item xs={12}>
                            <Typography variant="subtitle2" gutterBottom >
                                <b>Tel: </b>
                                {client && <a className={classes.text} href={`tel:${client.tel}`}>{client.tel}</a>}
                            </Typography>
                            <Typography variant="subtitle2" gutterBottom>
                                <b>Tel2: </b>
                                {client && <a className={classes.text} href={`tel:${client.tel2}`}>{client && client.tel2}</a>}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2" gutterBottom>
                                <b>Mail: </b> {client && <a className={classes.text} href={`mailto:${client.mail}`}>{client.mail}</a>}
                            </Typography>
                            <Typography variant="subtitle2" gutterBottom>
                                <b>Mail 2: </b> {client && <a className={classes.text} href={`mailto:${client.mail2}`}>{client && client.mail2}</a>}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2" gutterBottom>
                            <b>Dirección: </b> {client && <a className={classes.text} target="_blank" href={`http://maps.google.com/?q=${client.direction} ${client.location}`}>{client.direction && client.direction} - {client && client.location}</a>}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            {WOs && <ListWorkOrder refresh={refresh} workOrders={WOs} />}
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => newWorkOrderForClient()} color="primary">
                        Nueva Orden
          </Button>
                    <Button onClick={() => handleClose(false)} color="primary">
                        Cerrar
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}