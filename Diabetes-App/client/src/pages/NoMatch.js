import React, { Component } from "react";
import { Link } from "react-router-dom";

class NoMatch extends Component {
    
        state = {
            
        }
    
        handleInputChange = event => {
            const { name, value } = event.target;
            this.setState({
                [name]: value
            });
        };
    
        render() {
            return (
                <div className="container">
                    <h1>Error 404</h1>  
                </div>
            );
        }
    }
    
    export default NoMatch;