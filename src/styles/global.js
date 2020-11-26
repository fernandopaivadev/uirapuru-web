import styled from 'styled-components'

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

export default {
    classicButton,
}
