import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import "./css/basal.css";
import API from "../utils/API";


class Basal extends Component {

    state = {
        basal: "",
        levemirAM: "",
        levemirPM: "",
        pumpRates: [],
        time: ["12AM: ", "1AM: ", "2AM: ", "3AM: ", "4AM: ", "5AM: ", "6AM: ", "7AM: ", "8AM: ", "9AM: ", "10AM: ", "11AM: ", "12PM: ", "1PM: ", "2PM: ", "3PM: ", "4PM: ", "5PM: ", "6PM: ", "7PM: ", "8PM: ", "9PM: ", "10PM: ", "11PM: "]
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    componentWillMount = () => {
        API.getSettings().then((res) => {
            let weight = res.data.weight;
            let sensCo = res.data.sensCo;
            let basal = weight * sensCo / 2;
            let levemirAM = basal * .5615;
            let levemirPM = basal * .4385;
            let rates = [.9916, .9916, 1.0846, 1.1001, 1.1466, 1.1776, 1.224, 1.255, 1.2395, 1.1931, 1.1311, 1.0691, .9452, .8677, .8367, .8367, .8367, .8212, .8212, .8367, .8677, .8677, .9142, .9452];
            let hourlyBasal = basal * .8 / 24;
            let pumpRates = [];
            for (let i = 0; i< rates.length; i++){
                pumpRates.push((rates[i]*hourlyBasal).toFixed(2));
            }
            console.log(pumpRates);
            let obj={
                basal: basal.toFixed(2),
                levemirAM: levemirAM.toFixed(2),
                levemirPM: levemirPM.toFixed(2),
                pumpRates: pumpRates
            };
            this.setState(obj);
        })
    }

    render() {
        return (
            <div>
                <NavBar />
                <div className="container" id="basal-container">
                    <h1>Basal Dosages</h1>
                    <h2>Lantus</h2>
                    <h4>{this.state.basal} un.</h4>
                    <h2>Levemir</h2>
                    <h4>AM: {this.state.levemirAM} un.</h4>
                    <h4>PM: {this.state.levemirPM} un.</h4>
                    <h2>Insulin Pump Basal Rates</h2>
                    {this.state.pumpRates.map((rate,index) => (
                        <h4>{this.state.time[index]}{rate} un.</h4>
                ))}

                </div>
            </div>
        );
    }
}

export default Basal;