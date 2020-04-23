const riskProfileTypes = require('../utils/enums/riskProfileTypes');
const contagionRiskTypes = require('../utils/enums/contagionRiskTypes');
const aggravationRiskTypes = require('../utils/enums/aggravationRiskTypes');


var moment = require('moment');

exports.calculateRiskProfileQuestionsPoints = (questions) => {

    const {
        someoneDiagnosed,
        someoneSuspicious,
        alreadyHadCoronavirusTest,
        hadFluVaccine,
        keepDistance,
        protectionAnswer,
        touchingPrecaution,
        showerAnswer,
        changeClothesAnswer,
        containerCleanupAnswer,
        outsideWorkAnswer,
        relativesLeavingHome,
        relativesChangeClothesAnswer,
        relativesContainerCleanupAnswer,
        relativesShowerAnswer
    } = questions


    let points = 0
    let habitsNotPreventives = 0


    if (someoneDiagnosed === "confirm")
        points += 15

    if (someoneSuspicious) {
        if (someoneSuspicious === "confirm")
            points += calculatePoints(3, 5, 15, 1)
        if (someoneSuspicious === "doubt")
            points += calculatePoints(2, 5, 15, 1)
    }


    if (alreadyHadCoronavirusTest === "deny")
        habitsNotPreventives += 1

    if (hadFluVaccine === false)
        habitsNotPreventives += 1


    if (keepDistance === "Nem sempre mantenho distância porque:")
        habitsNotPreventives += 1

    if (protectionAnswer && protectionAnswer.includes("Não constumo usar nenhum tipo de proteção ao sair de casa"))
        habitsNotPreventives += 1


    if (touchingPrecaution === "Contamino as mãos e limpo quando posso")
        habitsNotPreventives += 1


    if (showerAnswer === "Nunca" || showerAnswer === "Às vezes")
        habitsNotPreventives += 1

    if (changeClothesAnswer === "Nunca" || changeClothesAnswer === "Às vezes")
        habitsNotPreventives += 1

    if (containerCleanupAnswer === "Nunca" || containerCleanupAnswer === "Às vezes")
        habitsNotPreventives += 1

    if (outsideWorkAnswer === "Em um ambiente fechado com mais pessoas, como clínica, escritório, loja ou motorista de aplicativo")
        habitsNotPreventives += 1


    if (relativesLeavingHome === true) {
        if (relativesShowerAnswer === "Nunca" || relativesShowerAnswer === "Às vezes")
            habitsNotPreventives += 1

        if (relativesChangeClothesAnswer === "Nunca" || relativesChangeClothesAnswer === "Às vezes")
            habitsNotPreventives += 1

        if (relativesContainerCleanupAnswer === "Nunca" || relativesContainerCleanupAnswer === "Às vezes")
            habitsNotPreventives += 1

    }



    const habitsNotPreventivesPoints = calculatePoints(habitsNotPreventives, 8, 10, 1)

    points += habitsNotPreventivesPoints



    return points
}



exports.calculateRiskProfileSymptonsPoints = (symptonsRegisters) => {
    const maxDays = 14
    let points = 0

    let userSymptons = {}

    symptonsRegisters.forEach(symptonsList => {
        const registerWithLessThanMaxDays = moment().diff(symptonsList.created_at.toDate(), 'days') < maxDays

        if (registerWithLessThanMaxDays) {
            if(symptonsList.symptons.length>1){
            symptonsList.symptons.forEach(symptom => {

                if (!userSymptons[symptom.identifier])
                    userSymptons[symptom.identifier] = { start: moment(), end: moment() }


                if (symptom.start) {               
                    if (userSymptons[symptom.identifier].start.isSameOrAfter(symptom.start.toDate())) {
                        userSymptons[symptom.identifier].start = moment(symptom.start.toDate())
                    }
                }

                if (symptom.end) {
                    if (userSymptons[symptom.identifier].end.isSameOrBefore(symptom.end.toDate())) {
                        userSymptons[symptom.identifier].end = moment(symptom.end.toDate())
                    }
                }
            })
        }
        }
    });

    for (const identifier in userSymptons) {
        if (userSymptons.hasOwnProperty(identifier)) {
            const sympton = userSymptons[identifier];
            points += calculatePointOfSympton(identifier, sympton.start, sympton.end)
        }
    }

    return points
}



