import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import * as Views from './views';

const Main = () => (
	<main className='container mb-4'>
		<div className='col-lg-8 mx-auto'>
			<Switch>
				<Route exact path='/' component={Views.Home} />
				<Route exact path='/tasks' component={Views.Home} />
				<Route exact path='/tasks/create' component={Views.Form} />
				<Route path='/tasks/:id/edit' component={Views.Form} />
				<Route path='/tasks/:id' component={Views.Task} />
			</Switch>
		</div>
	</main>
);

if (document.getElementById('root')) {
	ReactDOM.render((
		<BrowserRouter>
			<Main />
		</BrowserRouter>
	), document.getElementById('root'));
}