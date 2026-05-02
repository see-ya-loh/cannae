

export interface Character {
    characterId: string;
    userId: string;
    characterUid: number;
    grade: number;
    awaken: number;
    lev: number;
    exp: number;
    lastBattleDate: string;
    skill1Lev: number;
    skill2Lev: number;
    skill3Lev: number;
    passive1Lev: number;
    passive2Lev: number;
    gearSlotId1: string;
    gearSlotId2: string;
    gearSlotId3: string;
    gearSlotId4: string;
    gearSlotId5: string;
    gearSlotId6: string;
    awakenCostumeUid: number;
    userCostumeId: string;
    userBeautyId: string;
    userBeautyId2: string;
    userBeautyId3: string;
    userBeautyId4: string;
    weaponUid: number;
    potential: number;
    trainingRoomUid: number;
    useGearPresetIdx: number;
    combatPower: number;
    assistSkillLev: number;
    memorialGearId: string;
    isBeautyView1: boolean;
    isBeautyView2: boolean;
    isBeautyView3: boolean;
    isBeautyView4: boolean;
    potentialPowerSkill1Lev: number;
    potentialPowerSkill2Lev: number;
    potentialPowerSkill3Lev: number;
    updateTimestamp: number;
}