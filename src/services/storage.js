// const databaseName = 'localdb'
// const storeName = 'store'

// const accessDatabase = async () => {
//     try {
//         const indexedDB = window.indexedDB ||
//                     window.mozIndexedDB ||
//                     window.webkitIndexedDB ||
//                     window.msIndexedDB

//         if (!indexedDB) {
//             return null
//         }

//         const request = await indexedDB.open(databaseName, 1)

//         request.onsuccess = () => {
//             return request.result
//         }
//     } catch (err) {
//         console.log(`ERRO LOCAL: LocalDB > ${err.message}`)
//     }
// }

// const write = async (key, value) => {
//     try {
//         const db = await accessDatabase()
//         const transaction = db.transaction(storeName, 'readwrite')
//         const store = await transaction.objectStore(storeName)
//         store.put(JSON.stringify(value), key)
//     } catch (err) {
//         console.log(`ERRO LOCAL: LocalDB > ${err.message}`)
//     }
// }

// const read = async key => {
//     try {
//         const db = await accessDatabase()
//         const transaction = db.transaction(storeName, 'readwrite')
//         const store = await transaction.objectStore(storeName)
//         const value = JSON.parse(store.get(key))
//         return value
//     } catch (err) {
//         console.log(`ERRO LOCAL: LocalDB > ${err.message}`)
//     }
// }

// const clear = async key => {
//     if (key === 'all') {
//         await indexedDB.deleteDatabase(databaseName)
//     } else {
//         try {
//             const db = await accessDatabase()
//             const transaction = db.transaction(storeName, 'readwrite')
//             const store = await transaction.objectStore(storeName)
//             store.delete(key)
//         } catch (err) {
//             console.log(`ERRO LOCAL: LocalDB > ${err.message}`)
//         }
//     }
// }

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