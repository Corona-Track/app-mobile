let firestore = null;

exports.populateUserCity = (cities, users) => {
    let convertedUsers = [];
    for (var i = 0; i < users.length; i++) {
        let currentUser = users[i];
        let currentCity = cities.filter(city => {
            return parseInt(city.ibgeid) === parseInt(currentUser.cityReference);
        });
        if (currentCity)
            currentCity = currentCity[0];
        currentUser.city = currentCity;
        convertedUsers.push(currentUser);
    }
    return convertedUsers;
};

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
    debugger;
    let totalColumns = 6;
    let { markerCentral,
        markerNorthWest,
        markerSouthWest,
        markerNorthEast,
        markerSouthEast } = params;
    let horizontalDistance = getLineDistance(markerNorthWest, markerNorthEast);
    let squareSide = horizontalDistance / parseFloat(totalColumns);
    let verticalDistance = getColumnDistance(markerNorthWest, markerSouthWest);
    let totalLines = Math.floor(verticalDistance / squareSide);

    // let initialPosition = {
    //     latitude: parseFloat(markerNorthWest.latitude),
    //     longitude: parseFloat(markerNorthWest.longitude)
    // };
    // for (var i = 0; i < totalLines; i++) {
    //     let generated = generateLine(totalColumns, {
    //         latitude: initialPosition.latitude,
    //         longitude: initialPosition.longitude,
    //     }, squareSide);
    //     initialPosition = {
    //         latitude: initialPosition.latitude - squareSide,
    //         longitude: initialPosition.longitude,
    //     };
    //     markers = [...markers, ...generated];
    // }
    // return markers;

    let firstGrid = {
        initialPosition: {
            latitude: parseFloat(markerNorthWest.latitude),
            longitude: parseFloat(markerNorthWest.longitude)
        },
        totalColumns: totalColumns,
        totalLines: totalLines,
        squareSide: squareSide
    };
    return generateCustomGrid(firstGrid);

    // let secondGrid = {
    //     initialPosition: {
    //         latitude: parseFloat(markerNorthWest.latitude),
    //         longitude: parseFloat(markerNorthWest.longitude) + (squareSide / parseFloat(2))
    //     },
    //     totalColumns: totalColumns - 1,
    //     totalLines: totalLines,
    //     squareSide: squareSide
    // };
    // return generateCustomGrid(secondGrid);

    // let thirdGrid = {
    //     initialPosition: {
    //         latitude: parseFloat(markerNorthWest.latitude) - (squareSide / parseFloat(2)),
    //         longitude: parseFloat(markerNorthWest.longitude)
    //     },
    //     totalColumns: totalColumns,
    //     totalLines: totalLines - 1,
    //     squareSide: squareSide
    // };
    // return generateCustomGrid(thirdGrid);

    // let fourGrid = {
    //     initialPosition: {
    //         latitude: parseFloat(markerNorthWest.latitude) - (squareSide / parseFloat(2)),
    //         longitude: parseFloat(markerNorthWest.longitude) + (squareSide / parseFloat(2))
    //     },
    //     totalColumns: totalColumns - 1,
    //     totalLines: totalLines - 1,
    //     squareSide: squareSide
    // };
    // return generateCustomGrid(fourGrid);
};

const generateCustomGrid = ({ initialPosition, totalColumns, totalLines, squareSide }) => {
    let markers = [];
    for (var i = 0; i < totalLines; i++) {
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

const getColumnDistance = (northPosition, southPosition) => {
    let southConverted = parseFloat(southPosition.latitude);
    let northConverted = parseFloat(northPosition.latitude);
    return northConverted - southConverted;
};

const generateLine = (totalColumns, initialPosition, squareSide) => {
    let squares = [];
    let currentPosition = initialPosition;
    debugger;
    for (var i = 0; i < totalColumns; i++) {
        let position = {
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
        };
        let square = {
            northWest: null,
            northEast: null,
            southWest: null,
            southEast: null,
        };
        //NorthWest
        square.northWest = {
            latitude: position.latitude,
            longitude: position.longitude,
        };
        //NorthEast
        square.northEast = {
            latitude: position.latitude,
            longitude: position.longitude + squareSide,
        };
        //SouthWest
        square.southWest = {
            latitude: position.latitude - squareSide,
            longitude: position.longitude,
        };
        //SouthEast
        square.southEast = {
            latitude: position.latitude - squareSide,
            longitude: position.longitude + squareSide,
        };
        currentPosition.longitude += squareSide;
        squares.push(square);
    }
    return squares;
};

