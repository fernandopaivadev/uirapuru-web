const formatUsername = username =>
    username
        ?.replace(/([a-z][0-9]{5})([a-z][0-9])/, '$1')

const formatPhone = phone =>
        phone
            ?.replace(/\D/g, '')
            .replace(/(\d{11})(\d)/, '$1')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')

const formatCPF = cpf =>
        cpf
            ?.replace(/\D/g, '')
            .replace(/(\d{11})(\d)/, '$1')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1-$2')

const formatCNPJ = cnpj =>
        cnpj
            ?.replace(/\D/g, '')
            .replace(/(\d{14})(\d)/, '$1')
            .replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{4})(\d)/, '$1-$2')

const formatCEP = cep =>
        cep
            ?.replace(/\D/g, '')
            .replace(/(\d{8})(\d)/, '$1')
            .replace(/(\d{5})(\d)/, '$1-$2')

const formatTimeStamp = timeStamp =>
        timeStamp
            ?.replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d)/, '$1')

const formatDate = input =>
    input
        .replace(/\D/g, '')
        .replace(/(\d{8})(\d)/, '$1')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\d{2})(\d)/, '$1/$2')

const getOnlyNumbers = input =>
    input
        .replace(/\D/g, '')

const validateForm = index => {
    if (!index) {
        index = 0
    }

    const form = document.querySelector(`form:nth-child(${index + 1})`)

    if (!form) {
        return false
    }

    let sum = 0
    let expected = 0

    const inputs = [...Object.values(form).filter(field => {
        if (field.tagName === 'INPUT') {
            return field
        }
    })]

    inputs.forEach(input => {
        if (input.checkValidity()) {
            sum++
        }
        expected++
    })

    return sum === expected
}

export {
    formatUsername,
    formatPhone,
    formatCPF,
    formatCNPJ,
    formatCEP,
    formatTimeStamp,
    formatDate,
    getOnlyNumbers,
    validateForm
}