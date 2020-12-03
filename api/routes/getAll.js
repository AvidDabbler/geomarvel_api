var express = require('express');
var router = express.Router();
const trees = require("../data/liquidambarTrees_DC.json");

const dataRequest = async (req, res)=>{
    res.send({trees})
};

/* GET home page. */
router.get('/', function(req, res, next) {
    dataRequest(req, res);
});


module.exports = router;
