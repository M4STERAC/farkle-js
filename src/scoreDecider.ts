import { PossibleScores, ReturnedScore } from '../utility/general';
import Player from './Player';

export default class ScoreDecider {

    //List of possible scores
    #possibleScores: PossibleScores;
    #score: number = 0;

    constructor(scoreRules: PossibleScores) {
        this.#possibleScores = scoreRules;
    }


    getScore(playerRollResults: number[]): ReturnedScore {

        this.#score = 0;
        if (playerRollResults.toString() !== '') {

            //Check if a score is possible
            if (playerRollResults.length === 6) {
                if (playerRollResults[0] === playerRollResults[1] && playerRollResults[2] === playerRollResults[3] && playerRollResults[4] === playerRollResults[5]) {
                    //3 pairs
                    this.#score = 1500;
                    playerRollResults = [];
                    console.log('3 pairs!');
                } else if (playerRollResults[0] === playerRollResults[2] && playerRollResults[3] === playerRollResults[5] && playerRollResults[5] !== playerRollResults[0]) {
                    //2x 3 of a kind
                    this.#score = 2500;
                    playerRollResults = [];
                    console.log('Pair of 3 of a kind!');
                } else if (playerRollResults[0] === playerRollResults[5]) {
                    //6 of a kind
                    this.#score = 3000;
                    playerRollResults = [];
                    console.log('6 of a kind!');
                } else if (playerRollResults.toString() === "1,2,3,4,5,6") {
                    //Straight
                    this.#score = 1500;
                    playerRollResults = [];
                    console.log('Straight!');
                }
            }

            let duplicateCount: number = 2;
            let duplicateValue: number = 0;
            for (let i = 0; i < playerRollResults.length - 2; i++) {
                if (playerRollResults[i] === playerRollResults[(i + 1)] && playerRollResults[i] === playerRollResults[(i + 2)]) {
                    duplicateCount++;
                    duplicateValue = playerRollResults[i];
                }
            }
            if (duplicateCount === 3) {
                if (duplicateValue === 1) {
                    this.#score = 1000;
                } else {
                    this.#score = duplicateValue * 100;
                }
                playerRollResults.splice(playerRollResults.indexOf(duplicateValue), duplicateCount);
                console.log('3 of a kind!');
            } else if (duplicateCount === 4) {
                this.#score = 1500;
                playerRollResults.splice(playerRollResults.indexOf(duplicateValue), duplicateCount);
                console.log('4 of a kind!');
            } else if (duplicateCount === 5) {
                this.#score = 2000;
                playerRollResults.splice(playerRollResults.indexOf(duplicateValue), duplicateCount);
                console.log('5 of a kind!');
            }

            for (let z = 0; z < playerRollResults.length; z++) {
                if (playerRollResults[z] === 1) {
                    this.#score += 100;
                    playerRollResults.splice(z, 1);
                    z--;
                } else if (playerRollResults[z] === 5) {
                    this.#score += 50;
                    playerRollResults.splice(z, 1);
                    z--;
                }
            }
        }
        return {
            roll: playerRollResults,
            score: this.#score
        };
    }
}