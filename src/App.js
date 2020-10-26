import React from 'react';
import {ThemeProvider, createMuiTheme} from '@material-ui/core';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import HomePage from './pages/Home';
import { Header } from './components';
import './App.css';

const theme = createMuiTheme({
	typography: {
        fontFamily: [
                'Nunito',
                'Roboto',
            ].join(','),
        },
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<div className="app-container">
					<Route path="/" component={Header} />
					<div className="route-container">
						<div className="route-switch-container">
							<Switch>
								<Route path="/" exact component={HomePage} />								
								<Route component={HomePage}>
									<Redirect to="/" />
								</Route>
							</Switch>
						</div>
					</div>
				</div>
			</BrowserRouter>
		</ThemeProvider>
	)
}

export default App;
