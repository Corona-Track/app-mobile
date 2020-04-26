const riskProfileTypes = require('../utils/enums/riskProfileTypes');
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
            points += calculatePoints(2, 5, 15, 1)
        if (someoneSuspicious === "doubt")
            points += calculatePoints(1, 5, 15, 1)
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



exports.calculateRiskProfileSymptonsPoints = (symptonsList, hasSymptoms) => {
    if (symptonsList) {
        let points = 0

        symptonsList.forEach(symptom => {

            points += calculatePointOfSympton(symptom.identifier, hasSymptoms, symptom.start, symptom.end)



        });
        return points
    }

    return 0
}

const calculatePointOfSympton = (identifier, hasSymptoms, start, end) => {
    const valueToMax = 5
    let frequency
    if (hasSymptoms) {
        const today = new Date()
        const startDate = start.toDate();
        frequency = calculateFrequency(startDate, today)
    } else {
        const startDate = start.toDate();
        const endDate = end.toDate();


        frequency = calculateFrequency(startDate, endDate)
    }
    switch (identifier) {
        case 'Febre': {
            return calculatePoints(frequency, valueToMax, 10, 5)
        }
        case 'Dor de cabeça': {
            return calculatePoints(frequency, valueToMax, 3, 1)
        }
        case 'Secreção nasal ou espirros': {
            return calculatePoints(frequency, valueToMax, 3, 1)
        }
        case 'Dor/irritação de garganta': {
            return calculatePoints(frequency, valueToMax, 3, 1)
        }
        case 'Tosse seca': {
            return calculatePoints(frequency, valueToMax, 6, 3)
        }
        case 'Dificuldade Respiratória': {
            return calculatePoints(frequency, valueToMax, 20, 10)
        }
        case 'Dores no corpo': {
            return calculatePoints(frequency, valueToMax, 3, 1)
        }
        case 'Diarreia': {
            return calculatePoints(frequency, valueToMax, 2, 1)
        }
        case 'Fadiga (Cansaço)': {
            return calculatePoints(frequency, valueToMax, 4, 2)
        }
        case 'Falta de apetite': {
            return calculatePoints(frequency, valueToMax, 2, 1)
        }
        case 'Confusão': {
            return calculatePoints(frequency, valueToMax, 3, 1)
        }
        case 'Tontura': {
            return calculatePoints(frequency, valueToMax, 3, 1)
        }
        case 'Dor no peito': {
            return calculatePoints(frequency, valueToMax, 3, 1)
        }
        case 'Tosse com sangue': {
            return calculatePoints(frequency, valueToMax, 4, 2)
        }
        case 'Náusea / vômito': {
            return calculatePoints(frequency, valueToMax, 3, 1)
        }
        case 'Dor abdominal': {
            return calculatePoints(frequency, valueToMax, 2, 1)
        }
        case 'Olhos vermelhos infeccionados': {
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

    const points = min + ((max - min) / (valueToMax - 1) * (value - 1))

    return points
}

exports.getRisk = (points) => {
    if (points <= 9) {
        return riskProfileTypes.GREEN
    } else if (points > 9 && points <= 19) {
        return riskProfileTypes.YELLOW
    }

    return riskProfileTypes.RED



}