import React from 'react'
import TextField from '@material-ui/core/TextField';

class TextBox extends React.Component {

    constructor(props) {
        super(props)
        this.state = (
            {
                value: null
            }
        )
        this.handleChange = this.handleChange.bind(this)
    }

    componentWillMount(){
        if(this.props.value){
            this.setState({
                value:this.props.value
            })
        }
    }
    handleChange = (event) => {
        this.setState({
            value: event.target.value
        })
    }
    render() {
        const styleTextField = {
            marginTop: '16px',
            marginLeft: '1px',
            width: '100%',
        }
        const styleTextDisplay = {
            // display: idTypeChange.some(v => v == this.state.statusValue) || this.state.update ? "inline-flex" : "none",
            marginTop: '16px',
            marginLeft: '1px',
            width: '100%',
        }
        return (
            <div>
                <TextField
                    // style={styleTextField}
                    id='propio'
                    // name='brand'
                    label="Propio"
                    onChange={this.handleChange}
                    // disabled={!this.props.new && !this.state.update}
                    value={this.state.value}
                    variant="outlined" />
            </div>
        )
    }
}
export default TextBox