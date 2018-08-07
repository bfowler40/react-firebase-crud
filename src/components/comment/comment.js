import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import AppContext from '../../AppContext';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class Comments extends Component {
	constructor() {
		super();

		this.state = {
			comment: '',
			name: '',
			editorState: EditorState.createEmpty()
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onEditorStateChange = this.onEditorStateChange.bind(this);
	}

	/**
	 * Handle change on input field
	 * Update component state when user updates field
	 *
	 * @param {Event} e
	 * @return {void}
	 */
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	/**
	 * On Editor State Change
	 * When user enters a value to the editor
	 *
	 * @param {object} editorState
	 * @return {void}
	 */
	onEditorStateChange(editorState) {
		const comment = draftToHtml(
			convertToRaw(editorState.getCurrentContent())
		);

		this.setState({
			comment,
			editorState
		});
	}

	/**
	 * Handle user submitting the form
	 * Add a comment to firebase through a method on the Provider
	 *
	 * @param {function} addComment
	 */
	handleSubmit(addComment) {
		return e => {
			e.preventDefault();
			if (this.state.name !== '' || this.state.comment !== '') {
				addComment(this.state.name, this.state.comment);

				this.setState({
					comment: '',
					editorState: EditorState.createEmpty(),
					name: ''
				});
			}
		};
	}

	render() {
		return (
			<AppContext.Consumer>
				{context => (
					<React.Fragment>
						<form onSubmit={this.handleSubmit(context.addComment)}>
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
							<button className="button">Add comment</button>
						</form>
					</React.Fragment>
				)}
			</AppContext.Consumer>
		);
	}
}

export default Comments;
