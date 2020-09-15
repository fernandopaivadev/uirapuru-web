const storeData = (key, value) => {
    localStorage.setItem(
        key,
        JSON.stringify(value)
    )
}

const getData = key => JSON.parse(
    localStorage.getItem(key)
)

const clearData = item => {
    if (item === 'all') {
        localStorage.clear()
    } else {
        localStorage.removeItem(item)
    }
}

export {
    storeData,
    getData,
    clearData
}
