import styled from 'styled-components'

const form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: fit-content;
    margin: 1rem 2rem 0 2rem;
    width: 100%;

    input, textarea {
        padding: 0.5rem;
        border: 0.2rem solid var(--primary-color);
        border-radius: 0.3rem;
        font-size: 1.8rem;
        margin: 0.2rem 0 3rem 0;
        color: var(--primary-font-color);
        width: 85%;
        background: var(--background-color);
        transition: all 0.2s ease;
        resize: vertical;
        overflow: hidden;
        &:hover {
            background: var(--hovered-color);
        }

        &:focus {
            background: var(--hovered-color);
        }
    }

    textarea {
        height: 10rem;
    }

    label {
        font-size: 1.6rem;
        font-weight: 600;
        color: var(--neutral-color);
        width: 85%;
        background: var(--background-color);
        transition: all 0.2s ease;
    }

    .error-message {
        color: var(--error-color);
        font-size: 1.4rem;
        font-weight: 600;
        margin: -2rem auto 0rem auto;
        display: none;
    }

    .success {
        font-size: 2rem;
        font-weight: 600;
        color: var(--primary-color);
    }

    .error {
        font-size: 2rem;
        font-weight: 600;
        color: var(--error-color);
    }
`

const title = styled.p`
    font-size: 2.4rem;
    font-weight: 600;
    color: var(--primary-color);
    margin: 1rem;
`

export default {
    form,
    title
}
