import { BigNumber, Contract, providers, Signer } from "ethers";

import busdAbi from "./abi/busdAbi";
declare var __busdAddress__: string;
declare var __pacAddress__: string;

var busdAddress = __busdAddress__;
var pacAddress = __pacAddress__;

var busdContract: Contract;

var provider: providers.Web3Provider = null;

export function initBusd(_provider: providers.ExternalProvider): Contract {
    provider = new providers.Web3Provider(_provider);
    busdContract = new Contract(busdAddress, busdAbi, provider);
    return busdContract;
}

/**
 * @dev Function that approves the smart contract to operate the user's funds
 * @param _amount: Amount to be approved in favor of the smart contract
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 * @param _numberOfConfirmations: Optional pass the number of confirmations to wait for
 */
export async function approveBusd(
    _amount: BigNumber,
    _signer: Signer,
    _numberOfConfirmations: number = 1
) {
    if (!provider) throw new Error("No provider set");
    var tx = await busdContract.connect(_signer).approve(pacAddress, _amount);
    return await tx.wait(_numberOfConfirmations);
}

/**
 * @dev Function that finds the allowance give in favor of the smart contract
 * @param _account: Wallet address of the user
 */
export async function allowance(_account: string): Promise<BigNumber> {
    if (!provider) throw new Error("No provider set");
    return await busdContract.allowance(_account, pacAddress);
}
