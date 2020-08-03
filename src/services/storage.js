const USER_KEY = 'user'
const USERS_LIST_KEY = 'users-list'
const CONSUMER_UNIT_KEY = 'consumer-unit'

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

const storeConsumerUnit = consumerUnit => {
    localStorage.setItem(
        CONSUMER_UNIT_KEY,
        JSON.stringify(consumerUnit)
    )
}

const getConsumerUnit = () =>
    JSON.parse(
        localStorage.getItem(CONSUMER_UNIT_KEY)
    )

const clearData = item => {
    if (item === 'consumerUnit') {
        localStorage.removeItem(CONSUMER_UNIT_KEY)
    } else if (item === 'user') {
        localStorage.removeItem(USER_KEY)
    } else if (item === 'all') {
        localStorage.removeItem(USER_KEY)
        localStorage.removeItem(USERS_LIST_KEY)
        localStorage.removeItem(CONSUMER_UNIT_KEY)
    }
}

export {
    getUser,
    storeUser,
    getUsersList,
    storeUsersList,
    clearData,
    storeConsumerUnit,
    getConsumerUnit
}
