export const searchNearestCity = (userPosition, cities) => {
    let nearestCity = null;
    let first = true;
    cities.forEach(city => {
        city.distance = calculateDistanceBetweenToPoints(userPosition, {
            latitude: city.latitude,
            longitude: city.longitude
        });
        if (first) {
            nearestCity = city;
            return;
        }
        if (city.distance < nearestCity.distance)
            nearestCity = city;
    });
    return nearestCity;
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