var express = require('express');
var router = express.Router();
const axios = require('axios');
const trees = "data\\liquidambarTrees_DC.geojson";

const treeRequest = (req)=>{
    console.log('trees');
    return req
};

/* GET home page. */
router.get('/', function(req, res, next) {
    treeRequest(req);
    console.log('here')
    res= req
    return res
});


module.exports = router;
