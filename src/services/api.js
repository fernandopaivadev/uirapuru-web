import { create } from 'axios'
import { getData, storeData, clearData } from './storage'

const baseURL = 'https://techamazon-uirapuru-api.herokuapp.com'

const axios = create({
    baseURL
})

axios.interceptors.request.use(async config => {
    if (getData('JWT')) {
        config.headers.authorization = `Bearer ${getData('JWT')}`
    }
    return config
})

const fetchDeviceData = async (
    consumerUnitIndex,
    deviceIndex,
    begin,
    end,
    fullTimestamp,
    storeMessages
) => {
    if (!(begin && end)) {
        begin = new Date()
        end = new Date()

        begin.setMinutes(begin.getMinutes() - 1)

        begin = begin.toISOString()
        end = end.toISOString()
    }

    const device = getData('user')
        .consumerUnits[consumerUnitIndex]
        .devices[deviceIndex]

    const response = await axios.get(
        `/device/messages?device=${
            device.id
        }&from=${
            begin
        }&to=${
            end
        }`
    )

    const status = response?.status

    if (status === 200) {
        const { messages } = response.data
        const params = []
        const timestamps = []

        if (!messages.length) {
            return null
        }

        if (storeMessages) {
            storeData('messages', messages)
        }

        messages.forEach(({ payload }) => {
            const parsedPayload = JSON.parse(payload)
            const dateRTC = new Date(parsedPayload.rtc)

            const timestamp = fullTimestamp ?
            `${
                dateRTC.getDate() < 10 ?
                    `0${dateRTC.getDate()}`
                    :
                    dateRTC.getDate()
            }/${
                dateRTC.getMonth() + 1 < 10 ?
                    `0${dateRTC.getMonth() + 1}`
                    :
                    dateRTC.getMonth() + 1
            } ${
                dateRTC.getHours() < 10 ?
                    `0${dateRTC.getHours()}`
                    :
                    dateRTC.getHours()
            }:${
                dateRTC.getMinutes() < 10 ?
                    `0${dateRTC.getMinutes()}`
                    :
                    dateRTC.getMinutes()
            }`
                :
            `${
                dateRTC.getHours() < 10 ?
                    `0${dateRTC.getHours()}`
                    :
                    dateRTC.getHours()
            }:${
                dateRTC.getMinutes() < 10 ?
                    `0${dateRTC.getMinutes()}`
                    :
                    dateRTC.getMinutes()
            }`

            delete parsedPayload.rtc
            delete parsedPayload.store
            params.push(parsedPayload)
            timestamps.push(timestamp)
        })

        const keys = Object.keys(params[0])
        const datasets = keys.map(key => ({
            label: key,
            data: params.map(param =>
                param[key]
            )
        }))

        const title = device.name

        const chart = {
            title,
            labels: timestamps,
            datasets
        }

        return chart
    }
}

const getUsersList = async () => {
    clearData('collection')
    clearData('messages')

    try {
        if (getData('admin')) {
            const response = await axios.get('/users')

            const status = response?.status

            if (status === 200) {
                storeData('users-list', response.data.usersList)
                return 'OK'
            }
        }
    } catch (err) {
        if (err?.response?.data?.message) {
            console.log(`ERRO NO SERVIDOR: ${
                err?.response?.data?.message
            }`)
        } else if (err?.message) {
            console.log(`ERRO LOCAL: ${
                err?.message
            }`)
        } else {
            console.log('ERRO NÃO IDENTIFICADO')
        }
        return 'Ocorreu um erro'
    }
}

