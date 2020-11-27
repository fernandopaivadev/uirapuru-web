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
    border: 1px solid var(--primary-color);
    border-radius: 0.5rem;
    margin: 1rem;
    
    canvas {
        padding: 0 2rem 1rem 2rem;
    }
`

const realTime = styled.ul`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    padding: 1rem;
    width: 100%;
    justify-items: center;
    align-items: center;

    li {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid var(--primary-color);
        border-radius: 0.5rem;
        margin: 1rem;
        width: 90%;
        height: 90%;
        cursor: pointer;

        &:hover {
            background: var(--background-color);
        }
        
        p {
            font-size: 1.8rem;
            font-weight: 600;
            color: var(--primary-color);
        }
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
    realTime,
    title,
    error
}
