function newLatLon(t){
    t.features.forEach(feature => {
        feature.properties.lat = feature.geometry.coordinates[0]
        feature.properties.lon = feature.geometry.coordinates[1]
})
    return t;
}

module.exports = {newLatLon};