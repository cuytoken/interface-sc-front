import { Contract, providers, Signer } from "ethers";

import usdcAbi from "./abi/usdcAbi";

declare var __usdcAddress__: string;

var usdcAddress = __usdcAddress__;
var provider: providers.Web3Provider;
var usdcContract: Contract;

/**
 * @dev This function inits the library and connects to the blockchain
 * @param _provider: window.ethereum or an equivalent
 */
export function initUsdc(_provider: providers.ExternalProvider): Contract {
    provider = new providers.Web3Provider(_provider);
    usdcContract = new Contract(usdcAddress, usdcAbi, provider);
    return usdcContract;
}

/**
 * @notice Approve for Public Sale smart contract to spend USDC on behalf of the owner
 * @param _signer: Signer of the transaction (provider.getSigner(account))
 * @param _spender: Address of the Public Sale smart contract
 * @param _amount: Amount of USDC to approve for Public Sale smart contract
 * @param _numberOfConfirmations: Optional pass the number of confirmations to wait for
 */
export async function approve(
    _signer: Signer,
    _spender: string,
    _amount: number,
    _numberOfConfirmations: number = 1
) {
    if (!provider) throw new Error("No provider set");
    var tx = await usdcContract.connect(_signer).approve(_spender, _amount);
    return await tx.wait(_numberOfConfirmations);
}

export async function allowance(
    _owner: string,
    _spender: string
): Promise<string> {
    var bal = await usdcContract.allowance(_owner, _spender);
    return bal.toString();
}

export async function balanceOf(
    _account: string,
): Promise<string> {
    var bal = await usdcContract.balanceOf(_account);
    return bal.toString();
}

