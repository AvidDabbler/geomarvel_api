function newLatLon(t){
    t.features.forEach(feature => {
        feature.properties.lat = feature.geometry.coordinates[0]
        feature.properties.lon = feature.geometry.coordinates[1]
})
    return t;
};


function orderByInspectionDate(t){
    t.features.sort((a, b)=>{
        return a.properties.CONDITIODT - b.properties.CONDITIODT
    })
    return t
};

function formatDates(t){
    let fields = ['DATE_PLANT','CONDITIODT', 'LAST_EDI_1'];

    t.features.forEach(tree =>{
        fields.forEach(field=>{
            let d = new Date(tree.properties[field]);
            tree.properties[field] = (d.getMonth()+1) + '/' + d.getDate() + '/' + d.getFullYear()
        })
    })
    return t
}

module.exports = {newLatLon, orderByInspectionDate, formatDates};