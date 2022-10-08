//Imported Libraries
import Player from './Player';
import ScoreDecider from './scoreDecider';
import { ImageGenerator } from './generateDiceImage';
import GameConfiguration from './gameConfiguration.json';
import { PlayerList, PossibleScores, ReturnedScore } from '../utility/general';

const prompt = require('prompt-sync')();


//Initiate Fields
let imgGen: ImageGenerator = new ImageGenerator();
let scoreRef: ScoreDecider = new ScoreDecider(GameConfiguration.possibleScores);
const playerList: PlayerList[] = GameConfiguration.players;
const winCondition: number = 10000;
var players: Player[] = [];
var topScore: number = 0;


//Start of game
console.log('\n====================================\n');
console.log('Welcome to FARKLE: CLI Edition!');
console.log('\n====================================');


//Create player objects
for (let i = 0; i < playerList.length; i++) {
    const player: Player = new Player(playerList[i].name, playerList[i].id);
    players.push(player);
}


//Generate ScoreBoard
imgGen.generateScoreBoard(players);


// While score condition is not reached
for (let turnNum = 0; topScore < winCondition; turnNum++) {

    prompt(`Ready to roll ${players[turnNum].getPlayerName()}? (Yes) `);

    let turnScore: number = 0;
    let numberOfDice: number = 6;
    let results: ReturnedScore;
    let stop: boolean = false;
    
    
    //While stop is false
    while (stop === false) {
        
        //roll dice, create the image, and see if a score is available
        var rollResults: number[] = rollDice(numberOfDice);
        imgGen.generateDiceImage(rollResults);

        //The code below will require intense error handling to make sure the user only types values that are in the array

        // //select dice to remove from rollResults
        // let selectedDice: string = prompt('Select dice to keep... (None) ');
        // let selectedDiceStringArray: string[] = selectedDice.split(',');
        // let selectedDiceArray: number[] = [];

        // for(let i = 0; i < selectedDiceStringArray.length; i++) {
        //     selectedDiceArray.push(parseInt(selectedDiceStringArray[i]));
        // }

        // selectedDiceArray.forEach((el) => {
        //     if(!(rollResults.includes(el))) {
        //         rollResults.splice(rollResults.indexOf(el), 1);
        //     }
        // })

        rollResults.sort();
        results = scoreRef.getScore(rollResults);
        
        //If score == 0, then stop == true and continue
        if (results.score === 0) {
            imgGen.generateFarkleImage();
            stop = true;
            turnScore = 0;
            continue;
        }
        
        //Add roll score to turn score total
        turnScore += results.score;
        numberOfDice = results.roll.length;
        numberOfDice === 0 ? numberOfDice = 6 : numberOfDice;
        
        //roll again? if no, stop == true, continue
        console.log('Current turn score: ' + turnScore);
        let response: string = prompt('Would you like to roll again? (Yes) ');
        response.toLowerCase();
        if (response == 'no' || response == 'n' || response == 'f' || response == 'false') {
            stop = true;
            //add turnScore to player score then roll again
            continue;
        }
    }

    players[turnNum].addToScore(turnScore);

    if ((players[turnNum].getPlayerCumulativeScore()) >= winCondition) {
        imgGen.generateGameOver((players[turnNum].getPlayerName()), (players[turnNum].getPlayerCumulativeScore()));
        process.exit(0);
    }

    if (turnNum === (players.length - 1)) { turnNum = -1; }
    imgGen.generateScoreBoard(players);
}


//===================================================================================================================


function rollDice(numberOfDice: number) {
    let resultArray: number[] = [];
    for (let die = 1; die <= numberOfDice; die++) {
        resultArray.push(Math.floor(Math.random() * (6 - 1 + 1) + 1));
    }
    return resultArray;
}