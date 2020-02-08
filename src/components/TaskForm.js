import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from "./../actions/index";

class TaskForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: '',
            name: '',
            status: false
        }
    }

    UNSAFE_componentWillMount() {
        if (this.props.itemEditing && this.props.itemEditing.id !== null) {
            this.setState({
                id: this.props.itemEditing.id,
                name: this.props.itemEditing.name,
                status: this.props.itemEditing.status,
            })
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.itemEditing) {
            this.setState({
                id: nextProps.itemEditing.id,
                name: nextProps.itemEditing.name,
                status: nextProps.itemEditing.status,
            })
        } else {
            this.onClear();
        }
    }

    onHandleChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        })
    }

    onSave = (event) => {
        event.preventDefault();
        if (this.state.id !== null) {
            this.props.onUpdateTask(this.state);
        }else{
            this.props.onAddTask(this.state);
        }
        this.props.onCloseForm();
        this.onClear();
    }

    onClear = () => {
        this.setState({
            name: '',
            status: false
        })
    }

    render() {
        if (!this.props.isDisplayForm) return '';
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">{this.state.id !== '' ? 'Cập nhật công việc' : 'Thêm công việc'}
                        <span
                            className="fa fa-times-circle text-right"
                            onClick={this.props.onCloseForm}>
                        </span>
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSave}>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                value={this.state.name}
                                onChange={this.onHandleChange}
                            />
                        </div>
                        <label>Trạng Thái :</label>
                        <select
                            className="form-control"
                            name="status"
                            value={this.state.status}
                            onChange={this.onHandleChange}
                        >
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select>
                        <br />
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">{this.state.id !== '' ? 'Cập nhật' : 'Thêm'}</button>&nbsp;
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
        isDisplayForm: state.isDisplayForm,
        itemEditing: state.itemEditing,
    }
};

const mapDispatchtoProps = (dispatch, props) => {
    return {
        onAddTask: (task) => {
            dispatch(actions.addTask(task))
        },
        onUpdateTask: (task) => {
            dispatch(actions.updateTask(task))
        },
        onCloseForm: () => {
            dispatch(actions.closeForm())
        },
    }
};


export default connect(mapStateToProps, mapDispatchtoProps)(TaskForm)
