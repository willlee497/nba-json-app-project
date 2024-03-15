const https = require('https');

// function to retrieve JSON from an url
function getJSONFromEndpoint(endpoint, callback) {
    // https module gets data from url, called when response is recieved from server
    https.get(endpoint, (response) => {
        let data = '';
        // initialize data as empty string  

        // a chunk of data has been received and you append that into data until data is completely taken
        response.on('data', (chunk) => {
            data += chunk;
        });

        // event listener, function that waits for event to occur then responds. end event is emitted by response
        response.on('end', () => {
            try {
                // json parsing; parsing json data into javascript object
                // try and catch block (does code if error then goes to catch block)
                const json = JSON.parse(data);
                // parsed json object assigned to json
                callback(null, json);
                // indicating parsing was successful
            } catch (error) {
                callback(error, null);
                //error during parsing 
            }
        });
    }).on('error', (error) => {
        //error if server is unreachable, etc. informs if there is an error
        callback(error, null);
    });
}

// NBA scoreboard endpoint
const nbaEndpoint = 'https://cdn.nba.com/static/json/liveData/scoreboard/todaysScoreboard_00.json';

// calling the func.
getJSONFromEndpoint(nbaEndpoint, (error, json) => {
    // using variable endpoint and error to print error from if statement or data
    //call back function to make http request
    if (error) {
        console.error('Error retrieving NBA scoreboard JSON:', error);
    } else {
        console.log('NBA Scoreboard JSON Data:', json);

        // storing data from API into variable
        const allStats = {};

        // printing json structure data into strings and more readable
        console.log('Structure of JSON data:', JSON.stringify(json, null, 2));

        // iterating through each game
        json.scoreboard.games.forEach(game => {
        });
        //printing all the copied data into console
        console.log('All Stats:', allStats);
    }
});