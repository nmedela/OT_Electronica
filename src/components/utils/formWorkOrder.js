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
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';


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
class FormWorkOrder extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            equipment: 0,
            status: 0,
            isLoading: true,
            selectedDate: new Date(),
        }
    }

    handleDateChange = (date) => {
        console.log(date)
        this.setState({ selectedDate: date })
    }

    handleEquipmentChange = (event) => {
        this.setState({ equipment: event.target.value })
        console.log('cambio a ', this.state.equipment)
    };
    handleStatusChange = (event) => {
        this.setState({ status: event.target.value })
        console.log('cambio a ', this.state.status)
    };

    render() {

        return (
            <form style={styleFormTextField} noValidate autoComplete="off">
                <Paper style={stylePaper}>
                    <Grid container justify='center' style={styleRoot} spacing={2} >
                        <Grid item xs={12} sm={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="admission_date"
                                    label="Fecha de ingreso"
                                    format="dd/MM/yyyy"
                                    value={this.state.selectedDate}
                                    onChange={this.handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <InputLabel shrink id="lblStatus">Estado</InputLabel>
                            <Select
                                style={styleTextField}
                                labelId="lblStatus"
                                id="status"
                                value={this.state.status}
                                onChange={this.handleStatusChange}
                                label="Estado"
                            >

                                {status.map((status) =>
                                    (
                                        <MenuItem value={status.id}>{status.title}</MenuItem>
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
                            <TextField style={styleTextField} id="brand" label="Marca" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField style={styleTextField} id="model" label="Modelo" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <TextField style={styleTextField} id="serial_number" label="Nro Serie" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <TextField style={styleTextField} multiline rowsMax={2} id="failure" label="Falla" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={4}>
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
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField style={styleTextField} multiline rowsMax={3} id="observation" label="Observaciones" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                style={{ display: 2 == 1 ? "none" : "visible" }, styleTextField}
                                id="warranty"
                                label="Garantia"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">Meses</InputAdornment>,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <TextField style={{ display: 2 == 1 ? "none" : "visible" }, styleTextField} multiline rowsMax={3} id="conclusion" label="Conclusión" variant="outlined" />
                        </Grid>


                        <Grid item xs={12} sm={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    style={{ display: 2 == 1 ? "none" : "visible" }}
                                    margin="normal"
                                    id="delivered_date"
                                    label="Fecha de entrega"
                                    format="dd/MM/yyyy"
                                    value={this.state.selectedDate}
                                    onChange={this.handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                style={{ display: 2 == 1 ? "none" : "visible" }, styleTextField}
                                id="final_amount"
                                label="Importe final"
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
                        <Grid item xs={12} sm={4}>
                            <TextField
                                style={{ display: 2 == 1 ? "none" : "visible" }, styleTextField}
                                id="expense"
                                label="Costo"
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
                        <Grid item xs={12} sm={8}>
                            <TextField
                                style={{ display: 2 == 1 ? "none" : "visible" }, styleTextField}
                                multiline
                                rowsMax={3}
                                id="expense_description"
                                label="Descripcion de costo"
                                variant="outlined" />
                        </Grid>
                    </Grid>
                </Paper>
            </form>
        )
    }
}

export default FormWorkOrder