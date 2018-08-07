import React, { Component } from 'react';
import { Container, Header } from './style.js';
import Comments from '../comments/comments';
import Comment from '../comment/comment';

class Commenter extends Component {
	render() {
		return (
			<Container>
				<Header>
					<span role="img" aria-label="Emoji Lady at Computer">👩‍💻</span>
				</Header>
				<Comments></Comments>
				<Comment></Comment>
			</Container>
		);
	}
}

export default Commenter;
