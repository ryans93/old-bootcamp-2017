import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

class NavBar extends Component {

    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <ul className="nav navbar-nav">
                        <li className="navLink" ><Link to="/home" id="homeA"><a>Home</a></Link></li>
                        <li className="navLink"><Link to="/bolus"><a>Bolus</a></Link></li>
                        <li className="navLink"><Link to="/basal"><a>Basal</a></Link></li>
                        <li className="navLink"><Link to="/meals"><a>Meals</a></Link></li>
                    </ul>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">
                            <li className="dropdown">
                                <a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span className="glyphicon glyphicon-cog" aria-hidden="true" /> <span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li><Link to="/settings"><a>Account Settings</a></Link></li>
                                    <li><Link to="/"><a>Logout</a></Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }

}

export default NavBar;