import React, { Component } from "react";
import API from "../utils/API";
import "./css/saved.css";

class Saved extends Component {

    state= {
        id: ""
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.state.id !== "" && prevState.id !== this.state.id) {
            console.log(this.state.id);
            this.deleteArticle(this.state.id).then(()=>{
                this.props.getSaved();
            });
        }
    }

    deleteArticle = (id) => {
        return API.deleteArticle(id);
    }

    render() {
        return (
            <div id="savedContainer">
                <h3>Saved</h3>
                <ol>
                {this.props.saved.map(article => (
                    <div className="row">
                  <li key={article._id}>
                      <div className="col-xs-6">
                    <div id="titleContainer">
                    {article.title}
                    </div>
                    </div>
                    <div className="col-xs-1"></div>
                    <button 
                    onClick={() => {
                        this.setState({id: article._id});
                        }}
                    className="btn btn-danger"
                    >Delete</button>
                  </li>
                  </div>
                ))}
              </ol>
            </div>
        );
    }
}

export default Saved;