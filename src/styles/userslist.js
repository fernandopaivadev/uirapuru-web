import styled from 'styled-components'

const main = styled.div`
    display: grid;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    align-content: center;
    justify-content: center;
`

const container = styled.div`
    background: var(--background-color);
    min-width: 40rem;
    min-height: 18rem;
    border-radius: 0.5rem;
`
const title = styled.p`
    color: var(--primary-color);
    font-size: 2.4rem;
    margin: 2rem auto 0 auto;
    font-weight: 600;
    text-align: center;
`

const header = styled.div`
    display: flex;
    justify-content: center;
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

const item = styled.li`
    color: var(--secondary-font-color);
    margin: 2rem 2rem 2rem 0rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    border-radius: 0.5rem;
    width: 100%;

    &:hover {
        background: var(--hovered-color);
    }
`
const avatar = styled.button`
    border: none;
    border-radius: 50%;
    margin: 1rem;
    background: var(--primary-color);
    width: 4rem;
    height: 4rem;
    font-size: 2rem;
    font-weight: 600;
    color: var(--secondary-font-color);
`

const username = styled.p`
    color: var(--primary-font-color);
    font-size: 2rem;
    font-weight: 600;
`

const email = styled.p`
    color: var(--neutral-color);
    font-size: 1.8rem;
    font-weight: 600;
`

const loading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    top: 50%;
    left: 50%;
    position: fixed;
    transform: translate(-50%, -50%);
`

export default {
    main,
    container,
    title,
    header,
    empty,
    item,
    avatar,
    username,
    email,
    loading
}
