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


exports.generateGrid = (region, citiesContent, convertedUsers) => {
    debugger;
    let totalColumns = 6;
    let { markerCentral,
        markerNorthWest,
        markerSouthWest,
        markerNorthEast,
        markerSouthEast } = region;
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
        squareSide: squareSide,
        citiesContent,
        convertedUsers
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

const generateCustomGrid = ({
    initialPosition,
    totalColumns,
    totalLines,
    squareSide,
    citiesContent,
    convertedUsers }) => {

    let markers = [];
    for (var i = 0; i < totalLines; i++) {
        let processingParams = {
            totalColumns,
            initialPosition: {
                latitude: initialPosition.latitude,
                longitude: initialPosition.longitude,
            },
            squareSide,
            citiesContent,
            convertedUsers
        };
        let generated = generateLine(processingParams);
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

const generateLine = ({
    totalColumns,
    initialPosition,
    squareSide,
    citiesContent,
    convertedUsers }) => {
    let squares = [];
    let currentPosition = initialPosition;
    debugger;
    for (var i = 0; i < totalColumns; i++) {
        let position = {
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
        };
        let square = {
            column: i,
            northWest: null,
            northEast: null,
            southWest: null,
            southEast: null,
            internalCircleDiameter: {
                degress: null,
                meters: null
            },
            central: null,
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
        square.internalCircleDiameter = calculateDistanceBetweenToPoints(square.southWest, square.northEast);
        //Central
        square.central = {
            latitude: position.latitude - (squareSide / parseFloat(2)),
            longitude: position.longitude + (squareSide / parseFloat(2)),
        };
        //Verify Users inside square
        let contentInside = verifyContentInsideSquare(square, convertedUsers, citiesContent.insideRange);
        square.users = contentInside.users;
        square.cities = contentInside.cities;
        currentPosition.longitude += squareSide;
        squares.push(square);
    }
    return squares;
};


const calculateDistanceBetweenToPoints = (firstPosition, secondPosition) => {
    let xLngCel = Math.pow((secondPosition.longitude - firstPosition.longitude), 2);
    let yLatCel = Math.pow((secondPosition.latitude - firstPosition.latitude), 2);
    let pythagoras = Math.sqrt(xLngCel + yLatCel)
    //Meters conversion
    const earthRadius = 6371000;
    let earthConversion = 2 * Math.PI * earthRadius;
    return {
        degress: pythagoras,
        meters: (pythagoras * earthConversion) / 360
    };
};


const verifyContentInsideSquare = (square, convertedUsers, citiesInsideRange) => {
    debugger;
    let content = {
        users: [],
        cities: []
    };

    if (!convertedUsers || (convertedUsers && convertedUsers.length === 0))
        convertedUsers = [];

    let { southWest, northWest, northEast } = square;
    let usersInsideSquareRange = convertedUsers.filter(user => {
        return user.latitude >= southWest.latitude &&
            user.latitude <= northWest.latitude &&
            user.longitude >= northWest.longitude &&
            user.longitude <= northEast.longitude
    });

    if (!usersInsideSquareRange || (usersInsideSquareRange && usersInsideSquareRange.length === 0))
        usersInsideSquareRange = [];

    content.users = usersInsideSquareRange;

    if (!citiesInsideRange || (citiesInsideRange && citiesInsideRange.length === 0))
        citiesInsideRange = [];

    let citiesInsideSquareRange = citiesInsideRange.filter(city => {
        return city.latitude >= southWest.latitude &&
            city.latitude <= northWest.latitude &&
            city.longitude >= northWest.longitude &&
            city.longitude <= northEast.longitude
    });

    if (!citiesInsideSquareRange || (citiesInsideSquareRange && citiesInsideSquareRange.length === 0))
        citiesInsideSquareRange = [];
    content.cities = citiesInsideSquareRange;

    if (!(content.users && content.users.length > 0))
        return content;

    content.users.forEach(user => {
        let cityPosition = content.cities.findIndex(city => city.ibgeid === user.city.ibgeid);
        if (cityPosition === -1)
            content.cities.push(user.city);
    });
    return content;
};

