import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class Form extends Component {
	constructor () {
		super();
		this.state = {
			task: {
				title: '',
				description: ''
			},
			id: null,
			validated: false,
			error: null,
			type: location.pathname.split('/').pop()
		}

		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInput ( key, e ) {
		const taskField = this.state.task;
		taskField[key] = e.target.value;
		this.setState({ task: taskField });
	}
	
	handleSubmit (e) {
		e.preventDefault();
		
		const { task, id } = this.state;

		if ( this.state.type === 'create' ) {
			fetch ('/api/tasks', {
				method: 'post',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(task)
			})
			.then(
				response => {
					this.setState({ validated: response.status <= 400 })
					return response.json();
				}
			)
			.then(
				result => {
					if ( this.state.validated === false ) {
						this.setState({ id: null, error: result });
					} else {
						this.setState({ id: result.id, error: null });
					}
				}
			);
		} else {
			fetch (`/api/tasks/${id}`, {
				method: 'put',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(task)
			})
			.then(response => {
				this.setState({ validated: response.status <= 400 });
				return response.json();
			})
			.then(
				result => this.setState({
					id: this.state.validated ? result.id : null,
					error: this.state.validated ? null : result
				})
			);
		}
	}

	componentDidMount () {
		if ( this.state.type === 'edit' ) {
			const { id } = this.props.match.params;
			fetch (`/api/tasks/${id}`)
				.then(response => response.json())
				.then(result => this.setState({
					id,
					task: {
						title: result.title,
						description: result.description
					}
				}));
		}
	}

	render () {
		const { task, id, validated, error, type } = this.state;

		return !validated ? (
			<div>
				<h1>{ type === 'create' ? 'Create task' : 'Edit task' }</h1>
				<hr />
				<form onSubmit={this.handleSubmit}>
					<div className='form-group'>
						<label className='d-block' htmlFor='title'>
							Title
							{ error && error.errors.title &&
								<small className='form-text text-danger float-right'>
									{ error.errors.title[0] }
								</small>
							}
						</label>
						<input
							type='text'
							className='form-control'
							placeholder='Title'
							onChange={(e) => this.handleInput('title', e)}
							defaultValue={task.title}
						/>
					</div>
					<div className='form-group'>
						<label className='d-block' htmlFor='title'>
							Description
							{ error && error.errors.description &&
								<small className='form-text text-danger float-right'>
									{ error.errors.description[0] }
								</small>
							}
						</label>
						<textarea
							className='form-control'
							placeholder='Description'
							rows='5'
							onChange={(e) => this.handleInput('description', e)}
							value={task.description}
						/>
					</div>
					<button type='submit' className='btn btn-dark'>
						{ type === 'create' ? 'Create task' : 'Edit task' }
					</button>
				</form>
			</div>
		) : type === 'create' ?
		(
			<div>
				<h1 className='text-center'>Task has been created!</h1>
				<hr />
				<div className='d-flex justify-content-between'>
					<Link to='/' className='btn btn-dark'>Go home</Link>
					<Link to={`/tasks/${id}`} className='btn btn-dark'>View task</Link>
					<Link to='/' className='btn btn-dark'>Create task</Link>
				</div>
			</div>
		) :
		(
			<Redirect to={`/tasks/${id}`} />
		)
	}
}

export default Form;
