import React from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Pagination from '@material-ui/lab/Pagination';
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
import workOrderRepository from './../../services/workOrderRepository'
import LinearProgress from '@material-ui/core/LinearProgress';
import { isThisHour } from 'date-fns';

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
            filter: {
                last_status: -1,
                deliver_date: moment.now(),
                brand: '',
            },
            pagination: {
                page: 1,
                limit: 10,
            },
            totalWorkOrders: 0,
            workOrders: [],
            isLoading: true
        }
        this.refresh = this.refresh.bind(this)
    }
    componentWillMount() {
        //Aca está bueno traer una vista en vez de todas las ordenes, la vista tendría informacion 
        //basica para mostrar en la list
        this.getWorkOrders()
            .then((res) => {
                if (res) {
                    // console.log("Esto trae el getWorkOrders",res.data)
                    this.setState({
                        totalWorkOrders: res.data.pagination.total
                    })
                    this.setFields(res.data.result)
                }
            })
    }
    resetFilter = () => {

    }
    handleSearchChange = (event) => {
        let pagination = this.state.pagination
        pagination.page=1
        let filter = this.state.filter
        filter.brand = event.target.value
        // this.setState({
        //     filter,
        // })
        // if (event.target.value.length >= 2) {
        this.setState({
            pagination,
            filter,
            isLoading: true
        })
        this.getWorkOrdersWithFilter(filter)
        // }
    }
    handleDateChange = (date) => {
        this.setState({
            filter_date: date
        })
    }
    handleStatusChange = (event) => {
        let pagination = this.state.pagination
        let filter = this.state.filter
        pagination.page=1
        filter.last_status = event.target.value

        this.setState({
            pagination,
            filter,
            isLoading: true
        })
        this.getWorkOrdersWithFilter(filter)
    }
    getWorkOrdersWithFilter = (filter) => {
        let pagination = this.state.pagination
        return workOrderRepository.getByFilter(filter, this.state.pagination).then((res) => {
            if (res) {
                // console.log("Esto trae el getWorkOrders", res.data)
                this.setState({
                    totalWorkOrders: res.data.pagination.total
                })
                this.setFields(res.data.result)
            }
        })
    }

    handleChange = (event) => {
        // console.log('cambio')
    };
    getWorkOrders = () => {
        let pagination = this.state.pagination
        return workOrderRepository.getAll(this.state.pagination)
    }
    setFields = (workOrders) => {
        this.setState({
            workOrders,
            isLoading: false
        })
    }
    refresh = () => {
        this.setState({
            isLoading: true,
        })
        if (this.state.filter.last_status !== -1 || this.state.filter.brand !== '') {
            this.getWorkOrdersWithFilter(this.state.filter)
        } else {
            this.getWorkOrders()
                .then((res) => this.resolveRequest(res))
        }
    }

    resolveRequest = (res) => {
        this.setState({
            totalWorkOrders: res.data.pagination.total
        })
        this.setFields(res.data.result)
    }

    handleChangePage = (event, value) => {
        let pagination = this.state.pagination
        pagination.page = value
        this.setState({
            pagination
        })
        this.refresh()
    }

    render() {
        // if (this.state.isLoading) {
        //     return (
        //         <div>
        //         </div>
        //     )
        // }
        return (
            <div>
                <Paper style={stylePaper}>
                    <Grid container justify='center' style={styleRoot} spacing={2} >
                        {/* <Grid item xs={12} sm={4}>
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
                        </Grid> */}
                        <Grid item xs={12} sm={4}>
                            <InputLabel shrink id="lblLastStatus">Estado</InputLabel>
                            <Select
                                style={styleTextField}
                                labelId="lblLastStatus"
                                name="last_status"
                                value={this.state.filter.last_status}
                                onChange={this.handleStatusChange}
                                label="Estado"
                            >

                                {statusList.map((status) =>
                                    (
                                        <MenuItem key={status.id} value={status.id} >{status.title}</MenuItem>
                                        )
                                        
                                        )}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                style={styleTextField}
                                id='filter_text'
                                name='filter_text'
                                label="Marca"
                                onChange={this.handleSearchChange}
                                value={this.state.filter.brand}
                                variant="outlined" />
                        </Grid>
                        <Grid item xs={12}>
                            {this.state.isLoading && <LinearProgress />}
                            {!this.state.isLoading &&
                                <div>
                                    <ListWorkOrder refresh={this.refresh} workOrders={this.state.workOrders} />
                                </div>
                            }
                        </Grid>
                        <Grid item xs={12} sm={5}>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <Pagination count={Math.ceil(this.state.totalWorkOrders / this.state.pagination.limit)} page={this.state.pagination.page} onChange={this.handleChangePage} />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            {'Total:' + this.state.totalWorkOrders}
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        )
    }

}

export default WorkOrders