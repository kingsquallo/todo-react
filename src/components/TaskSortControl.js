import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from './../actions/index'

export class TaskSortControl extends Component {

    onClick = (sortBy, sortValue) => {
        this.props.onSort({
            by: sortBy,
            value: sortValue
        });
    }

    render() {
        const { by, value } = this.props.sort
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Sắp Xếp <span className="fa fa-caret-square-o-down ml-5" />
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li onClick={() => this.onClick('name', 'asc')}>
                            <a href="# " role="button" className={by === 'name' && value === 'asc' ? 'sort_selected' : ''}>
                                <span className="fa fa-sort-alpha-asc pr-5">
                                    Tên A-Z
                                </span>
                            </a>
                        </li>
                        <li onClick={() => this.onClick('name', 'desc')}>
                            <a href="# " role="button" className={by === 'name' && value === 'desc' ? 'sort_selected' : ''}>
                                <span className="fa fa-sort-alpha-desc pr-5">
                                    Tên Z-A
                                </span>
                            </a>
                        </li>
                        <li role="separator" className="divider" />
                        <li onClick={() => this.onClick('status', 'desc')}>
                            <a href="# " role="button" className={by === 'status' && value === 'desc' ? 'sort_selected' : ''}>
                                Trạng Thái Kích Hoạt
                            </a>
                        </li>
                        <li onClick={() => this.onClick('status', 'asc')}>
                            <a href="# " role="button" className={by === 'status' && value === 'asc' ? 'sort_selected' : ''}>
                                Trạng Thái Ẩn
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        sort: state.sort,
    }
};

const mapDispatchtoProps = (dispatch, props) => {
    return {
        onSort: (sort) => {
            dispatch(actions.sortTask(sort));
        }
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(TaskSortControl)
