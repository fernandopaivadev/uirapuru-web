import styled from 'styled-components'

const main = styled.div`
    display: grid;
    grid-template-columns: 12% 33% 33% 22%;
    width: 100vw;
    height: 100vh;
    background: var(--background-color);
    position: fixed;
`

const form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: fit-content;
    margin: 1rem 2rem 3rem 2rem;

    input {
        padding: 0.5rem;
        border: 0.2rem solid var(--primary-color);
        border-radius: 0.3rem;
        font-size: 1.8rem;
        margin: 0.2rem 0 3rem 0;
        color: var(--primary-font-color);
        width: 85%;
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

const buttons = styled.div`
    display: flex;
`

const empty = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    font-size: 3rem;
    font-weight: 600;
    color: var(--neutral-color);

    p {
        text-align: center;
    }
`

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
    min-height: 15rem;
    align-items: center;
    justify-content: center;
`

const title = styled.p`
    font-size: 2.4rem;
    font-weight: 600;
    color: var(--primary-color);
    margin: 1rem;
`

const devicesForm = styled(form)`
    width: 90%;
    padding: 1rem;
    border: 1px solid var(--primary-color);
    border-radius: 0.3rem;

    input {
        margin: 1rem;
        width: 90%;
    }

    label {
        margin: 1rem 1rem 0 1rem;
        width: 90%;
    }
    
    .error-message {
        margin: 0 auto 0rem auto;
    }
`

const navButtons = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 0;
    left: 50vw;
    transform: translateX(-50%);
`

export default {
    main,
    form,
    buttons,
    empty,
    devicesList,
    header,
    title,
    devicesForm,
    navButtons
}
