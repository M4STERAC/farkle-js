//Require modules
const fs = require('fs');


//Create template content
let json: string = '{ "players": [ {"name": "Matt","id": 1}, {"name": "Mike","id": 2} ], "possibleScores": [ {"roll": [1, 2, 3, 4, 5, 6], "score": 1500}, {"roll": [2, 2, 2], "score": 200} ] }';


//Write the file
fs.writeFileSync('./gameConfiguration.json', json, 'utf8');


if(fs.existsSync('./gameConfiguration.json')){
    console.log('Bot: gameConfiguration has been generated!');
    process.exit(0);
} else {
    console.log('Failed to create gameConfiguration.json. \nPlease try again or complain to your nearest mirror.');
    process.exit(0);
}