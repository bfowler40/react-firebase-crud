import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import './App.css';
import firebase from './firebase.js';
/**
 * Wysiwyg
 * https://jpuri.github.io/react-draft-wysiwyg/#/docs?_k=jjqinp
 */

// import htmlToDraft from 'html-to-draftjs';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class App extends Component {
	constructor() {
		super();

		this.state = {
			comment: '',
			comments: [],
			editorState: EditorState.createEmpty(),
			name: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onEditorStateChange = this.onEditorStateChange.bind(this);
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
	deleteComment(id) {
		const commentRef = firebase.database().ref(`/comments/${id}`);

		commentRef.remove();
	}
	handleChange(e) {
		console.log(e.target.name, e.target.value);
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	handleSubmit(e) {
		e.preventDefault();
		if (this.state.name === '' || this.state.comment === '') {
			alert('Name or Comment cannot be empty');
			return;
		}
		const comments = firebase.database().ref('comments');
		const comment = {
			name: this.state.name,
			comment: this.state.comment
		};
		comments.push(comment);
		this.setState({
			comment: '',
			editorState: EditorState.createEmpty(),
			name: ''
		});
	}
	onEditorStateChange(editorState) {
		const comment = draftToHtml(
			convertToRaw(editorState.getCurrentContent())
		);

		this.setState({
			comment,
			editorState
		});
	}
	render() {
		return (
			<div className="container">
				<h1 className="heading">
					<span role="img">👩‍💻</span>
				</h1>
				<ul className="comments">
					{this.state.comments.length > 0
						? this.state.comments.map(comment => {
							return (
								<li key={comment.id} className="comment">
									<div className="controls">
										<button
											className="control"
											onClick={() =>
												this.deleteComment(
													comment.id
												)
											}>
											Delete
										</button>
									</div>
									<h3 className="name">
										{comment.name} wrote:
									</h3>
									<div
										className="body"
										dangerouslySetInnerHTML={{
											__html: comment.comment
										}}
									/>
								</li>
							);
						})
						: 'Loading ...'}
				</ul>
				<h2 className="title">Leave a comment:</h2>
				<form className="form" onSubmit={this.handleSubmit}>
					<input
						type="text"
						name="name"
						className="input"
						autoComplete="off"
						placeholder="What is your name: "
						onChange={this.handleChange}
						value={this.state.name}
					/>
					<Editor
						editorState={this.state.editorState}
						editorClassName="editor"
						onEditorStateChange={this.onEditorStateChange}
						toolbarClassName="toolbar"
						wrapperClassName="wrapper"
						placeholder="Leave your comment..."
					/>
					<textarea
						className="preview"
						disabled
						value={draftToHtml(
							convertToRaw(
								this.state.editorState.getCurrentContent()
							)
						)}
					/>
					<button className="button">Add comment</button>
				</form>
			</div>
		);
	}
}

export default App;
