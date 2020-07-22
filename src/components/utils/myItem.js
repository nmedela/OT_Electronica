import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FormWorkOrder from './formWorkOrder'
import { status } from './../../domain/status'
import { equipments } from './../../domain/equipments'
import clientRepository from './../../services/clientRepository'
import workOrderRepository from './../../services/workOrderRepository'


import { Link } from 'react-router-dom'
class MyItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: null,
            client_name: null,
            open: false,
            isLoading: true
        }
        this.refresh = this.refresh.bind(this)
    }
    componentWillMount() {
        console.log(this.props.onWO.client_id)
        this.getClientName(this.props.onWO.client_id)
            .then((res) => {
                console.log("esto tiene nombre ", res.data[0].name)
                let client_name = res.data[0].name
                this.setState({
                    client_name,
                    isLoading: false,
                    id: this.props.id
                })
            })
    }
    handleChange = (event) => {
        console.log('cambio')
    };
    handleClick = () => {
        this.setState({
            open: !this.state.open
        })
    }
    getClientName = (id) => {
        return clientRepository.getNameById(id)
    }
    getWorkOrderByFilter = () => {
        //TODO HACER BUSQUEDA POR FILTRO PARA LLENAR LA LISTA
    }
    deleteWO = () => {
        workOrderRepository.delete(this.props.onWO.id)
        this.refresh()
    }
    refresh = () => {
        this.props.refresh()
    }
    render() {
        let equipment = equipments.find(s => s.id === this.props.onWO.equipment_id).title
        if (this.state.isLoading) {
            return <div>Está cargando</div>
        }

        return (
            <div>
                <ListItem button onClick={this.handleClick} style={{ marginTop: '20px' }}>
                    <ListItemAvatar>
                        <Avatar>
                            <i class="material-icons" style={{ color: status.find(s => s.id === this.props.onWO.last_status).color }}>{status.find(s => s.id === this.props.onWO.last_status).icon}</i>
                        </Avatar>
                    </ListItemAvatar>
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                    <ListItemText
                        primary={`${this.state.client_name} $${this.props.onWO.final_amount ? this.props.onWO.final_amount : '-'}`}
                        secondary={`${equipment} ${this.props.onWO.brand} - ${this.props.onWO.failure}`}
                    />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                            <Link to={`/lector/${this.props.onWO.id}`} style={{ color: 'gray' }} >
                                <i class="material-icons">get_app</i>
                            </Link>
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" onClick={this.deleteWO}>
                            <i class="material-icons" style={{ color: 'red' }}>delete</i>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <FormWorkOrder refresh={this.refresh} id={this.props.id} />
                </Collapse>
            </div>

        )
    }

}

export default MyItem