import React, { Component } from "react";
import Saved from "./Saved";
import Search from "./Search";
import "./css/main.css";
import API from "../utils/API";

class Main extends Component {

    state = {
        topic: "",
        startYear: "",
        endYear: "",
        results: [],
        saved: []
    };

    componentDidMount = () => {
        API.getArticles().then( (res) =>{
            console.log(res.data);
            this.setState({saved: res.data});
        })
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    updateSaved = () => {
        API.getArticles().then( (res) =>{
            console.log(res.data);
            this.setState({saved: res.data});
        })
    }

    handleFormSubmit = event => {
        event.preventDefault();
        let query = {
            topic: this.state.topic,
            startYear: this.state.startYear,
            endYear: this.state.endYear
        };
        console.log("logging query");
        console.log(query);
        API.search(query).then(res => {
            this.setState({ results: res.data.response.docs });
            console.log(res.data.response.docs);
        })
    };

    render() {
        return (
            <div>
                <h1>New York Times Article Searcher</h1>
                <div className="row">
                    <div className="col-xs-1"></div>
                    <div className="col-xs-10">
                        <div id="searchContainer">
                            <h3>Search</h3>
                            <form>
                                <div className="row">
                                    <label>Topic</label>
                                </div>
                                <input
                                    value={this.state.topic}
                                    onChange={this.handleInputChange}
                                    name="topic"
                                />
                                <div className="row">
                                    <label>Start Year</label>
                                </div>
                                <input
                                    value={this.state.startYear}
                                    onChange={this.handleInputChange}
                                    name="startYear"
                                />
                                <div className="row">
                                    <label>End Year</label>
                                </div>
                                <input
                                    value={this.state.endYear}
                                    onChange={this.handleInputChange}
                                    name="endYear"
                                />
                                <div className="row">
                                    <div id="btnContainer">
                                        <button
                                            className="btn btn-success"
                                            disabled={!(this.state.topic)}
                                            onClick={this.handleFormSubmit}
                                        >
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <Search results={this.state.results} getSaved={this.updateSaved}/>
                        <Saved saved={this.state.saved} getSaved={this.updateSaved}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;