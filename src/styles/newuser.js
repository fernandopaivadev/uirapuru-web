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
    height: 120%;

    * {
        overflow: hidden;
    }

    label {
        font-size: 1.8rem;
        font-weight: 600;
        color: var(--neutral-color);
        width: 40%;
        background: var(--background-color);
    }

    input, textarea, select {
        padding: 0.5rem;
        border: 0.2rem solid var(--primary-color);
        border-radius: 0.3rem;
        font-size: 1.8rem;
        margin: 0.2rem 0 2.5rem 0;
        color: var(--primary-font-color);
        background: var(--background-color);
        width: 40%;
        resize: vertical;
    }

    textarea {
        height: 12rem;
    }

    .error-message {
        color: var(--error-color);
        font-size: 1.4rem;
        font-weight: 600;
        margin: -2rem auto 1rem auto;
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

const checkbox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40rem;
    height: 1.8rem;
    
    input {
        margin: 1rem;
        width: 1.8rem;
        height: 10rem;
    }

    label {
        font-size: 2rem;
    }
`

const buttons = styled.button`
    display: flex;
    align-items: center;
    border: none;
    background: var(--background-color);
`

const loading = styled.div`
    width: 5.5rem;
    height: 5.5rem;
    margin: 0 auto 0 auto;
`

const dialog = styled.div`
    width: 40rem;
    height: 30rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--background-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
`

export default {
    main,
    form,
    title,
    checkbox,
    buttons,
    loading,
    dialog
}
