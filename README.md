# DC Trees Api
## About
This Api was written to serve up a geojson file that has all of the DC Trees and its associated attributes touching on condition, built environment, and inspection notes. 

This api has 2 different calls that can be made:
- /getAll
- /getByParams

# /getAll
The /getAll command will return all of the features from the geojson file.

# /getByParams
The /getAll command allows for the user to return a filtered set of trees based on the Condition of the trees. These conditions need to be passed in the header of the request as a string. If multiple tree conditions are needed they should be sent as a string separated by a comma is not space or case sensitive

Condition Choices:
- Exellent
- Good
- Fair
- Poor

***Axios Example***
```
    var axios = require('axios');

    var config = {
        method: 'get',
        url: 'http://localhost:3000/getByParams',
        headers: { 
            'condition': 'good, Fair,POOR'
        }
    };

    axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
    console.log(error);
    });
```