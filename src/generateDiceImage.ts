import Player from './Player';

export class ImageGenerator {
    constructor() {

    }

    //Initiate Fields
    possibleValues: number[] = [1, 2, 3, 4, 5, 6];

    generateDiceImage(rollResult: number[]) {
        for(let number of rollResult) {
            console.log(' -------');
            console.log('|       |');
            console.log(`|   ${number}   |`);
            console.log('|       |');
            console.log(' -------');
        }
    }

    generateFarkleImage() {
        console.log(' ___             _    _        _\n' + 
        '| __| __ _  _ _ | |__| | ___  | |\n'+
        '| _| / _` || _| | / /| |/ -_) |_|\n' +
        '|_|  \\__/_||_|  |_\\_\\|_|\\___| (_)\n');
    }

    generateGameOver(name: string, score: number) {
        console.log('Congradulations ' + name + '! You won the game with ' + score + ' points!');
        console.log('  ___                           ___                   _   '+
        '/ __| __ _  _ __   ___        / _ \ __ __ ___  _ _  | |'+  
       `| (_ |/ _' || '  \ / -_)      | (_) |\ V \// -_)| _| |_|`  +
        '\___|\__/_||_|_|_|\___|       \___/  \_/ \___||_|   (_)');
    }

    generateScoreBoard(players: Player[]) {
        console.log('\n\n====================================\n     ~~~~~~~~ScoreBoard~~~~~~~~\n');
        for (let i = 0; i < players.length; i++) {
            console.log(players[i].getPlayerName() + ': ' + players[i].getPlayerCumulativeScore());
        }
        console.log('\n====================================\n\n');
    }
}