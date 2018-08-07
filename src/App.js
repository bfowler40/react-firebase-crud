import React, { Component } from 'react';
import AppProvider from './AppProvider';
import Commenter from './components/commenter/commenter';

class App extends Component {
	render() {
		return(
			<AppProvider>
				<Commenter></Commenter>
			</AppProvider>
		);
	}
}

export default App;
