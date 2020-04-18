const functions = require('firebase-functions');
const admin = require('firebase-admin');
const RiskProfileService = require('./services/RiskProfileService');

var _ = require('lodash');

admin.initializeApp()


const firestore = functions.firestore


// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.onUserUpdate = firestore.document('/users/{userId}')
    .onWrite((change, context) => {
        const oldUserData = change.before.data()
        const newUserData = change.after.data()

        const isUserDeleted = !newUserData
        if (isUserDeleted)
            return null

        if (oldUserData) {
            const isSameAnswer = verifyIsSameAnswer(oldUserData, newUserData)
            const isSameSymptonsList = verifyIsSymptonsList(oldUserData, newUserData)

            if (isSameAnswer && isSameSymptonsList) {
                return null
            }

        }

        const riskProfileQuestionPoints = RiskProfileService.calculateRiskProfileQuestionsPoints(newUserData.question)
        const riskProfileSymptonsPoints = RiskProfileService.calculateRiskProfileSymptonsPoints(newUserData.symptonsList)


        const riskProfile = RiskProfileService.getRisk(riskProfileQuestionPoints + riskProfileSymptonsPoints)
        return change.after.ref.set({
            riskProfile: riskProfile
        }, { merge: true });
    })

const verifyIsSameAnswer = (oldUserData, newUserData) => {
    if (oldUserData.question && newUserData.question) {
        const isSameAnswer = _.isEqual(oldUserData.question, newUserData.question);
        if (isSameAnswer) return true
    }

    return false
}

const verifyIsSymptonsList = (oldUserData, newUserData) => {
    if (oldUserData.symptonsList && newUserData.symptonsList) {
        const isSameSymptonsList = _.isEqual(oldUserData.symptonsList, newUserData.symptonsList)
        if (isSameSymptonsList) return true
    }

    return false
}


