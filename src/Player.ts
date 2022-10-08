export default class Player {

    //Private fields
    #playerName: string;
    #playerId: number;
    #playerCumulativeScore: number = 0;

    constructor(name: string, id: number) {
        this.#playerName = name;
        this.#playerId = id;
    }

    getPlayerName(): string {
        return this.#playerName;
    }

    getPlayerId(): number {
        return this.#playerId;
    }

    getPlayerCumulativeScore(): number {
        return this.#playerCumulativeScore;
    }

    addToScore(currentTurnScore: number): void {
        this.#playerCumulativeScore += currentTurnScore;
    }
}