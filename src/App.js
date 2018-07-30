import React, { Component } from 'react';

// import { EditorState } from 'draft-js';
// import PropTypes from 'prop-types';
// import { Editor } from 'react-draft-wysiwyg';
// import { EditorState, convertToRaw } from 'draft-js';
// import draftToHtml from 'draftjs-to-html';


// import firebase from './firebase.js';
// import htmlToDraft from 'html-to-draftjs';
// import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import AppProvider from './AppProvider';
import Commenter from './components/commenter/commenter';

// class Person extends Component {
// 	render() {
// 		return(
// 			<AppContext.Consumer>
// 				{(context) => (
// 					<React.Fragment>
// 						Name: { context.name }
// 					</React.Fragment>
// 				)}
// 			</AppContext.Consumer>
// 		);
// 	}
// }

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