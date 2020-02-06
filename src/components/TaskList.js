import React, { Component } from 'react'
import TaskItem from './TaskItem'
import { connect } from 'react-redux'
import * as actions from "./../actions/index";
import { filter, includes } from 'lodash';

export class TaskList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            filterName: '',
            filterStatus: -1
        }
    }

    onChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        var filter = {
            'name': name === 'filterName' ? value : this.state.filterName,
            'status': name === 'filterStatus' ? value : this.state.filterStatus
        }
        this.props.onFilterTable(filter);
        this.setState({
            [name]: value
        })
    }

    render() {
        var { tasks, filterTable } = this.props;
        if (filterTable.filterName) {
            tasks = filter(tasks, (task) => {
                return includes(task.name.toLowerCase(), filterTable.filterName.toLowerCase());
            })
        }

        tasks = filter(tasks, (task) => {
            if (filterTable.filterStatus === -1) {
                return tasks;
            } else {
                return task.status === (filterTable.filterStatus === 1 ? true : false);
            }
        })

        var elmTask = tasks.map((task, index) => {
            return <TaskItem
                key={task.id}
                index={index}
                task={task}
            />
        })
        return (
            <div className="row mt-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th className="text-center">STT</th>
                                <th className="text-center">Tên</th>
                                <th className="text-center">Trạng Thái</th>
                                <th className="text-center">Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td />
                                <td>
                                    <input type="text"
                                        className="form-control"
                                        name="filterName"
                                        value={this.state.filterName}
                                        onChange={this.onChange}
                                    />
                                </td>
                                <td>
                                    <select
                                        className="form-control"
                                        name="filterStatus"
                                        value={this.state.filterStatus}
                                        onChange={this.onChange}
                                    >
                                        <option value={-1}>Tất Cả</option>
                                        <option value={0}>Ẩn</option>
                                        <option value={1}>Kích Hoạt</option>
                                    </select>
                                </td>
                                <td />
                            </tr>
                            {elmTask}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        filterTable: state.filterTable
    }
};

const mapDispatchtoProps = (dispatch, props) => {
    return {
        onFilterTable: (filter) => {
            dispatch(actions.filterTable(filter));
        }
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(TaskList)
