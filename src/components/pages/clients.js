import React from 'react'
import Grid from '@material-ui/core/Grid';
import FormClient from './../utils/formClient'
const styleRoot = {
    width: '100%',
    flexGrow: 1,
}
class Clients extends React.Component {

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
                        <FormClient/>
                    </Grid>              
                </Grid>
            </div>
        )
    }

}

export default Clients