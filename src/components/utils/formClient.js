import React from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel';
import { ClientRepository } from './../../services/repository'

// const clientRespository = new ClientRepository()

class FormClient extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            client:
            {
                id: null,
                name: null,
                tel: null,
                tel2: null,
                mail: null,
                mail2: null,
                direction: null,
                location: null,
                description: null,
            },
            update: false,
            isLoading: false,
        }
        this.handleGenerateClient = this.handleGenerateClient.bind(this)
    }
    componentWillMount() {
        //Se pasan las props new y id
        //Si existe new, se crean los campos vacios para poder agregar un cliente.
        //si no es new, se toma la props id, para buscarlo en la base y traer la info
        if (!this.props.new) {
            this.setState({ isLoading: true })
            console.log("Le pido este id ", this.props.id)
            this.getClient(this.props.id)
            .then((res) => {
                console.log("trae esta info el getById ", res)
                this.setFieldsClient(res)
                this.setState({ isLoading: false })
                })
        }
    }
    componentWillReceiveProps(props) {
        //Cuando el componente padre le dice que se tiene que generar, se lo dice por props
        //SeCuando termina de generar al cliente (Sea guardarlo o editarlo), le pasa el id correspondiente, para que
        //el padre pueda guardarlo como referancia
        if (props.generate) {
            // console.log('generate está en, ', props.generate)
            this.handleGenerateClient()
        }
    }
    getClient(id) {
        let client = ClientRepository.getById(id)
        return client
    }
    setFieldsClient(client) {
        this.setState({
            client
        })
        return null
    }
    searchClient() {

    }
    handleTextChange = (event) => {
        let client = this.state.client
        client[event.target.name] = event.target.value
        this.setState({
            ...this.state,
            client
        })
    }
    handleUpdateChange = (event) => {
        this.setState({ update: event.target.checked })
    }
    handleGenerateClient = () => {
        let id = this.state.client.id
        if (id === null) {
            this.insertClient()
                .then((res) => {
                    this.props.onClientInsert(res.id)
                })
        } else {
            if (this.state.update) {
                this.updatetClient()
                    .then((res) => {
                        this.props.onClientInsert(res.id)
                    })
            } else {
                this.props.onClientInsert(id)
            }
        }
    }

    insertClient = () => {
        return ClientRepository.create(this.state.client)
    }
    updatetClient = () => {
        return ClientRepository.update(this.state.client)
    }
    render() {
        const styleFormTextField = {
            '& > *': {
                width: '30ch',
            },
        }
        const styleTextField = {
            width: '100%',
        }

        const styleRoot = {
            width: '100%',
            flexGrow: 2,
            marginLeft: '1px'
        }
        const stylePaper = {
            marginTop: '20px',
            width: '100%',
        }
        const { client } = this.state

        if (this.state.isLoading) {
            return (
                <div>
                    Está cargando
                </div>
            )
        }
        return (
            <form style={stylePaper} noValidate autoComplete="off">
                {/* <Paper style={stylePaper}> */}
                    <Grid container justify='center' style={styleRoot} spacing={1} >
                        <Grid item xs={12} sm={4}>
                            <AccordionSummary
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <TextField
                                    style={styleTextField}
                                    id="name"
                                    name="name"
                                    value={client.name}
                                    onChange={this.handleTextChange}
                                    disabled={!this.state.update && !this.props.new}
                                    label="Señor/a"
                                    variant="outlined" />
                            </AccordionSummary>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Accordion style={{display:'inline'}}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <TextField
                                        style={styleTextField}
                                        id="tel"
                                        label="Telefono"
                                        name="tel"
                                        value={client.tel}
                                        onChange={this.handleTextChange}
                                        disabled={!this.state.update && !this.props.new}
                                        variant="outlined"
                                        type='number' />
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TextField
                                        style={styleTextField}
                                        id="tel2"
                                        label="Telefono 2"
                                        name="tel2"
                                        value={client.tel2}
                                        onChange={this.handleTextChange}
                                        disabled={!this.state.update && !this.props.new}
                                        variant="outlined"
                                        type='number' />
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Accordion style={{display:'inline'}}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <TextField
                                        style={styleTextField}
                                        id="mail"
                                        label="Mail"
                                        name="mail"
                                        value={client.mail}
                                        onChange={this.handleTextChange}
                                        disabled={!this.state.update && !this.props.new}
                                        variant="outlined" />
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TextField
                                        style={styleTextField}
                                        id="mail2"
                                        label="Mail 2"
                                        name="mail2"
                                        onChange={this.handleTextChange}
                                        value={client.mail2}
                                        disabled={!this.state.update && !this.props.new}
                                        variant="outlined" />
                                </AccordionDetails>
                            </Accordion>


                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                style={styleTextField}
                                id="direction"
                                label="Dirección"
                                name="direction"
                                onChange={this.handleTextChange}
                                value={client.direction}
                                disabled={!this.state.update && !this.props.new}
                                variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                style={styleTextField}
                                id="location"
                                label="Ciudad"
                                name="location"
                                onChange={this.handleTextChange}
                                value={client.location}
                                disabled={!this.state.update && !this.props.new}
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
                    </Grid>
                {/* </Paper> */}
            </form>
        )
    }

}

export default FormClient