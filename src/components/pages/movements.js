import React from 'react'
import Grid from '@material-ui/core/Grid';
import TextBox from './../utils/textBox'
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

const styleRoot = {
    width: '100%',
    flexGrow: 1,
}
class Movements extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

            isLoading: true,
            nombre: 'predefinido',
            apellido: null,
            edad: null,
            direction: null,
            otro: null,
            si: null,
        }
        this.handleChangeValue = this.handleChangeValue.bind(this)

    }
    handleChangeValue = (value, name) => {
        this.setState({
            ...this.state,
            [name]: value
        })
        console.log('cambio ', name, value)
    };
    submit = () => {
        console.log(this.state)
    }
    render() {

        return (
            <div style = {{width:'100%'}}>

                {/* <Grid container justify='center' style={styleRoot} spacing={2} > */}
                    En construcción :(
                        <LinearProgress/>
{/* 
                    <Grid item xs={12}>
                        <TextBox 
                        value={this.state.nombre} 
                        label={'Nombre'} 
                        name={'nombre'} 
                        handleBlur={this.handleChangeValue} 
                        />
                    </Grid> */}
                {/* </Grid> */}
            </div>
        )
    }

}

export default Movements