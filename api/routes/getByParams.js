var express = require('express');
var router = express.Router();
const trees = require("../data/liquidambarTrees_DC.json");
const geojson = require("../data/geojson.json");

const dataRequest = async (req, res)=>{
    res.header('Access-Control-Allow-Origin', '*');

    console.log('wards', req.query.WARD)
    console.log('CONDITION', req.query.CONDITION)

    let query = req.query;
    let WARD = req.query.WARD ? req.query.WARD : '*' ;
    let CONDITION = req.query.CONDITION ? req.query.CONDITION : '*' ;

    console.log(query)

    const treeFilter = () => {
        let tFiltered = geojson;

        // kick out all features if tree or ward query not in header
        if(CONDITION == '*' && WARD == '*') {
            return {error: "You need to use either the Wards or Condition parameter"};
        }

        // split tree and condition parameters into lists
        let conditionList = CONDITION == "*" ? ["EXECELLENT","GOOD","FAIR","POOR"] : CONDITION.toUpperCase().replace(/\s/g, '').split(',');
        let wardList = WARD == "*" ? ['1','2','3','4','5','6','7','8','9'] : WARD.toString().replace(/\s/g, '').split(',');

        // filter by tree condition
        if (conditionList) {
            trees.features.forEach(feature => {
                if(conditionList.indexOf(feature.properties.CONDITION.toUpperCase()) >= 0) {
                    if(wardList.indexOf(feature.properties.WARD.toString()) >= 0) {
                        tFiltered.features.push(feature)
                    }
                }
            });
        }

        return tFiltered;
    }
    res.send(treeFilter());
};

/* GET home page. */
router.get('/', function(req, res, next) {
    dataRequest(req, res);
});


module.exports = router;
