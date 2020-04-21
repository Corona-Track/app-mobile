const contagionRiskTypes = {
    LOW: {
        id:1,
        risk: 'BAIXO',
        text: 'Você aparentemente tem baixa chance de ter contraído o coronavírus. Mesmo assim, baseados nas orientações do Ministério da Saúde, recomendamos que pratique isolamento social, tente acessar apenas serviços essenciais e, se possível, trabalhe de casa. Caso não seja possível trabalhar em casa, redobre seus cuidados com higiene e proteção.',
    },
    MEDIUM: {
        id:2,
        risk: 'MÉDIO',
        text: 'Você aparentemente tem chance de ter contraído o coronavírus. Baseados nas orientações do Ministério da Saúde, recomendamos que pratique isolamento social, tente acessar apenas serviços essenciais e, se possível, trabalhe de casa. Caso trabalhe com serviços essenciais, verifique com seu empregador a possibilidade de ficar em afastamento por 14 dias.',
    },
    HIGH: {
        id:3,
        risk: 'ALTO',
        text: 'Você aparentemente tem grandes chances de ter contraído o coronavírus. Baseados nas orientações do Ministério da Saúde, não recomendamos que saia de casa para nada e nem que tenha contato com pessoas que não morem com você devido à alta probabilidade de contágio. Se necessário, peça a parentes e amigos que não morem com você para entregar alimentos e medicamentos na porta de sua casa, e mantenha este isolamento rigoroso até 7 dias após o desaparecimento dos sintomas.',
    },
};

export default contagionRiskTypes