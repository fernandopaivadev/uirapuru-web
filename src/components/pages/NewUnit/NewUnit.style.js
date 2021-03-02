import styled from 'styled-components'

const main = styled.div`
    background: var(--background-color);
    width: 100vw;
    height: 100vh;
    position: fixed;
`

const div = styled.div`
    width: 50%;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
`


export default {
    main,
    div
}
