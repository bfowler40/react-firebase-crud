import styled from 'styled-components';
import style from '../../style';

export const Comment = styled.div`
	position: relative;
	background: #ffffff;
	padding: 20px;
	margin: 10px auto;
`;

export const Controls = styled.div`
	position: absolute;
	top: 8px;
	right: 8px;
	text-align: right;
`;

export const Button = styled.button`
	background: transparent;
	border: none;
	line-height: 1.6;
	font-family: ${style.fontPrimary};
	font-size: 12px;
	color: ${style.colorPrimary}
	cursor: pointer;

	&:hover {
		text-decoration: underline
	}
`;

export const Name = styled.h3`
	font-family: ${style.fontSecondary};
	font-size: 20px;
	color: ${style.colorPrimary}
	margin: 0 0 10px;
`;

export const Body = styled.div`
	h1, h2, h3, h4, h5 {
		font-family: ${style.fontSecondary};
		font-weight: bold;
		margin: 20px 0;
	}
	h1 { font-size: 40px; }
	h2 { font-size: 36px; }
	h3 { font-size: 32px; }
	h4 { font-size: 28px; }
	h5 { font-size: 24px; }
`;