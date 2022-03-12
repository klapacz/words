import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import Root from './Root';
import { GlobalStyle } from './styled';
import { ThemeProvider } from 'styled-components';
import { theme } from './styled/theme';
import env from './env';

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<BrowserRouter basename={env.BASE_URL}>
					<Root />
				</BrowserRouter>
			</Provider>
			<GlobalStyle />
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
