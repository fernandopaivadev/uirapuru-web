import styled from 'styled-components'

import storage from '../services/storage'

const admin = storage.read('access-level') === 'admin'

const main = styled.ul`
    width: 100vw;
    height: 5rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    overflow: hidden;
    background: var(--secondary-color);
    position: static;
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
        left: 18rem;
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
    border-radius: 3rem;
    border: 1px solid var(--secondary-font-color);
    padding: 0.2rem 1rem 0.2rem 1rem;
    cursor: pointer;
    color: var(--secondary-font-color);
    transition: all 0.2s ease;

    &:hover {
        background: var(--secondary-font-color);
        color: var(--secondary-color);
    }

    p {
        font-size: 1.8rem;
        font-weight: 600;
        margin: 0.7rem;
    }

    .icon {
        font-size: 1.8rem;
    }

    .toggle-icon {
        font-size: 3rem;
        margin-left: 0.5rem;
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
    font-size: 2rem;
    font-weight: 600;
    color: var(--secondary-font-color);
    margin: 0 1rem 0 0;
    width: 4rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background-color: var(--primary-light-color);
    }
`

const profileAvatar = styled(avatar)`
    cursor: default;
    &:hover {
        background: var(--primary-color);
    }
`

const profileMenu = styled.ul`
    position: absolute;
    bottom: 100;
    transform: ${
        admin ? 'translate(-0.5rem, 24%);' : 'translate(-0.5rem, 19%);'
    };
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

    .username {
        font-size: 2rem;
        color: var(--primary-font-color);
        font-weight: 600;
    }

    .email {
        font-size: 1.6rem;
        color: var(--neutral-color);
        font-weight: 600;
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

    &:hover {
        background: var(--hovered-color);
    }

    .icon {
        margin: 1rem;
        font-size: 2.4rem;
        color: var(--primary-color);
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
    profileAvatar,
    textInfo,
    item
}
