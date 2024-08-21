import React, { Component } from "react";
import "./css/search.css";
import API from "../utils/API";

class Search extends Component {

    state = {
        title: "",
        date: "",
        url: ""
    }

    saveArticle = () => {
        let newArticle = {
            "title": this.state.title,
            "date": this.state.date,
            "url": this.state.url
        };
        return API.saveArticle(newArticle);
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.state.title !== "" && prevState.title !== this.state.title) {
            console.log(this.state.title);
            this.saveArticle().then(() => {
                this.props.getSaved();
            });
            
        }
    }

    render() {
        console.log(this.props);
        return (
            <div id="resultsContainer">
                <h3>Results</h3>
                <ol>
                    {this.props.results.map(article => (
                        <div className="row">
                            <li>
                                <div className="col-xs-6">
                                    <div id="titleContainer">
                                        {article.headline.main}
                                    </div>
                                </div>
                                <div className="col-xs-1"></div>
                                <button
                                    onClick={() => {
                                        this.setState({ title: article.headline.main, date: article.pub_date, url: article.web_url });
                                    }}
                                    className="btn btn-success"
                                >Save</button>
                            </li>
                        </div>
                    ))}
                </ol>
            </div>
        );
    }
}

export default Search;