/* {
                "slotType": "CST_Story",
                "formationUid": 220827768,
                "slots": [
                    {
                        "userCharacterId": "13169080",
                        "slotUserType": "COT_Owner"
                    },
                    {
                        "userCharacterId": "13169081",
                        "slotUserType": "COT_Owner"
                    },
                    {
                        "userCharacterId": "13169082",
                        "slotUserType": "COT_Owner"
                    },
                    {
                        "userCharacterId": "0",
                        "slotUserType": "COT_None"
                    },
                    {
                        "userCharacterId": "0",
                        "slotUserType": "COT_None"
                    }
                ]
            } */

export interface Slot {
    userCharacterId: string;
    slotUserType: SlotUserType;
}

export interface CharacterSlotData {
    slotType: FormationSlotType,
    formationUid: number,
    slots: Slot[]
}

export enum SlotUserType {
    Owner = "COT_Owner",
    Friend = "COT_Friend",
    None = "COT_None"
}

export enum FormationSlotType {
    Story = "CST_Story",
    ArenaAttack = "CST_ArenaAttack",
    ArenaDefense = "CST_ArenaDefense",
    Dungeon = "CST_Dungeon",
    ProofDungeon = "CST_ProofDungeon",
    ClanRaidDark1 = "CST_ClanRaidDark1",
    ClanRaidDark2 = "CST_ClanRaidDark2",
    ClanRaidLight1 = "CST_ClanRaidLight1",
    ClanRaidLight2 = "CST_ClanRaidLight2",
    ClanRaidFire1 = "CST_ClanRaidFire1",
    ClanRaidFire2 = "CST_ClanRaidFire2",
    ClanRaidWater1 = "CST_ClanRaidWater1",
    ClanRaidWater2 = "CST_ClanRaidWater2",
    ClanRaidEarth1 = "CST_ClanRaidEarth1",
    ClanRaidEarth2 = "CST_ClanRaidEarth2",
    ClanRaidCommon1 = "CST_ClanRaidCommon1",
    ClanRaidCommon2 = "CST_ClanRaidCommon2",
    ClanRaidVRDark = "CST_ClanRaidVRDark",
    ClanRaidVRLight = "CST_ClanRaidVRLight",
    ClanRaidVRFire = "CST_ClanRaidVRFire",
    ClanRaidVRWater = "CST_ClanRaidVRWater",
    ClanRaidVREarth = "CST_ClanRaidVREarth",
    FriendlyMatch = "CST_FriendlyMatch",
    MercernaryTraining = "CST_MercenaryTraining",
    PartyDungeon = "CST_PartyDungeon",
    SeaBattle = "CST_SeaBattle",
    TyrantWar = "CST_TyrantWar",
    ClanPartyDungeon = "CST_ClanPartyDungeon",
    FamineRaid = "CST_FamineRaid",
    SeaBattleDark = "CST_SeaBattleDark",
    SeaBattleLight = "CST_SeaBattleLight",
    SeaBattleFire = "CST_SeaBattleFire",
    SeaBattleWater = "CST_SeaBattleWater",
    SeaBattleEarth = "CST_SeaBattleEarth",
    SideStory = "CST_SideStory",
    ElementProofDark = "CST_ElementProofDark",
    ElementProofLight = "CST_ElementProofLight",
    ElementProofFire = "CST_ElementProofFire",
    ElementProofWater = "CST_ElementProofWater",
    ElementProofEarth = "CST_ElementProofEarth",
    ClanDoubleClashParty1 = "CST_ClanDoubleClashParty1",
    ClanDoubleClashParty2 = "CST_ClanDoubleClashParty2",
    MemorialArena = "CST_Memorial",
    
}