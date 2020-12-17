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
    grid-template-columns: repeat(4, 1fr);
    width: 99%;
    min-height: 10%;
    margin: 1rem;
    border: 0.2rem solid var(--primary-color);
    border-radius: 0.5rem;
    overflow: hidden;
`

const deviceIcon = styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 1rem;
    cursor: pointer;
    text-align: center;
    transition: all 0.2s ease;
    border-radius: 0.5rem;
    position: relative;

    &:hover {
        background: var(--hovered-color);
        border-radius: 0.5rem;
    }

    &:hover::after {
        opacity: 1;
        transition: all 0.3s ease;
        pointer-events: all;
    }

    &::after {
        opacity: 0;
        pointer-events: none;
        content: attr(aria-label);
        color: var(--background-color);
        background: var(--primary-font-color);
        font-weight: 600;
        font-size: 1.4rem;
        border-radius: 0.5rem;
        padding: 0.5rem;
        z-index: 1;
        position: absolute;
        top: 5%;
    }

    .panel-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 7rem;
        color: var(--primary-color);
    }

    .device-name {
        margin: 0.8rem;
        font-size: 2rem;
        font-weight: 600;
        color: var(--neutral-color);
    }

    .real-time {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }

    .real-time li {
        padding: 0.3rem;
        border-radius: 0.5rem;
        border: 0.2rem solid var(--primary-color);
        margin: 0.2rem;
    }

    .real-time li p {
        font-size: 1.3rem;
        font-weight: 600;
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
    deviceIcon,
    charts,
    empty,
    error,
    loading
}
