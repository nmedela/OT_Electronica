import React from 'react'
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import loginService from './../../services/loginService';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import image from './../../logoEmpresa.png'


const styleRoot = {
    flexGrow: 1,
    height: '100%',
}

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            valor: 'Holaaaa',
            message: '',
        }
    }
    componentWillMount() {
        try {
            console.log('entro al willlmount')
            loginService.verify()
                .then((res) => {
                    console.log('este tene el res', res)
                    if (res.data.code == 0) {
                        this.props.history.push('/WO/new/-1')
                        // this.props.history.goBack()
                        console.log('este tene el res', res)
                    }
                    this.setState({
                        isLoading: false,
                        message: res.data.message
                    })
                })
        } catch (err) {
            console.log(err)
        }
    }
    handleChange = (event) => {

        let name = event.target.name
        this.setState({
            [name]: event.target.value,
            message: ''
        })
    };
    tryLogin = () => {
        this.setState({
            isLoading: true,
        })
        loginService.login(this.state.username, this.state.password)
            .then((res) => {
                console.log('inicio session,', res.data.code)
                if (res.data.code == 0) {
                    console.log('inicio session,', res.data.code)
                    this.props.history.push('/WO/new/-1')
                }
                console.log(res.data.message)
                this.setState({
                    isLoading: false,
                    message: res.data.message
                })
            })
    }
    handleClick = (event) => {
        if (this.check()) {
            this.tryLogin()
        }
    };
    check = () => {
        if (!this.state.username || this.state.username == '' || !this.state.password || this.state.password == '') {
            this.setState({
                message: 'No deje campos vacíos'
            })
        } else {
            this.setState({
                message: ''
            })
            return true
        }

    }
    render() {

        return (
            <div>

                    <Paper style={{ width: '100%', padding: '10px' }}>
                        <Grid container alignItems='center' justify='center' direction='column' style={styleRoot} spacing={2} >
                            <Grid item xs={12} sm={12}>
                                <img src={image} width="200" height="130" alt="" />
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <TextField
                                    // style={{ margin: '10px' }}
                                    name='username'
                                    label='Nombre de usuario'
                                    onChange={this.handleChange}
                                    disabled={this.state.disabled}
                                    value={this.state.username}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    // style={{ margin: '10px' }}
                                    name='password'
                                    label='Password'
                                    onChange={this.handleChange}
                                    disabled={this.state.disabled}
                                    value={this.state.password}
                                    type='password'
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Button
                                    // style={{ marginTop: '5px' }}
                                    variant="contained"
                                    color="primary"
                                    // size="large"
                                    // disabled={this.state.generate}
                                    onClick={this.handleClick}
                                    type='submit'
                                >
                                    login
                                    </Button>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                {!this.state.isLoading && this.state.message}
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            {this.state.isLoading && <LinearProgress />}
                        </Grid>
                    </Paper>
            </div>
        )
    }

}

export default Login