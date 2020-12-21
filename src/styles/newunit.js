import styled from 'styled-components'

const main = styled.div`
    background: var(--background-color);
    width: 100vw;
    height: 100vh;
    position: fixed;
`

const form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: left;
    margin: 1rem 2rem 3rem 2rem;
    height: 90vh;

    label {
        font-size: 1.8rem;
        font-weight: 600;
        color: var(--neutral-color);
        width: 40%;
        background: var(--background-color);
    }

    input {
        padding: 0.5rem;
        border: 0.2rem solid var(--primary-color);
        border-radius: 0.3rem;
        font-size: 1.8rem;
        margin: 0.2rem 0 4rem 0;
        color: var(--primary-font-color);
        background: var(--background-color);
        width: 40%;
        overflow: hidden;
    }

    .error-message {
        color: var(--error-color);
        font-size: 1.4rem;
        font-weight: 600;
        margin: -2.5rem auto 1.5rem auto;
        display: none;
    }

    .error {
        font-size: 2rem;
        font-weight: 600;
        color: var(--error-color);
    }
`

const title = styled.h1`
    color: var(--primary-color);
    font-size: 2.4rem;
    margin: 1.5rem 0 2rem 0;
`

const loading = styled.div`
    width: 5.5rem;
    height: 5.5rem;
    margin: 0 auto 0 auto;
`

const buttons = styled.div`
    display: flex;
    align-items: center;
`

export default {
    main,
    form,
    title,
    loading,
    buttons
}
