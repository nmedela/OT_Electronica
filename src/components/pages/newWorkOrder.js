import React from 'react'
import Grid from '@material-ui/core/Grid';
import FormWorkOrder from './../utils/formWorkOrder'
import loginService from './../../services/loginService';
import LinearProgress from '@material-ui/core/LinearProgress';

class NewWorkOrder extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            client_id: null,
            workOrder: null,
            generate: false,
        }
        this.refresh = this.refresh.bind(this)

    }
    componentWillMount() {
        loginService.verify()
            .then((res) => {
                if(res){

                    if (!res.data.code == 0) {
                        this.props.history.push('/login')
                }
                // console.log(this.props.match.params.client_id)
                let client_id = this.props.match.params.client_id
                if (client_id == ":client_id") {
                    console.log("es igual")
                    this.props.history.push('/WO/new/-1')
                }
                
                if (client_id !== '-1' && client_id !== ":client_id") {
                    // console.log("supuestamente es distinto a -1", client_id)
                    this.setState({
                        client_id,
                        isLoading: false
                    })
                }else{
                    this.setState({
                        isLoading:false
                    })
                }
            }
            })
            
    }

    handleGenerateClient = () => {

    }
    handleGenerateWorkOrder = () => {

    }

    handleSubmit = () => {
        // console.log("Apreté")
        this.refresh()
    }

    refresh = () => {
        this.props.history.push('/WO/')
        // return window.location = '/#/WO'
    }
    handleChange = (event) => {
        // console.log('cambio')
    };
    render() {
        const styleRoot = {
            width: '100%',
            flexGrow: 1,
            marginLeft: '1px'
        }

        return (
            <div>
                <Grid container justify='center' style={styleRoot} spacing={2} >
                    <Grid item xs={12}>
                        {this.state.isLoading && <LinearProgress />}
                    </Grid>
                    <Grid item xs={12}>
                       {!this.state.isLoading && <FormWorkOrder new client_id={this.state.client_id} workOrder={this.state.workOrder} generateWorkOrder={this.handleGenerateWorkOrder} generate={this.state.generate} refresh={this.refresh} />}
                    </Grid>
                </Grid>
            </div>
        )
    }

}

export default NewWorkOrder