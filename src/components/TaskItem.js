import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from './../actions/index'

export class TaskItem extends Component {

    showStatusElement() {
        return (
            <span
                className={this.props.task.status ? 'label label-danger' : 'label label-info'}
                onClick={this.onUpdateStatus}
            >
                {this.props.task.status === true ? 'Kích Hoạt' : 'Ẩn'}
            </span>
        );
    }

    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id)
    }

    onDeleteTask = () => {
        this.props.onDeleteTask(this.props.task.id);
        this.props.onCloseForm();
    }

    onSelectedItem = () => {
        this.props.onSelectedItem(this.props.task.id)
    }

    render() {
        var { task, index } = this.props;

        return (
            <tr>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td className="text-center">
                    {this.showStatusElement()}
                </td>
                <td className="text-center">
                    <button
                        type="button"
                        className="btn btn-warning"
                        onClick={this.onSelectedItem}>
                        <span className="fa fa-pencil mr-5" />Sửa
                    </button>
                    &nbsp;
                    <button type="button" className="btn btn-danger" onClick={this.onDeleteTask}>
                        <span className="fa fa-trash mr-5" />Xóa
                    </button>
                </td>
            </tr>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateStatus: (id) => {
            dispatch(actions.updateStatus(id))
        },
        onDeleteTask: (id) => {
            dispatch(actions.deleteTask(id))
        },
        onCloseForm : () =>{
            dispatch(actions.closeForm())
        },
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(TaskItem)
