import React from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormClient from './../utils/formClient'
import FormWorkOrder from './../utils/formWorkOrder'
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
    flexGrow: 1,
}
const stylePaper = {
    marginTop: '20px',
    width: '100%',
}
class NewWorkOrder extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true
        }
    }
    handleChange = (event) => {
        console.log('cambio')
    };
    render() {

        return (
            <div>

                <Grid container justify='center' style={styleRoot} spacing={2} >
                    <Grid item xs={12}>
                        <FormClient />
                    </Grid>
                    <Grid item xs={12}>
                        <FormWorkOrder />
                    </Grid>
                </Grid>
            </div>
        )
    }

}

export default NewWorkOrder