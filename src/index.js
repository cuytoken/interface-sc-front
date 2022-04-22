"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var ethers_1 = require("ethers");
console.log(ethers_1.BigNumber);
var buasAddress = "0x8f1c7aaf8ec93a500657aec7c030d392fd4caa13";
var nftpAddress = "0xE70937A750B9155eea884b089918155Fd256752A";
var pacAddress = "0x1e7749812C53d150D179b3468f5963ABa98244a5";
/**
 *
 * @param wallet Wallet address of the player
 * @returns Returns a type of IWalletInfo that contains information about the wallee of the player
 */
function getWalletData(wallet) {
    return __awaiter(this, void 0, Promise, function* () {
        var guineaPigs = [43242342, 23432, 56456];
        var pachas = [45435, 3464, 6525];
        var pachaPasses = [62452, 6524542, 51324324];
        var tokenBalance = "1223423000000000000000000";
        return {
            guineaPigs: guineaPigs,
            pachas: pachas,
            pachaPasses: pachaPasses,
            tokenBalance: tokenBalance
        };
    });
}
exports.getWalletData = getWalletData;
/**
 *
 * @param address Wallet address of the Guinea Pig's owner
 * @returns An array of ID (unique identifiers) of each Guinea Pig owned.
 */
function getGuineaPigsPerWallet(address) {
    return __awaiter(this, void 0, Promise, function* () {
        return [312432342543534, 312432342543532];
    });
}
exports.getGuineaPigsPerWallet = getGuineaPigsPerWallet;
/**
 *
 * @param id Guinea Pig's ID given when it was minted
 * @returns Returns a type of IDataguineaPig object that contains information about the Guinea Pig's properties
 */
function getGuinePigData(id) {
    return __awaiter(this, void 0, Promise, function* () {
        var feedingTime = 1649274970;
        var burningTime = 1649534170;
        var speed = 1.4;
        var multiplier = 4;
        var samiPoints = 13135;
        var ID = 312432342543534;
        var race = 1;
        return {
            feedingTime: feedingTime,
            burningTime: burningTime,
            speed: speed,
            multiplier: multiplier,
            samiPoints: samiPoints,
            ID: ID,
            race: race
        };
    });
}
exports.getGuinePigData = getGuinePigData;
/**
 *
 * @param id Guiniea Pig's ID (unique identifier)
 * @returns Timestamp limit to receive food. Otherwise it will die.
 */
function getNextFeedingTimeGuineaPig(id) {
    return __awaiter(this, void 0, Promise, function* () {
        return 1649274970;
    });
}
exports.getNextFeedingTimeGuineaPig = getNextFeedingTimeGuineaPig;
/**
 *
 * @param id Guiniea Pig's ID (unique identifier)
 * @returns Timestamp limit to burn the NFT. If it's not fed until this moment, the NFT is burned
 */
function getBurningTimeGuineaPig(id) {
    return __awaiter(this, void 0, Promise, function* () {
        return 1649534170;
    });
}
exports.getBurningTimeGuineaPig = getBurningTimeGuineaPig;
/**
 *
 * @param id Pacha's ID given when it was minted
 * @returns Returns a type of IPachaData object that contains information about the Pacha Pass properties
 */
function getPachaData(id) {
    return __awaiter(this, void 0, Promise, function* () {
        var ID = 1649274970;
        var privacity = "public";
        var owner = "0x23453254";
        var location = 13435;
        return {
            ID: ID,
            privacity: privacity,
            owner: owner,
            location: location
        };
    });
}
exports.getPachaData = getPachaData;
/**
 *
 * @param id Pacha Pass' ID given when it was minted
 * @returns Returns a type of IPachaPass object that contains information about the Pacha Pass properties
 */
function getPachaPassData(id) {
    return __awaiter(this, void 0, Promise, function* () {
        var pachaId = 1649274970;
        var owner = "0x23453254";
        var cost = 1.4;
        var transferMode = "purchased";
        return {
            pachaId: pachaId,
            owner: owner,
            cost: cost,
            transferMode: transferMode
        };
    });
}
exports.getPachaPassData = getPachaPassData;
