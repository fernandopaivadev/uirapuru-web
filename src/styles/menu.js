import styled from 'styled-components'

const main = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`
const title = styled.p`
    font-size: 2.4rem;
    font-weight: 600;
    color: var(--primary-color);
    margin: 1.5rem 1.5rem 0.5rem 1.5rem;
    height: 3.5rem;
`

const itemName = styled.p`
    color: var(--primary-font-color);
    font-size: 2rem;
    font-weight: 600;
    padding: 1.5rem 1.5rem 1.5rem 3rem;
    border-radius: 0.5rem;

    &:hover {
        background: var(--hovered-color);
        cursor: pointer;
    }

    &:hover::after {
        opacity: 1;
        transition: all 0.3s ease;
        pointer-events: all;
    }

    &::after {
        opacity: 0;
        pointer-event: none;
        content: attr(aria-label);
        color: var(--background-color);
        background: var(--primary-font-color);
        font-weight: 600;
        font-size: 1.4rem;
        border-radius: 0.5rem;
        padding: 0.5rem;
        z-index: 1;
        position: absolute;
        left: 22rem;
    }
`

const subItemName = styled.p`
    color: var(--neutral-color);
    font-size: 1.8rem;
    font-weight: 600;
    padding: 1rem 3rem 1rem 5rem;
    border-radius: 0.5rem;
    
    &:hover {
        background: var(--hovered-color);
        cursor: pointer;
    }

    &:hover::after {
        opacity: 1;
        transition: all 0.3s ease;
        pointer-events: all;
    }

    &::after {
        opacity: 0;
        pointer-event: none;
        content: attr(aria-label);
        color: var(--background-color);
        background: var(--primary-font-color);
        font-weight: 600;
        font-size: 1.4rem;
        border-radius: 0.5rem;
        padding: 0.5rem;
        z-index: 1;
        position: absolute;
        left: 22rem;
    }
`

export default {
    main,
    title,
    itemName,
    subItemName
}
