import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from "./../actions/index";

export class TaskForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: '',
            name: '',
            status: false
        }
    }

    UNSAFE_componentWillMount() {
        if (this.props.task) {
            this.setState({
                id: this.props.task.id,
                name: this.props.task.name,
                status: this.props.task.status,
            })
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.task) {
            this.setState({
                id: nextProps.task.id,
                name: nextProps.task.name,
                status: nextProps.task.status,
            })
        } else if (!nextProps.task) {
            this.setState({
                id: '',
                name: '',
                status: false
            })
        }
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if (name === 'status') {
            value = target.value === "true" ? true : false;
        }
        this.setState({
            [name]: value
        })
    }

    onCloseForm = () => {
        this.props.onCloseForm();
    }

    onSubmit = (event) => {
        event.preventDefault();
        // this.props.onSubmit(this.state);
        this.props.onAddTask(this.state);
        this.onClear();
        this.props.onCloseForm();
    }

    onClear = () => {
        this.setState({
            id: '',
            name: '',
            status: false
        })
    }

    render() {
        var { id, name, status } = this.state;
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">{id !== '' ? 'Cập nhật công việc' : 'Thêm công việc'}
                        <span
                            className="fa fa-times-circle text-right"
                            onClick={this.onCloseForm}>
                        </span>
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                value={name}
                                onChange={this.onChange}
                            />
                        </div>
                        <label>Trạng Thái :</label>
                        <select
                            className="form-control"
                            name="status"
                            value={status}
                            onChange={this.onChange}
                        >
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select>
                        <br />
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">{id !== '' ? 'Cập nhật' : 'Thêm'}</button>&nbsp;
                            <button type="button" className="btn btn-danger" onClick={this.onClear}>Hủy Bỏ</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        
    }
};

const mapDispatchtoProps = (dispatch, props) => {
    return {
        onAddTask : (task) =>{
            dispatch(actions.addTask(task))
        },
        onCloseForm : () =>{
            dispatch(actions.closeForm())
        },
    }
};


export default connect(mapStateToProps,mapDispatchtoProps)(TaskForm)
