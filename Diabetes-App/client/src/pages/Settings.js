import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import CountToggle from "../components/countToggle";
import HyperToggle from "../components/hyperToggle";
import $ from "jquery";
import "./css/settings.css";
import API from "../utils/API";
import { Redirect } from 'react-router';

class Settings extends Component {

    state = {
        weight: "",
        age: "",
        sensCo: "",
        ic: "",
        ip: "",
        bsRaise: "",
        cf: "",
        lowLimit: "",
        highLimit: "",
        targetBG: "",
        exerCo: "",
        errorMargin: "",
        countProtein: "",
        hyperAdj: "",
        updateSuccess: "",
        reset: false,
        redirect: false
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    switchCount = switched => {
        if (switched.switched) {
            this.setState({ countProtein: "true" });
        }
        else {
            this.setState({ countProtein: "false" });
        }
    }

    switchHyper = switched => {
        if (switched.switched) {
            this.setState({ hyperAdj: "true" });
        }
        else {
            this.setState({ hyperAdj: "false" });
        }
    }

    componentDidMount = () => {
        API.getSettings().then((res) => {
            let init = res.data;
            console.log(init);
            this.setState({
                weight: init.weight,
                age: init.age,
                sensCo: init.sensCo,
                ic: init.ic,
                ip: init.ip,
                bsRaise: init.bsRaise,
                cf: init.cf,
                lowLimit: init.lowLimit,
                highLimit: init.highLimit,
                targetBG: init.targetBG,
                exerCo: init.exerCo,
                errorMargin: init.errorMargin,
                countProtein: init.countProtein,
                hyperAdj: init.hyperAdj,
            })
            console.log(this.state.hyperAdj);
        })
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        let newSettings = {
            weight: this.state.weight,
            age: this.state.age,
            sensCo: this.state.sensCo,
            ic: this.state.ic,
            ip: this.state.ip,
            bsRaise: this.state.bsRaise,
            cf: this.state.cf,
            lowLimit: this.state.lowLimit,
            highLimit: this.state.highLimit,
            targetBG: this.state.targetBG,
            exerCo: this.state.exerCo,
            errorMargin: this.state.errorMargin,
            countProtein: this.state.countProtein,
            hyperAdj: this.state.hyperAdj
        };
        API.setSettings(newSettings).then(() => {
            this.setState({updateSuccess: "Success: account settings updated!"})
        })
    }

    restoreDefaults = event => {
        event.preventDefault();
        let weight = this.state.weight;
        let ic = 1800 / weight;
        let ip = ic * (1 / .36);
        let bsRaise = 707.54574 * Math.pow(weight, -1.000424505);
        let cf = ic * bsRaise;
        let restoredSettings = {
            ic: ic.toFixed(2),
            ip: ip.toFixed(2),
            bsRaise: bsRaise.toFixed(2),
            cf: cf.toFixed(2),
            lowLimit: 70,
            highLimit: 180,
            targetBG: 100,
            exerCo: 1,
            errorMargin: 10,
            countProtein: false,
            hyperAdj: false
        };
        API.setSettings(restoredSettings).then(() => {
            this.setState({
                ic: ic.toFixed(2),
                ip: ip.toFixed(2),
                bsRaise: bsRaise.toFixed(2),
                cf: cf.toFixed(2),
                lowLimit: 70,
                highLimit: 180,
                targetBG: 100,
                exerCo: 1,
                errorMargin: 10,
                countProtein: false,
                hyperAdj: false
            });
            this.setState({updateSuccess: "Success: account settings restored!"});
            this.setState({reset:true});
            this.setState({reset:false});
        })
    }

    handleDelete = event => {
        event.preventDefault();
        API.deleteUser().then(res => {
            console.log(res);
            this.setState({ redirect: true });
        })
    };


    render() {
        let redirect = this.state.redirect;
        console.log(redirect);
             if (redirect) {
                 console.log("about to redirect");
               return <Redirect to='/'/>;
             }
        return (
            <div>
                <NavBar />
                <div className="container" id="container-settings">
                    <h1>Account Settings</h1>
                    <form>
                        <h2>User Settings</h2>
                        <div className="row">
                            <label>Weight</label>
                        </div>
                        <input
                            value={this.state.weight}
                            onChange={this.handleInputChange}
                            name="weight"
                            id="settings-input"
                        />
                        <div className="row">
                            <label>Age</label>
                        </div>
                        <input
                            value={this.state.age}
                            onChange={this.handleInputChange}
                            name="age"
                            id="settings-input"
                        />
                        <div className="row">
                            <label>Insulin Sensitivity Coefficient</label>
                            <h5>Enter estimate based on level of physical activity</h5>
                            <h5>Sedentary: .27 - .55</h5>
                            <h5>Active: .23 - .46</h5>
                            <h5>Very Active: .18 - .36</h5>
                        </div>
                        <div id="sliderVal">{this.state.sensCo}</div>
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
                                    $("#sliderVal").html(slider.val());
                                }}
                                value={this.state.sensCo}
                                onChange={this.handleInputChange}
                                name="sensCo"
                            />

                        </div>
                        <h2>App Settings</h2>
                        <div className="row">
                            <label>Insulin:Carb Ratio</label>
                        </div>
                        <input
                            value={this.state.ic}
                            onChange={this.handleInputChange}
                            name="ic"
                            id="settings-input"
                        />
                        <div className="row">
                            <label>Insulin:Protein Ratio</label>
                        </div>
                        <input
                            value={this.state.ip}
                            onChange={this.handleInputChange}
                            name="ip"
                            id="settings-input"
                        />
                        <div className="row">
                            <label>Glucose Raise per Carbohydrate </label>
                        </div>
                        <input
                            value={this.state.bsRaise}
                            onChange={this.handleInputChange}
                            name="bsRaise"
                            id="settings-input"
                        />
                        <div className="row">
                            <label>Correction Factor</label>
                        </div>
                        <input
                            value={this.state.cf}
                            onChange={this.handleInputChange}
                            name="cf"
                            id="settings-input"
                        />
                        <div className="row">
                            <label>Low Limit</label>
                        </div>
                        <div id="lowLimitSliderVal">{this.state.lowLimit}</div>
                        <div id="slidecontainer">
                            <input
                                type="range"
                                min="60"
                                max="120"
                                step="1"
                                className="slider"
                                id="lowLimitRange"
                                onInput={function () {
                                    var lowLimitSlider = $("#lowLimitRange");
                                    var lowLimitOutput = $("#lowLimitSliderVal");
                                    $("#lowLimitSliderVal").html(lowLimitSlider.val());
                                }}
                                value={this.state.lowLimit}
                                onChange={this.handleInputChange}
                                name="lowLimit"
                            />

                        </div>
                        <div className="row">
                            <label>High Limit</label>
                        </div>
                        <div id="highLimitSliderVal">{this.state.highLimit}</div>
                        <div id="slidecontainer">
                            <input
                                type="range"
                                min="100"
                                max="300"
                                step="1"
                                className="slider"
                                id="highLimitRange"
                                onInput={function () {
                                    var highLimitSlider = $("#highLimitRange");
                                    var highLimitOutput = $("#highLimitSliderVal");
                                    $("#highLimitSliderVal").html(highLimitSlider.val());
                                }}
                                value={this.state.highLimit}
                                onChange={this.handleInputChange}
                                name="highLimit"
                            />

                        </div>
                        <div className="row">
                            <label>Target Blood Sugar</label>
                        </div>
                        <div id="targetBGSliderVal">{this.state.targetBG}</div>
                        <div id="slidecontainer">
                            <input
                                type="range"
                                min="80"
                                max="200"
                                step="1"
                                className="slider"
                                id="targetBGRange"
                                onInput={function () {
                                    var targetBGSlider = $("#targetBGRange");
                                    var ltargetBGOutput = $("#targetBGSliderVal");
                                    $("#targetBGSliderVal").html(targetBGSlider.val());
                                }}
                                value={this.state.targetBG}
                                onChange={this.handleInputChange}
                                name="targetBG"
                            />

                        </div>
                        <div className="row">
                            <label>Exercise Coefficient</label>
                            <h5>Adjust this setting based on activity level within 4 hours after eating</h5>
                            <h5>Sedentary</h5>
                            <h5>40-60 minutes: 1.1 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;60+ minutes: 1.25</h5>
                            <h5>Light Exercise</h5>
                            <h5>40-60 minutes: 0.8&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 60+ minutes: 0.7</h5>
                            <h5>Moderate Exercise</h5>
                            <h5>40-60 minutes: 0.67 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;60+ minutes: 0.5</h5>
                            <h5>Vigorous Exercise</h5>
                            <h5>40-60 minutes: 0.5 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;60+ minutes: 0.33</h5>
                        </div>
                        <div id="exerCoSliderVal">{this.state.exerCo}</div>
                        <div id="slidecontainer">
                            <input
                                type="range"
                                min=".33"
                                max="1.25"
                                step=".01"
                                className="slider"
                                id="exerCoRange"
                                onInput={function () {
                                    var exerCoSlider = $("#exerCoRange");
                                    var exerCoOutput = $("#exerCoSliderVal");
                                    $("#exerCoSliderVal").html(exerCoSlider.val());
                                }}
                                value={this.state.exerCo}
                                onChange={this.handleInputChange}
                                name="exerCo"
                            />

                        </div>
                        <div className="row">
                            <label>Error Margin</label>
                            <h5>The FDA allows for up to a 20% margin of error on reporting nutrion information</h5>
                            <h5>Adjust this setting to account differences in actual nutrient content when anticipating post-meal blood sugars </h5>
                            <h5>Studies have shown most foods fall around the 10% error margin, while restuarant foods can be 20% or higher</h5>
                        </div>
                        <div id="errorMarginSliderVal">{this.state.errorMargin}</div>
                        <div id="slidecontainer">
                            <input
                                type="range"
                                min="0"
                                max="25"
                                step="1"
                                className="slider"
                                id="errorMarginRange"
                                onInput={function () {
                                    var errorMarginSlider = $("#errorMarginRange");
                                    var errorMarginOutput = $("#errorMarginSliderVal");
                                    $("#errorMarginSliderVal").html(errorMarginSlider.val());
                                }}
                                value={this.state.errorMargin}
                                onChange={this.handleInputChange}
                                name="errorMargin"
                            />

                        </div>
                        <h2>Advanced Features</h2>
                        <div className="row">
                            <label>Count Protein</label>
                            <h5>Enable the feature to factor protein intake into bolus calculations</h5>
                        </div>
                        <CountToggle switched={this.state.countProtein} reset={this.state.reset} getSwitched={this.switchCount} />
                        <div className="row">
                            <label>Hyperglycemia Adjustment</label>
                            <h5>Hyperglycemia creates dehydration and facilitates insulin resistance</h5>
                            <h5>Enable this feature to adjust bolus calculations for hyperglycemia-induced insulin resistance</h5>
                        </div>
                        <HyperToggle switched={this.state.hyperAdj} reset={this.state.reset} getSwitched={this.switchHyper} />

                        <div className="row">
                            <h4>{this.state.updateSuccess}</h4>
                            <div id="btnContainer">
                                <button
                                    className="btn btn-success"
                                    id="btn-createAccount"
                                    disabled={!(this.state.weight) || !(this.state.age) || !(this.state.sensCo) || !(this.state.ic) || !(this.state.ip) || !(this.state.bsRaise) || !(this.state.cf) || !(this.state.lowLimit) || !(this.state.highLimit) || !(this.state.targetBG) || !(this.state.exerCo) || !(this.state.errorMargin)}
                                    onClick={this.handleFormSubmit}
                                >
                                    Edit
                            </button>
                            <button
                                    className="btn btn-success"
                                    id="btn-restore"
                                    onClick={this.restoreDefaults}
                                >
                                    Restore Defaults
                            </button>
                            <button
                                    className="btn btn-danger"
                                    id="btn-delete"
                                    onClick={this.handleDelete}
                                >
                                    Delete Account
                            </button>
                            </div>
                        </div>
                    </form>

                </div>

            </div>
        );
    }
}

export default Settings;