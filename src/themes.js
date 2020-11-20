import { storeData } from './services/storage'

const themes = {
    default: {
        primaryColor: '#309d20',
        primaryLightColor: '#3fc82a',
        secondaryColor: '#712b74',
        primaryFontColor: '#333',
        secondaryFontColor: '#eee',
        backgroundColor: '#eee',
        errorColor: '#bf1a2f',
        errorLightColor: '#f56f55',
        neutralColor: '#555',
        hoveredColor: '#ccc',
        traceColors: [
            '#EFA00B',
            '#1e88e5',
            '#BF1A2F',
            '#454E9E',
            '#9E4E45',
            '#018E42',
            '#9900ff',
            '#004807'
        ]
    },
    dark: {
        primaryColor: '#309d20',
        primaryLightColor: '#3fc82a',
        secondaryColor: '#712b74',
        primaryFontColor: '#ccc',
        secondaryFontColor: '#ccc',
        backgroundColor: '#222426',
        errorColor: '#bf1a2f',
        errorLightColor: '#f56f55',
        neutralColor: '#aaa',
        hoveredColor: '#555',
        traceColors: [
            '#EFA00B',
            '#1e88e5',
            '#BF1A2F',
            '#454E9E',
            '#9E4E45',
            '#018E42',
            '#9900ff',
            '#004807'
        ]
    },
    uirapuru: {
        yellow: '#ffcd04',
        red: '#ff0000',
        black: '#000000'
    }
}

const applyTheme = theme => {
    const html = document.querySelector('html')
    const {
        primaryColor,
        primaryLightColor,
        secondaryColor,
        primaryFontColor,
        secondaryFontColor,
        backgroundColor,
        errorColor,
        errorLightColor,
        neutralColor,
        hoveredColor
    } = themes[theme]

    html.style.setProperty('--primary-color', primaryColor)
    html.style.setProperty('--primary-light-color', primaryLightColor)
    html.style.setProperty('--secondary-color', secondaryColor)
    html.style.setProperty('--primary-font-color', primaryFontColor)
    html.style.setProperty('--secondary-font-color', secondaryFontColor)
    html.style.setProperty('--background-color', backgroundColor)
    html.style.setProperty('--error-color', errorColor)
    html.style.setProperty('--error-light-color', errorLightColor)
    html.style.setProperty('--neutral-color', neutralColor)
    html.style.setProperty('--hovered-color', hoveredColor)

    storeData('theme', theme)
}

export {
    themes,
    applyTheme
}
