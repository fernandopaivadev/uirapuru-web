const write = (key, value) => {
    localStorage.setItem(
        key,
        JSON.stringify(value)
    )
}

const read = key => JSON.parse(
    localStorage.getItem(key)
)

const clear = item => {
    if (item === 'all') {
        localStorage.clear()
    } else {
        localStorage.removeItem(item)
    }
}

export default {
    write,
    read,
    clear
}
