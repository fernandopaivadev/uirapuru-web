import styled from 'styled-components'

const main = styled.div`
    display: grid;
    grid-template-columns: 12% 56% 32%;
    width: 100vw;
    height: 100vh;
    background: var(--background-color);
    position: fixed;
`

const container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    grid-column: 2/3;
`

const devices = styled.ul`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
    width: 99%;
    margin: 1rem;
    border: 1px solid var(--primary-color);
    border-radius: 0.5rem;
    overflow: hidden;

    li {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        padding: 2rem;
        cursor: pointer;
        text-align: center;
        transition: all 0.2s ease;
        border-radius: 0.5rem;
        &:hover {
            background: var(--hovered-color);
            border-radius: 0.5rem;
        }
    }

    li .panel-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 7rem;
        color: var(--primary-color);
    }

    li p {
        margin: 0 0.8rem 0 0.8rem;
        font-size: 2rem;
        font-weight: 600;
        color: var(--neutral-color);
    }
`

const charts = styled.div`
    grid-column: 3/4;
    display: flex;
    flex-direction: column;
    height: 95.5%;
`

const empty = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

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
`

export default {
    main,
    container,
    devices,
    charts,
    empty,
    error,
    loading
}
