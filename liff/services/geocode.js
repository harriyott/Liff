module.exports = {

    Coordinates: function ( place, callback ) {

        var apiDetails = this.ApiDetails(),
            request = require('request'),
            url = apiDetails[0] + place + apiDetails[1];

        request(url, function(err, resp, body) {
            
            if ( err !== null ) {
                return false;
            }

            body = JSON.parse(body);

            callback( body.resourceSets[0].resources[0].point.coordinates[0], body.resourceSets[0].resources[0].point.coordinates[1] );
            
        });
        
        return place;
    },

    ApiDetails: function () {
        var apiDetails = require('../../data/mapapikey.json');
        return [apiDetails.url, apiDetails.key];
    }

};
