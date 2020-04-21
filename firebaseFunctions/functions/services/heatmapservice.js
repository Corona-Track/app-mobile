// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// const firestore = admin.firestore();
// admin.initializeApp(functions.config().firestore)

// exports.getMapElements = async params => {
//     let docs = await getAllCities();
//     return docs;
// };

// const getAllCities = async () => {
//     let res = await firestore.collection('cities').get();
//     if (res.empty)
//         return [];
//     return res.docs;
// }


exports.generateGrid = params => {
    let totalColumns = 6;
    let { markerCentral,
        markerNorthWest,
        markerSouthWest,
        markerNorthEast,
        markerSouthEast } = params;
    let screenDistance = getLineDistance(markerNorthWest, markerNorthEast);
    let squareSide = screenDistance / parseFloat(totalColumns);
    let markers = [];
    let initialPosition = {
        latitude: parseFloat(markerNorthWest.latitude),
        longitude: parseFloat(markerNorthWest.longitude)
    };
    for (var i = 0; i < totalColumns; i++) {
        let generated = generateLine(totalColumns, {
            latitude: initialPosition.latitude,
            longitude: initialPosition.longitude,
        }, squareSide);
        initialPosition = {
            latitude: initialPosition.latitude - squareSide,
            longitude: initialPosition.longitude,
        };
        markers = [...markers, ...generated];
    }
    return markers;
};

const getLineDistance = (westLinePosition, eastLinePosition) => {
    let westConverted = parseFloat(westLinePosition.longitude);
    let eastConverted = parseFloat(eastLinePosition.longitude);
    return eastConverted - westConverted;
};

const generateLine = (totalColumns, initialPosition, squareSide) => {
    let columns = [];
    let currentPosition = initialPosition;
    debugger;
    for (var i = 0; i < totalColumns; i++) {
        console.log(currentPosition);

        let position = {
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
        };
        //NorthWest
        columns.push({
            latitude: position.latitude,
            longitude: position.longitude,
        });
        //NorthEast
        columns.push({
            latitude: position.latitude,
            longitude: position.longitude + squareSide,
        });
        //SouthWest
        columns.push({
            latitude: position.latitude - squareSide,
            longitude: position.longitude,
        });
        //SouthEast
        columns.push({
            latitude: position.latitude - squareSide,
            longitude: position.longitude + squareSide,
        });
        currentPosition.longitude += squareSide;
    }
    return columns;
};
