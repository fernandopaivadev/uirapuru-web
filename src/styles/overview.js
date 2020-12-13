import styled from 'styled-components'

const main = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-auto-flow: column;
    width: 99%;
    min-height: 15rem;
    padding: 1rem;
    grid-column: 2/3;
    margin: 1rem;
    border: 1px solid var(--primary-color);
    border-radius: 0.5rem;
`

const value = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    .icon {
        margin-right: 0.5rem;
        font-size: 2.4rem;
        color: var(--primary-color);
    }

    .text {
        margin: 0 0.8rem 0 0.8rem;
        font-size: 1.6rem;
        font-weight: 500;
        color: var(--neutral-color);
    }

    .payload {
        font-size: 1.6rem;
        font-weight: 600;
        color: var(--primary-font-color);
    }
`

export default {
    main,
    value
}
