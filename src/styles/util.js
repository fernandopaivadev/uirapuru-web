import styled, { keyframes } from 'styled-components'

const classicButton = styled.button`
    min-width: 10rem;
    height: 4rem;
    font-size: 2rem;
    font-weight: 600;
    border-radius: 0.3rem;
    border: none;
    background: var(--primary-color);
    color: var(--secondary-font-color);
    margin: 1.8rem;
    padding: 0 1.5rem 0 1.5rem;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        background: var(--primary-light-color);
    }
`

const criticalButton = styled(classicButton)`
    background: var(--error-color);
    &:hover {
        background: var(--error-light-color);
    }
`

const circularAnimation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    12.5% {
        transform: rotate(180deg);
        animation-timing-function: linear;
    }
    25% {
        transform: rotate(630deg);
    }
    37.5% {
        transform: rotate(810deg);
        animation-timing-function: linear;
    }
    50% {
        transform: rotate(1260deg);
    }
    62.5% {
        transform: rotate(1440deg);
        animation-timing-function: linear;
    }
    75% {
        transform: rotate(1890deg);
    }
    87.5% {
        transform: rotate(2070deg);
        animation-timing-function: linear;
    }
    100% {
        transform: rotate(2520deg);
    }
`

const pseudoAnimation = keyframes`
    0% {
        transform: rotate(-30deg);
    }
    29.4% {
        border-left-color: transparent;
    }
    29.41% {
        border-left-color: currentColor;
    }
    64.7% {
        border-bottom-color: transparent;
    }
    64.71% {
        border-bottom-color: currentColor;
    }
    100% {
        border-left-color: currentColor;
        border-bottom-color: currentColor;
        transform: rotate(225deg);
    }
`

const circularProgress = styled.progress`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    box-sizing: border-box;
    border: none;
    border-radius: 50%;
    padding: 0.25em;
    width: 3em;
    height: 3em;
    color: var(--primary-color);
    background-color: transparent;
    font-size: 1.5rem;
    overflow: hidden;

    &::-webkit-progress-bar {
        background-color: transparent;
    }

    &:indeterminate {
        -webkit-mask-image: linear-gradient(transparent 50%, black 50%),
            linear-gradient(to right, transparent 50%, black 50%);
        mask-image: linear-gradient(transparent 50%, black 50%),
            linear-gradient(to right, transparent 50%, black 50%);
        animation: ${circularAnimation} 6s infinite
            cubic-bezier(0.3, 0.6, 1, 1);
    }

    &:indeterminate::before,
    &:indeterminate::-webkit-progress-value {
        content: "";
        display: block;
        box-sizing: border-box;
        margin-bottom: 0.25em;
        border: solid 0.25em transparent;
        border-top-color: currentColor;
        border-radius: 50%;
        width: 100% !important;
        height: 100%;
        background-color: transparent;
        animation: ${pseudoAnimation} 0.75s infinite linear
            alternate;
    }

    &:indeterminate::-moz-progress-bar {
        box-sizing: border-box;
        border: solid 0.25em transparent;
        border-top-color: currentColor;
        border-radius: 50%;
        width: 100%;
        height: 100%;
        background-color: transparent;
        animation: ${pseudoAnimation} 0.75s infinite linear
            alternate;
    }

    &:indeterminate::-ms-fill {
        animation-name: -ms-ring;
    }
`

export default {
    classicButton,
    criticalButton,
    circularProgress
}