const getUserData = async (_id) => {
    clearData('collection')
    clearData('messages')

    try {
        if (getData('admin') && _id) {
            const { status, data } = await axios.get(
                `/user/data?_id=${_id}`
            )

            if (status === 200) {
                storeData('user', data.user)
                return 'OK'
            }
        } else if (getData('JWT')) {
            const { status, data } = await axios.get('/user/data')

            if (status === 200) {
                storeData('user', data.user)
                return 'OK'
            }
        }
    } catch (err) {
        if (err?.response?.data?.message) {
            console.log(`ERRO NO SERVIDOR: ${
                err?.response?.data?.message
            }`)
        } else if (err?.message) {
            console.log(`ERRO LOCAL: ${
                err?.message
            }`)
        } else {
            console.log('ERRO NÃO IDENTIFICADO')
        }
        return 'Ocorreu um erro'
    }
}

const getChart = async (consumerUnitIndex, deviceIndex, begin, end) => {
    clearData('collection')
    clearData('messages')

    try {
        if (deviceIndex >= 0) {
            const chart = await fetchDeviceData(
                consumerUnitIndex,
                deviceIndex,
                begin,
                end,
                true,
                true
            )

            if (chart) {
                storeData('collection', [chart])
            } else {
                storeData('collection', [])
            }

            return 'OK'
        }
    } catch (err) {
        if (err?.response?.data?.message) {
            console.log(`ERRO NO SERVIDOR: ${
                err?.response?.data?.message
            }`)
        } else if (err?.message) {
            console.log(`ERRO LOCAL: ${
                err?.message
            }`)
        } else {
            console.log('ERRO NÃO IDENTIFICADO')
        }
        return 'Ocorreu um erro'
    }
}

const getCollection = async (consumerUnitIndex, begin, end) => {
    clearData('collection')
    clearData('messages')

    try {
        if (consumerUnitIndex >= 0) {
            let collection = await Promise.all(getData('user')
                .consumerUnits[consumerUnitIndex]
                .devices.map(async (device, deviceIndex) =>
                    await fetchDeviceData(
                        consumerUnitIndex,
                        deviceIndex,
                        begin,
                        end,
                        false,
                        false
                    )
                ))

            collection = collection.filter(chart => chart)

            storeData('collection', collection)
            return 'OK'
        }
    } catch (err) {
        if (err?.response?.data?.message) {
            console.log(`ERRO NO SERVIDOR: ${
                err?.response?.data?.message
            }`)
        } else if (err?.message) {
            console.log(`ERRO LOCAL: ${
                err?.message
            }`)
        } else {
            console.log('ERRO NÃO IDENTIFICADO')
        }
        return 'Ocorreu um erro'
    }
}

const login = async (username, password, adminMode) => {
    clearData('all')

    try {
        const response = await axios.get(
            adminMode ?
                `/admin/auth?level=${username}&password=${password}`
                :
                `/user/auth?username=${username}&password=${password}`
        )

        const status = response?.status

        if (status === 200) {
            if (adminMode) {
                storeData('JWT', response.data.token)
                storeData('admin', true)

                if (await getUsersList() === 'OK') {
                    return 'OK'
                } else {
                    clearData('all')
                    return 'Ocorreu um erro'
                }
            } else {
                storeData('JWT', response.data.token)

                if (await getUserData()) {
                    return 'OK'
                } else {
                    clearData('all')
                    return 'Ocorreu um erro'
                }
            }
        } else {
            return 'Ocorreu um erro'
        }
    } catch (err) {
        if (err?.response?.data?.message) {
            console.log(`ERRO NO SERVIDOR: ${
                err?.response?.data?.message
            }`)
        } else if (err?.message) {
            console.log(`ERRO LOCAL: ${
                err?.message
            }`)
        } else {
            console.log('ERRO NÃO IDENTIFICADO')
        }

        const status = err?.response?.status

        if (status === 404) {
            return 'Usuário não encontrado'
        } else if (status === 401) {
            return 'Senha incorreta'
        } else {
            return 'Ocorreu um erro'
        }
    }
}

