import { storeData } from './storage'
import { isAuthenticated, isAdmin, logout } from './auth'
import { api } from './api'

const fetch = async (scope, _id) => {
    if (!isAuthenticated()) {
        return false
    }

    try {
        if (scope === 'users-list') {
            if(isAdmin()) {
                const { status, data } = await api.get('/users')

                if (status === 200) {
                    storeData('users-list',data.usersList)
                    return true
                }
            }
        } else if (scope === 'user') {
            if (isAdmin() && _id) {
                const { status, data } = await api.get(
                    `/user/data?_id=${_id}`
                )

                if (status === 200) {
                    storeData('user', data.user)
                    return true
                }
            } else {
                const { status, data } = await api.get('/user/data')

                if (status === 200) {
                    storeData('user', data.user)
                    return true
                }
            }
        }
    } catch (err) {
        console.log(err?.message ?? err?.response?.data?.message)
        logout()
        return false
    }
}


// const fetch = async (_id) => {
//     if (isAuthenticated()) {
//         try {
//             if (isAdmin()) {
//                 if (_id) {
//                     const { status, data } = await api.get(
//                         `/user/data?_id=${_id}`
//                     )

//                     if (status === 200) {
//                         storeData('user', data?.user)
//                         return true
//                     }
//                 } else {
//                     const { status, data } = await api.get('/users')

//                     if (status === 200) {
//                         storeData('users-list',data?.usersList)
//                         return true
//                     }
//                 }
//             } else {
//                 const { status, data } = await api.get('/user/data')

//                 if (status === 200) {
//                     storeData('user', data?.user)
//                     return true
//                 }
//             }
//         } catch (err) {
//             console.log(err?.message ?? err?.response?.data?.message)
//             logout()
//             return false
//         }
//     }
// }

export default fetch
