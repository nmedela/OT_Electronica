import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import React from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { equipments } from './../../domain/equipments'
import { status } from './../../domain/status'
import InputAdornment from '@material-ui/core/InputAdornment';
import MomentUtils from '@date-io/moment';
import Switch from '@material-ui/core/Switch';
import moment from "moment";
import 'moment/locale/es'
import { makeStyles } from '@material-ui/core/styles';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const idTypeDelivery = [3]
const idTypeChange = [1, 2, 3, 4, 5, 6]

class FormWorkOrder extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: null,
            code: null,
            admission_date: moment.now(),
            statusValue: 0,
            statusTitle: null,
            //client_id :null,
            equipment: 0,
            brand: null,
            model: null,
            serial_number: null,
            failure: null,
            statusDate: moment.now(),
            observation: null,
            warranty: null,
            final_amount: null,
            isLoading: true,
            cancel: false,
            update: false,

        }
    }

    componentWillMount() {
        if (!this.props.new) {
            let wo = this.getWorkOrder(this.props.idWO)
            this.setFields(wo)
            this.setState({ isLoading: false })
            console.log("inició", this.state)
            // .then((res) => {
            //     return this.setFields(res)
            // }).then((res) => {
            //     this.setState({ isLoading: false })
            // })
        }
        this.setState({ isLoading: false })
    }
    getWorkOrder = (id) => {
        return {
            id: 1,
            code: 'Nnco',
            admission_date: moment.now(),
            client_id: 1,
            equipment: 1,
            brand: 'Sony',
            model: 'abd321',
            serial_number: '98761234',
            failure: "Fallo la fuente",
            status: 2,
            warranty: null,
            final_amount: 5600,
            cancel: false,
        }
    }
    setFields = (wo) => {
        this.setState({
            id: wo.id,
            code: wo.code,
            admission_date: wo.admission_date,
            statusValue: wo.status,
            equipment: wo.equipment,
            brand: wo.brand,
            model: wo.model,
            serial_number: wo.serial_number,
            failure: wo.failure,
            warranty: wo.warranty,
            final_amount: wo.final_amount,
        })
        return null
    }
    handleAdmissionDateChange = (date) => {
        console.log(date)
        this.setState({ admission_date: date })
    }
    handleStatusDateChange = (date) => {
        console.log(date)
        this.setState({ statusDate: date })
    }
    handleUpdateChange = (event) => {
        console.log(event)
        this.setState({ update: event.target.checked })
    }

    handleEquipmentChange = (event) => {
        this.setState({ equipment: event.target.value })
        console.log('cambio a ', this.state.equipment)
    };
    handleStatusChange = (event) => {
        this.setState({ statusValue: event.target.value })
        console.log(event)
    };

    insertWorkOrder = () => {

    }

    render() {
        const styleFormTextField = {
            '& > *': {
                width: '30ch',
            },
        }
        const styleTextField = {
            marginTop: '16px',
            marginLeft: '1px',
            width: '100%',
        }
        const styleTextDisplay = {
            display: idTypeChange.some(v => v == this.state.statusValue) || this.state.update ? "inline-flex" : "none",
            marginTop: '16px',
            marginLeft: '1px',
            width: '100%',
        }
        const styleTextDisplayFinish = {
            display: idTypeDelivery.some(v => v == this.state.statusValue) || this.state.update ? "inline-flex" : "none",
            marginTop: '16px',
            marginLeft: '1px',
            width: '100%',
        }

        const styleRoot = {
            width: '100%',
            flexGrow: 1,
            marginLeft: '1px'
        }
        const stylePaper = {
            marginTop: '20px',
            width: '100%',
            display: 'visible'
        }
        if (this.state.isLoading) {
            return <div>Cargando</div>
        }
        return (
            <form style={styleFormTextField} noValidate autoComplete="off">
                <Paper style={stylePaper}>
                    <Grid container justify='center' style={styleRoot} spacing={2} >
                        <Grid item xs={12} sm={6}>
                            <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={moment.locale("es")}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="admissionDate"
                                    label="Fecha de ingreso"
                                    disabled={!this.props.new && !this.state.update}
                                    format="DD/MM/yyyy"
                                    value={this.state.admission_date}
                                    onChange={this.handleAdmissionDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel shrink id="lblStatus">Estado</InputLabel>
                            <Select
                                style={styleTextField}
                                labelId="lblStatus"
                                id="status"
                                value={this.state.statusValue}
                                onChange={this.handleStatusChange}
                                label="Estado"
                            >

                                {status.map((status) =>
                                    (
                                        <MenuItem value={status.id} >{status.title}</MenuItem>
                                    )

                                )}
                            </Select>
                        </Grid>

                        <Grid item xs={12} sm={2}>
                            <InputLabel shrink id="lblEquipment">Equipo</InputLabel>
                            <Select
                                style={styleTextField}
                                labelId="lblEquipment"
                                id="equipment"
                                disabled={!this.props.new && !this.state.update}
                                value={this.state.equipment}
                                onChange={this.handleEquipmentChange}
                                label="Equipo"
                            // variant='outlined'
                            >

                                {equipments.map((equipment) =>
                                    (
                                        <MenuItem value={equipment.id}>{equipment.title}</MenuItem>
                                    )

                                )}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <TextField style={styleTextField} id="brand" label="Marca" disabled={!this.props.new && !this.state.update} value={this.state.brand} variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField style={styleTextField} id="model" label="Modelo" disabled={!this.props.new && !this.state.update} value={this.state.model} variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <TextField style={styleTextField} id="serial_number" label="Nro Serie" disabled={!this.props.new && !this.state.update} value={this.state.serial_number} variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <TextField style={styleTextField} multiline rowsMax={2} id="failure" disabled={!this.props.new && !this.state.update} label="Falla" value={this.state.failure} variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <InputLabel shrink id="lblUpdate">Editar</InputLabel>
                            <Switch
                                checked={this.state.update}
                                onChange={this.handleUpdateChange}
                                disabled= {this.props.new}
                                name="update"
                                color="primary"
                            />
                        </Grid>
                        {/* <Grid item xs={12} sm={4}>
                            <TextField
                            style={styleTextField}
                            id="approximate_amount"
                            label="Importe Aproximado"
                            variant="outlined"
                                type='number'
                                min="0"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                    type: 'number',
                                    inputProps: {
                                        min: '0',
                                    }
                                }}
                            />
                        </Grid> */}
                        <Grid item xs={12} sm={9}>
                            <TextField style={styleTextField} multiline rowsMax={3} id="observation" label="Observaciones" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={moment.locale("es")}>
                                <KeyboardDatePicker
                                    style={styleTextDisplay}
                                    margin="normal"
                                    id="status_date"
                                    label={"Fecha"}
                                    format="DD/MM/yyyy"
                                    value={this.state.statusDate}
                                    onChange={this.handleStatusDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                style={styleTextDisplayFinish}
                                id="warranty"
                                label="Garantia"
                                disabled={this.state.warranty && !this.state.update}
                                value={this.state.warranty}
                                variant="outlined"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">Meses</InputAdornment>,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                style={styleTextDisplayFinish}
                                id="final_amount"
                                label="Importe final"
                                value={this.state.final_amount}
                                variant="outlined"
                                type='number'
                                min="0"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                    type: 'number',
                                    inputProps: {
                                        min: '0',
                                    }
                                }}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </form>
        )
    }
}

export default FormWorkOrder