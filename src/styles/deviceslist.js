import styled from 'styled-components'

const devicesList = styled.div`
    grid-column: 4/5;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 95.5%;
    padding: 1rem;
`

const header = styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;
    min-height: 13rem;
    align-items: center;
    justify-content: center;
`

const ul = styled.ul``

const title = styled.p`
    font-size: 2.4rem;
    font-weight: 600;
    color: var(--primary-color);
    margin: 1rem;
`

const deviceForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: fit-content;
    margin: 1rem 2rem 0 2rem;
    padding: 1rem;
    width: 90%;
    border: 0.2rem solid var(--primary-color);
    border-radius: 0.3rem;

    input {
        padding: 0.5rem;
        border: 0.2rem solid var(--primary-color);
        border-radius: 0.3rem;
        font-size: 1.8rem;
        margin: 1rem;
        color: var(--primary-font-color);
        width: 90%;
        background: var(--background-color);
        transition: all 0.2s ease;
        
        &:hover {
            background: var(--hovered-color);
        }
        
        &:focus {
            background: var(--hovered-color);
        }
    }

    label {
        background: var(--background-color);
        font-size: 1.6rem;
        font-weight: 600;
        color: var(--neutral-color);
        width: 90%;
        margin: 1rem 1rem 0 1rem;
        transition: all 0.2s ease;
    }
    
    .error-message {
        color: var(--error-color);
        font-size: 1.4rem;
        font-weight: 600;
        margin: 0rem auto 0rem auto;
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

const buttons = styled.div`
    display: flex;
`

export default {
    devicesList,
    header,
    ul,
    title,
    deviceForm,
    buttons
}
