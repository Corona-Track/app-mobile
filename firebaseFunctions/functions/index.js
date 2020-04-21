const functions = require('firebase-functions');
const admin = require('firebase-admin');
const RiskProfileService = require('./services/RiskProfileService');
const riskProfileTypes = require('./utils/enums/riskProfileTypes');
const aggravationRiskTypes = require('./utils/enums/aggravationRiskTypes');

var moment = require('moment');

var _ = require('lodash');

admin.initializeApp(functions.config().firestore)


const firestore = admin.firestore()


exports.onUserUpdate = functions.firestore.document('/users/{userId}')
    .onWrite(async (change, context) => {
        const oldUserData = change.before.data()
        const newUserData = change.after.data()

        const isUserDeleted = !newUserData
        if (isUserDeleted)
            return null

        if (oldUserData) {
            const isSameAnswer = verifyIsSameAnswer(oldUserData, newUserData)

            if (isSameAnswer) {
                return null
            }

        }

        let symptomData = await getSymptomByUser(context.params.userId)

        const { comorbiditiesSelected } = newUserData.question



        const riskProfileQuestionPoints = RiskProfileService.calculateRiskProfileQuestionsPoints(newUserData.question)

        let riskProfileSymptonsPoints = 0
        if (symptomData)
            riskProfileSymptonsPoints = RiskProfileService.calculateRiskProfileSymptonsPoints(symptomData[0].symptons, symptomData[0].hasSymptoms)


        let contagionRisk = RiskProfileService.getContagionRisk(riskProfileQuestionPoints + riskProfileSymptonsPoints)


        let aggravationRisk = aggravationRiskTypes.LOW

        if (comorbiditiesSelected) {
            if (comorbiditiesSelected.length > 1) {
                aggravationRisk = aggravationRiskTypes.HIGH
            }

            if (!comorbiditiesSelected.includes("Nenhuma das opções")) {
                aggravationRisk = aggravationRiskTypes.HIGH
            }
        }

        const riskProfile = RiskProfileService.getRisk(contagionRisk, aggravationRisk)

        return change.after.ref.set({
            riskProfile: riskProfile,
            aggravationRisk: aggravationRisk,
            contagionRisk: contagionRisk
        }, { merge: true });
    })



exports.onSymptomsUpdate = functions.firestore.document('/symptoms/{symptomsId}')
    .onWrite(async (change, context) => {
        const olSymptomsData = change.before.data()
        const newSymptomsData = change.after.data()


        const isSymptomsDeleted = !newSymptomsData
        if (isSymptomsDeleted)
            return null

        if (olSymptomsData) {
            const isSameSymptonsList = verifyIsSymptonsList(olSymptomsData, newSymptomsData)

            if (isSameSymptonsList) {
                return null
            }
        }

        const userRef = firestore.collection('users').doc(newSymptomsData.user_id)

        let getDoc = await userRef.get()

        let userData = getDoc.data()

        let riskProfile

        const { comorbiditiesSelected } = userData

        if (comorbiditiesSelected) {
            if (comorbiditiesSelected.length > 1)
                riskProfile = riskProfileTypes.RED

            if (!comorbiditiesSelected.includes("Nenhuma das opções"))
                riskProfile = riskProfileTypes.RED
        } else {
            const riskProfileQuestionPoints = RiskProfileService.calculateRiskProfileQuestionsPoints(userData.question)
            const riskProfileSymptonsPoints = RiskProfileService.calculateRiskProfileSymptonsPoints(newSymptomsData.symptons, newSymptomsData.hasSymptoms)
            riskProfile = RiskProfileService.getRisk(riskProfileQuestionPoints + riskProfileSymptonsPoints)
        }

        return userRef.set({
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
    if (oldUserData.symptons && newUserData.symptons) {
        const isSameSymptonsList = _.isEqual(oldUserData.symptons, newUserData.symptons)
        if (isSameSymptonsList) return true
    }

    return false
}

const getSymptomByUser = (userId) => {
    return new Promise((resolve, reject) => {

        firestore
            .collection('symptoms')
            .where('user_id', '==', userId)
            .get()
            .then(res => {
                if (!res.empty) {
                    let result = res.docs.map(item => item.data());
                    result = result.sort(
                        (a, b) =>
                            moment(b.created_at.toDate()).unix() -
                            moment(a.created_at.toDate()).unix(),
                    );
                    resolve(result);
                }
                resolve(null);
                return null
            })
            .catch(error => {
                reject(new Error(error));
            });
    });
};





