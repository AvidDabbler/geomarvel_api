const http = require('http');

const trees = require('./api/routes/data')

const wardUrl = 'https://opendata.arcgis.com/datasets/0ef47379cbae44e88267c01eaec2ff6e_31.geojson'

const server = http.createServer((req, res) => {

    const url = req.url;
    const method = req.method;
    const data = req.headers.data;

    // switch(url){
    //     case url.startsWith('/trees'):
    //         trees.treeRequest(req)
    //         break;
    //     case '/wards':
    //         break;
    //     default:
    //         console.log('nothing');
    //         break;
    // }

    if(method != 'GET'){
        return;
    }
    console.log(url)
    if(!url.startsWith('/trees') && !url.startsWith('/wards')){
        console.log('wrong url')
        return;
    }
    else if (url.startsWith('/trees')) {
        trees.treeRequest(data)
    }
    else if (url.startsWith('/wards')) {

    }
    else{
        console.log('error')
    }

});

server.listen(3000)