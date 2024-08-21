import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./css/login.css";

class Login extends Component {

    state = {
        username: "",
        password: ""
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    render() {
        return (
            <div className="container" id="container-login">
                <h1>Login</h1>
                <form>
                    <div className="row">
                        <label>Username</label>
                    </div>
                    <input
                        value={this.state.username}
                        onChange={this.handleInputChange}
                        name="username"
                    />
                    <div className="row">
                        <label>Password</label>
                    </div>
                    <input
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        name="password"
                    />
                    <div className="row">
                        <div id="btnContainer">
                            <button
                                className="btn btn-success"
                                id="button-login"
                                disabled={!(this.state.username) || !(this.state.password)}
                                onClick={this.handleFormSubmit}
                            >
                                Login
                            </button>

                            <Link to="/create-account">
                                <button
                                    className="btn btn-success"
                                    id="button-login"
                                >
                                    Create Account
                            </button>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;