const forgotPassword = async username => {
    try {
        const response = await axios.get(
            `/user/forgot-password?username=${username}`
        )

        const status = response?.status

        if (status === 200) {
            return 'OK'
        } else {
            return 'Ocorreu um erro'
        }
    } catch (err) {
        if (err?.response?.data?.message) {
            console.log(`ERRO NO SERVIDOR: ${
                err?.response?.data?.message
            }`)
        } else if (err?.message) {
            console.log(`ERRO LOCAL: ${
                err?.message
            }`)
        } else {
            console.log('ERRO NÃO IDENTIFICADO')
        }

        const status = err?.response?.status

        if (status === 404) {
            return 'Usuário não encontrado'
        } else if (status === 401) {
            return 'Senha incorreta'
        } else {
            return 'Ocorreu um erro'
        }
    }
}

const resetPassword = async (token, password) => {
    try {
        const response = await axios.patch('/user/reset-password', {
            token,
            password
        })

        const status = response?.status

        if (status === 200) {
            return 'OK'
        } else {
            return 'Ocorreu um erro'
        }
    } catch (err) {
        if (err?.response?.data?.message) {
            console.log(`ERRO NO SERVIDOR: ${
                err?.response?.data?.message
            }`)
        } else if (err?.message) {
            console.log(`ERRO LOCAL: ${
                err?.message
            }`)
        } else {
            console.log('ERRO NÃO IDENTIFICADO')
        }

        const status = err?.response?.status

        if (status === 404) {
            return 'Usuário não encontrado'
        } else if (status === 401) {
            return 'Senha incorreta'
        } else {
            return 'Ocorreu um erro'
        }
    }
}

const createUser = async user => {
    try {
        const response = await axios.post('/user/add', user)

        const status = response?.status

        if (status === 201) {
            if (await getUsersList() === 'OK') {
                return 'OK'
            } else {
                clearData('all')
                return 'Saia e faça login novamente'
            }
        } else {
            return 'Ocorreu um erro'
        }
    } catch (err) {
        if (err?.response?.data?.message) {
            console.log(`ERRO NO SERVIDOR: ${
                err?.response?.data?.message
            }`)
        } else if (err?.message) {
            console.log(`ERRO LOCAL: ${
                err?.message
            }`)
        } else {
            console.log('ERRO NÃO IDENTIFICADO')
        }

        const status = err?.response?.status

        if (status === 400) {
            return 'Erro na requisição'
        } else if (status === 409) {
            return 'Usuário já cadastrado'
        } else {
            return 'Ocorreu um erro'
        }
    }
}

const updateUser = async user => {
    try {
        storeData('user', user)

        const response = await axios.put('/user/update', user)

        const status = response?.status

        if (status === 200) {
            return 'OK'
        } else {
            return 'Ocorreu um erro'
        }
    } catch (err) {
        if (err?.response?.data?.message) {
            console.log(`ERRO NO SERVIDOR: ${
                err?.response?.data?.message
            }`)
        } else if (err?.message) {
            console.log(`ERRO LOCAL: ${
                err?.message
            }`)
        } else {
            console.log('ERRO NÃO IDENTIFICADO')
        }
        return 'Ocorreu um erro'
    }
}

const deleteUser = async _id => {
    try {
        const response = await axios.delete(
            `/user/remove?_id=${_id}`
        )

        const status = response?.status

        if (status === 200) {
            clearData('user')

            if (await getUsersList() === 'OK') {
                return 'OK'
            } else {
                return 'Saia e faça login novamente'
            }
        } else {
            return 'Ocorreu um erro'
        }
    } catch (err) {
        if (err?.response?.data?.message) {
            console.log(`ERRO NO SERVIDOR: ${
                err?.response?.data?.message
            }`)
        } else if (err?.message) {
            console.log(`ERRO LOCAL: ${
                err?.message
            }`)
        } else {
            console.log('ERRO NÃO IDENTIFICADO')
        }
        return 'Ocorreu um erro'
    }
}

export default {
    baseURL,
    login,
    forgotPassword,
    resetPassword,
    createUser,
    updateUser,
    deleteUser,
    getUsersList,
    getUserData,
    getChart,
    getCollection
}
