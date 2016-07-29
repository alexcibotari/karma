import React, {Component} from 'react';
import {Link, withRouter} from 'react-router';
import client from '../services/client';

class UserForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
        this.state = {
            data: {userName: "", enabled: true, email: "", authorities: []},
            edit: false
        }
    }

    componentWillMount() {
        if (this.props.params.userName) {
            client({method: 'GET', path: this.props.apiUrl.users + '/' + this.props.params.userName}).then(response => {
                if (response.status.code == 200) {
                    this.setState({data: response.entity, edit: true});
                }
            });
        }
    }

    save() {
        if (this.state.edit) {
            client({method: 'PUT', path: this.props.apiUrl.users, entity: this.state.data}).then(response => {
                if (response.status.code == 200) {
                    this.props.router.push('/admin/users/');
                }
            });
        } else {
            client({method: 'POST', path: this.props.apiUrl.users, entity: this.state.data}).then(response => {
                if (response.status.code == 201) {
                    this.props.router.push('/admin/users/');
                }
            });
        }
    }

    handleChange(e){
        this.state.data[e.target.name] = e.target.value;
        this.setState({ data: this.state.data});
    }

    render() {
        return (
            <div className="col-md-12">
                <form className="form-horizontal">
                    <div className="main-user-form col-md-8">
                        <div className="form-group">
                            <label htmlFor="inputUserName" className="col-sm-2 control-label">User name:</label>
                            <div className="col-sm-10 input-group">
                                <input name="userName" type="text" className="form-control" classID="inputUserName" placeholder="User name"
                                       value={this.state.data.userName} onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputEmail" className="col-sm-2 control-label">User email:</label>
                            <div className="col-sm-10 input-group">
                                <input name="email" type="email" className="form-control" classID="inputEmail" placeholder="Email address"
                                       value={this.state.data.email} onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="enableControll" className="col-sm-2 control-label">Enabled:</label>
                            <div className="col-sm-10">
                                <div className="checkbox">
                                    <input name="enabled" classID="enableControll" value={this.state.data.enabled} checked={this.state.data.enabled} type="checkbox"
                                           onChange={this.handleChange}/>
                                </div>

                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10 btn-group">
                                <a className="btn btn-primary" role="button" onClick={this.save}>Save</a>
                                <Link to={'admin/users/'} className="btn btn-danger" role="button">Cancel</Link>
                            </div>
                        </div>
                    </div>
                    <div className="options-sidebar col-md-4">
                        <table className="table table-striped">
                            <tbody>
                            <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td></td>
                            </tr>
                            </tbody>

                        </table>
                    </div>
                </form>
            </div>
        )

    }
}

export default withRouter(UserForm)

UserForm.defaultProps = {apiUrl: {users: '/api/users'}};
