import { create } from 'axios'
import storage from './storage'

// eslint-disable-next-line
const baseURL = process.env.REACT_APP_API_URL

const axios = create({
    baseURL
})

axios.interceptors.request.use(async config => {
    const token = await storage.read('JWT')
    if (token) {
        config.headers.authorization = `Bearer ${token}`
    }
    return config
})

const fetchDeviceData = async (
    consumerUnitIndex,
    deviceIndex,
    begin,
    end,
    storeCSV
) => {
    if (!(begin && end)) {
        begin = new Date()
        end = new Date()

        begin.setHours(begin.getHours() - 12)

        begin = begin.toISOString()
        end = end.toISOString()
    }

    const user = await storage.read('user')
    const device = user.consumerUnits[consumerUnitIndex]
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

    const { status, data: { messages } } = response

    if (status === 200) {
        const params = []
        const timestamps = []

        if (!messages.length) {
            return null
        }

        if (storeCSV) {
            const dataObjects = messages.map(message => {
                if (message) {
                    return {
                        id: message.topic,
                        ...JSON.parse(message.payload)
                    }
                }
            })

            dataObjects.forEach(dataObject => {
                if (dataObject) {
                    const rtc = new Date(dataObject.rtc)
                    const timestamp = `${
                        rtc.getDate()
                    }/${
                        rtc.getMonth() + 1
                    }/${
                        rtc.getFullYear()
                    } ${
                        rtc.getHours()
                    }:${
                        rtc.getMinutes()
                    }`

                    delete dataObject.rtc
                    delete dataObject.store
                    dataObject.timestamp = timestamp
                }
            })

            const csvData = dataObjects.filter(dataObject => dataObject)
            await storage.write('csv-data', csvData)
        }

        messages.forEach(({ payload }) => {
            const parsedPayload = JSON.parse(payload)
            const dateRTC = new Date(parsedPayload.rtc)

            const timestamp = `${
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

            delete parsedPayload.rtc
            delete parsedPayload.store
            delete parsedPayload.id

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

const getChart = async (consumerUnitIndex, deviceIndex, begin, end) => {
    try {
        await storage.clear('collection')
        await storage.clear('csv-data')

        if (deviceIndex >= 0) {
            const chart = await fetchDeviceData(
                consumerUnitIndex,
                deviceIndex,
                begin,
                end,
                true
            )

            if (chart) {
                await storage.write('collection', [chart])
            } else {
                await storage.write('collection', [])
            }

            return 'OK'
        } else {
            return 'Índice inválido'
        }
    } catch (err) {
        if (err?.response?.data?.message) {
            if (err?.response?.data?.message === 'jwt expired') {
                window.location.replace(
                    `${window.location.href.split('#')[0]}#/login`
                )
            }

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
    try {
        await storage.clear('collection')
        await storage.clear('csv-data')

        const user = await storage.read('user')

        if (consumerUnitIndex >= 0) {
            let collection = await Promise.all(user
                .consumerUnits[consumerUnitIndex]
                .devices.map(async (device, deviceIndex) =>
                    await fetchDeviceData(
                        consumerUnitIndex,
                        deviceIndex,
                        begin,
                        end,
                        false
                    )
                ))

            collection = collection.filter(chart => chart)

            await storage.write('collection', collection)
            return 'OK'
        } else {
            return 'Índice inválido'
        }
    } catch (err) {
        if (err?.response?.data?.message) {
            if (err?.response?.data?.message === 'jwt expired') {
                window.location.replace(
                    `${window.location.href.split('#')[0]}#/login`
                )
            }

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

const getUsersList = async () => {
    try {
        if (await storage.read('access-level') === 'admin') {
            const response = await axios.get('/users')

            const { status, data: { usersList } } = response

            if (status === 200) {
                await storage.clear('collection')
                await storage.clear('csv-data')

                await storage.write('users-list', usersList)
                return 'OK'
            } else {
                return 'Ocorreu um erro'
            }
        } else {
            return 'Somente para administradores'
        }
    } catch (err) {
        if (err?.response?.data?.message) {
            if (err?.response?.data?.message === 'jwt expired') {
                window.location.replace(
                    `${window.location.href.split('#')[0]}#/login`
                )
            }

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
    try {
        if (await storage.read('access-level') === 'admin' && _id) {
            const { status, data: { user } } = await axios.get(
                `/user/data?_id=${_id}`
            )

            if (status === 200) {
                await storage.clear('collection')
                await storage.clear('csv-data')

                await storage.write('user', user)
                return 'OK'
            } else {
                return 'Ocorreu um erro'
            }
        } else if (await storage.read('JWT')) {
            const { status, data } = await axios.get('/user/data')

            if (status === 200) {
                await storage.write('user', data.user)
                return 'OK'
            }
        }
    } catch (err) {
        if (err?.response?.data?.message) {
            if (err?.response?.data?.message === 'jwt expired') {
                window.location.replace(
                    `${window.location.href.split('#')[0]}#/login`
                )
            }

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

const login = async (username, password) => {
    try {
        const response = await axios.get(
            `/user/auth?username=${username}&password=${password}`
        )

        const { status, data: { token } } = response

        if (status === 200) {
            await storage.clear('all')
            await storage.write('JWT', token)

            if (await getUserData() === 'OK') {
                const { accessLevel, username } = await storage.read('user')
                await storage.write('access-level', accessLevel)
                await storage.write('username', username)
                return 'OK'
            } else {
                await storage.clear('all')
                return 'Ocorreu um erro'
            }
        } else {
            return 'Ocorreu um erro'
        }
    } catch (err) {
        if (err?.response?.data?.message) {
            if (err?.response?.data?.message === 'jwt expired') {
                window.location.replace(
                    `${window.location.href.split('#')[0]}#/login`
                )
            }

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

        const { status } = response

        if (status === 200) {
            return 'OK'
        } else {
            return 'Ocorreu um erro'
        }
    } catch (err) {
        if (err?.response?.data?.message) {
            if (err?.response?.data?.message === 'jwt expired') {
                window.location.replace(
                    `${window.location.href.split('#')[0]}#/login`
                )
            }

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

        const { status } = response

        if (status === 200) {
            return 'OK'
        } else {
            return 'Ocorreu um erro'
        }
    } catch (err) {
        if (err?.response?.data?.message) {
            if (err?.response?.data?.message === 'jwt expired') {
                window.location.replace(
                    `${window.location.href.split('#')[0]}#/login`
                )
            }

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
        const response = await axios.post('/user/create', user)

        const { status } = response

        if (status === 201) {
            if (await getUsersList() === 'OK') {
                return 'OK'
            } else {
                await storage.clear('all')
                return 'Saia e faça login novamente'
            }
        } else {
            return 'Ocorreu um erro'
        }
    } catch (err) {
        if (err?.response?.data?.message) {
            if (err?.response?.data?.message === 'jwt expired') {
                window.location.replace(
                    `${window.location.href.split('#')[0]}#/login`
                )
            }

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

        if (status === 409) {
            return 'Usuário já cadastrado'
        } else {
            return 'Ocorreu um erro'
        }
    }
}

const updateUser = async user => {
    try {
        await storage.write('user', user)

        const response = await axios.put('/user/update', user)

        const { status } = response

        if (status === 200) {
            return 'OK'
        } else {
            return 'Ocorreu um erro'
        }
    } catch (err) {
        if (err?.response?.data?.message) {
            if (err?.response?.data?.message === 'jwt expired') {
                window.location.replace(
                    `${window.location.href.split('#')[0]}#/login`
                )
            }

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
            `/user/delete?_id=${_id}`
        )

        const { status } = response

        if (status === 200) {
            await storage.clear('user')

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
            if (err?.response?.data?.message === 'jwt expired') {
                window.location.replace(
                    `${window.location.href.split('#')[0]}#/login`
                )
            }

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
