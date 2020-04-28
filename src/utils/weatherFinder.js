const request = require('request')

const forecast = (latitude, longitude, callback) => {

    let darkSkyRequest = { url: 'https://api.darksky.net/forecast/21cd85e5ad75f5d79dbc68794b51cc71/' + latitude + ',' + longitude + '?units=si' , json:true} 

    
    // check if proxy settings are required
    try {  
        darkSkyRequest.proxy = require('../../../proxy-settings');
    } catch(err) {
        //console.log("Proxy settings not required");
    }    

    // deconstruct the response object to extract the 'body' element
    request( darkSkyRequest, (error, {body} = {}) => {

        if(error) {
            callback('Error connecting to DarkSky' , undefined)
        } else if(body.error) {
            callback('Connection OK : error is data returned' , undefined)
        } else {
            //console.log(body.daily.data[0])
            callback(undefined , {
                    summary : body.daily.data[0].summary,
                    temperature : body.currently.temperature,
                    precipProbability : body.currently.precipProbability, 
                    string : body.daily.data[0].summary + " The current temperature is " + body.currently.temperature + " degrees. There is a " + body.currently.precipProbability + "% chance of rain",
                    // TODO: Add more data here to display on web  
                }
            )}
    })
} 

module.exports = forecast