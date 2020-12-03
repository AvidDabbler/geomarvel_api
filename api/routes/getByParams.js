var express = require('express');
var router = express.Router();
const trees = require("../data/liquidambarTrees_DC.json");

const dataRequest = async (req, res)=>{
    console.log(res.headers);

    const inList = (list, features, field) => {
        features.filter((i, n) => {
            if(list.indexOf(n.properties[field]) >= 0) {
                return 
            }
        })
    }

    const treeFilter = (t) => {
        const treeList = req.headers.trees;
        const wardList = req.headers.wards;
        let tFiltered;

        // kick out all features if tree or ward query not in header
        if(!treeList && !wardList){
            console.log('here')
            console.log(treeList)
            return t
        }
        // filter by wards. query should be a list of wards
        if (wardList) {
            t['features'] = () => {
                t.features.filter((i, n) => {
                    if(treeList.indexOf(n.properties.ward) >= 0) {
                        return n
                    }
                })
            }
        }
        // filter by tree condition
        if (treeList) {

            console.log(treeList.split(','))

            t['features'] = 
                    t['features'].filter((i) => {
                        // console.log(i.properties)
                        if(treeList.split(',').indexOf(i.properties.CONDITION) >= 0) {
                            return i
                        }
                    })
                }
        
        return t
    }

    let data = treeFilter(trees)
    res.send({trees: data})
    
};

/* GET home page. */
router.get('/', function(req, res, next) {
    dataRequest(req, res);
});


module.exports = router;
