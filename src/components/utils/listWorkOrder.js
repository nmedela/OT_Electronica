import React from 'react'
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import MyItem from './myItem'

class ListWorkOrders extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            workOrders: null,
            isLoading: true
        }
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
    render() {
        const styleRoot = {
            width: '100%',
            flexGrow: 1,
            marginLeft: '1px'
        }

        return (
            <div>
                <Grid container justify='center' style={styleRoot} spacing={2} >

                    <Grid item xs={12} sm={12}>

                        <List dense>
                            {/* {this.generate( */}
                            {!this.state.isLoading && this.state.workOrders.map((wo) => {
                                console.log("Esto tiene que haber en la wo ", wo)
                                return <MyItem id={wo.id} onWO={wo} status={wo.last_status} />
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