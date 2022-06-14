import { TypedDataSigner } from "@ethersproject/abstract-signer";
import { Contract, providers, Signer } from "ethers";

import rpsAbi from "./abi/rpsAbi";

declare var __rockPapetScissorsAddress__: string;
declare var __rpcUrl__: string;

var rockPapetScissorsAddress = __rockPapetScissorsAddress__;
var rpcUrl = __rpcUrl__;

var provider = new providers.JsonRpcProvider(rpcUrl);
var rockPaperScissorsContract: Contract = new Contract(
    rockPapetScissorsAddress,
    rpsAbi,
    provider
);

/**
 * @notice Calculates the winner of a match of Rock, Paper and Scissors
 * @dev A player's choice is represented by 0, 1 or 2 for ROCK, PAPER and SCISSORS respectively 
 * @dev ROCK = 0;
 * @dev PAPER = 1; 
 * @dev SCISSORS = 2;
 * @param _playerOneChoice: 0, 1 or 2 
 * @param _playerTwoChoice: 0, 1 or 2
 * @returns 0 = draw, 1 = player one wins, 2 = player two wins
 */
export async function playRockPaperScissors(
    _playerOneChoice: number,
    _playerTwoChoice: number
): Promise<number> {
    return await rockPaperScissorsContract.playRockPaperScissors(
        _playerOneChoice,
        _playerTwoChoice
    );
}
