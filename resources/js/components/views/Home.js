import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
	constructor () {
		super();

		this.state = {
			tasks: null
		}
	}

	componentDidMount () {
		fetch ('/api/tasks')
			.then(response => response.json())
			.then(tasks => this.setState({ tasks }));
	}

	render () {
		const { tasks } = this.state;
		return tasks && (
			<div>
				<Link to='/tasks/create' className='btn btn-dark'>Create task</Link>
				<hr />
				<ul>
					{ tasks.map(task =>
						<li key={task.id}>
							<Link className='text-dark' to={`/tasks/${task.id}`}>
								{ task.title }
							</Link>
						</li>
					)}
				</ul>
			</div>
		)
	}
}

export default Home;
