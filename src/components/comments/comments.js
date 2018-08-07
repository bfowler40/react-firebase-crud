import React, { Component } from 'react';

import AppContext from '../../AppContext';

class Comments extends Component {
	render() {
		const renderComments = (comments, deleteComment) => {
			return comments.map(comment => {
				return (
					<li key={comment.id} className="comment">
						<div className="controls">
							<button
								className="control"
								onClick={() => deleteComment(comment.id)}>
								Delete
							</button>
						</div>
						<h3 className="name">{comment.name} wrote:</h3>
						<div
							className="body"
							dangerouslySetInnerHTML={{
								__html: comment.comment
							}}
						/>
					</li>
				);
			});
		};
		return (
			<AppContext.Consumer>
				{context => (
					<React.Fragment>
						{renderComments(
							context.comments,
							context.deleteComment
						)}
					</React.Fragment>
				)}
			</AppContext.Consumer>
		);
	}
}

export default Comments;
