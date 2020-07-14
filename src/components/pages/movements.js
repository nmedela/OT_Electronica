import React from 'react'
import Grid from '@material-ui/core/Grid';
import FormClient from './../utils/formClient'
import FormWorkOrder from './../utils/formWorkOrder'
import TextBox from './../utils/textBox'
import Button from '@material-ui/core/Button';

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
            <div>

                <Grid container justify='center' style={styleRoot} spacing={2} >

                    <Grid item xs={12}>
                        <TextBox value={this.state.nombre} label={'Nombre'} name={'nombre'} handleBlur={this.handleChangeValue} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextBox value={this.state.apellido} label={'Apellido'} name={'apellido'} handleBlur={this.handleChangeValue} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextBox value={this.state.edad} label={'Edad'} name={'edad'} handleBlur={this.handleChangeValue} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextBox value={this.state.direction} label={'Direccion'} name={'direction'} handleBlur={this.handleChangeValue} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextBox value={this.state.si} label={'Si'} name={'si'} handleBlur={this.handleChangeValue} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextBox value={this.state.otro} label={'Otro'} name={'otro'} handleBlur={this.handleChangeValue} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained"
                            color="primary"
                            size="large" onClick={this.submit} />
                    </Grid>
                </Grid>
            </div>
        )
    }

}

export default Movements