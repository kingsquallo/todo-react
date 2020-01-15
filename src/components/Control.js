import React, { Component } from 'react'
import Search from './Search'
import Sort from './Sort'

export class Control extends Component {
    render() {
        return (
            <div className="row mt-15">
                <Search />
                <Sort />
            </div>
        )
    }
}

export default Control