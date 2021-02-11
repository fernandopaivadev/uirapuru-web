import storage from '../services/storage'

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
            '#f56f55'
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
            '#f56f55'
        ]
    }
}

const applyTheme = async themeName => {
    try {
        const html = document.querySelector('html')
        const theme = themes[themeName]

        html.style.setProperty('--primary-color',        theme.primaryColor)
        html.style.setProperty('--primary-light-color',  theme.primaryLightColor)
        html.style.setProperty('--secondary-color',      theme.secondaryColor)
        html.style.setProperty('--primary-font-color',   theme.primaryFontColor)
        html.style.setProperty('--secondary-font-color', theme.secondaryFontColor)
        html.style.setProperty('--background-color',     theme.backgroundColor)
        html.style.setProperty('--error-color',          theme.errorColor)
        html.style.setProperty('--error-light-color',    theme.errorLightColor)
        html.style.setProperty('--neutral-color',        theme.neutralColor)
        html.style.setProperty('--hovered-color',        theme.hoveredColor)

        await storage.write('theme', themeName)
    } catch (err) {
        console.log(`ERRO LOCAL: TEMA > ${err.message}`)
    }
}

export {
    themes,
    applyTheme
}
