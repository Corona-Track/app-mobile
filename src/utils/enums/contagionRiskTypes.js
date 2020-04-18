const contagionRiskTypes = {
    LOW: {
        risk: 'BAIXO',
        text: 'Você aparentemente tem baixa chance de ter contraído o coronavírus. Mesmo assim, baseados nas orientações do Ministério da Saúde, recomendamos que pratique isolamento social, tente acessar apenas serviços essenciais e, se possível, trabalhe de casa. Caso não seja possível trabalhar em casa, redobre seus cuidados com higiene e proteção.',
    },
    MEDIUM: {
        risk: 'MÉDIO',
        text: 'Você aparentemente tem chance de ter contraído o coronavírus. Baseados nas orientações do Ministério da Saúde, recomendamos que pratique isolamento social, tente acessar apenas serviços essenciais e, se possível, trabalhe de casa. Caso trabalhe com serviços essenciais, verifique com seu empregador a possibilidade de ficar em afastamento por 14 dias.',
    },
};

export default contagionRiskTypes