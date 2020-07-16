import React from 'react'
import Grid from '@material-ui/core/Grid';


const styleRoot = {
    flexGrow: 1,
}

class Settings extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            valor: 'Holaaaa'
        }
    }
    handleChange = (event) => {
        console.log('cambio')
    };


    render() {

        return (
            <Grid container justify='center' style={styleRoot} spacing={2} >

                <Grid item xs={12}>
                    <div>Settings</div>
                </Grid>              
            </Grid>
        )
    }

}

export default Settings