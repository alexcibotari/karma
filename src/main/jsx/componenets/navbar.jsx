import React, {Component} from 'react';
import { Link } from 'react-router';
import ProjectDropDown from './project-dropdown';

class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                                aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">{this.props.brand}</a>
                    </div>
                    <div classID="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav">
                            <li>
                                <Link to="/">Dashboard</Link>
                            </li>
                                <ProjectDropDown />
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                    <span className="glyphicon glyphicon-user" title={this.props.profile.userName}></span> <span className="caret"></span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link to="/profile">Profile</Link></li>
                                    <li><Link to="/settings">Settings</Link></li>
                                    <li role="separator" className="divider"></li>
                                    <li><a href="/logout">Sign Out</a></li>
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

