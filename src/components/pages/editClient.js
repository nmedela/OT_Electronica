import React from 'react'
import Grid from '@material-ui/core/Grid';
import FormClient from './../utils/formClient'
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import clientRepository from './../../services/clientRepository'
import Confirm from './../utils/confirm'
import ClientViewer from './../utils/clientViewer'
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
const styleRoot = {
    width: '100%',
    flexGrow: 1,
}
const styleTextField = {
    marginTop: "18px",
    width: '100%',
}
const styleButton = {
    // width: '100%',
    flexGrow: 1,
    margin: '10px'
}

const stylePaper = {
    marginTop: '20px',
    width: '100%',
}
class EditClient extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            client: null,
            openDialog: false,
            messageDialog: '',
            actionDialog: () => { return null },
            isLoading: true,
            openWoViewer: false,
            generate: false,
            snackBarOpen: false,
            messageResult: '',
            openConfirm: false,
        }
        this.handleClose = this.handleConfirmDialog.bind(this)
    }
    componentWillMount() {
        this.getClient().then((res) => {
            if(res){

                let client = res.data[0]
                this.setState({
                    client,
                    isLoading: false
                })
            }
        })
    }
    getClient = () => {
        return clientRepository.getById(this.props.match.params.id)
    }
    setClients = (clients) => {
        this.setState({
            clients,
            isLoading: false
        })
    }
    handleChange = (event) => {
        // console.log('cambio')
    };
    handleClick = (client) => {
        this.setState({
            // selectedClient: client,
            openClientViewer: true
        })
        return null
    }
    handleCloseClientViewer = () => {
        this.setState({
            openClientViewer: false
        })
    }

    handleSubmit = (client) => {
        this.setState({
            // selectedClient: client,
            openDialog: true,
            messageDialog: '¿Desea modificar el cliente?',
            actionDialog: this.handleConfirmDialog
        })
    };

    handleConfirmDialog = (value) => {
        this.setState({
            isLoading: true,
            openDialog: false,
        })
        if (value) {
            this.setState({
                generate: true,
                isLoading: false,
            })

        } else {
            this.setState({
                isLoading: false,
            })
        }
    }
    updateClientOk = () => {
        this.setState({
            isLoading: true,
            generate: false,
        })
        let message = null
        if (this.state.new) {
            message = "Se ingresó correctamente"
        } else {
            message = "Se modificó correctamente"
        }
        this.setState({
            inProgress: false,
            snackBarOpen: true,
            messageResult: message,
            openConfirm: true,
        })
    }


    handleCloseSnackbar = (event, reason) => {
        this.setState({
            snackBarOpen: false,
            isLoading: false,
        })

    }
    render() {
        return (
            <div>
                <Confirm open={this.state.openDialog} handleClose={this.state.actionDialog} message={this.state.messageDialog} />
                <Paper style={stylePaper}>
                    <Grid container justify='center' style={styleRoot} spacing={2} >
                        <Grid item xs={12} sm={12}>
                            {!this.state.isLoading && <FormClient
                                generate={this.state.generate}
                                onClientInsert={this.updateClientOk}
                                id={this.props.match.params.id} />}
                        </Grid>
                        <Grid container alignItems='center' justify='center' style={styleRoot} spacing={2} >
                            <Grid item xs={6} sm={2} >
                                <Button
                                    style={styleButton}
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => { this.props.history.goBack() }}
                                >
                                    Volver
                                        </Button>
                            </Grid>
                            <Grid item xs={6} sm={2}>
                                <Button
                                    style={styleButton}
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    disabled={this.state.generate}
                                    onClick={this.handleSubmit}
                                    startIcon={<SaveIcon />}
                                >
                                    Modificar
                                    </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
                <Snackbar open={this.state.snackBarOpen} autoHideDuration={2000} onClose={this.handleCloseSnackbar}>
                    <Alert variant="filled" onClose={this.handleCloseSnackbar} severity={this.state.result}>{this.state.messageResult}</Alert>
                </Snackbar>
            </div>
        )
    }

}

export default EditClient