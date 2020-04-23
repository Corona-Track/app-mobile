let firestore = null;

exports.processGridSquares = (gridsSquares) => {
    //Removing empty grids
    let notEmptySquares = gridsSquares.filter(square => square.users.length > 0);
    if (!notEmptySquares || (notEmptySquares && notEmptySquares.length === 0))
        return [];
    let squaresToProcess = sortUsersInsideSquares(notEmptySquares);
    if (!squaresToProcess || (squaresToProcess && squaresToProcess.length === 0))
        return [];
    return processSquares(squaresToProcess);
};

const processSquares = squaresToProcess => {
    let squaresInProcessing = [...squaresToProcess];
    let squaresToCalculte = [];
    let isProcessing = true;
    while (isProcessing) {
        if (!squaresInProcessing || (squaresInProcessing && squaresInProcessing.length === 0)) {
            isProcessing = false;
            return;
        }
        let currentSquare = squaresInProcessing.first();
        let currentSquareUsers = currentSquare.users;
        squaresToCalculte.push(currentSquare);

        //Remove first
        squaresInProcessing.splice(0, 1);


        // let squaresUserRemoving = [...squaresInProcessing];


        // squaresUserRemoving.forEach(square => {

        // });




        /*
        Remover da squaresInProcessing o first;
        Remover usuários do first square dos outros squares to process
        remover os squares sem usuários
        ordenar e começar de novo
        
        */




    }
};

const removeUsersFromSquares = (users, squares) => {
    let squaresToReplace = [];

    for (var i = 0; i < squares.length; i++) {

        let usersAfterRemoving = [];

        squares[i].users.forEach(squareUsers => {
            squareUsers
        })

    }

    squares.forEach(square => {
        square.users.f
    });

};



const sortUsersInsideSquares = squares => {
    if (!squares)
        return [];
    return squares.sort((a, b) => {
        if (a.users.length > b.users.length)
            return -1;
        if (a.name < b.name)
            return 1;
        return 0;
    });
};

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

    let gridsSquares = [];
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
    let firstGridSquares = generateCustomGrid(firstGrid);
    gridsSquares = [...gridsSquares, ...firstGridSquares];

    let secondGrid = {
        initialPosition: {
            latitude: parseFloat(markerNorthWest.latitude),
            longitude: parseFloat(markerNorthWest.longitude) + (squareSide / parseFloat(2))
        },
        totalColumns: totalColumns - 1,
        totalLines: totalLines,
        squareSide: squareSide,
        citiesContent,
        convertedUsers
    };
    let secondGridSquares = generateCustomGrid(secondGrid);
    gridsSquares = [...gridsSquares, ...secondGridSquares];

    let thirdGrid = {
        initialPosition: {
            latitude: parseFloat(markerNorthWest.latitude) - (squareSide / parseFloat(2)),
            longitude: parseFloat(markerNorthWest.longitude)
        },
        totalColumns: totalColumns,
        totalLines: totalLines - 1,
        squareSide: squareSide,
        citiesContent,
        convertedUsers
    };
    let thirdGridSquares = generateCustomGrid(thirdGrid);
    gridsSquares = [...gridsSquares, ...thirdGridSquares];

    let fourthGrid = {
        initialPosition: {
            latitude: parseFloat(markerNorthWest.latitude) - (squareSide / parseFloat(2)),
            longitude: parseFloat(markerNorthWest.longitude) + (squareSide / parseFloat(2))
        },
        totalColumns: totalColumns - 1,
        totalLines: totalLines - 1,
        squareSide: squareSide,
        citiesContent,
        convertedUsers
    };
    let fourthGridSquares = generateCustomGrid(fourthGrid);
    gridsSquares = [...gridsSquares, ...fourthGridSquares];
    return gridsSquares;
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

