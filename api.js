const request = require('request');
const config = require('./config.json')
module.exports.checkMyListings = (callback) => {
    request("https://backpack.tf/api/classifieds/listings/v1?token="+ config.api_token, null, (err, res, body) => {
        if(err) callback(err);
        callback(null, body);
    });
}
module.exports.getItemPrice = (item, callback) => {

    request("not added yet"+ config.api_key, null, (err, res, body) => {
        if(err) callback(err);
        callback(null, body);
    });
}