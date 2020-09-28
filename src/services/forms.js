const formatUsername = input =>
    input
        ?.replace(/[\W_]/g, '')

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
        ?.replace(/\D/g, '')
        .replace(/(\d{8})(\d)/, '$1')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\d{2})(\d)/, '$1/$2')

const getOnlyNumbers = input =>
    input?.replace(/\D/g, '')

const validateForm = index => {
    if (!index) {
        index = 0
    }

    const form = document.querySelector(`form:nth-child(${index + 1})`)

    if (!form) {
        return false
    }

    const formChildren = [...form.children]

    let sum = 0
    let expected = 0

    const inputs = formChildren.filter(child =>
        child.tagName === 'INPUT'
        &&
        child.type !== 'checkbox'
    )

    inputs.forEach(input => {
        if (input.checkValidity()) {
            sum++
        }
        expected++
    })

    return sum === expected
}

const validateInput = (formIndex, inputIndex) => {
    if (!formIndex) {
        formIndex = 0
    }

    const form = document.querySelector(`form:nth-child(${formIndex + 1})`)

    if (!form) {
        return false
    }

    const formChildren = [...form.children]

    const inputs = formChildren.filter(child =>
        child.tagName === 'INPUT'
        &&
        child.type !== 'checkbox'
    )

    const errorMessages = formChildren.filter(child =>
        child.className === 'error-message'
    )

    if (inputs[inputIndex].checkValidity()) {
        inputs[inputIndex].style.borderColor = 'var(--default-green)'
        errorMessages[inputIndex].style.display = 'none'
    } else {
        inputs[inputIndex].style.borderColor = '#d00'
        errorMessages[inputIndex].style.display = 'block'
    }
}

const setFormValidation = formIndex => {
    if (!formIndex) {
        formIndex = 0
    }

    const form = document.querySelector(`form:nth-child(${formIndex + 1})`)

    if (!form) {
        return false
    }

    const formChildren = [...form.children]

    const inputs = formChildren.filter(child =>
        child.tagName === 'INPUT'
        &&
        child.type !== 'checkbox'
    )

    inputs.forEach((input, inputIndex) => {
        input.onblur = () => {
            validateInput(formIndex, inputIndex)
        }
    })

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
    validateForm,
    setFormValidation
}