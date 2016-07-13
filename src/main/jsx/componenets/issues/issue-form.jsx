import React, {Component} from 'react';
import {Link} from 'react-router';
import client from '../../client';

class IssueForm extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
        this.state = {
            url: '/api/issues',
            data: {id: "", key: "", summery: "", description: ""},
            edit: false
        }
    }

    componentWillMount() {
        if (this.props.params.id) {
            client({method: 'GET', path: this.state.url + '/' + this.props.params.id}).then(response => {
                if (response.status.code == 200) {
                    this.setState({data: response.entity, edit: true});
                }
            });
        }
    }

    save() {
        if (this.state.edit) {
            client({method: 'PUT', path: this.state.url, entity: this.state.data}).then(response => {
                if (response.status.code == 200) {
                    this.props.history.push('/issues');
                }
            });
        } else {
            client({method: 'POST', path: this.state.url, entity: this.state.data}).then(response => {
                if (response.status.code == 201) {
                    this.props.history.push('/issues');
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
            <form className="form-horizontal">
                <div className="form-group">
                    <label htmlFor="inputId" className="col-sm-2 control-label">ID</label>
                    <div className="col-sm-10">
                        <input name="id" type="text" className="form-control" classID="inputId" placeholder="ID"
                               value={this.state.data.id} onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="inputKey" className="col-sm-2 control-label">Key</label>
                    <div className="col-sm-10">
                        <input name="key" type="text" className="form-control" classID="inputKey" placeholder="Key"
                               value={this.state.data.key} onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="inputSummery" className="col-sm-2 control-label">Summery</label>
                    <div className="col-sm-10">
                        <input name="summery" type="text" className="form-control" classID="inputSummery" placeholder="Summery"
                               value={this.state.data.summery} onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="inputDesc" className="col-sm-2 control-label">Description</label>
                    <div className="col-sm-10">
                        <textarea name="description" className="form-control" rows="3" classID="inputDesc"
                                  placeholder="Description" value={this.state.data.description} onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <a className="btn btn-primary" role="button" onClick={this.save}>Save</a>
                        <Link to={'/issues/'} className="btn btn-danger" role="button">Cancel</Link>
                    </div>
                </div>
            </form>
        )
    }
}

export default IssueForm;