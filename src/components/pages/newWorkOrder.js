import React from 'react'
import Grid from '@material-ui/core/Grid';
import FormWorkOrder from './../utils/formWorkOrder'
import FormGenerator from './../utils/formGenerator'
import Paper from '@material-ui/core/Paper';

import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom'

const styleRoot = {
    width: '100%',
    flexGrow: 1,
}
class NewWorkOrder extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            client: null,
            workOrder: null,
            generate: false,
        }
        this.refresh=this.refresh.bind(this)

    }

    handleGenerateClient = () => {

    }
    handleGenerateWorkOrder = () => {

    }

    handleSubmit = () => {
        console.log("Apreté")
        this.refresh()
    }
    
    refresh = () => {
        return window.location = '/WO'
    }
    handleChange = (event) => {
        console.log('cambio')
    };
    render() {
        const stylePaper = {
            marginTop: '20px',
            width: '100%',
            display: 'visible'
        }
        const styleRoot = {
            width: '100%',
            flexGrow: 1,
            marginLeft: '1px'
        }

        return (
            <div>
                <Grid container justify='center' style={styleRoot} spacing={2} >
                    <Grid item xs={12}>
                        <FormWorkOrder new workOrder={this.state.workOrder} generateWorkOrder={this.handleGenerateWorkOrder} generate={this.state.generate} refresh={this.refresh}/>
                    </Grid>
                </Grid>
            </div>
        )
    }

}

export default NewWorkOrder