import React from 'react'
import { ModalProps, ModalOverlay, Container, CloseDiv, ChildContainer, SuperContainer } from './styles'

const Modal = (props: ModalProps): JSX.Element =>  {
    return(<ModalOverlay show={props.show}>  <SuperContainer><Container >
        <CloseDiv onClick={() => { props.doShow(false) }}>x</CloseDiv>
        <ChildContainer>
         {props.children} </ChildContainer> </Container> </SuperContainer> </ModalOverlay>)
}

export default Modal;