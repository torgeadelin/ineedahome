import React from "react"
import Styled from "styled-components"

const InsertNewPropertyWrapper = Styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #F2F2F2;
    padding: 10px;
    border-radius: 10px;
`

const TextField = Styled.input`
    background-color: #D0D0D0;
    padding: 10px 30px;
    border-radius: 10px;
    border: none;
    margin: 0;
`

const Label = Styled.p`
    margin: 0;
    padding: 0;
    font-size: 0.8em;
    font-weight: bold;
    color: #656565;
    margin-bottom: 4px;
`

const ButtonWrapper = Styled.div`
    display: flex;
    align-content: center;
    align-items: center;
	padding: 10px 30px;
	color: white;
	background-color: black;
    border-radius: 10px;
    cursor: pointer;
`

const Button = (props) => {
	return <ButtonWrapper {...props}>{props.text}</ButtonWrapper>
}

const PropertyRowWrapper = Styled.div`
	display: flex;
	justify-content: flex-start;
	padding: 20px;
	border-bottom: 1px solid gray;

	div {
        margin-right: 50px;
        
        p {
            margin: 0;
            margin-top: 10px;
        }
	}
`

export {
	InsertNewPropertyWrapper,
	TextField,
	Label,
	Button,
	PropertyRowWrapper,
}
