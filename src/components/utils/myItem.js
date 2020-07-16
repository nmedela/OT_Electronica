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
import {Link } from 'react-router-dom'
class MyItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: null,
            open: false,
            isLoading: true
        }
        this.refresh = this.refresh.bind(this)
    }
    componentWillMount() {
        this.setState({
            isLoading: false,
            id: this.props.id
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

    getWorkOrderByFilter = () => {
        //TODO HACER BUSQUEDA POR FILTRO PARA LLENAR LA LISTA
    }
    refresh = () => {
        this.props.refresh()
    }
    render() {

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
                        primary={`${this.props.onWO.client_id} $${this.props.onWO.final_amount ? this.props.onWO.final_amount : '-'}`}
                        secondary={this.props.onWO.brand + ' - ' + this.props.onWO.failure}
                    />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                            <Link to={`/lector/${this.props.onWO.id}`} style={{ color: 'gray' }} >
                                <i class="material-icons">get_app</i>
                            </Link>
                        </IconButton>
                        <IconButton edge="end" aria-label="delete">
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