import styled from 'styled-components'

const main = styled.ul`
    width: 100vw;
    height: 5rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    overflow: hidden;
    background: var(--secondary-color);
`
const logo = styled.li`
    display: flex;
    align-items: center;
    margin: 0 auto 0 0;
    width: 18rem;
    justify-content: space-around;
    cursor: pointer;

    img {
        width: 4.5rem;
    }

    p {
        color: var(--secondary-font-color);
        font-size: 2rem;
        font-weight: 600;
        letter-spacing: 0.3rem;
    }
`

const navigation = styled.li`
    display: flex;
    align-items: center;
    margin: 0 0 0 auto;
`

const toggle = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid var(--secondary-font-color);
    border-radius: 1rem;
    padding: 0 0.5rem 0 0.5rem;
    margin: 1rem;
    cursor: pointer;
    color: var(--secondary-font-color);
    transition: all 0.2s ease;
    &:hover {
        background: var(--secondary-font-color);
        color: var(--secondary-color);
    }

    P {
        font-size: 1.8rem;
        font-weight: 600;
        margin: 0.7rem;
    }

    .icon {
        font-size: 3rem;
        cursor: pointer;
    }
`

const username = styled.p`
    color: var(--secondary-font-color);
    font-size: 2rem;
    font-weight: 600;
    margin: 1rem;
`

const avatar = styled.button`
    background: var(--primary-color);
    border-radius: 50%;
    border: none;
    font-weight: 600;
    color: var(--secondary-font-color);
    margin: 0 1rem 0 0;
    width: 4rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
        background-color: var(--primary-light-color);
    }
`

const profileMenu = styled.ul`
    position: absolute;
    bottom: 100;
    transform: translate(-0.5rem, 20%);
    right: 0;
    margin: 10rem 0 0 0;
    background: var(--background-color);
    border-radius: 0.5rem;
    border: 1px solid var(--primary-color);
    visibility: hidden;
    opacity: 0;
    transition: all 0.2s ease;
    z-index: 1;
    ${avatar}:focus + & {
        visibility: visible;
        opacity: 1;
    }
`

const userInfo = styled.div`
    display: flex;
    align-items: center;
    margin: 0.5rem 1.5rem 0.5rem 1.5rem;
`
const textInfo = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1rem;
    font-weight: 300;

    h1 {
        font-size: 2rem;
        color: var(--primary-font-color);
    }

    h2 {
        font-size: 1.6rem;
        color: var(--neutral-color);
    }
`

const item = styled.li`
    margin: 0.5rem;
    color: var(--primary-font-color);
    display: flex;
    align-items: center;
    font-size: 2rem;
    font-weight: 600;
    cursor: pointer;
    border-radius: 0.5rem;
    transition: all 0.2s ease;

    .icon {
        margin: 1rem;
        font-size: 2.4rem;
        color: var(--primary-color);
        &:hover {
            background: var(--hovered-color);
        }
    }
`

export default {
    main,
    logo,
    navigation,
    toggle,
    username,
    profileMenu,
    userInfo,
    avatar,
    textInfo,
    item
}
