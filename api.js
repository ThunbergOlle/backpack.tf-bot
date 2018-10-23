const request = require('request');
module.exports.checkMyListings = (callback) => {
    request("https://backpack.tf/api/classifieds/listings/v1?token=womxL1NkFQeyH6lLWD6UVn1nVrqELxbV7h7itFmf79U=", null, (err, res, body) => {
        if(err) callback(err);
        callback(null, body);
    });
}
