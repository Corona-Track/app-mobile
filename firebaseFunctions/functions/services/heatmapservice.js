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
    let generated = generateLine(totalColumns, initialPosition, squareSide);
    return [...markers, ...generated];
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
        columns.push({
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
        });
        // currentPosition.latitude += squareSide;
        currentPosition.longitude += squareSide;
    }
    return columns;
};
