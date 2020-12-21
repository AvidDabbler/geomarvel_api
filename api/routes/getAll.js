
const utility = require('../functions/utility');
var express = require('express');
var router = express.Router();
const trees = require("../data/liquidambarTrees_DC.json");

const dataRequest = async (req, res)=>{
    res.header('Access-Control-Allow-Origin', '*');

    let dataLatLon = await utility.newLatLon(trees)
    // sort by newest inspection
    let dataOrder = await utility.orderByInspectionDate(dataLatLon) 
    // format dates to MM/DD/YYYY
    let dataFormat = await utility.formatDates(dataOrder);


    res.send(await dataFormat);
};

/* GET home page. */
router.get('/', function(req, res, next) {
    dataRequest(req, res);
});


module.exports = router;
