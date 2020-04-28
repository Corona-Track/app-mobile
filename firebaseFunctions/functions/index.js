const functions = require('firebase-functions');
const admin = require('firebase-admin');
const RiskProfileService = require('./services/RiskProfileService');
const riskProfileTypes = require('./utils/enums/riskProfileTypes');
const aggravationRiskTypes = require('./utils/enums/aggravationRiskTypes');

var moment = require('moment');
const HeatMapService = require('./services/heatmapservice');

var _ = require('lodash');

admin.initializeApp(functions.config().firestore)


const firestore = admin.firestore();



exports.onUserUpdate = functions.firestore.document('/users/{userId}')
    .onWrite(async (change, context) => {
        const oldUserData = change.before.data()
        const newUserData = change.after.data()
        const isUserDeleted = !newUserData && !oldUserData.question
        if (isUserDeleted)
            return null

        if (oldUserData) {
            const isSameData = _.isEqual(oldUserData, newUserData);

            if (isSameData) {
                return null
            }
        }
        let userData
        if (!newUserData) {
            userData = oldUserData
        } else {
            userData = newUserData
        }

        let symptomData = await getSymptomByUser(context.params.userId)

        const { comorbiditiesSelected, contaminated } = userData.question
        let stillContamined = false


        const riskProfileQuestionPoints = RiskProfileService.calculateRiskProfileQuestionsPoints(userData.question)

        let riskProfileSymptonsPoints = 0
        if (symptomData)
            riskProfileSymptonsPoints = RiskProfileService.calculateRiskProfileSymptonsPoints(symptomData)


        let contagionRiskPoints = riskProfileQuestionPoints + riskProfileSymptonsPoints

        if (contaminated) {
            stillContamined = checkCoronaTest(userData.question)
            if (stillContamined && riskProfileSymptonsPoints > 0) {
                contagionRiskPoints = 149
            }
        }
        let contagionRisk = RiskProfileService.getContagionRisk(contagionRiskPoints)

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

function checkCoronaTest(questions) {
    const { testDate, testResult } = questions
    if (testResult === true) {
        const betweenDays = 20
        const momentTestDate = moment(testDate.toDate())
        const howManyDaysFromTest = moment().diff(momentTestDate, 'days')

        if (howManyDaysFromTest < betweenDays) {
            return true
        }
    }
    return false
}



exports.onSymptomsUpdate = functions.firestore.document('/symptoms/{symptomsId}')
    .onWrite(async (change, context) => {
        const olSymptomsData = change.before.data()
        const newSymptomsData = change.after.data()


        const isSymptomsDeleted = !newSymptomsData && !olSymptomsData.symptons
        if (isSymptomsDeleted)
            return null

        if (olSymptomsData) {
            const isSameData = _.isEqual(olSymptomsData, newSymptomsData);

            if (isSameData) {
                return null
            }
        }

        let symptomData
        if (!newSymptomsData) {
            symptomData = olSymptomsData
        } else {
            symptomData = newSymptomsData
        }

        const userRef = firestore.collection('users').doc(symptomData.user_id)

        let getDoc = await userRef.get()

        let userData = getDoc.data()

        let symptomsData = await getSymptomByUser(symptomData.user_id)



        const { comorbiditiesSelected, contaminated } = userData.question
        let stillContamined = false

        const riskProfileQuestionPoints = RiskProfileService.calculateRiskProfileQuestionsPoints(userData.question)
        const riskProfileSymptonsPoints = RiskProfileService.calculateRiskProfileSymptonsPoints(symptomsData)


        let contagionRiskPoints = riskProfileQuestionPoints + riskProfileSymptonsPoints

        if (contaminated) {
            stillContamined = checkCoronaTest(userData.question)
            if (stillContamined && riskProfileSymptonsPoints > 0) {
                contagionRiskPoints = 149
            }
        }

        let contagionRisk = RiskProfileService.getContagionRisk(contagionRiskPoints)



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


        return userRef.set({
            riskProfile: riskProfile,
            aggravationRisk: aggravationRisk,
            contagionRisk: contagionRisk
        }, { merge: true });

    })


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

exports.getMapElementsByPosition = functions.https.onRequest(async (req, res) => {
    try {
        let { markerCentral, markerNorthWest, markerSouthWest, markerNorthEast, markerSouthEast } = req.body;
        //Check for null because it can use negative values
        if (!(markerCentral !== null &&
            markerNorthWest !== null &&
            markerSouthWest !== null &&
            markerNorthEast !== null &&
            markerSouthEast !== null))
            return res.sendStatus(500);
        let region = {
            markerCentral,
            markerNorthWest,
            markerSouthWest,
            markerNorthEast,
            markerSouthEast
        };
        let users = await getUsersInsideRange(region);
        let citiesContent = await getAllCities(region);
        let convertedUsers = HeatMapService.populateUserCity(citiesContent.allCities, users);
        let gridSquares = HeatMapService.generateGrid(region, citiesContent, convertedUsers);
        let squaresToCalculate = HeatMapService.processGridSquares(gridSquares);
        let calculatedSquares = HeatMapService.calculateSquares(squaresToCalculate);
        return res.status(200).send(JSON.stringify(calculatedSquares));
    } catch (e) {
        return res.statusCode(500);
    }
});

const getUsersInsideRange = async region => {
    let { markerNorthWest, markerSouthWest, markerNorthEast } = region;
    return new Promise((resolve, reject) => {
        let usersPositionCollection = firestore.collection('usersposition');
        let usersQuery = usersPositionCollection
            .where('longitude', '>=', markerNorthWest.longitude)
            .where('longitude', '<=', markerNorthEast.longitude);
        usersQuery
            .get()
            .then(res => {
                let usersPositionList = [];
                res.docs.forEach(doc => {
                    let userPosition = doc.data();
                    if (!(userPosition.latitude >= markerSouthWest.latitude &&
                        userPosition.latitude <= markerNorthWest.latitude))
                        return;

                    if (userPosition.latitude === null || userPosition.longitude === null)
                        return;

                    if (userPosition.contaminated) {
                        usersPositionList.push(userPosition);
                        return;
                    }
                    if (userPosition.contagionRisk && userPosition.contagionRisk === 3) {
                        usersPositionList.push(userPosition);
                        return;
                    }
                });
                return resolve(usersPositionList);
            })
            .catch(error => { reject(new Error(error)); });
    });
};

const getAllCities = async region => {
    let { markerNorthWest, markerSouthWest, markerNorthEast } = region;
    return new Promise((resolve, reject) => {
        let citiesCollection = firestore.collection('cities');
        citiesCollection.get()
            .then(res => {
                let allCities = [];
                let citiesInsideRange = [];
                res.docs.forEach(doc => {
                    let cityPosition = doc.data();
                    allCities.push(cityPosition);
                    if (cityPosition.latitude >= markerSouthWest.latitude &&
                        cityPosition.latitude <= markerNorthWest.latitude &&
                        cityPosition.longitude >= markerNorthWest.longitude &&
                        cityPosition.longitude <= markerNorthEast.longitude)
                        citiesInsideRange.push(cityPosition);
                });
                return resolve({
                    allCities: allCities,
                    insideRange: citiesInsideRange
                });
            })
            .catch(error => { return reject(new Error(error)); });
    });
};