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
import ListWorkOrder from './../utils/listWorkOrder'
import Avatar from '@material-ui/core/Avatar';
import clientRepository from './../../services/clientRepository'

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
            isLoading: true
        }
    }
    componentWillMount() {
        this.getClients().then((res) => {
            let clients = res.data
            this.setState({
                clients,
                isLoading: false
            })
        })
    }
    getClients = () => {
        return clientRepository.getAll()
    }
    handleChange = (event) => {
        console.log('cambio')
    };
    render() {

        // if (this.state.isLoading || this.state.clients.length == 0) {

        //     return (
        //         <div>
        //             <Paper style={stylePaper}>
        //                 <Grid container justify='center' style={styleRoot} spacing={2} >
        //                     <Grid item xs={12} sm={12}>
        //                         <List dense>
        //                             <ListItem button onClick={this.handleClick} style={{ marginTop: '20px' }}>
        //                                 <ListItemAvatar>
        //                                     <Avatar>
        //                                         <i class="material-icons" > person </i>
        //                                     </Avatar>
        //                                 </ListItemAvatar>
        //                                 <ListItemText
        //                                     primary={`No se enuentran clientes`}
        //                                 />
        //                             </ListItem>
        //                         </List>
        //                     </Grid>
        //                 </Grid>
        //             </Paper>
        //         </div>
        //     )
        // }

        return (
            <div>
                <Paper style={stylePaper}>
                    <Grid container justify='center' style={styleRoot} spacing={2} >
                        <Grid item xs={12} sm={12}>
                            <List dense>
                                {(this.state.isLoading || this.state.clients.length == 0) && <ListItem button onClick={this.handleClick} style={{ marginTop: '20px' }}>
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
                                {!this.state.isLoading && this.state.clients.map((client) => {
                                    return (<ListItem button style={{ marginTop: '20px' }}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <i class="material-icons" > person </i>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={`Sr/a: ${client.name} - tel: ${client.tel} - dirección: ${client.direction}`}
                                        />
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