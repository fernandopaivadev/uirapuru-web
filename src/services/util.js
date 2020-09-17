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

export {
    formatUsername,
    formatPhone,
    formatCPF,
    formatCNPJ,
    formatCEP,
    formatTimeStamp,
    formatDate,
    getOnlyNumbers
}