import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppContext from './AppContext';
import firebase from './firebase.js';

/**
 * Format the comments from firebase
 * 
 * @param {object} comments 
 * @return {array}
 */
const formatComments = (comments) => {
	const allComments = [];

	for (let comment in comments) {
		allComments.push({
			id: comment,
			comment: comments[comment].comment,
			name: comments[comment].name
		});
	}

	return allComments;
};

class AppProvider extends Component {
	constructor() {
		super();

		this.state = {
			comments: []
		};
	}

	/**
	 * Add comment to Firebase
	 * 
	 * @param {string} name
	 * @param {string} comment
	 * @return {void}
	 */
	addComment(name, comment) {
		const comments = firebase.database().ref('comments');

		comments.push({ name, comment});
	}

	/**
	 * Remove comment from firebase
	 * 
	 * @param {number} id
	 * @return {void}
	 */
	deleteComment(id) {
		const commentRef = firebase.database().ref(`/comments/${id}`);

		commentRef.remove();
	}
	componentDidMount() {
		const comments = firebase.database().ref('comments');

		comments.on('value', snapshot => {
			const commentsFromFirebase = snapshot.val();
			let allComments = formatComments(commentsFromFirebase);

			this.setState({
				comments: allComments
			});
		});
	}
	render() {
		return (
			<AppContext.Provider
				value={{
					addComment: this.addComment,
					comments: this.state.comments,
					deleteComment: this.deleteComment
				}}>
				{this.props.children}
			</AppContext.Provider>
		);
	}
}

AppProvider.propTypes = {
	children: PropTypes.node
};

export default AppProvider;
