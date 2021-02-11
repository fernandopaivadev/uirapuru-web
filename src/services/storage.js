import localForage from 'localforage'

const write = async (key, value) => {
    try {
        await localForage.setItem(
            key,
            JSON.stringify(value)
        )
    } catch (err) {
        console.log(`ERRO LOCAL: LocalDB > ${err.message}`)
    }
}

const read = async key => {
    try {
        const value = await localForage.getItem(key)
        return JSON.parse(value)
    } catch (err) {
        console.log(`ERRO LOCAL: LocalDB > ${err.message}`)
    }
}

const clear = item => {
    if (item === 'all') {
        localForage.clear()
    } else {
        localForage.removeItem(item)
    }
}

export default {
    write,
    read,
    clear
}