var express = require('express');
var router = express.Router();
const newLatLon = require('../functions/newLatLon');
const trees = require("../data/liquidambarTrees_DC.json");
const geojson = require("../data/geojson.json");

const dataRequest = async (req, res)=>{
    res.header('Access-Control-Allow-Origin', '*');

    console.log('wards', req.query.WARD)
    console.log('CONDITION', req.query.CONDITION)

    let query = req.query;
    let WARD = req.query.WARD ? req.query.WARD : ' ' ;
    let CONDITION = req.query.CONDITION ? req.query.CONDITION : ' ' ;

    console.log(query)

    let tFiltered = geojson;
    const treeFilter = async () => {

        // kick out all features if tree or ward query not in header
        if(CONDITION == '*' && WARD == '*') {
            return {error: "You need to use either the Wards or Condition parameter"};
        }

        // split tree and condition parameters into lists
        let conditionList = CONDITION.toUpperCase().replace(/\s/g, '').split(',');
        let wardList = WARD.replace(/\s/g, '').split(',');

        console.log('Condition List: ', conditionList)
        console.log('Ward List: ', wardList)
        // filter by tree condition
        tFiltered = geojson
        
        
        tFiltered['features'] = await trees.features.filter(item=>{
            let conditionCheck = CONDITION == '*' || conditionList.includes(item.properties.CONDITION.toUpperCase());
            // needs a better way
            let wardCheck = WARD == '*' || wardList.includes((item.properties.WARD).toString());
            if(conditionCheck && wardCheck){
                return true
            }
            else{
                return false
            }
        })
        console.log('items returned: ', tFiltered.features.length)
        return await tFiltered;
    }
    res.send(newLatLon.newLatLon(await treeFilter()));
    
    // reset with blank geojson object
    tFiltered = geojson;

};

/* GET home page. */
router.get('/', function(req, res, next) {
    dataRequest(req, res);
});


module.exports = router;
