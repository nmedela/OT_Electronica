import React from 'react'
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import MyItem from './myItem'
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

class ListWorkOrders extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            workOrders: null,
            isLoading: true
        }
        this.refresh = this.refresh.bind(this)
    }
    componentWillMount() {
        console.log("Esto tiene que haber en las props ", this.props)
        this.setState({
            workOrders: this.props.workOrders,
            isLoading: false
        })
    }
    handleChange = (event) => {
        console.log('cambio')
    };
    generate(element) {
        return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) =>
            React.cloneElement(element, {
                key: value,
            }),
        );
    }

    refresh = () => {
        this.props.refresh()
    }
    render() {
        const styleRoot = {
            width: '100%',
            flexGrow: 1,
            marginLeft: '1px'
        }

        if (!this.state.isLoading && this.state.workOrders.length==0) {
            return (<div>

                <Grid container justify='center' style={styleRoot} spacing={2} >
                    <Grid item xs={12} sm={12}>

                        <List dense>
                            <ListItem button onClick={this.handleClick} style={{ marginTop: '20px' }}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <i class="material-icons" > search </i>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`No se enuentran ordenes de trabajo`}
                                />
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </div>
            )
        }
        return (
            <div>
                <Grid container justify='center' style={styleRoot} spacing={2} >

                    <Grid item xs={12} sm={12}>

                        <List dense>
                            {/* {this.generate( */}
                            {!this.state.isLoading && this.state.workOrders.map((wo) => {
                                return <MyItem id={wo.id} onWO={wo} status={wo.last_status} refresh={this.refresh} />
                            }
                            )
                            }
                            {/* )} */}
                        </List>
                    </Grid>
                </Grid>
            </div>
        )
    }

}

export default ListWorkOrders