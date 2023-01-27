import React from 'react'
import styled from 'styled-components'

export interface ModalProps{
    show: boolean;
    children: React.ReactNode;
    onClick?: () => void;
    doShow: (x: boolean) => void;
}

export interface ModalOverlayProps{
    show: boolean;
}

export const ModalOverlay = styled.div<ModalOverlayProps>`
    display: ${({show}) => (show ? 'block' : 'none')};      
    z-index: 2222;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(200, 200, 200,0.2);
`;

export const Container = styled.div`
    z-index: 222233;
    position: absolute;
    background: rgb(10,10,10);
    width: 33%;
    height: 33%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    padding: 0.75rem;
    border-size: 2px;
    border-color: grey;
    color: rgba(0,0,0, 0);
`;

interface CloseDivProps {
    onClick: () => void;
}

export const CloseDiv = styled.div<CloseDivProps>`
font-size: 20px;
cursor: pointer;
outline: 0;
text-align: left;
height: 40px;
grid-column: 1 / span 4;
grid-row: 1;
color: white
`

export const ChildContainer = styled.div`
position: absolute;
text-alight: left;
color: white;
font-size: 20px;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
`



