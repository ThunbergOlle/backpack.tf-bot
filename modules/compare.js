const api = require("../api");

module.exports.compare = (botitems, callback) => {
    let listedItems;
    api.checkMyListings((err, res) => {
        if(err) console.log(err);
        listedItems = JSON.parse(res);
        listedItems = listedItems.listings;
        console.log(listedItems);
        // After checked the listings on the market
        for(let i = 0; i < listedItems.length; i++){
            for(let x = 0; x < botitems.length; x++){
                if(botitems[x] === listedItems[i].item.id){
                    console.log(botitems[x]);
                    return callback(null, listedItems[i]);
                }else {
                    console.log("False");
                    return;
                }
            }
        }
    });
}