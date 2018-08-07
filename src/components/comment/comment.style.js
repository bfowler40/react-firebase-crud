import styled from 'styled-components';
import style from '../../style';

export const Title = styled.h2`
	font-family: ${style.fontSecondary};
	font-size: 32px;
	margin: 64px 0 0;
	color: ${style.colorPrimary};
`;

export const Form = styled.form`
	.editor {
		background: #ffffff;
		min-height: 220px;
		border: 1px solid #f4f4f4;
		padding: 0 20px;
	}
`;

export const Input = styled.input`
	line-height: 1.6;
	font-family: ${style.fontPrimary};
	font-size: 16px;
	border: none;
	padding: 10px 20px;
	margin: 20px 0;
	outline: none;
`;

export const Button = styled.button`
	font-family: ${style.fontSecondary};
	font-size: 20px;
	font-weight: bold;
	text-align: center;
	min-width: 200px;
	padding: 16px;
	background: ${style.colorPrimary};
	color: #ffffff;
	border: 4px solid ${style.colorPrimary};
	margin: 32px 0;
	cursor: pointer;

	&:hover {
		color: ${style.colorPrimary};
		background: transparent;
	}
`;
