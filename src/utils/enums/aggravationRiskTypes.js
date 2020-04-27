const aggravationRiskTypes = {
    LOW: {
        id:1,
        risk: 'BAIXO',
        text: 'É pouco provável que você apresente sintomas que necessitem de internação hospitalar. No entanto, existem casos de óbitos mesmo com pessoas de baixo risco. Portanto recomendamos que siga as orientações do Ministério da Saúde e tome todas as precauções possíveis para não contrair o COVID-19.',
    },
    HIGH: {
        id:2,
        risk: 'ALTO',
        text: 'Há chance de você apresentar sintomas que necessitem de internação hospitalar. As condições relatadas requerem atenção especial caso você contraia COVID 19. Estas condições aumentam muito a chance de complicações, sendo assim, recomendamos que fique em casa durante todo o período de pandemia e siga à risca as orientações do Ministério da Saúde.',
    },
};

export default aggravationRiskTypes