import React from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import ListWorkOrder from './../utils/listWorkOrder'
import MomentUtils from '@date-io/moment';
import Select from '@material-ui/core/Select';
import { status } from './../../domain/status'
import moment from "moment";
import 'moment/locale/es'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const statusList = [{ id: -1, title: "Todos" }, ...status]
const styleTextField = {
    marginTop: "18px",
    width: '100%',
}

const styleRoot = {
    width: '100%',
    marginLeft: "2px",
    flexGrow: 1,
}
const stylePaper = {
    marginTop: '20px',
    width: '100%',
}
class WorkOrders extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            filter_status: -1,
            filter_date: moment.now(),
            filter_search: "",
            isLoading: true
        }
    } resetFilter = () => {

    }
    handleSearchChange = (event) => {
        this.setState({
            filter_search: event.target.value
        })
    }
    handleDateChange = (date) => {
        this.setState({
            filter_date: date
        })
    }
    handleStatusChange = (event) => {
        this.setState({
            filter_status: event.target.value
        })
    }
    handleChange = (event) => {
        console.log('cambio')
    };
    render() {

        return (
            <div>
                <Paper style={stylePaper}>
                    <Grid container justify='center' style={styleRoot} spacing={2} >
                        <Grid item xs={12} sm={4}>
                            <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={moment.locale("es")}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="filter_date"
                                    label="Fecha"
                                    format="MM/yyyy"
                                    value={this.state.filter_date}
                                    onChange={this.handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <InputLabel shrink id="lblFilterStatus">Estado</InputLabel>
                            <Select
                                style={styleTextField}
                                labelId="lblFilterStatus"
                                name="filter_status"
                                value={this.state.filter_status}
                                onChange={this.handleStatusChange}
                                label="Estado"
                            >

                                {statusList.map((status) =>
                                    (
                                        <MenuItem value={status.id} >{status.title}</MenuItem>
                                    )

                                )}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                style={styleTextField}
                                id='filter_text'
                                name='filter_text'
                                label="Filtro"
                                onChange={this.handleSearchChange}
                                value={this.state.filter_search}
                                variant="outlined" />
                        </Grid>
                        <Grid item xs={12}>
                            <ListWorkOrder />
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        )
    }

}

export default WorkOrders