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
- Dead

***Axios Example***
```
    var axios = require('axios');

    var config = {
        method: 'get',
        url: 'http://localhost:3000/getByParams?CONDITION=Excellent,Poor,Dead&WARD=1,2,3,4,5,6,7,8,9',
    };

    axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
    console.log(error);
    });
```

# Utilities
The utility functions that were turned on for this API are contained in `api/functions/utility.js`. There are three different functions contained in this file:
- newLatLon() - Makes a copy of the feature's xy coordinates out from the geometry key and into the properties key so that they can be used in the arcgis layers popup as it pulls in that key by default. 
- orderByInspectionDate() - A default sort to pull back the oldest last inspection date (feature.properties.CONDITIODT).
- formatDates() - Formatting a list of dates from 

All three of these utilities are run on each request and cannot be configured at this time


# Deployment
This app was deployed on AWS ec2.

- create ec2
- install dependencies

Git
```
sudo yum install git
```

nodejs
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node
```

clone repo
```
git clone https://github.com/AvidDabbler/geomarvel_api.git
```

npm install
```
cd geomarvel_api/api
npm install
```

crontab setup
```
crontab -e
@reboot cd geomarvel_api/api && npm start
```