import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FormWorkOrder from './formWorkOrder'

class MyItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            open: false,
            isLoading: true
        }
    }
    handleChange = (event) => {
        console.log('cambio')
    };
    handleClick = () => {
        this.setState({
            open: !this.state.open
        })
    }
    render() {

        return (
            <div>
                <ListItem button onClick={this.handleClick} style={{ marginTop: '20px' }}>
                    <ListItemAvatar>
                        <Avatar>
                            <i class="material-icons" style={{ color: 'green' }}>check</i>
                        </Avatar>
                    </ListItemAvatar>
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                    <ListItemText
                        primary={"Codigo cliente"}
                        secondary='Sony Modelo '
                    />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                            <i class="material-icons">get_app</i>
                        </IconButton>
                        <IconButton edge="end" aria-label="delete">
                            <i class="material-icons" style={{ color: 'red' }}>delete</i>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <FormWorkOrder />
                </Collapse>
            </div>

        )
    }

}

export default MyItem