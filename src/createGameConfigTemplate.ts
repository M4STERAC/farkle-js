//Require modules
const fs = require('fs');


//Create template content
let json: string = '{ "customScores": [ {"roll": [], "score": 0} ] }';


//Write the file
fs.writeFileSync('./src/gameConfiguration.json', json, 'utf8');


if(fs.existsSync('./src/gameConfiguration.json')){
    console.log('Bot: gameConfiguration has been generated!');
    process.exit(0);
} else {
    console.log('Failed to create gameConfiguration.json. \nPlease try again or cry in your nearest corner.');
    process.exit(0);
}