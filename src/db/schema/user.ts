import db from '../db';
import { Account } from './account';
export * from './account';

/* 
"user": {
            "userId": "5351608",
            "accountId": "5351608",
            "name": "ErCaro1010",
            "lev": 1,
            "exp": 1500,
            "gold": 50000,
            "cashGem": 0,
            "freeGem": 0,
            "energy": 6000,
            "energyChargeTime": 0,
            "fame": 1000,
            "clanPoint": 0,
            "helloMessage": "For the glory of Avillon!",
            "maxEnergy": 6000,
            "tutorialStepUid": 1831523403,
            "timezone": 7200,
            "userMaster": {
                "gender": "MGT_Male",
                "skin": "MST_Skin1",
                "hair": "MHT_Hair1",
                "hairColor": "MHCT_Color1"
            },
            "arenaEnergy": 7,
            "arenaEnergyChargeTime": 0,
            "proofDungeonEnergy": 7,
            "proofDungeonEnergyChargeDate": 29284,
            "mercenaryTrainingEnergy": 10,
            "clanId": "0",
            "clanLeaveCount": 0,
            "clanJoinableDate": "0",
            "createDate": "1776864312",
            "representativeCharacterUid": 2532969633,
            "freeCostumeTicket": 0,
            "cashCostumeTicket": 0,
            "costumeMileage": 0,
            "partyDungeonEnergy": 9,
            "partyDungeonEnergyChargeDate": 0,
            "seaBattleEnergy": 10,
            "seaBattleEnergyChargeDate": 0,
            "cube": 0,
            "summonStone": 0,
            "summonMileage": 0,
            "freeSummonStone": 0,
            "cashSummonStone": 0,
            "profileIconUid": 1100101435,
            "battlePresetSlotNum": 0,
            "eastBridgeEnergy": 0,
            "eastBridgeEnergyResetDate": "1777586400"
        }
 */

export interface UserMaster {
    gender: string;
    skin: string;
    hair: string;
    hairColor: string;
}

export interface User {
    userId: string;
    accountId: Account['accountId'];
    name: string;
    lev: number;
    exp: number;
    gold: number;
    cashGem: number;
    freeGem: number;
    energy: number;
    energyChargeTime: number;
    fame: number;
    clanPoint: number;
    helloMessage: string;
    maxEnergy: number;
    tutorialStepUid: number;
    timezone: number;
    userMaster: UserMaster;
    arenaEnergy: number;
    arenaEnergyChargeTime: number;
    proofDungeonEnergy: number;
    proofDungeonEnergyChargeDate: number;
    mercenaryTrainingEnergy: number;
    clanId: string;
    clanLeaveCount: number;
    clanJoinableDate: string;
    createDate: string;
    representativeCharacterUid: number;
    freeCostumeTicket: number;
    cashCostumeTicket: number;
    costumeMileage: number;
    partyDungeonEnergy: number;
    partyDungeonEnergyChargeDate: number;
    seaBattleEnergy: number;
    seaBattleEnergyChargeDate: number;
    cube: number;
    summonStone: number;
    summonMileage: number;
    freeSummonStone: number;
    cashSummonStone: number;
    profileIconUid: number;
    battlePresetSlotNum: number;
    eastBridgeEnergy: number;
    eastBridgeEnergyResetDate: string;
}