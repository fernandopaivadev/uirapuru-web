const formatDeviceID = input =>
    input
        ?.replace(/[\W_]/g, '')

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

const validateForm = id => {
    const form = document.querySelector(`#${id}`)

    if (!form) {
        return false
    }

    const formChildren = [...form.children]

    let sum = 0
    let expected = 0

    const inputs = formChildren.filter(child =>
        (child.tagName === 'INPUT'
        ||
        child.tagName === 'TEXTAREA')
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

const setFormsValidation = () => {
    const forms = [...document.querySelectorAll('form')]

    if (!forms) {
        return false
    }

    let children = []

    forms.map(form =>
        [...form.children]
    ).map(formChildren => {
        children.push(...formChildren)
    })

    const inputs = children.filter(child =>
        (child.tagName === 'INPUT'
        ||
        child.tagName === 'TEXTAREA')
        &&
        child.type !== 'checkbox'
    )

    const errorMessages = children.filter(child =>
        child.className === 'error-message'
    )

    inputs.forEach((input, inputIndex) => {
        input.onblur = () => {
            if (inputs[inputIndex].checkValidity()) {
                inputs[inputIndex].style.borderColor = 'var(--primary-color)'
                errorMessages[inputIndex].style.display = 'none'
            } else {
                inputs[inputIndex].style.borderColor = 'var(--error-color)'
                errorMessages[inputIndex].style.display = 'block'
            }
        }
    })
}

export {
    formatDeviceID,
    formatUsername,
    formatPhone,
    formatCPF,
    formatCNPJ,
    formatCEP,
    formatTimeStamp,
    formatDate,
    getOnlyNumbers,
    validateForm,
    setFormsValidation
}
