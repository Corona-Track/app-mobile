exports.calculateSquares = squaresToCalculate => {
    let squaresToShow = [];
    if (!squaresToCalculate || (squaresToCalculate && squaresToCalculate.length === 0))
        return [];
    for (var i = 0; i < squaresToCalculate.length; i++) {
        let currentSquare = squaresToCalculate[i];
        let contaminatedAmount = 0;
        let suspiciousAmount = 0;
        currentSquare.users.forEach(user => {
            user.userId = null;
            user.latitude = null;
            user.longitude = null;
            if (user.contaminated) {
                contaminatedAmount++;
                return;
            }
            suspiciousAmount++;
        });
        //Every 5 suspects - 1 infected
        let suspiciousConverted = Math.floor(suspiciousAmount / 5);
        contaminatedAmount = contaminatedAmount + suspiciousConverted;
        if (contaminatedAmount === 0 && currentSquare.cities.length === 0)
            continue;
        //Circles rule
        let { meters } = currentSquare.internalCircleDiameter;
        let radiusKilometers = (meters / 1000);
        let circleArea = Math.PI * Math.pow(radiusKilometers, 2);
        let estimatedDensity = (contaminatedAmount / circleArea);
        //Cities rule
        let cityBasalDensity = 0;
        let citiesArea = 0;

        if (currentSquare.userCities.length === 0) {
            currentSquare.cities.forEach(city => {
                citiesArea += city.area;
                cityBasalDensity += (city.basalDensity * city.area);
            });
        } else {
            currentSquare.userCities.forEach(city => {
                citiesArea += city.area;
                cityBasalDensity += (city.basalDensity * city.area);
            });
        }

        let weightedAverage = (cityBasalDensity / citiesArea);

        let densityResultant = estimatedDensity + weightedAverage;

        let redCircleLimit = 0.00004;
        let yellowCircleMinimumLimit = 0.000016;
        let yellowCircleMaximumLimit = 0.00004;

        currentSquare.calculation = {
            contaminatedAmount,
            radiusKilometers,
            circleArea,
            estimatedDensity,
            citiesArea,
            cityBasalDensity,
            weightedAverage,
            densityResultant,
            redCircleLimit,
            yellowCircleMinimumLimit,
            yellowCircleMaximumLimit
        };
        if (densityResultant >= redCircleLimit) {
            currentSquare.circleColor = "red";
            squaresToShow.push(currentSquare);
            continue;
        }
        if (densityResultant > yellowCircleMinimumLimit && densityResultant < yellowCircleMaximumLimit) {
            currentSquare.circleColor = "yellow";
            squaresToShow.push(currentSquare);
            continue;
        }
    }
    return squaresToShow;
};

exports.processGridSquares = (gridsSquares) => {
    //Removing empty grids
    let notEmptySquares = removeEmptyUsersSquares(gridsSquares)
    let squaresToProcess = sortUsersInsideSquares(notEmptySquares);
    if (!squaresToProcess || (squaresToProcess && squaresToProcess.length === 0))
        return [];
    return processSquares(squaresToProcess);
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
        convertedUsers,
        color: "#00ADF1"
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
        convertedUsers,
        color: "#EE008C"
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
        convertedUsers,
        color: "#FEF102"
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
        convertedUsers,
        color: "#000000"
    };
    let fourthGridSquares = generateCustomGrid(fourthGrid);
    gridsSquares = [...gridsSquares, ...fourthGridSquares];
    return gridsSquares;
};

const processSquares = squaresToProcess => {
    let squaresInProcessing = [...squaresToProcess];
    let squaresToCalculte = [];
    let isProcessing = true;
    while (isProcessing) {
        if (!squaresInProcessing || (squaresInProcessing && squaresInProcessing.length === 0)) {
            isProcessing = false;
            continue;
        }
        let currentSquare = squaresInProcessing[0];
        let currentSquareUsers = currentSquare.users;
        let currentSquareCities = currentSquare.cities;
        squaresToCalculte.push(currentSquare);
        //Removing first
        squaresInProcessing.splice(0, 1);
        let squaresUserRemoving = [...squaresInProcessing];
        //Removing users from first square removed
        squaresInProcessing = removeUsersFromSquares(currentSquareUsers, currentSquareCities, squaresUserRemoving);
        //Removing empty square users
        squaresInProcessing = removeEmptyUsersSquares(squaresInProcessing);
        //Reorder to process
        squaresInProcessing = sortUsersInsideSquares(squaresInProcessing);
    }
    return squaresToCalculte;
};

const removeUsersFromSquares = (usersOfRemovedSquare, currentSquareCities, squares) => {
    let squaresToReplace = [];
    for (var i = 0; i < squares.length; i++) {
        let usersAfterRemoving = [];
        let citiesAfterRemoving = [];
        let currentSquare = squares[i];
        currentSquare.users.forEach(squareUser => {
            let userPosition = usersOfRemovedSquare.findIndex(user => { return user.userId === squareUser.userId });
            if (userPosition === -1)
                usersAfterRemoving.push(squareUser);
        });
        currentSquare.users = usersAfterRemoving;

        currentSquare.cities.forEach(squareCity => {
            let cityPosition = currentSquareCities.findIndex(city => { return city.ibgeid === squareCity.ibgeid });
            if (cityPosition === -1)
                citiesAfterRemoving.push(squareCity);
        });
        currentSquare.cities = citiesAfterRemoving;

        squaresToReplace.push(currentSquare);
    }
    return squaresToReplace;
};

const removeEmptyUsersSquares = gridsSquares => {
    let notEmptySquares = gridsSquares.filter(square => {
        return (square.users.length > 0 || (square.users.length === 0 && square.cities.length > 0))
    });
    if (!notEmptySquares || (notEmptySquares && notEmptySquares.length === 0))
        return [];
    return notEmptySquares;
}

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

const generateCustomGrid = ({
    initialPosition,
    totalColumns,
    totalLines,
    squareSide,
    citiesContent,
    convertedUsers,
    color }) => {

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
            convertedUsers,
            color
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
    convertedUsers,
    color }) => {
    let squares = [];
    let currentPosition = initialPosition;
    for (var i = 0; i < totalColumns; i++) {
        let position = {
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
        };
        let square = {
            column: i,
            color: color,
            northWest: null,
            northEast: null,
            southWest: null,
            southEast: null,
            internalCircleDiameter: {
                degress: null,
                meters: null
            },
            central: null,
            users: [],
            userCities: [],
            cities: []
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
        square.userCities = contentInside.userCities;
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
    let content = {
        users: [],
        cities: [],
        userCities: []
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
        let cityPosition = content.userCities.findIndex(city => city.ibgeid === user.city.ibgeid);
        if (cityPosition === -1)
            content.userCities.push(user.city);
    });
    return content;
};