import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./css/createAccount.css";
import $ from "jquery";
import API from "../utils/API";
import { Redirect } from 'react-router';

class CreateAccount extends Component {

    state = {
        username: "",
        password: "",
        weight: "",
        age: "",
        sensCo: .37,
        redirect: false
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        let newUser = {
            username: this.state.username,
            password: this.state.password,
            weight: this.state.weight,
            age: this.state.age,
            sensCo: this.state.sensCo
        };
        console.log(newUser);
        API.newUser(newUser).then(res => {
            console.log(res);
            this.setState({redirect: true});
        })
    };

    render() {
        let redirect = this.state.redirect;
        console.log(redirect);
             if (redirect) {
                 console.log("about to redirect");
               return <Redirect to='/home'/>;
             }
        return (
            <div className="container" id="container-createAccount">
                <h1>Create Account</h1>
                <form>
                    <div className="row">
                        <label>Username</label>
                        <h5>Must be between 6-30 characters</h5>
                    </div>
                    <input
                        value={this.state.username}
                        onChange={this.handleInputChange}
                        name="username"
                    />
                    <div className="row">
                        <label>Password</label>
                        <h5>Must be between 6-30 characters</h5>
                    </div>
                    <input
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        name="password"
                    />
                    <div className="row">
                        <label>Weight</label>
                        <h5>Enter weight in pounds between 50-500</h5>
                    </div>
                    <input
                        value={this.state.weight}
                        onChange={this.handleInputChange}
                        name="weight"
                    />
                    <div className="row">
                        <label>Age</label>
                        <h5>Enter age in years betweent 0-99</h5>
                    </div>
                    <input
                        value={this.state.age}
                        onChange={this.handleInputChange}
                        name="age"
                    />
                    <div className="row">
                        <label>Insulin Sensitivity Coefficient</label>
                        <h5>Enter estimate based on level of physical activity</h5>
                        <h5>Sedentary: .27 - .55</h5>
                        <h5>Active: .23 - .46</h5>
                        <h5>Very Active: .18 - .36</h5>
                    </div>
                    <div id="slidecontainer">
                        <input
                            type="range"
                            min=".18"
                            max=".55"
                            defaultValue=".37"
                            step=".01"
                            className="slider"
                            id="sensCoRange"
                            onInput={function () {
                                var slider = $("#sensCoRange");
                                var output = $("#sliderVal");
                                console.log(slider.val());
                                $("#sliderVal").html(slider.val());
                            }}
                            value={this.state.sensCo}
                            onChange={this.handleInputChange}
                            name="sensCo"
                        />
                        <div id="sliderVal">.37</div>
                    </div>
                    <div className="row">
                        <div id="btnContainer">
                            <button
                                className="btn btn-success"
                                id="btn-createAccount"
                                disabled={!(this.state.username) || !(this.state.password) || !(this.state.weight) || !(this.state.age)}
                                onClick={this.handleFormSubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateAccount;