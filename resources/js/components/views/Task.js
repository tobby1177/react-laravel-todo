import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Task extends Component {
	constructor () {
		super();

		this.state = {
			task: null,
			id: location.pathname.split('/')[2],
			deleted: false
		}

		this.handleDelete = this.handleDelete.bind(this);
		this.handleStatusUpdate = this.handleStatusUpdate.bind(this);
	}

	componentDidMount () {
		const { id } = this.state;

		fetch (`/api/tasks/${id}`)
			.then(response => response.json())
			.then(task => this.setState({ task }));
	}

	handleDelete () {
		const { id } = this.state;

		fetch (`/api/tasks/${id}`, { method: 'delete' })
			.then(response => response.json())
			.then(deleted => this.setState({ deleted }));
	}

	handleStatusUpdate () {
		const { task, id } = this.state;
		fetch (`/api/tasks/${id}`, {
			method: 'put',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({...task, status: !task.status})
		})
			.then(response => response.json())
			.then(result => this.setState({
				task: {
					...task,
					status: result.status
				}
			}));
	}

	render () {
		const { task, id, deleted } = this.state;

		return task && !deleted ? (
			<div>
				<Link to='/'>&laquo; Go Home</Link>
				<button
					onClick={this.handleStatusUpdate}
					className={`btn btn-${task.status == 0 ? `success` : `primary`} float-right position-relative`}
					style={{ top: -10 }}
				>
					{ task.status == 0 ? `Mark as completed` : `Undo completion` }
				</button>
				<hr />
				<h1>{ task.title }</h1>
				<p className={`text-${task.status == 1 ? `success` : `info`} position-relative mb-1`} style={{ top: -3 }}>
					&nbsp;&#9679; { task.status == 1 ? `Completed` : `Pending` }
				</p>
				<p className='text-muted'>{task.description}</p>
				<Link to={`/tasks/${id}/edit`} className='btn btn-dark'>Edit task</Link>
				<button
					className='btn btn-danger float-right'
					onClick={this.handleDelete}
				>
					Delete task
				</button>
			</div>
		) :
		(
			<div>
				<h1 className='text-center'>Task has been deleted!</h1>
				<hr />
				<div className='d-flex justify-content-between'>
					<Link to='/' className='btn btn-dark'>Go home</Link>
					<Link to='/tasks/create' className='btn btn-dark'>Create task</Link>
				</div>
			</div>
		)
	}
};

export default Task;
