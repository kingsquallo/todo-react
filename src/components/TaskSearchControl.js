import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from './../actions/index'

export class TaskSearchControl extends Component {
    constructor(props) {
        super(props)

        this.state = {
            keyword: ''
        }
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
    }
    onSearch = () => {
        this.props.onSearch(this.state.keyword)
    }


    render() {
        const { keyword } = this.state;
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="input-group">
                    <input type="text" className="form-control" name="keyword" value={keyword} onChange={this.onChange} placeholder="Nhập từ khóa..." />
                    <span className="input-group-btn">
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={this.onSearch}
                        >
                            <span className="fa fa-search mr-5" />Tìm
                        </button>
                    </span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchtoProps = (dispatch, props) => {
    return {
        onSearch: (keyword) => {
            dispatch(actions.searchTask(keyword));
        }
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(TaskSearchControl)
