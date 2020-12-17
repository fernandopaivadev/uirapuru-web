import styled from 'styled-components'

const main = styled.div`
    width: 38rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--background-color);
    border-radius: 0.5rem;
`

const form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
    padding: 2.5rem;
`

const logo = styled.div`
    display: flex;
    margin: 1rem auto 1.5rem auto;
    align-items: center;

    img {
        width: 5rem;
        height: 5rem;
        margin: 0 1.5rem 0 0;
    }

    p {
        font-size: 3.4rem;
        font-weight: 400;
        letter-spacing: 0.3rem;
        color: var(--primary-font-color);
    }
`

const label = styled.label`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--neutral-color);
    width: 28rem;
    text-align: left;
`

const input = styled.input`
    margin: 0.5rem 0 1.5rem 0;
    width: 28rem;
    height: 4rem;
    border-radius: 0.3rem;
    border: 1px solid var(--primary-color);
    font-size: 1.8rem;
    padding: 1rem;
    background: var(--background-color);
    color: var(--primary-font-color);
    &:hover {
        border-color: var(--primary-light-color);
    }
    &:focus {
         border-color: var(--primary-light-color);
    }
`

const container = styled.div`
    width: 28rem;
    display: flex;
    justify-content: stretch;
    
    p {
        cursor: pointer;
        background: none;
        border: none;
        border-radius: 0.5rem;
        width: 7rem;
        font-size: 1.6rem;
        padding: 0.2rem;
        text-decoration: none;
        color: var(--primary-font-color);       
    }
`

const loading = styled.div`
    width: 5rem;
    height: 5.5rem;
    margin: 2rem auto 0 auto;
`

const link = styled.p`
    font-size: 1.8rem;
    font-weight: 600;
    color: var(--neutral-color);
    cursor: pointer;
    &:hover {
        color: var(--primary-light-color);
    }
`

const error = styled.p`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--error-color);
    margin: 1rem;
    text-align: center;
`

const message = styled.p`
    color: var(--primary-color);
    font-size: 2rem;
    font-weight: 600;
`

export default {
    main,
    form,
    logo,
    label,
    input,
    container,
    loading,
    link,
    error,
    message
}
