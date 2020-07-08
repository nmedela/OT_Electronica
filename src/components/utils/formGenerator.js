import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import React from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';

class FormGenerator extends React.Component {
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
            display: this.state.status == 3 ? "inline-flex" : "none",
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

        return (
            <form style={styleFormTextField} noValidate autoComplete="off">
                <Paper style={stylePaper}>
                    <Grid container alignItems='center' justify='center' style={styleRoot} spacing={2} >
                        <Grid item xs={6} sm={2} >
                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<DeleteIcon />}
                            >
                                Limpiar
                        </Button>
                        </Grid>
                        <Grid item xs={6} sm={2}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                startIcon={<SaveIcon />}
                            >
                                Generar
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </form>
        )
    }
}

export default FormGenerator