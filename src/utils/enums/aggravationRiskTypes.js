const aggravationRiskTypes = {
    LOW: {
        risk: 'BAIXO',
        text: 'É pouco provável que você apresente sintomas que necessitem de internação hospitalar. No entanto, existem casos de óbitos mesmo com pessoas de baixo risco. Portanto recomendamos que siga as orientações do Ministério da Saúde e tome todas as precauções possíveis para não contrair o COVID-19.',
    },
    MEDIUM: {
        risk: 'MÉDIO',
        text: 'É possível que você apresente sintomas que necessitem de internação hospitalar. Como há casos de óbitos com pessoas nesta faixa de risco, recomendamos que siga as orientações do Ministério da Saúde e tome todas as precauções possíveis para não contrair o COVID-19.',
    },
    HIGH: {
        risk: 'ALTO',
        text: 'Há uma chance real de você apresentar sintomas que necessitem de internação hospitalar. Como há vários casos de óbitos com pessoas nesta faixa de risco, recomendamos que siga as orientações do Ministério da Saúde e tome todas as precauções possíveis para não contrair o COVID-19.',
    },
};

export default aggravationRiskTypes