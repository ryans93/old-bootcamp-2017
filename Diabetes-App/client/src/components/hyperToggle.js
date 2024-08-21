import React, { Component } from 'react';
import { render } from 'react-dom';
import Switch from 'react-toggle-switch';
import "../../node_modules/react-toggle-switch/dist/css/switch.min.css"

class HyperToggle extends Component {

    state = {
        switched: ""
    };

    toggleSwitch = () => {
        this.setState(prevState => {
            return {
                switched: !prevState.switched
            };
        });
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.reset && prevProps.reset !== this.props.reset) {
            this.setState({switched: false});
        } 
        if (this.state.switched === "") {
            this.setState({ switched: this.props.switched });
        }
        if (prevState.switched !== this.state.switched) {
            this.props.getSwitched(this.state);
        }
    }

    render() {
        return (
            <div>
                <Switch onClick={this.toggleSwitch} on={this.state.switched} />
            </div>
        );
    }
}

export default HyperToggle;