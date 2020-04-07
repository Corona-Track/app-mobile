export const emailValidator = email => {
    const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return expression.test(String(email).toLowerCase());
};

export const cpfValidor = cpf => {
    const expression = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
    return expression.test(String(cpf).toLowerCase());
};

export const cepValidator = cep => {
    const expression = /^[0-9]{5}-[0-9]{3}/;
    return expression.test(String(cep).toLowerCase());
};

export const phoneValidator = phone => {
    const expression = /^(\([0-9]{2}\) [0-9]{4}-[0-9]{4})|(\(1[2-9]\) [5-9][0-9]{3}-[0-9]{4})|(\([2-9][1-9]\) [5-9][0-9]{3}-[0-9]{4})/;
    return expression.test(String(phone).toLowerCase());
};

export const cellphoneValidator = cellphone => {
    const expression = /^(\([0-9]{2}\) [9][0-9]{4}-[0-9]{4})|(\(1[2-9]\) [5-9][0-9]{3}-[0-9]{4})|(\([2-9][1-9]\) [5-9][0-9]{3}-[0-9]{4})/;
    return expression.test(String(cellphone).toLowerCase());
};
