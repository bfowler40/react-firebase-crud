import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import PropTypes from 'prop-types';

import AppContext from './AppContext';
import firebase from './firebase.js';

class AppProvider extends Component {
	constructor() {
		super();

		this.state = {
			comment: '',
			comments: [],
			editorState: EditorState.createEmpty(),
			name: 'Ben'
		};
	}
	componentDidMount() {
		const comments = firebase.database().ref('comments');

		comments.on('value', snapshot => {
			const commentsFromFirebase = snapshot.val();
			let allComments = [];
			
			for (let comment in commentsFromFirebase) {
				allComments.push({
					id: comment,
					comment: commentsFromFirebase[comment].comment,
					name: commentsFromFirebase[comment].name
				});
			}
			this.setState({
				comments: allComments
			});
		});
	}
	render() {
		return (
			<AppContext.Provider value={ this.state }>
				{this.props.children}
			</AppContext.Provider>
		);
	}
}

AppProvider.propTypes = {
	children: PropTypes.node
};

export default AppProvider;
