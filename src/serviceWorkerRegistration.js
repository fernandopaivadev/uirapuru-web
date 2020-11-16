const register = () => {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js').then(() => {
                console.log('ServiceWorker registration successful')
            }, err => {
                console.log('ServiceWorker registration failed: ', err.message)
            })
        })
    }
}

const unregister = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready
            .then(registration => {
                registration.unregister()
            })
            .catch(error => {
                console.error(error.message)
            })
    }
}

export {
    register,
    unregister
}