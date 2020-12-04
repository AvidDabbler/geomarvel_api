const http = require('http');

const trees = require('./api/routes/data')

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
    if(!url.startsWith('/getAll') && !url.startsWith('/getByParams')){
        console.log('wrong url')
        return;
    }
    else if (url.startsWith('/getAll')) {
        trees.treeRequest(data)
    }
    else if (url.startsWith('/getByParams')) {

    }
    else{
        console.log('error')
    }

});

server.listen(3000)