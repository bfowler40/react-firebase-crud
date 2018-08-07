import React, { Component } from 'react';
import AppContext from '../../AppContext';
import { Comment, Controls, Button, Name, Body } from './comments.style';

class Comments extends Component {
	render() {
		const renderComments = (comments, deleteComment) => {
			return comments.map(comment => {
				return (
					<Comment key={comment.id}>
						<Controls>
							<Button onClick={() => deleteComment(comment.id)}>
								Delete
							</Button>
						</Controls>
						<Name>{comment.name} wrote:</Name>
						<Body
							dangerouslySetInnerHTML={{
								__html: comment.comment
							}}
						/>
					</Comment>
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
