import styled from 'styled-components'

const main = styled.div`
    display: grid;
    grid-template-columns: 12% 88%;
    justify-items: center;
    width: 100vw;
    height: 100vh;
    position: fixed;
    background: var(--background-color);
`

const contentContainer = styled.div`
    display: grid;
    grid-template-rows: 10% 80% 10%;
    width: 100%;
    height: 95.5%;
`

const datePicker = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    grid-row: 1/2;

    .icon {
        font-size: 3.5rem;
        color: var(--secondary-font-color);
        border-radius: 50%;
        padding: 0.5rem;
        margin: 0.5rem;
        background: var(--primary-color);
        cursor: pointer;
        &:hover {
            background: var(--primary-light-color);
        }
    }

    input {
        width: 20rem;
        padding: 0.3rem;
        margin: 0 0 0 1rem;
        border: 1px solid var(--primary-color);
        border-radius: 0.3rem;
        font-size: 2rem;
        font-weight: 500;
        background: var(--background-color);
        color: var(--primary-font-color);
    }
`
const chartContainer = styled.div`
    width: 100%;
    height: 100%;
    grid-row: 2/3;
`

const empty = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    grid-row: 2/3;

    p {
        color: var(--neutral-color);
        font-size: 2rem;
        font-weight: 600;
    }
`

const error = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    grid-row: 2/3;

    p {
        color: var(--error-color);
        font-size: 2rem;
        font-weight: 600;
    }
`

const loading = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    grid-row: 2/3;
`

const buttons = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 0;
    grid-row: 3/4;
`

export default {
    main,
    contentContainer,
    datePicker,
    chartContainer,
    empty,
    error,
    loading,
    buttons
}
