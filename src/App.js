import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
import TaskList from './components/TaskList';
import { findIndex , filter } from 'lodash'

class App extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
            tasks : [],
            isDisplayForm : false,
            taskEditing : null,
            filterName : '',
            filterStatus : -1,
            keyword : '',
            sortBy : 'name',
            sortValue : 1
        }
    }

    UNSAFE_componentWillMount() {
        if (localStorage && localStorage.getItem('tasks')) {
            var tasks = JSON.parse(localStorage.getItem('tasks'))
            this.setState({
                tasks : tasks
            })
        }        
    }

    s4(){
        return Math.floor(1+ Math.random() * 0x1000).toString(16).substring(1);
    }

    generateID(){
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() + this.s4();
    }

    onToggleForm = () =>{
        if (this.state.isDisplayForm && this.state.taskEditing !== null) {
            this.setState({
                isDisplayForm : true,
                taskEditing : null
            })
        }else{
            this.setState({
                isDisplayForm : !this.isDisplayForm,
                taskEditing : null
            })
        }
    }

    onCloseForm = () =>{
        this.setState({
            isDisplayForm : false
        })
    }

    onShowForm = () =>{
        this.setState({
            isDisplayForm : true
        })
    }

    onSubmit = (data) =>{
        var { tasks } = this.state;
        if (data.id === '') {
            data.id = this.generateID();
            tasks.push(data);
        }else{
            var index = this.findIndex(data.id);
            tasks[index] = data;
        }
        
        this.setState({
            tasks : tasks,
            taskEditing : null
        })
        localStorage.setItem('tasks',JSON.stringify(tasks))
    }

    onUpdateStatus = (id) => {
        var { tasks } = this.state;
        // var index = this.findIndex(id);
        var index = findIndex(tasks,(task) => {
            return task.id === id;
        })
        if (index !== -1) {
            tasks[index].status =  !tasks[index].status;
            this.setState({
                tasks : tasks
            })
            localStorage.setItem('tasks',JSON.stringify(tasks))
        }
    }

    onDelete = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
        if (index !== -1) {
            tasks.splice(index,1)
            this.setState({
                tasks : tasks
            })
            localStorage.setItem('tasks',JSON.stringify(tasks))
        }
    }

    onUpdate = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
        var taskEditing = tasks[index];
        this.setState({
            taskEditing : taskEditing
        })
        this.onShowForm();
    }

    onFilter = (filterName, filterStatus) => {
        filterStatus = parseInt(filterStatus);
        this.setState({
            filterName : filterName.toLowerCase(),
            filterStatus : filterStatus,
        })
    }

    onSearch = (keyword) => {
        this.setState({
            keyword : keyword
        })
    }

    onSort = (sortBy, sortValue) => {
        this.setState({
            sortBy : sortBy,
            sortValue : sortValue
        })
    }

    findIndex = (id) =>{
        var { tasks } = this.state;
        var result = -1;
        tasks.forEach((task,index) => {
            if (task.id === id) {
                result = index;
            }
        });
        return result;
    }

    render() {
        var { tasks , isDisplayForm, taskEditing , filterName, filterStatus , keyword , sortBy, sortValue } = this.state;
        // tasks = tasks.filter((task)=> {
        //     return task.name.toLowerCase().indexOf(keyword) !== -1;
        // })

        tasks = filter(tasks,(task)=>{
            return task.name.toLowerCase().indexOf(keyword) !== -1;
        })
        
        if (filterName) {
            tasks = tasks.filter((task)=> {
                return task.name.toLowerCase().indexOf(filterName) !== -1;
            })
        }

        
        tasks = tasks.filter((task) => {
            if (filterStatus === -1) {
                return tasks;
            }else{
                return task.status === (filterStatus === 1 ? true : false);
            }
        })

        if (sortBy === 'name') {
            tasks.sort((a,b) => {
                if (a.name > b.name) return sortValue;
                else if (a.name < b.name) return -sortValue;
                else return 0;
            })
        }else{
            tasks.sort((a,b) => {
                if (a.status > b.status) return -sortValue;
                else if (a.status < b.status) return sortValue;
                else return 0;
            })
        }
        var elmTaskForm = isDisplayForm ? 
            <TaskForm  
                onSubmit={this.onSubmit} 
                onCloseForm={this.onCloseForm} 
                task={taskEditing}
            /> : '';
        return (
            <div className="container">
            <div className="text-center">
                <h1>Quản Lý Công Việc</h1>
                <hr />
            </div>
            <div className="row">
                <div className={isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
                    {elmTaskForm}
                </div>
                <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                    <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={ this.onToggleForm }
                    >
                        <span className="fa fa-plus mr-5" />Thêm Công Việc
                    </button>
                    <TaskControl 
                        onSearch={this.onSearch}
                        onSort={this.onSort}
                        sortBy={sortBy}
                        sortValue={sortValue}
                    />
                    <TaskList 
                        tasks={ tasks } 
                        onUpdateStatus={this.onUpdateStatus}
                        onDelete={this.onDelete}
                        onUpdate={this.onUpdate}
                        onFilter={this.onFilter}
                    />
                </div>
            </div>
        </div>
        )
    }
}

export default App;
