import React, { Component } from 'react'

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

    onDelete = () => {
        this.props.onDelete(this.props.task.id)
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
                    <button type="button" className="btn btn-danger" onClick={this.onDelete}>
                        <span className="fa fa-trash mr-5" />Xóa
                    </button>
                </td>
            </tr>
        )
    }
}

export default TaskItem
