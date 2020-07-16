import 'date-fns';
import React from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import TextBox from './../utils/textBox'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { equipments } from './../../domain/equipments'
import { status } from './../../domain/status'
import InputAdornment from '@material-ui/core/InputAdornment';
import MomentUtils from '@date-io/moment';
import Switch from '@material-ui/core/Switch';
import moment from "moment";
import FormClient from './../utils/formClient'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect } from 'react-router-dom'
import 'moment/locale/es'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { WorkOrderRepository } from './../../services/repository'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from 'react-router-dom'

const idTypeDelivery = [3]
const idTypeChange = [1, 2, 3, 4, 5, 6]
const options = {
    // orientation: 'landscape',
    // unit: 'in',
    // format: [4,2]
};
const ref = React.createRef();

class FormWorkOrder extends React.Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            wo: {
                id: null,
                code: null,
                client_id: null,
                admission_date: moment(),
                equipment: 0,
                brand: null,
                model: null,
                serial_number: null,
                failure: null,
                last_status: 0,
                deliver_date: null, //Acordarse de que si la orden está en reclamo, debe seguirle estado reclamo devuelto, reclamo entregado
                warranty: null,
                final_amount: null,
                cancel: false,
            },
            // status_value: 0,
            statusTitle: null,
            status_date: moment(),
            observation: null,
            isLoading: false,
            inProgress: false,
            update: false,
            generate: false,
            new: this.props.new,
            snackBarOpen: false,
            messageResult: null,
            openConfirm: false,

        }
        // this.handleChange = this.handleChange.bind(this)
        this.insertWorkOrder = this.insertWorkOrder.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleObservationChange = this.handleObservationChange.bind(this)
        // this.handleChangeValue = this.handleChangeValue.bind(this)
    }

    componentWillMount() {
        console.log("Esto tienen los states ", this.state)
        if (!this.props.new) {
            this.setState({ isLoading: true, inProgress: true })
            this.getWorkOrder(this.props.id)
                .then((res) => {
                    console.log("esto trae la wo, ", res)
                    this.setFields(res)
                    console.log("inició", this.state)
                    this.setState({ new: false, isLoading: false, inProgress: false })
                })
            // .then((res) => {
            //     return this.setFields(res)
            // }).then((res) => {
            //     this.setState({ isLoading: false })
            // })
        }
    }
    getWorkOrder = (id) => {
        return WorkOrderRepository.getById(id)
    }
    setFields = (wo) => {
        console.log('Esto tiene el admission date ', moment(wo.admission_date))
        // wo.admission_date = moment(wo.admission_date)
        this.setState({
            wo
            // id: wo.id,
            // code: wo.code,
            // client_id: wo.client_id,
            // admission_date: wo.admission_date,
            // status_value: wo.status,
            // equipment: wo.equipment,
            // brand: wo.brand,
            // model: wo.model,
            // serial_number: wo.serial_number,
            // failure: wo.failure,
            // warranty: wo.warranty,
            // final_amount: wo.final_amount,
        })
        // this.handleChange = this.handleChange.bind(this);
        return null
    }
    handleAdmissionDateChange = (date) => {
        console.log(date)
        let wo = this.state.wo
        wo.admission_date = date
        this.setState({ wo })
    }
    handleStatusDateChange = (date) => {
        console.log(date)
        this.setState({ status_date: date })
    }
    handleUpdateChange = (event) => {
        console.log(event)
        this.setState({ update: event.target.checked })
    }

    handleEquipmentChange = (event) => {
        let wo = this.state.wo
        wo.equipment = event.target.value
        this.setState({ wo })
        console.log('cambio a ', this.state.wo.equipment)
    };
    handleStatusChange = (event) => {
        let wo = this.state.wo
        wo.last_status = event.target.value
        this.setState({ wo })
        console.log(event)
    };
    handleInputChange = (value, name) => {
        let wo = this.state.wo
        wo[name] = value
        this.setState({
            ...this.state,
            wo
        })
        console.log('cambio ', name, value)
    };
    // handleInputChange = (event) => {
    //     console.log(event.target.value)
    //     console.log(event.target.name)
    //     let name = event.target.name
    //     let wo = this.state.wo
    //     wo[name] = event.target.value
    //     console.log(wo)
    //     this.setState({
    //         ...this.state,
    //         wo
    //         //  [name]: event.target.value
    //     })
    // };
    handleObservationChange = (event) => {
        this.setState({
            ...this.state,
            observation: event.target.value
        })
    }
    handleObservationChange = (value, name) => {
        this.setState({
            ...this.state,
            [name]: value
        })
    }
    handleCleanForm = () => {
        this.setState({
            new: this.props.new,
        })
    }
    handleSubmit = () => {
        this.setState({
            generate: true
        })
    }
    insertWorkOrder = (client_id) => {
        this.setState({
            // isLoading: true,
            generate: false,
        })
        console.log("Se generó este id de cliente ", client_id)
        //Aca debería hacer algo como llamar a la clase History y crearle los parametros
        let wo = this.state.wo
        wo.client_id = client_id
        let history = {
            id_wo: wo.id,
            date_status: this.state.status_date,
            id_status: wo.last_status,
            observation: this.state.observation
        }

        if (this.state.new) {
            WorkOrderRepository.create(wo, history)
                .then((res) => {
                    this.checkComplete(res)
                })
        } else {
            WorkOrderRepository.update(wo, history)
                .then((res) => {
                    this.checkComplete(res)
                })
            //TODO restricciones para poder ingresar
        }

    }

    checkComplete = (res) => {
        if (res) {
            let wo = res
            this.setState({
                wo,
                inProgress: false,
                snackBarOpen: true,
                messageResult: "Se ingresó correctamente",
                openConfirm: true,
            })

        }

    }


    handleCloseSnackbar = (event, reason) => {
        this.setState({
            snackBarOpen: false,
            isLoading: false,
        })

    }
    handleCloseToConfirm = () => {
        this.setState({
            openConfirm: false,
        })
        return window.location='/WO'
    }

    render() {
        const { wo } = this.state
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
            display: idTypeChange.some(v => v === wo.last_status) || this.state.update ? "inline-flex" : "none",
            marginTop: '16px',
            marginLeft: '1px',
            width: '100%',
        }
        const styleTextDisplayFinish = {
            display: idTypeDelivery.some(v => v === wo.last_status) || this.state.update ? "inline-flex" : "none",
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
        const styleButton = {
            // width: '100%',
            flexGrow: 1,
            margin: '10px'
        }

        return (
            <div>

                <form style={styleFormTextField} noValidate autoComplete="off">

                    {!this.state.isLoading && <Paper style={stylePaper}>
                        <Backdrop open={this.state.isLoading || this.state.inProgress} style={{
                            zIndex: 99,
                            color: '#fff'
                        }}>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                        <Dialog
                            open={this.state.openConfirm}
                            onClose={this.handleCloseToConfirm}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"Atención"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Desea generar pdf correspondiente a la orden de trabajo?</DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleCloseToConfirm} color="primary">
                                    No          </Button>
                                <Button color="primary" autoFocus>
                                    <Link to={`/lector/${this.state.wo.id}`} style={{ color: 'inherit' }} >
                                        Si
                            </Link>
                                </Button>
                            </DialogActions>
                        </Dialog>

                        <Grid container justify='center' style={styleRoot} spacing={2} >


                            <Grid item xs={12}>
                                <FormClient
                                    new={this.state.new}
                                    id={wo.client_id}
                                    generate={this.state.generate}
                                    onClientInsert={this.insertWorkOrder}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={moment.locale("es")}>
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="admission_date"
                                        label="Fecha de ingreso"
                                        disabled={!this.props.new && !this.state.update}
                                        format="DD/MM/yyyy"
                                        value={wo.admission_date}
                                        onChange={this.handleAdmissionDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <InputLabel shrink id="lblEquipment">Equipo</InputLabel>
                                <Select
                                    style={styleTextField}
                                    labelId="lblEquipment"
                                    disabled={!this.props.new && !this.state.update}
                                    value={wo.equipment}
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
                                {/* <TextField
                                style={styleTextField}
                                id='brand'
                                name='brand'
                                label="Marca"
                                onChange={this.handleInputChange}
                                disabled={!this.props.new && !this.state.update}
                                value={wo.brand}
                                variant="outlined" /> */}
                                <TextBox
                                    style={styleTextField}
                                    name='brand'
                                    label="Marca"
                                    handleBlur={this.handleInputChange}
                                    disabled={!this.props.new && !this.state.update}
                                    value={wo.brand}
                                    variant="outlined" />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextBox style={styleTextField}
                                    handleBlur={this.handleInputChange}
                                    name="model" label="Modelo"

                                    disabled={!this.props.new && !this.state.update}
                                    value={wo.model} variant="outlined" />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextBox
                                    style={styleTextField}
                                    name="serial_number"
                                    label="Nro Serie"
                                    handleBlur={this.handleInputChange}
                                    disabled={!this.props.new && !this.state.update}
                                    value={wo.serial_number}
                                    variant="outlined" />
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <TextBox
                                    style={styleTextField}
                                    multiline rowsMax={2}
                                    name="failure"
                                    disabled={!this.props.new && !this.state.update}
                                    label="Falla"
                                    handleBlur={this.handleInputChange}
                                    value={wo.failure}
                                    // value={null}
                                    variant="outlined" />
                            </Grid>
                            <Grid item xs={12} sm={3} style={{ display: this.props.new ? 'none' : 'inline-block' }}>
                                <InputLabel shrink id="lblUpdate">Editar</InputLabel>
                                <Switch
                                    checked={this.state.update}
                                    onChange={this.handleUpdateChange}
                                    disabled={this.props.new}
                                    name="update"
                                    color="primary"
                                />
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <TextBox
                                    style={styleTextField}
                                    multiline rowsMax={3}
                                    handleBlur={this.handleObservationChange}
                                    value={this.state.observation}
                                    name="observation"
                                    label="Observaciones"
                                    variant="outlined" />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={moment.locale("es")}>
                                    <KeyboardDatePicker
                                        style={styleTextDisplay}
                                        margin="normal"
                                        label={"Fecha"}
                                        onChange={this.handleStatusDateChange}
                                        format="DD/MM/yyyy"
                                        value={this.state.status_date}
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
                                    name="status_value"
                                    value={wo.last_status}
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
                            <Grid item xs={12} sm={6}>
                                <TextBox
                                    style={styleTextDisplayFinish}
                                    id="warranty"
                                    name='warranty'
                                    label="Garantia"
                                    handleBlur={this.handleInputChange}
                                    disabled={wo.deliver_date && !this.state.update}
                                    value={wo.warranty}
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">Meses</InputAdornment>,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextBox
                                    style={styleTextDisplayFinish}
                                    name="final_amount"
                                    label="Importe final"
                                    handleBlur={this.handleInputChange}
                                    value={wo.final_amount}
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
                            {/* <Paper style={stylePaper}> */}
                            <Grid container alignItems='center' justify='center' style={styleRoot} spacing={2} >
                                {/* <Grid item xs={6} sm={2} >
                                    <Button
                                        style={styleButton}
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<DeleteIcon />}
                                        >
                                        Limpiar
                                        </Button>
                                    </Grid> */}
                                <Grid item xs={6} sm={2}>
                                    <Button
                                        style={styleButton}
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        onClick={this.handleSubmit}
                                        startIcon={<SaveIcon />}
                                    >
                                        Generar
                            </Button>
                                </Grid>
                            </Grid>
                            {/* </Paper> */}
                        </Grid>

                        <Snackbar open={this.state.snackBarOpen} autoHideDuration={2000} onClose={this.handleCloseSnackbar}>
                            <Alert variant="filled" onClose={this.handleCloseSnackbar} severity={this.state.result}>{this.state.messageResult}</Alert>
                        </Snackbar>
                    </Paper>
                    }
                </form>
            </div>

        )
    }
}

export default FormWorkOrder