import React from 'react'
import Grid from '@material-ui/core/Grid';
import TextBox from './../utils/textBox'
import TableMovements from './../utils/tableMovements'
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import workOrderRepository from './../../services/workOrderRepository'
import moment from "moment";
import MomentUtils from '@date-io/moment';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import ListWorkOrder from './../utils/listWorkOrder'
import Paper from '@material-ui/core/Paper';

import Select from '@material-ui/core/Select';
import 'moment/locale/es'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const styleRoot = {
    width: '100%',
    flexGrow: 1,
    marginTop: 10,
    marginLeft:2
}
const styleRoot2 = {
    width: '100%',
    flexGrow: 1,
    marginTop: 90
}
const stylePaper = {
    marginTop: '5px',
    width: '100%',
}
class Movements extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

            isLoading: true,
            date: {
                month: null,
                year: null,
            },
            nombre: 'predefinido',
            apellido: null,
            edad: null,
            direction: null,
            otro: null,
            si: null,
        }
        this.handleChangeValue = this.handleChangeValue.bind(this)

    }
    componentWillMount() {
        let date = this.state.date
        date.month = moment(moment(), 'DD/MM/YYYY').month() + 1
        date.year = moment(moment(), 'DD/MM/YYYY').year()
        this.getTotalMount(date)
            .then((res) => {
                if (res) {

                    let totalMount = res.data[0].total_mount
                    this.getTotalMountMonth(this.state.date)
                        .then((res) => {
                            let totalMountMonth = res.data[0].total_mount_month
                            this.setState({
                                totalMountMonth,
                                totalMount,
                                isLoading: false,
                                date
                            })
                        })
                }
            })
    }

    getTotalMount(date) {
        return workOrderRepository.getTotalMount(date)
    }
    getTotalMountMonth(date) {
        console.log("pido el getTotalMount")
        return workOrderRepository.getTotalMountMonth(date)
    }
    handleChangeValue = (value, name) => {
        this.setState({
            ...this.state,
            [name]: value
        })
        console.log('cambio ', name, value)
    };
    submit = () => {
        console.log(this.state)
    }
    handleMonthChange = (event) => {
        console.log(event.target.value)
        let date = this.state.date
        date.month = event.target.value
        this.setState({
            date,
            isLoading: true,
        })
        this.getTotalMountMonth(date)
            .then((res) => {
                let totalMountMonth = res.data[0].total_mount_month
                this.setState({
                    totalMountMonth,
                    isLoading: false,
                })
            })
    }
    handleYearChange = (event) => {
        console.log(event.target.value)
        let date = this.state.date
        date.year = event.target.value
        this.setState({
            date,
            isLoading: true,
        })
        //falta llamar a total
        this.getTotalMount(date)
            .then((res) => {
                let totalMount = res.data[0].total_mount
                this.getTotalMountMonth(date)
                    .then((res) => {
                        let totalMountMonth = res.data[0].total_mount_month
                        this.setState({
                            totalMount,
                            totalMountMonth,
                            isLoading: false,
                        })
                    })
            })

    }
    render() {
        const styleTextField = {
            marginTop: '5px',
            marginLeft: '5px',
            width: '100%',
        }
        return (
            <div style={{ width: '100%' }}>

                <Grid container justify='center' alignItems="center" style={styleRoot} spacing={1} >
                    {this.state.isLoading && <Grid item xs={12}>
                        En construcción :(
                       <LinearProgress />
                    </Grid>
                    }

                    {!this.state.isLoading && <Grid item xs={12} sm={12}>
                        <Paper style={stylePaper}>
                            <Grid
                                container
                                justify="center"
                                alignItems="center"
                                style={styleRoot}
                                spacing={3}
                                direction='row' >

                                <Grid item xs={5} sm={5}>
                                    <h2 style={{padding:'10px',textAlign:'center', border: '1px solid', borderRadius: '10px'}}>
                                        Total Bruto Mensual: <p style={{color:'green'}}> ${this.state.totalMountMonth ? this.state.totalMountMonth : 0} </p>
                                    </h2>
                                </Grid>
                                <Grid item xs={2} sm={2}>
                                </Grid>
                                <Grid item xs={5} sm={5}>
                                    <h2 style={{padding:'10px',textAlign:'center', border: '1px solid', borderRadius: '10px'}}>
                                        Total Bruto Anual:<p style={{color:'green'}}> ${this.state.totalMount ? this.state.totalMount : 0}</p>
                                    </h2>
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <InputLabel shrink id="lblFilterMonth">Mes</InputLabel>
                                    <Select
                                        style={styleTextField}
                                        labelId="lblFilterMonth"
                                        name="filter_month"
                                        value={this.state.date.month}
                                        onChange={this.handleMonthChange}
                                        label="Mes"
                                        variant='outlined'
                                    >

                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) =>
                                            (
                                                <MenuItem key={month.index} value={month} >{month}</MenuItem>
                                            )

                                        )}
                                    </Select>
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <InputLabel shrink id="lblFilterYear">Año</InputLabel>
                                    <Select
                                        style={styleTextField}
                                        labelId="lblFilterYear"
                                        name="filter_year"
                                        value={this.state.date.year}
                                        onChange={this.handleYearChange}
                                        label="Año"
                                        variant='outlined'
                                    >

                                        {[2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040, 2041, 2042, 2043, 2044, 2045, 2046, 2047, 2048, 2049, 2050, 2051, 2052, 2053, 2054, 2055, 2056, 2057, 2058, 2059, 2060, 2061, 2062, 2063, 2064, 2065, 2066, 2067, 2068, 2069, 2070].map((year) =>
                                            (
                                                <MenuItem key={year.index} value={year} >{year}</MenuItem>
                                            )

                                        )}
                                    </Select>

                                </Grid>
                                {/* <Grid item xs={4} sm={2}>
                                    Total neto anual: ${this.state.totalMount ? this.state.totalMount : 0}
                                </Grid> */}


                                {/* <Grid item xs={4} sm={2}>
                                    Total neto por mes: ${this.state.totalMountMonth ? this.state.totalMountMonth : 0}
                                </Grid> */}
                                {/* Agregar gasto */}
                            </Grid>
                        </Paper>

                        <Grid item xs={12} sm={12}>
                            <Grid
                                container
                                justify='center'
                                alignItems="center"
                                style={styleRoot2}
                                spacing={3}
                                direction='column' >

                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TableMovements onDate={this.state.date} onIsLoading={this.state.isLoading}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    }
                </Grid>
            </div >
        )
    }

}
export default Movements