const calculatePointOfSympton = (identifier, start, end) => {
    const valueToMax = 5
    let frequency

    frequency = calculateFrequency(start, end)

    switch (identifier) {
        case 'Febre': {
            return calculatePoints(frequency, valueToMax, 10, 5)
        }
        case 'Dor de Cabeça': {
            return calculatePoints(frequency, valueToMax, 3, 1)
        }
        case 'Produção de catarro': {
            return calculatePoints(frequency, valueToMax, 3, 1)
        }
        case 'Dor de Garganta': {
            return calculatePoints(frequency, valueToMax, 3, 1)
        }
        case 'Desmaio': {
            return calculatePoints(frequency, valueToMax, 3, 1)
        }
        case 'Tosse': {
            return calculatePoints(frequency, valueToMax, 6, 3)
        }
        case 'Falta de Ar': {
            return calculatePoints(frequency, valueToMax, 20, 10)
        }
        case 'Dor no Corpo': {
            return calculatePoints(frequency, valueToMax, 3, 1)
        }
        case 'Diarréia': {
            return calculatePoints(frequency, valueToMax, 2, 1)
        }
        case 'Cansaço': {
            return calculatePoints(frequency, valueToMax, 4, 2)
        }
        case 'Fadiga': {
            return calculatePoints(frequency, valueToMax, 4, 2)
        }
        case 'Falta de apetite': {
            return calculatePoints(frequency, valueToMax, 2, 1)
        }
        case 'Confusão': {
            return calculatePoints(frequency, valueToMax, 3, 1)
        }
        case 'Tonturas': {
            return calculatePoints(frequency, valueToMax, 3, 1)
        }
        case 'Dor no Peito': {
            return calculatePoints(frequency, valueToMax, 3, 1)
        }
        case 'Tosse com sangue': {
            return calculatePoints(frequency, valueToMax, 4, 2)
        }
        case 'Náusea ou vômito': {
            return calculatePoints(frequency, valueToMax, 3, 1)
        }
        case 'Dor de barriga': {
            return calculatePoints(frequency, valueToMax, 2, 1)
        }
        case 'Olhos vermelhos': {
            return calculatePoints(frequency, valueToMax, 3, 1)
        }
        case 'Perda de olfato': {
            return calculatePoints(frequency, valueToMax, 4, 2)
        }

        default:
            return 0
    }
}

const calculateFrequency = (start, end) => {
    const betweenDays = 14
    const momentStart = moment(start)
    const momentEnd = moment(end)


    const frequency = momentEnd.diff(momentStart, 'days')
    return frequency
}




const calculatePoints = (value, valueToMax, max, min) => {
    if (value === 0)
        return 0

    if (value > max)
        return max

    const points = Math.round(min + ((max - min) / (valueToMax - 1) * (value - 1)))

    return points
}

exports.getContagionRisk = (points) => {
    if (points <= 9) {
        return contagionRiskTypes.LOW
    } else if (points > 9 && points <= 19) {
        return contagionRiskTypes.MEDIUM
    }

    return contagionRiskTypes.HIGH
}

exports.getRisk = (contagionRisk, aggravationRisk) => {
    if (aggravationRisk === aggravationRiskTypes.HIGH)
        return riskProfileTypes.RED

    switch (contagionRisk) {
        case contagionRiskTypes.LOW: {
            return riskProfileTypes.GREEN
        }
        case contagionRiskTypes.MEDIUM: {
            return riskProfileTypes.YELLOW
        }
        case contagionRiskTypes.HIGH: {
            return riskProfileTypes.RED
        }

        default: {
            return riskProfileTypes.GREEN
        }
    }


}