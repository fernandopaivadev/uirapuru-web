import styled from 'styled-components'

const main = styled.div`
    display: grid;
    grid-template-columns: 12% 33% 33% 22%;
    width: 100vw;
    height: 100vh;
    background: var(--background-color);
    position: fixed;
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
    empty,
    navButtons
}
