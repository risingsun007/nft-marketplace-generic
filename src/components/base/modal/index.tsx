import React from 'react'
import { ModalProps, ModalOverlay, Container, CloseDiv, ChildContainer } from './styles'

const Modal = (props: ModalProps): JSX.Element =>  {
    return(<ModalOverlay show={props.show}>  <Container >
        <CloseDiv onClick={() => { props.doShow(false) }}>x</CloseDiv>
        <ChildContainer>
         {props.children} </ChildContainer> </Container> </ModalOverlay>)
}

export default Modal;