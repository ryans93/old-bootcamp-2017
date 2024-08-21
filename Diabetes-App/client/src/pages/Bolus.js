import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import "./css/bolus.css";
import API from "../utils/API";

class Bolus extends Component {

    state = {

        bolus: 0.00,

        bs: "",
        carbs: "",
        protein: "",
        lastDose: 0,
        hours: 0,

        targetBG: "",
        cf: "",
        ic: "",
        ip: "",

        exerCo: "",
        countProtein: "",
        hyperAdj: "",

        lowLimit: "",
        highLimit: "",
        errorMargin: "",
        bsRaise: "",

        lowWarning: "",
        highWarning: ""
    }

    componentWillMount = () => {
        API.getSettings().then((res) => {
            let init = res.data;
            console.log(init);
            this.setState({
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

        })
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        let correction = (this.state.bs - this.state.targetBG) / this.state.cf;
        let carbCover = this.state.carbs / this.state.ic;
        let proteinCover;
        let proteinError;
        if (this.state.countProtein) {
            proteinCover = this.state.protein / this.state.ip
            proteinError = this.state.errorMargin / 100 * this.state.protein * this.state.bsRaise * 0.36;
        }
        else {
            proteinCover = 0;
            proteinError = 0;
        }
        let activeInsulin = this.state.lastDose * (-.01002331 * Math.pow(this.state.hours, 4) + .0966847967 * Math.pow(this.state.hours, 3) - .2579059829 * Math.pow(this.state.hours, 2) - .1248510749 * this.state.hours + 1.003651904);
        let hyperMod;
        if (this.state.hyperAdj && this.state.bs > this.state.highLimit) {
            hyperMod = this.state.bs * .0015 + .806151;
        }
        else {
            hyperMod = 1;
        }
        let exerCo = this.state.exerCo;
        //console.log(correction);
        //console.log(carbCover);
        //console.log(proteinCover);
        //console.log(activeInsulin);
        //console.log(exerCo);
        //console.log(hyperMod);
        let carbError = this.state.errorMargin / 100 * this.state.carbs * this.state.bsRaise;
        let totalError=carbError + proteinError;
        console.log(carbError);
        console.log(proteinError);
        console.log(totalError);
        let bolus = (correction + carbCover + proteinCover - activeInsulin) * exerCo * hyperMod;
        this.setState({ bolus: bolus.toFixed(2) })

        if (this.state.targetBG - totalError < this.state.lowLimit){
            this.setState({lowWarning: "Warning: possible low detected. Monitor blood sugar carefully for the next 4 hours"});
        }
        else{
            this.setState({lowWarning: ""});
        }
        if (this.state.targetBG + totalError > this.state.highLimit){
            this.setState({highWarning: "Warning: possible high detected. Monitor blood sugar carefully for the next 4 hours"})
        }
        else{
            this.setState({highWarning: ""});
        }
    }

    render() {
        return (
            <div>
                <NavBar />

                <div className="container" id="bolus-container">
                    <h1>Bolus Calculation</h1>
                    <h2>{this.state.bolus} un.</h2>
                    <h4 id="warning">{this.state.lowWarning}</h4>
                    <h4 id="warning">{this.state.highWarning}</h4>
                    <form>
                        <div className="row">
                            <label>Enter blood sugar</label>
                        </div>
                        <input
                            className="bolus-input"
                            value={this.state.bs}
                            onChange={this.handleInputChange}
                            name="bs"
                        />
                        <div className="row">
                            <label>Enter carb intake</label>
                        </div>
                        <input
                            className="bolus-input"
                            value={this.state.carbs}
                            onChange={this.handleInputChange}
                            name="carbs"
                        />
                        <div className="row">
                            <label>Enter protein intake</label>
                        </div>
                        <input
                            className="bolus-input"
                            value={this.state.protein}
                            onChange={this.handleInputChange}
                            name="protein"
                        />
                        <h4>Active Insulin Settings</h4>
                        <h5>Fill out the following fields to account for insulin taken in the last 4 hours</h5>
                        <h5>Do not alter below fields if no bolus dose was taken within the last 4 hours</h5>
                        <div className="row">
                            <label>Enter amount of last dose</label>
                        </div>
                        <input
                            className="bolus-input"
                            value={this.state.lastDose}
                            onChange={this.handleInputChange}
                            name="lastDose"
                        />
                        <div className="row">
                            <label>Enter hours elapsed since last dose</label>
                        </div>
                        <input
                            className="bolus-input"
                            value={this.state.hours}
                            onChange={this.handleInputChange}
                            name="hours"
                        />
                        <div className="row">
                            <div id="btnContainer">
                                <button
                                    className="btn btn-success"
                                    id="button-calculate"
                                    disabled={!(this.state.bs) || !(this.state.carbs) || !(this.state.protein)}
                                    onClick={this.handleFormSubmit}
                                >
                                    Calculate
                            </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Bolus;