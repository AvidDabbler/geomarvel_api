var express = require('express');
var router = express.Router();
const trees = require("../data/liquidambarTrees_DC.json");
const geojson = require("../data/geojson.json");

const dataRequest = async (req, res)=>{
    let query = req.query

    console.log(query)

    const treeFilter = () => {
        let tFiltered = geojson;

        // kick out all features if tree or ward query not in header
        if(!req.headers.condition && !req.headers.wards) {
            return {error: "You need to use either the Wards or Condition parameter"};
        }

        // split tree and condition parameters into lists
        let conditionList = req.headers.condition ? req.headers.condition.toUpperCase().replace(/\s/g, '').split(',') : undefined

        // filter by tree condition
        if (conditionList) {
            trees.features.forEach(feature => {
                if(conditionList.indexOf(feature.properties.CONDITION.toUpperCase()) >= 0) {
                    tFiltered.features.push(feature)
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
