import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import Root from './Root';
import env from './env';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter basename={env.BASE_URL}>
				<Root />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
