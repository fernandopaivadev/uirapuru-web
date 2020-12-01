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
    padding: 2rem;
    border-radius: 0.5rem;
    background: var(--background-color);
`

const form = styled.form`
    display: flex;
    flex-direction: column;
    padding: 2rem 2rem 0 2rem;
    align-items: center;

    label {
        font-size: 1.6rem;
        font-weight: 600;
        color: var(--neutral-color);
    }

    input {
        width: 90%;
        padding: 0.5rem;
        border: 0.2rem solid var(--primary-color);
        border-radius: 0.3rem;
        font-size: 1.8rem;
        margin: 0.2rem 0 3rem 0;
        color: var(--primary-font-color);
        background: var(--background-color);
        &:hover {
            background: var(--hovered-color);
        }
        &:focus {
            background: var(--hovered-color);
        }
    }

    .error-message {
        color: var(--error-color);
        font-size: 1.4rem;
        font-weight: 600;
        margin: -2rem auto 2rem auto;
        display: none;
    }

    .error {
        font-size: 2rem;
        font-weight: 600;
        color: var(--error-color);
        margin: 2rem 0 2rem 0;
    }
`

const title = styled.h1`
    color: var(--primary-color);
    font-size: 2.4rem;
    margin: 0 0 2.5rem 0;
`

const buttons = styled.div`
    display: flex;
`
export default {
    main,
    window,
    form,
    title,
    buttons
}
