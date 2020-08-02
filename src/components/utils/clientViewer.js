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


const styleRoot = {
    width: '100%',
    flexGrow: 1,
}
export default function ClientViewer(props) {
    const [open, setOpen] = React.useState(false);
    const [workOrder, setWorkOrder] = React.useState([]);
    const [client, setClient] = React.useState(null);
    const [WOs, setWOs] = React.useState(null);

    // const [message, setMessage] = React.useState('')
    useEffect(() => {
        setClient(props.client)
        setOpen(props.open);
        if(open && client && !WOs ){
            // console.log("entra a buscar orders")
            getWorkOrders()
        }
        if(!open){
            // console.log("salio")
            setWOs(null)
        }
        // setMessage(props.message)
    })

    const getWorkOrders=()=>{
        workOrderRepository.getWorkOrdersByClient(props.client.id)
        .then((res)=>{
            setWOs(res.data)
        })
    }
    const handleClose = (value) => {
        // setOpen(false)
        props.handleClose(value)
    };
    const newWorkOrderForClient=()=>{
        props.history.push('/WO/new/'+ client.id)
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
                <DialogTitle id="alert-dialog-title">{`Información de cliente`}</DialogTitle>
                <DialogContent>
                    <Grid container justify='center' style={styleRoot} spacing={2} >
                        <Grid item xs={12}>
                        <b>Nombre: </b> {client && client.name} -
                        </Grid>
                        <Grid item xs={12}>
                         <b>Tel: </b> {client && <a href={`tel:${client.tel}`}>{client.tel}</a>} - <b>Tel2: </b> {client && <a href={`tel:${client.tel2}`}>{client && client.tel2}</a>}

                        </Grid>
                         <Grid item xs={12}>
                         <b>Mail: </b> {client && <a href={`mailto:${client.mail}`}>{client.mail}</a>} - <b>Mail 2: </b> {client && <a href={`mailto:${client.mail2}`}>{client && client.mail2}</a>}
                        </Grid>
                        <Grid item xs={12}>
                         <b>Dirección: </b> {client && <a target="_blank" href={`http://maps.google.com/?q=${client.direction} ${client.location}`}>{client.direction && client.direction}</a>} - {client && client.location}
                            
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