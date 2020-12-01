import styled from 'styled-components'

const main = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    background: linear-gradient(#3339, #3339);
    z-index: 1;
`

const window = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem 2rem 1rem 2rem;
    border-radius: 0.5rem;
    background: var(--background-color);

    p {
        font-size: 2rem;
        font-weight: 600;
        color: var(--neutral-color);
        margin: 1rem;
    }

    div {
        display: flex;
    }
`

export default {
    main,
    window
}
