import React from 'react'
import TextField from '@material-ui/core/TextField';

class TextBox extends React.Component {

    constructor(props) {
        super(props)
        this.state = (
            {
                value: ''
            }
        )
        this.handleBlur = this.handleBlur.bind(this)
    }

    componentWillMount() {
        if (this.props.value) {
            this.setState({
                value: this.props.value
            })
        }
    }
    componentWillReceiveProps(props) {
        if (this.props.value) {
            this.setState({
                value: this.props.value
            })
        }
    }
    handleChange = (event) => {
        this.setState({
            value: event.target.value
        })
    }
    handleBlur = () => {
        this.props.handleBlur(this.state.value, this.props.name)
    }
    render() {
        return (
            <div>
                <TextField
                    style={this.props.style}
                    name={this.props.name}
                    label={this.props.label}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    disabled={this.props.disabled}
                    value={this.state.value}
                    variant={this.props.variant}
                    type={this.props.type}
                    InputProps={this.props.InputProps}
                />
            </div>
        )
    }
}
export default TextBox