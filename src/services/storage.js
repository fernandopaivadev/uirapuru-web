const USER_KEY = 'user'
const USERS_LIST_KEY = 'users-list'

const storeUser = user => {
    localStorage.setItem(
        USER_KEY,
        JSON.stringify(user)
    )
}

const getUser = () =>
    JSON.parse(
        localStorage.getItem(USER_KEY)
    )

const storeUsersList = usersList => {
    localStorage.setItem(
        USERS_LIST_KEY,
        JSON.stringify(usersList)
    )
}

const getUsersList = () =>
    JSON.parse(
        localStorage.getItem(USERS_LIST_KEY)
    )

const clearData = () => {
    localStorage.clear()
}

export {
    getUser,
    storeUser,
    getUsersList,
    storeUsersList,
    clearData
}
