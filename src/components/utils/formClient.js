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

class FormClient extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: null,
            name: null,
            cel: null,
            cel2: null,
            mail: null,
            mail2: null,
            direction: null,
            location: null,
            description: null,
            update: false,
            isLoading: true
        }
    }

    componentWillMount() {
        if (!this.props.new) {
            let client = this.getClient(this.props.id)
            this.setFieldsClient(client)

            // this.getClient(this.props.idClient)
            // .then((res)=>{
            //     this.setFieldsClient(res)
            //     .then(()=>{
            //         this.setState({isLoading:false})
            //     })
            // })

        }
        this.setState({ isLoading: false })
    }

    getClient(id) {
        return {
            id: 1,
            name: 'Nico',
            tel: 12343234,
            tel2: 431276,
            mail: 'nicolas.medela@algo.com',
            mail2: 'nicolas.medela2@algo2.com',
            direction: 'Guzman 3327',
            location: 'Ricardo Rojas'
        }
    }
    setFieldsClient(client) {
        this.setState({
            id: client.id,
            name: client.name,
            tel: client.tel,
            tel2: client.tel2,
            mail: client.mail,
            mail2: client.mail2,
            direction: client.direction,
            location: client.location,
        })
        return null
    }
    searchClient() {

    }
    handleTextChange = (event) => {
        console.log("Tiro el evento",event,event.target)
        this.setState({
            ...this.state, [event.target.name]: event.target.value
        })
    }
    handleUpdateChange = (event) => {
        console.log(event)
        this.setState({ update: event.target.checked })
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

        if (this.state.isLoading) {
            return (
                <div>
                    Está cargando
                </div>
            )
        }
        return (
            <form style={styleFormTextField} noValidate autoComplete="off">
                <Paper style={stylePaper}>
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
                                    value={this.state.name}
                                    onChange={this.handleTextChange}
                                    disabled={!this.state.update && !this.props.new}
                                    label="Señor/a"
                                    variant="outlined" />
                            </AccordionSummary>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Accordion>
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
                                        value={this.state.tel}
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
                                        value={this.state.tel2}
                                        onChange={this.handleTextChange}
                                        disabled={!this.state.update && !this.props.new}
                                        variant="outlined"
                                        type='number' />
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Accordion>
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
                                        value={this.state.mail}
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
                                        value={this.state.mail2}
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
                                value={this.state.direction}
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
                                value={this.state.location}
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
                </Paper>
            </form>
        )
    }

}

export default FormClient