import React from 'react'
import Grid from '@material-ui/core/Grid';
import FormClient from './../utils/formClient'
import { status } from './../../domain/status'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import ListWorkOrder from './../utils/listWorkOrder'
import Avatar from '@material-ui/core/Avatar';
import clientRepository from './../../services/clientRepository'
import Confirm from './../utils/confirm'
import ClientViewer from './../utils/clientViewer'
import TextField from '@material-ui/core/TextField';

const styleRoot = {
    width: '100%',
    flexGrow: 1,
}
const statusList = [{ id: -1, title: "Todos" }, ...status]
const styleTextField = {
    marginTop: "18px",
    width: '100%',
}


const stylePaper = {
    marginTop: '20px',
    width: '100%',
}

class Clients extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            clients: [],
            selectedClient:null,
            openDialog: false,
            messageDialog: '',
            actionDialog: () => { return null },
            isLoading: true,
            openWoViewer:false,
            filter:{
                name:"",
            }
        }
        this.handleClose = this.handleConfirmDialog.bind(this)
    }
    componentWillMount() {
        this.getClients().then((res) => {
            if(res){
                let clients = res.data
                this.setState({
                    clients,
                    isLoading: false
                })
            }
        })
    }
    getClients = () => {
        return clientRepository.getAll()
    }
    setClients = (clients)=>{
        this.setState({
            clients,
            isLoading: false
        })
    }
    handleChange = (event) => {
        // console.log('cambio')
    };
    handleSearchChange = (event) => {
        let filter = this.state.filter
        filter.name = event.target.value
        this.setState({
            filter,
            isLoading: true
        })
        this.getClientWithFilter(filter)
    }
    getClientWithFilter = (filter) => {
        return clientRepository.getByFilter(filter).then((res) => {
            if (res) {
                // console.log("Esto trae el getWorkOrders", res.data)
                this.setClients(res.data)
            }
        })
    }
    handleClick = (client)=>{
        this.setState({
            selectedClient:client,
            openClientViewer:true
        })
        return null
    }
    handleCloseClientViewer=()=>{
        this.setState({
            openClientViewer:false
        })
    }
    
    handleDelete = (client) => {
        console.log('apreté')
        this.setState({
            selectedClient:client,
            openDialog: true,
            messageDialog: '¿Desea eliminar el cliente?',
            actionDialog: this.handleConfirmDialog
        })
    };

    handleConfirmDialog = (value) => {
        // console.log("entra handlcleose y devolvió ", value)
        this.setState({
            isLoading:true,
            openDialog: false,
        })
        if(value){
            clientRepository.delete(this.state.selectedClient)
            .then((res)=>{
                this.getClients()
                .then((res)=>{
                    let clients = res.data
                    this.setClients(clients)
                    this.setState({
                        selectedClient:null,
                    })
                })
            })
        }else{
            this.setState({
                isLoading:false,
                selectedClient:null,
            })
        }
    }
    render() {
        return (
            <div>
                <ClientViewer {...this.props} client={this.state.selectedClient} open={this.state.openClientViewer} handleClose={this.handleCloseClientViewer}/>
                <Confirm open={this.state.openDialog} handleClose={this.state.actionDialog} message={this.state.messageDialog} />
                <Paper style={stylePaper}>
                    <Grid container justify='center' style={styleRoot} spacing={2} >
                    <Grid item xs={12} sm={4}>
                            <TextField
                                style={styleTextField}
                                id='filter_text'
                                name='filter_text'
                                label="Nombre"
                                onChange={this.handleSearchChange}
                                value={this.state.filter.name}
                                variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <List dense>
                                {(this.state.isLoading && (!this.state.clients && this.state.clients.length == 0)) && <ListItem button onClick={this.handleClick} style={{ marginTop: '20px' }}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <i class="material-icons" > person </i>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={`No se enuentran clientes`}
                                    />
                                </ListItem>
                                }
                                {!this.state.isLoading && this.state.clients && this.state.clients.map((client) => {
                                    return (<ListItem button style={{ marginTop: '20px' }} onClick={()=>{this.handleClick(client)}}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <i class="material-icons" > person </i>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText  style={{marginRight:'20px'}}
                                            primary={`Sr/a: ${client.name} - tel: ${client.tel} - dirección: ${client.direction}`}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="delete" onClick={()=>{this.props.history.push('/client/'+client.id)}}>
                                                    <i class="material-icons">edit</i>
                                            </IconButton>
                                            <IconButton edge="end" aria-label="delete" onClick={()=>{this.handleDelete(client.id)}} disabled={this.state.deleteDisabled}>
                                                <i class="material-icons" style={{ color: this.state.deleteDisabled ? 'gray' : 'red' }}>delete</i>
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>)
                                }
                                )
                                }
                            </List>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        )
    }

}

export default Clients