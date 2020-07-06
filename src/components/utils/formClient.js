import React from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
class FormClient extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true
        }
    }
    render() {

        return (
            <form style={styleFormTextField} noValidate autoComplete="off">
                <Paper style={stylePaper}>
                    <Grid container justify='center' style={styleRoot} spacing={1} >
                        <Grid item xs={12} sm={4}>
                                <AccordionSummary
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                            <TextField style={styleTextField} id="name" label="Señor/a" variant="outlined" />
                            </AccordionSummary>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                            <TextField style={styleTextField} id="tel" label="Telefono" variant="outlined" type='number' />
                                </AccordionSummary>
                                <AccordionDetails>
                            <TextField style={styleTextField} id="tel2" label="Telefono 2" variant="outlined" type='number' />
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
                            <TextField style={styleTextField} id="mail" label="Mail" variant="outlined" />
                                </AccordionSummary>
                                <AccordionDetails>
                            <TextField style={styleTextField} id="mail2" label="Mail 2" variant="outlined" />
                                </AccordionDetails>
                            </Accordion>


                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField style={styleTextField} id="direction" label="Dirección" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField style={styleTextField} id="location" label="Ciudad" variant="outlined" />
                        </Grid>
                    </Grid>
                </Paper>
            </form>
        )
    }

}

export default FormClient