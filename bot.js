const SteamUser = require('steam-user'); //Requires a module for login ect.
const SteamCommunity = require('steamcommunity'); //Requires a module for the steam communit

const api = require('./api.js');
const config = require('./config.json');
const client = new SteamUser(); //CREATES A NEW CLIENT FOR SteamTotp
const community = new SteamCommunity(); //Sets up new community.
const TradeOfferManager = require('steam-tradeoffer-manager'); //Requires a module for handling trade offers.
const SteamTotp = require('steam-totp'); //Requires a module
const colors = require('colors'); //Requires colors.
const compare = require('./modules/compare');
const tf2items = require('tf2-items');
const manager = new TradeOfferManager({ //CREATES A NEW MANAGER for trades
    steam: client,
    community: community,
    language: 'en'
    //SOME Basic information about trade offers
});
const logOnOptions = {
    accountName: config.username, //SETS THE ACCOUNT NAME TO THE CONFIG NAME
    password: config.password, //SETS THE ACCOUNT PASSWORD TO THE CONFIG PASSWORD
    twoFactorCode: SteamTotp.generateAuthCode(config.sharedSecret) //Generating the steam auth code.
};
client.logOn(logOnOptions); //Logged in with the login options.
console.log("Logging on with the config inside config.json");
client.on('loggedOn', () => { //When it's logged in.
    console.log(`Logged into steam with account: ${config.username}`.green); //Displays the name of the account that's logged in.
    console.log('\n');
    client.setPersona(SteamUser.Steam.EPersonaState.Online); //Shows that the bot is online.
});
client.on('webSession', (sessionid, cookies) => {
    manager.setCookies(cookies);
    community.setCookies(cookies);
    community.startConfirmationChecker(2000, config.identitySecret); 
});

processOffer = (offer) => {
    console.log("Offer recieved!");
    if (offer.isGlitched() || offer.state === 11) { //IF THE offer was glitched
        console.log("Offer was glitched and could not be processed correctly, so the offer was declined!");
        declineOffer(offer); //DECLINES OFFER
    } else {
        let partner = offer.partner.getSteamID64(); //Gets the partners steam64 id,
        let iToGive = offer.itemsToGive;
        let iToReceive = offer.itemsToReceive;
        console.log(iToGive);

        // COMPARE THE ITEMS IN THE TRADE WITH THE LISTED ITEMS
        let botItems = [];
        for(let i = 0; i < iToGive.length; i++){
            botItems.push(iToGive[i].id);
        }
        console.log(botItems);
        compare.compare(botItems, (err, item) => {
            if(err) console.log(err);
            let wantedUSD = item.currencies.usd; //THE SELLING PRICE IN USD ON BACKPACK.tf
            let wantedMetal = item.currencies.metal; //SELLING PRICE IN METAL ON BACKPACK.tf
            let wantedKeys = item.currencies.keys; //SELLING PRICE IN KEYS ON BACKPACK.tf
            console.log("Item user wants to buy is: " + item.item.id + " and we sell it for: " + wantedUSD);

            //Deal with the partners offer and values
            //GET THE ID OF SCRAP METAL AND THEN JUST CHECK IF IT INCLUDES THE AMOUNT OF SCRAP METAL AS NEEDED
            let metalAmount = 0;
            let keysAmount = 0;
            // Check the keys or the metal inside the trade offer.
            


        });




    }
}

manager.on('newOffer', (offer) => {
    processOffer(offer);
});