import styled from 'styled-components'

const main = styled.div`
    display: flex;
    justify-content: center;
`

const chart = styled.div`
    width: 92%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 0.2rem solid var(--primary-color);
    border-radius: 0.5rem;
    margin: 1rem;
    
    canvas {
        padding: 0 2rem 1rem 2rem;
    }
`

const title = styled.p`
    font-size: 2rem;
    font-weight: 600;
    color: var(--primary-color);
    margin: 1.5rem;
`

const error = styled.div`
    width: 100%;
    min-height: 40rem;
    display: flex;
    align-items: center;
    justify-content: center;

    p {
        color: var(--error-color);
        font-size: 2rem;
        font-weight: 600;
    }
`

export default {
    main,
    chart,
    title,
    error
}
