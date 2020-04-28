import firestore from '@react-native-firebase/firestore';

export const saveUserPosition = userParams => {
    return new Promise((resolve, reject) => {
        firestore().collection('usersposition')
            .doc(userParams.userId)
            .set(userParams, { merge: true })
            .then(res => { resolve(res); })
            .catch(error => { reject(new Error(error)); });
    });
};

export const getCitiesAroundUser = async userPosition => {
    return new Promise((resolve, reject) => {
        let precision = 0.5;
        let citiesCollection = firestore().collection('cities');
        let citiesQuery = citiesCollection
            .where('longitude', '>=', (userPosition.longitude - precision))
            .where('longitude', '<=', (userPosition.longitude + precision));
        citiesQuery
            .get()
            .then(res => {
                let citiesPositionList = [];
                res.docs.forEach(doc => {
                    let citiesPosition = doc.data();
                    if (!(citiesPosition.latitude >= (userPosition.latitude - precision) &&
                        citiesPosition.latitude <= (userPosition.latitude + precision)))
                        return;
                    citiesPositionList.push(citiesPosition);
                });
                return resolve(citiesPositionList);
            })
            .catch(error => { reject(new Error(error)); });
    });
};
