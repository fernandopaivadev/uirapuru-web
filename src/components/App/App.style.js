import { createGlobalStyle } from 'styled-components'

import background from '../../assets/background.jpg'

const GlobalStyle = createGlobalStyle`
    @import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");

    * {
        margin: 0;
        padding: 0;
        outline: 0;
        list-style: none;
        box-sizing: border-box;
        font-family: "Roboto", sans-serif;
        overflow-x: hidden;
    }

    html {
        font-size: 65.5%;
    }

    html,
    body,
    #root {
        height: 100%;
        overflow-x: hidden;
    }

    body {
        background: linear-gradient(#0005, #0005),
            url(${background}) no-repeat;
        background-size: cover;
        -webkit-font-smoothing: antialiased !important;
    }

    body,
    input,
    button {
        font-family: "Roboto", sans-serif;
    }

    ::-webkit-scrollbar {
        width: 0.5rem;
    }

    ::-webkit-scrollbar-track-piece {
        background-color: var(--background-color);
    }

    ::-webkit-scrollbar-thumb:vertical {
        height: 0.5rem;
        background-color: var(--neutral-color);
        border-radius: 0.5rem;
    }

    ::-webkit-scrollbar-thumb:horizontal {
        width: 0.5rem;
        background-color: var(--neutral-color);
    }

    @media screen and (min-width: 2000px) {
        html {
            font-size: 75%;
        }
    }

    @media screen and (max-width: 1900px) {
        html {
            font-size: 40%;
        }
    }

    @media screen and (max-width: 1200px) {
        html {
            font-size: 35%;
        }
    }
`

export default GlobalStyle
