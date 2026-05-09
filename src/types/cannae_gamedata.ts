// Auto-generated from cannae_gamedata.proto

// Generated at 2026-05-08T16:25:54.803Z

// DO NOT EDIT MANUALLY


// ─── Enums ──────────────────────────────────────────────


export enum AbuseMonitoringScheduleType {
  AMST_Cycle = 0,
  AMST_SpecificDay = 1,
}

export enum AbuseType {
  AT_BattleTime = 0,
  AT_DropItem = 1,
  AT_ClanRaidDamage = 2,
  AT_BattleTurn = 3,
  AT_ClanRaidKillTime = 4,
  AT_BossStatusHack = 5,
  AT_ClanRaidLordLevel = 6,
  AT_PartyDungeonLordLevel = 7,
  AT_PartyDungeonDamage = 8,
  AT_SeaBattleTurnLimitOver = 9,
  AT_SeaBattleSameTurn = 10,
  AT_SeaBattleDamage = 11,
  AT_SeaBattleTotalDamage = 12,
  AT_ClanPartyDungeonDamage = 13,
  AT_ClanRaidGroggyCount = 14,
  AT_FamineRaidKillTime = 15,
  AT_SeaBattleLoadSkillDamage = 16,
  AT_WorldRaidBattleDeltaDamage = 17,
  AT_WorldRaidBattleCharacterDamage = 18,
  AT_ClanDoubleClashPartyDamage = 19,
}

export enum AccountBanReason {
  ABR_None = 0,
  ABR_TemporaryBan = 1,
  ABR_PolicyViolence = 2,
  ABR_AbnormalSystemUse = 3,
  ABR_AbnormalPurchase = 4,
  ABR_AbuseBug = 5,
  ABR_BadNickname = 6,
  ABR_Imposter = 7,
  ABR_GMImposter = 8,
  ABR_Abuse = 9,
  ABR_Extrusion = 10,
  ABR_AbuseRefund = 11,
  ABR_Manner = 12,
}

export enum AccountState {
  AS_Normal = 0,
  AS_Sleep = 1,
  AS_UnregReady = 2,
  AS_UnregComplete = 3,
}

export enum AccountType {
  AT_PrefixEnum = 0,
  AT_User = 1,
  AT_Admin = 2,
  AT_QA = 3,
  AT_Bot = 4,
}

export enum AchievementActionType {
  AAT_Open = 0,
  AAT_Update = 1,
  AAT_SetCount = 2,
  AAT_Clear = 3,
  AAT_Reward = 4,
}

export enum ActivateTargetState {
  ActivateTargetState_UNSPECIFIED = 0,
  Alive = 1,
  Dead = 2,
}

export enum ActiveControlType {
  ACT_FixedTerm = 0,
  ACT_YearFixedTerm = 1,
  ACT_Daily = 2,
  ACT_MonthFixedTerm = 3,
  ACT_WeeklyFixedTerm = 4,
}

export enum ActiveEvent {
  AE_None = 0,
  AE_AfterAttack = 1,
  AE_AfterCriticalAttack = 2,
  AE_AfterAttackHit = 4,
  AE_AfterAttackMe = 5,
  AE_AfterCriticalAttackHit = 6,
  AE_AfterDeadly = 7,
  AE_AfterDead = 8,
  AE_AfterHeal = 9,
  AE_AfterHealHit = 10,
  AE_AfterAnyoneKilled = 11,
  AE_AfterAttackToSelf = 12,
  AE_AfterEnemyKilledOnSelfActiveSkill = 13,
  AE_AfterGroupProb = 14,
  AE_AfterAllAction = 15,
  AE_BeforeSkillDefault = 16,
  AE_BeforeSkillActive = 17,
  AE_BeforeSkillUltimate = 18,
  AE_AfterHealAllCharacter = 19,
  AE_AfterAction = 20,
  AE_AfterActionCurrentUnit = 21,
  AE_AfterAttackCurrentUnit = 22,
  AE_AfterReviveByPassive = 23,
  AE_AfterCounterAttack = 24,
  AE_StartCounterAttack = 25,
  AE_AfterSkillDefault = 26,
  AE_AfterSkillActive = 27,
  AE_AfterSkillUltimate = 28,
  AE_BeforeDamage = 50,
  AE_BeforeAttack = 51,
  AE_BeforeAttackSelf = 52,
  AE_BeforeCounterAttack = 53,
  AE_StartBattle = 100,
  AE_EnemyTurnEnd = 101,
  AE_SelfTurn = 102,
  AE_StartRound = 103,
  AE_StartTurn = 104,
  AE_StartRoundByOblivion = 105,
  AE_BeforeSelfTurn = 106,
  AE_AfterSelfTurn = 107,
  AE_AfterChangeFormation = 108,
  AE_AfterLanding = 109,
  AE_AfterStartTurn = 110,
  AE_BeforeStartTurnSelf = 111,
  AE_AfterStartRound = 112,
  AE_UpdateStat = 200,
  AE_UpdateState = 201,
  AE_GroggyStart = 202,
  AE_GroggyEnd = 203,
  AE_AfterVulnerable = 204,
  AE_StatusEffectTurnOver = 211,
  AE_StatusEffectDestroy = 212,
}

export enum ArchiveAutoSequenceType {
  AAST_None = 0,
  AAST_MainStory = 1,
  AAST_HeroContract = 2,
  AAST_TimeEvent = 3,
  AAST_StoryPass = 4,
  AAST_ContentTutorial = 5,
  AAST_ReturnUser = 6,
  AAST_Attendance = 7,
  AAST_Etc = 8,
  AAST_HeroRecruit = 9,
  AAST_TyrantWar = 10,
  AAST_Nightmare = 11,
  AAST_Series = 12,
  AAST_ProofDungeon = 13,
  AAST_Omnibus = 14,
  AAST_Side = 15,
  AAST_OpenAll = 16,
  AAST_EventStory = 17,
  AAST_Memorial = 18,
  AAST_Birthday = 19,
}

export enum ArchiveSequenceSeasonOrderType {
  ASSOT_Sequence = 0,
  ASSOT_Random = 1,
}

export enum ArenaLeagueType {
  ALT_None = 0,
  ALT_Amateur = 1,
  ALT_AmateurGlobal = 2,
  ALT_AmateurJapan = 3,
  ALT_Pro = 11,
}

export enum AssistTacticsCharacterSlotType {
  ATCST_None = 0,
  ATCST_Leader = 1,
  ATCST_Support = 2,
}

export enum AttendanceCountDownType {
  ACDT_Common = 0,
  ACDT_Celebration = 1,
}

export enum AttendanceCountdownShowType {
  ACST_None = 0,
  ACST_Normal = 1,
  ACST_Special = 2,
}

export enum AttendanceEventType {
  AET_Normal = 0,
  AET_Purchase = 1,
}

export enum AttendanceStackShowType {
  ASST_None = 0,
  ASST_Normal = 1,
  ASST_Special = 2,
}

export enum AttributeRelationType {
  AttributeRelationType_UNSPECIFIED = 0,
  Neutral = 1,
  Advantage = 2,
  DisAdvantage = 3,
}

export enum AuctionBidStateType {
  ABST_None = 0,
  ABST_SuccessfulBid = 1,
  ABST_FailedBid = 2,
  ABST_Canceled = 3,
  ABST_Bidding = 4,
  ABST_Nobidder = 5,
}

export enum AuctionItemType {
  AIT_PrefixEnum = 0,
  AIT_Gear = 1,
}

export enum AuctionLogActionType {
  ALAT_Register = 0,
  ALAT_Bidding = 1,
  ALAT_RegisterCancel = 2,
  ALAT_BiddingCancel = 3,
  ALAT_ReceiveSellerCube = 4,
  ALAT_ReceiveAuctionItem = 5,
  ALAT_BiddingFailedReturnCube = 6,
  ALAT_RegisterForcedCancel = 7,
  ALAT_AuctionSellingFailedReturnItem = 8,
}

export enum AuctionNoticeType {
  ANT_HighestBidding = 0,
  ANT_LowestBidding = 1,
  ANT_MostestBidder = 2,
}

export enum AuctionOpenState {
  AOS_Open = 0,
  AOS_Close = 1,
}

export enum AuctionOrderCategory {
  AOC_DisplayDate = 0,
  AOC_BiddingPrice = 1,
  AOC_RemainEndTime = 2,
}

export enum AuctionOrderType {
  AOT_None = 0,
  AOT_Descending = 1,
  AOT_Ascending = 2,
}

export enum AutoSequenceEventTrigger {
  ASET_BattleStart = 0,
  ASET_BattleEnd = 1,
  ASET_RoundStart = 2,
  ASET_RoundEnd = 3,
  ASET_PerfectClearStageReward = 4,
  ASET_PlayerTurn = 5,
  ASET_EnterDialog = 6,
  ASET_LobbyClearStage = 7,
  ASET_BattleEndWinLoaded = 8,
  ASET_WorldConquerCompleted = 9,
  ASET_WorldOpen = 10,
  ASET_AliasCompleted = 11,
  ASET_ScenarioScene = 12,
  ASET_BattleIntro = 13,
  ASET_ScenarioSceneEnd = 14,
  ASET_AfterRoundStart = 15,
  ASET_EnterSeasonDialog = 16,
  ASET_EnterSeasonEvent = 17,
  ASET_EnterEvent = 18,
  ASET_ClearEvent = 19,
  ASET_ClearSeasonEvent = 20,
  ASET_ScenarioSceneBossAppear = 21,
  ASET_BeforeRoundEnd = 22,
  ASET_ScenarioSceneBossEnd = 23,
  ASET_StageConquerCompleted = 24,
  ASET_Archive = 25,
  ASET_WaveStart = 26,
  ASET_WaveEnd = 27,
  ASET_LordLevelUp = 28,
  ASET_EnterDailyDialog = 29,
  ASET_GetCharacter = 30,
  ASET_EventTreasureHuntTalk = 31,
  ASET_ScenarioSceneBossAppearWithTitle = 32,
  ASET_LobbyContentOpen = 33,
  ASET_PhaseEndStep1 = 34,
  ASET_PhaseEndStep2 = 35,
  ASET_PhaseStartStep1 = 36,
  ASET_PhaseStartStep2 = 37,
  ASET_MemorialStory = 38,
  ASET_IntroDialog = 39,
  ASET_ScenarioSceneRoundEnd = 40,
}

export enum AutoSequenceScene {
  ASS_None = 0,
  ASS_Intro = 1,
  ASS_Title = 2,
  ASS_Lobby = 3,
  ASS_Battle = 4,
  ASS_UserRegister = 5,
}

export enum AutoSequenceType {
  AST_None = 0,
  AST_WaitEvent = 1,
  AST_NpcTalk = 3,
  AST_GuiGuide = 4,
  AST_GuiGuideWithoutButton = 5,
  AST_GuiBanner = 6,
  AST_GuiSpecial = 7,
  AST_GuideImage = 8,
  AST_Toast = 9,
  AST_ToastReward = 10,
  AST_AutoOff = 11,
  AST_Event = 12,
  AST_ScenarioScene = 13,
  AST_RecruitAnimation = 14,
  AST_ToastContentsOpen = 15,
  AST_ShortCut = 16,
  AST_NpcEvent = 17,
  AST_CameraFilter = 18,
}

export enum AvalonTheaterContentsState {
  ATCS_Open = 0,
  ATCS_AllOpenFree = 1,
  ATCS_AllOpenPaid = 2,
  ATCS_Paid = 3,
}

export enum AvalonTheaterEpisodeState {
  ATES_Open = 0,
  ATES_Wait = 1,
  ATES_Lock = 2,
  ATES_Clear = 3,
}

export enum AvalonTheaterEpisodeType {
  ATET_PrefixEnum = 0,
  ATET_Story = 1,
  ATET_Battle = 2,
}

export enum BanState {
  BS_None = 0,
  BS_Ban_Login = 1,
  BS_Ban_Chatting = 2,
}

export enum BattleEndResultType {
  BERT_None = 0,
  BERT_Draw = 1,
  BERT_Lose = 2,
  BERT_Win = 3,
  BERT_GiveUp = 4,
}

export enum BattleGroggyCondition {
  BGC_None = 0,
  BGC_ElementAdvantageAttack = 1,
  BGC_ElementAdvantageActive = 2,
  BGC_ElementAdvantageBurst = 3,
  BGC_Attack = 4,
  BGC_Active = 5,
  BGC_Burst = 6,
}

export enum BattleRewardCategory {
  BRC_PrefixEnum = 0,
  BRC_Clear = 1,
  BRC_FirstClear = 2,
  BRC_Completion = 3,
  BRC_MonsterFestival = 4,
  BRC_ProofDungeonGradeClear = 5,
  BRC_TyrantWar = 6,
}

export enum BattleSideType {
  BST_None = 0,
  BST_AllyTeam = 1,
  BST_EnemyTeam = 2,
}

export enum BattleType {
  BT_Story = 0,
  BT_Arena = 1,
  BT_Dungeon = 2,
  BT_WeeklyDungeon = 3,
  BT_HiddenDungeon = 4,
  BT_EventDungeon = 5,
  BT_Tower = 6,
  BT_StoryTest = 7,
  BT_Tutorial = 8,
  BT_GoldDungeon = 9,
  BT_ExpDungeon = 10,
  BT_ClanRaid = 11,
  BT_ClanRaidTest = 12,
  BT_ProofDungeon = 13,
  BT_ClanRaidInfinite = 14,
  BT_FriendlyMatch = 15,
  BT_MercenaryTraining = 16,
  BT_PartyDungeon = 17,
  BT_SeaBattle = 18,
  BT_ClanPartyDungeon = 19,
  BT_ClanRaidGroggy = 20,
  BT_PromoteDungeon = 21,
  BT_FamineRaid = 22,
  BT_SideStory = 23,
  BT_ElementProofDungeon = 24,
  BT_WorldRaid = 25,
  BT_ClanDoubleClashParty = 26,
  BT_Memorial = 27,
  BT_EastBridge = 28,
  BT_Warfare = 29,
  BT_Count = 30,
  BT_TyrantWar = 100,
}

export enum BattleVulnerableGaugeMonsterType {
  BVGMT_None = 0,
  BVGMT_Ancient = 1,
}

export enum BeautyAttachPoint {
  BAP_None = 0,
  BAP_HeadUpper = 1,
  BAP_HeadSide = 2,
  BAP_FaceUpper = 3,
  BAP_FaceSide = 4,
  BAP_BodyUpper = 5,
  BAP_BodyBack = 6,
  BAP_Air = 7,
  BAP_Ambience = 10,
}

export enum BeautyGachaRewardSubType {
  BGRST_Common = 0,
  BGRST_BdayHigh = 1,
}

export enum BeautyGachaRewardType {
  BGRT_Common = 0,
  BGRT_ClassCommon = 1,
  BGRT_ClassExclusive = 2,
  BGRT_CostumeCommon = 3,
  BGRT_CostumeLimited = 4,
}

export enum BenefitTermType {
  BTT_FirstLoginGift = 0,
  BTT_BattleGoldBonusPer = 1,
  BTT_MysteryShopDiscountPer = 2,
}

export enum BoxGoodsEffectType {
  BGET_None = 0,
  BGET_UiOnePlusOne = 1,
  BGET_IconRandomPromoteCommon4 = 2,
  BGET_ShowSeparateIcon = 3,
}

export enum BoxRandomGiftRewardType {
  BRGRT_Normal = 0,
  BRGRT_Special = 1,
}

export enum CameraFormationMoveType {
  Null = 0,
  Slide = 1,
  ConstantVelocitySlide = 2,
  JumpSlide = 3,
  ReverseJumpSlide = 4,
  Count = 5,
}

export enum CharacterBattleAiType {
  CBAT_None = 0,
  CBAT_SkillPriorityRule = 1,
  CBAT_EnemyTarget = 2,
  CBAT_AllyLiveTarget = 3,
  CBAT_AllyDeadTarget = 4,
}

export enum CharacterContractInfiniteState {
  CCIS_Ongoing = 0,
  CCIS_SelectCharacter = 1,
  CCIS_Hold = 2,
  CCIS_Cancel = 3,
}

export enum CharacterContractProgressType {
  CCPT_Attendance = 0,
  CCPT_Complete = 1,
  CCPT_Failed = 2,
  CCPT_Cancel = 3,
  CCPT_SelectReward = 4,
  CCPT_Gmtool = 10,
}

export enum CharacterContractState {
  CCS_PrefixEnum = 0,
  CCS_NotOpen = 1,
  CCS_Ongoing = 2,
  CCS_Hold = 3,
  CCS_SelectContract = 4,
  CCS_SelectCharacter = 5,
  CCS_Cancel = 6,
  CCS_Pending = 7,
  CCS_Complete = 8,
}

export enum CharacterEpisodeCond {
  CEC_PrefixEnum = 0,
  CEC_CharacterLev = 1,
}

export enum CharacterGrowthHistoryMissionType {
  CGHMT_None = 0,
  CGHMT_Promote = 1,
  CGHMT_Awaken = 2,
  CGHMT_Potential = 3,
  CGHMT_TotalSkill = 4,
  CGHMT_Level = 5,
}

export enum CharacterInfoVoiceCategory {
  CIVC_Introduce = 0,
  CIVC_Recruit = 1,
  CIVC_Promote = 2,
  CIVC_Awaken = 3,
  CIVC_TitleCall = 4,
  CIVC_EmotionPositive = 5,
  CIVC_EmotionNegative = 6,
  CIVC_EmotionSurprise = 7,
  CIVC_EmotionHappy = 8,
  CIVC_EmotionThink = 9,
  CIVC_EmotionSigh = 10,
  CIVC_Costume = 11,
  CIVC_BattleReady = 12,
  CIVC_AttackSkill = 13,
  CIVC_ActiveSkill = 14,
  CIVC_BurstSkill = 15,
  CIVC_RequestSupport = 16,
  CIVC_ResponseSupport = 17,
  CIVC_Hit = 18,
  CIVC_GetHit = 19,
  CIVC_Incapable = 20,
  CIVC_Victory = 21,
  CIVC_CommanderControl = 22,
  CIVC_CommanderChangeFormation = 23,
  CIVC_CommanderDefeat = 24,
  CIVC_Info = 25,
}

export enum CharacterInfoVoiceOpenCondition {
  CIVOC_None = 0,
  CIVOC_Awaken = 1,
  CIVOC_Promote = 2,
  CIVOC_Costume = 3,
}

export enum CharacterOwnerType {
  COT_None = 0,
  COT_Owner = 1,
  COT_Support = 2,
}

export enum CharacterPackageQuestState {
  CPQS_Ongoing = 0,
  CPQS_Complete = 1,
  CPQS_AllComplete = 2,
}

export enum CharacterPotentialPowerType {
  CPPT_None = 0,
  CPPT_Free = 1,
  CPPT_Contract = 2,
  CPPT_Summon = 3,
}

export enum CharacterRecruitCutSceneType {
  CRCST_None = 0,
  CRCST_Normal = 1,
  CRCST_Contract = 2,
  CRCST_Companion = 3,
}

export enum CharacterSizeType {
  CST_None = 0,
  CST_Small = 1,
  CST_Medium = 2,
  CST_Large = 3,
}

export enum CharacterSlotType {
  CST_Story = 0,
  CST_ArenaAttack = 1,
  CST_ArenaDefense = 2,
  CST_Dungeon = 3,
  CST_ClanRaid = 4,
  CST_ProofDungeon = 5,
  CST_ClanRaidDark1 = 6,
  CST_ClanRaidDark2 = 7,
  CST_ClanRaidFire1 = 8,
  CST_ClanRaidFire2 = 9,
  CST_ClanRaidWater1 = 10,
  CST_ClanRaidWater2 = 11,
  CST_ClanRaidEarth1 = 12,
  CST_ClanRaidEarth2 = 13,
  CST_ClanRaidLight1 = 14,
  CST_ClanRaidLight2 = 15,
  CST_ClanRaidCommon1 = 16,
  CST_ClanRaidCommon2 = 17,
  CST_ClanRaidVRDark = 18,
  CST_ClanRaidVRFire = 19,
  CST_ClanRaidVRWater = 20,
  CST_ClanRaidVREarth = 21,
  CST_ClanRaidVRLight = 22,
  CST_FriendlyMatch = 23,
  CST_MercenaryTraining = 24,
  CST_PartyDungeon = 25,
  CST_SeaBattle = 26,
  CST_TyrantWar = 27,
  CST_ClanPartyDungeon = 28,
  CST_FamineRaid = 29,
  CST_SeaBattleDark = 30,
  CST_SeaBattleFire = 31,
  CST_SeaBattleWater = 32,
  CST_SeaBattleEarth = 33,
  CST_SeaBattleLight = 34,
  CST_SideStory = 35,
  CST_ElementProofDark = 36,
  CST_ElementProofFire = 37,
  CST_ElementProofWater = 38,
  CST_ElementProofEarth = 39,
  CST_ElementProofLight = 40,
  CST_ClanDoubleClashParty1 = 41,
  CST_ClanDoubleClashParty2 = 42,
  CST_Memorial = 43,
  CST_Count = 44,
}

export enum CharacterStatType {
  CST_Hp = 0,
  CST_Atk = 1,
  CST_Def = 2,
}

export enum CharacterVoiceCategory {
  CVC_None = 0,
  CVC_Master = 1,
  CVC_Character = 2,
  CVC_Npc = 3,
}

export enum CharacterVoiceLanguage {
  CVL_Ko = 0,
  CVL_Ja = 1,
}

export enum CharacterVoiceSettingType {
  CVST_Off = 0,
  CVST_Ko = 1,
  CVST_Ja = 2,
}

export enum ClanAttendanceActionLogType {
  CAALT_Create = 0,
  CAALT_Reset = 1,
  CAALT_AddCount = 2,
  CAALT_Reward = 3,
}

export enum ClanAttendanceMissionTargetType {
  CAMTT_None = 0,
  CAMTT_Clan = 1,
  CAMTT_User = 2,
}

export enum ClanAttendanceShopRewardType {
  CASRT_None = 0,
  CASRT_Normal = 1,
}

export enum ClanCelebrationType {
  CCT_PrefixEnum = 0,
  CCT_ClanEstablish = 1,
  CCT_ClanJoin = 2,
  CCT_ClanNewLeader = 3,
  CCT_ClanNewSubLeader = 4,
  CCT_CharacterGrade = 5,
  CCT_CharacterLev = 6,
  CCT_CharacterAwake = 7,
  CCT_GearGet = 8,
  CCT_GearUpgrade = 9,
  CCT_UserLev = 10,
  CCT_FirstClear = 11,
  CCT_ClanAid = 12,
  CCT_RaidBattleEntrance = 13,
  CCT_RaidBattleClear = 14,
  CCT_PurchaseCashCharacter = 15,
  CCT_ClanAidDispatch = 16,
  CCT_ClearProofDungeon = 17,
  CCT_CharacterGetSummon = 18,
  CCT_CharacterMaxPotential = 19,
  CCT_WeaponFirstGet = 20,
  CCT_WeaponMaxTier = 21,
  CCT_ClanEventAid = 22,
  CCT_ClearElementProofDark = 23,
  CCT_ClearElementProofFire = 24,
  CCT_ClearElementProofWater = 25,
  CCT_ClearElementProofEarth = 26,
  CCT_ClearElementProofLight = 27,
  CCT_ClearElementProofFloorTotal = 28,
}

export enum ClanEventType {
  CET_ClanEventNone = 0,
  CET_AttendanceEvent = 1,
}

export enum ClanInviteState {
  CIS_None = 0,
  CIS_Invite = 1,
  CIS_Invitable = 2,
}

export enum ClanJoinCondition {
  CJC_PrefixEnum = 0,
  CJC_Free = 1,
  CJC_Accept = 2,
}

export enum ClanMemberGrade {
  CMG_PrefixEnum = 0,
  CMG_Member = 1,
  CMG_SubLeader = 2,
  CMG_Leader = 3,
}

export enum ClanPartyDungeonEncounterActionType {
  CPDEAT_None = 0,
  CPDEAT_Init = 1,
  CPDEAT_Update = 2,
  CPDEAT_UpdateSkip = 3,
  CPDEAT_Encounter = 4,
}

export enum ClanPartyDungeonMissionActionType {
  CPDMAT_None = 0,
  CPDMAT_Create = 1,
  CPDMAT_Reset = 2,
  CPDMAT_AddCount = 3,
}

export enum ClanPartyDungeonMissionConditionType {
  CPDMCT_None = 0,
  CPDMCT_Encounter = 1,
  CPDMCT_Slay = 2,
  CPDMCT_Enter = 3,
  CPDMCT_PurchaseGift = 4,
  CPDMCT_PurchaseBuff = 5,
  CPDMCT_Attendance = 6,
}

export enum ClanPartyDungeonMissionSubConditionType {
  CPDMSCT_None = 0,
  CPDMSCT_ElementFire = 1,
  CPDMSCT_ElementWater = 2,
  CPDMSCT_ElementEarth = 3,
  CPDMSCT_ElementLight = 4,
  CPDMSCT_ElementDark = 5,
  CPDMSCT_MonsterWildgrondal = 6,
  CPDMSCT_MonsterMimic = 7,
  CPDMSCT_MonsterPiyo = 8,
  CPDMSCT_MonsterGarrr = 9,
  CPDMSCT_MonsterLelouch = 10,
  CPDMSCT_MonsterSuzaku = 11,
  CPDMSCT_MonsterCc = 12,
}

export enum ClanPartyDungeonShopItemRewardType {
  CPDSIRT_None = 0,
  CPDSIRT_Normal = 1,
  CPDSIRT_RandomGift = 2,
  CPDSIRT_ClanBuff = 3,
}

export enum ClanRaidLeagueType {
  CRLT_None = 0,
  CRLT_Local = 1,
  CRLT_Global = 2,
  CRLT_Japan = 3,
}

export enum ClanRaidRankingType {
  CRRT_Season = 0,
  CRRT_HallOfFame = 1,
  CRRT_Reward = 2,
}

export enum ClanRaidRewardRank {
  CRRR_PrefixEnum = 0,
  CRRR_D = 1,
  CRRR_C = 2,
  CRRR_Cc = 3,
  CRRR_B = 4,
  CRRR_Bb = 5,
  CRRR_Bbb = 6,
  CRRR_A = 7,
  CRRR_Aa = 8,
  CRRR_Aaa = 9,
  CRRR_S = 10,
  CRRR_Ss = 11,
  CRRR_Sss = 12,
  CRRR_Ud = 13,
  CRRR_Uc = 14,
  CRRR_Ucc = 15,
  CRRR_Ub = 16,
  CRRR_Ubb = 17,
  CRRR_Ubbb = 18,
  CRRR_Ua = 19,
  CRRR_Uaa = 20,
  CRRR_Uaaa = 21,
  CRRR_Us = 22,
  CRRR_Uss = 23,
  CRRR_Usss = 24,
}

export enum ClanRaidState {
  CRS_None = 0,
  CRS_NotSatisfyOpenCondition = 1,
  CRS_SeasonClose = 2,
  CRS_NotJoin = 3,
  CRS_OnBattle = 4,
  CRS_OnRestBattle = 5,
}

export enum ClassType {
  CT_None = 0,
  CT_Guardian = 1,
  CT_Warrior = 2,
  CT_Striker = 3,
  CT_Shooter = 4,
  CT_Priest = 5,
  CT_Commander = 6,
}

export enum CombatEventCategory {
  CombatEventCategory_UNSPECIFIED = 0,
  None = 1,
  Rule = 10,
  Unit = 20,
  Action = 30,
  Effect = 40,
  SkillComp = 50,
}

export enum CombatEventTargetType {
  CombatEventTargetType_UNSPECIFIED = 0,
  Unit = 10,
  Effect = 40,
}

export enum CommonDayCountType {
  CDCT_Zero = 0,
  CDCT_One = 1,
  CDCT_Two = 2,
  CDCT_Three = 3,
  CDCT_Four = 4,
  CDCT_Five = 5,
  CDCT_Six = 6,
  CDCT_Seven = 7,
  CDCT_Eight = 8,
  CDCT_Nine = 9,
  CDCT_Ten = 10,
}

export enum CommonStatusEffectType {
  CSET_None = 0,
  CSET_AddAttack = 1,
  CSET_AddAttackPercent = 2,
  CSET_AddDefence = 3,
  CSET_AddDefencePercent = 4,
  CSET_AddHeal = 5,
  CSET_AddHealPercent = 6,
  CSET_AddHp = 7,
  CSET_AddHpPercent = 8,
  CSET_AddCriticalDamage = 9,
  CSET_AddCriticalProb = 10,
  CSET_AddSpeedPercent = 11,
  CSET_AddSpeed = 12,
  CSET_AddResistance = 13,
  CSET_AddAccuracy = 14,
  CSET_AddMentalPercent = 15,
  CSET_HealMyHp = 16,
  CSET_HealMyMp = 17,
  CSET_IncHp = 18,
  CSET_IncMp = 19,
  CSET_Shield = 20,
  CSET_Stun = 21,
}

export enum ConditionPackageNotifyType {
  CPNT_None = 0,
  CPNT_ToastLordLevel1 = 1,
  CPNT_ToastLordLevel2 = 2,
  CPNT_ToastLordLevel3 = 3,
  CPNT_PopupType1 = 51,
  CPNT_PopupType2 = 52,
}

export enum ConditionSummonFromType {
  CSFT_None = 0,
  CSFT_TrackingSummon = 1,
}

export enum ConditionSummonLogType {
  CSLT_Create = 0,
  CSLT_Summon = 1,
  CSLT_Reset = 2,
  CSLT_Extend = 3,
  CSLT_GmTool = 4,
}

export enum ConsecutiveAttendanceResultType {
  CART_Attendance = 0,
  CART_Failed = 1,
  CART_Reset = 2,
}

export enum ContentsEnergyChargeType {
  CECT_UserLocalDaily = 0,
  CECT_TermTime = 1,
  CECT_FixedKoreaTime = 2,
}

export enum ContentsOpenCondition {
  COC_None = 0,
  COC_UserLev = 1,
  COC_ClearSubStage = 2,
  COC_Fame = 3,
  COC_ClearStage = 4,
  COC_Character = 5,
  COC_ContractCharacter = 6,
  COC_ClearProofDungeonFloor = 7,
  COC_ArenaScore = 8,
  COC_ClearContractDay = 9,
  COC_ClearHistory = 10,
  COC_FinishedContract = 11,
  COC_Promote = 12,
  COC_StartContractSeason = 13,
  COC_SinceRegDatetime = 14,
  COC_InviteFestivalRewardMission = 15,
  COC_PeriodGetCharacter = 16,
  COC_ClearElementProofFloorTotal = 17,
  COC_ClearElementProof = 18,
  COC_DaysFromSignup = 19,
  COC_DaysAfterSignup = 20,
  COC_ClearMemorialSubStage = 21,
  COC_TrackingSummonClear = 22,
  COC_ClearEastBridgeStage = 23,
  COC_WarfarePromote = 24,
}

export enum ContentsType {
  CT_PrefixEnum = 0,
  CT_ChangeFormation = 1,
  CT_GachaShop = 2,
  CT_MysteryShop = 3,
  CT_Dispatch = 4,
  CT_Dungeon = 5,
  CT_Clan = 6,
  CT_SupportCharacter = 7,
  CT_CharacterContract = 8,
  CT_Arena = 9,
  CT_CraftGear = 10,
  CT_ClanRaid = 11,
  CT_Chatting = 12,
  CT_CharacterBoard = 13,
  CT_ProofDungeon = 14,
  CT_CostumeShop = 15,
  CT_FreedomSquare = 16,
  CT_DakkeonTraining = 17,
  CT_Archive = 18,
  CT_SeaBattle = 19,
  CT_GearReconstruct = 20,
  CT_CubeMarket = 21,
  CT_Summon = 22,
  CT_TyrantWar = 23,
  CT_AvalonTheater = 24,
  CT_ChatGeneral = 25,
  CT_FamineRaid = 26,
  CT_SetCharacterAi = 27,
  CT_SummonSelect = 28,
  CT_Ranking = 29,
  CT_RoyalMission = 30,
  CT_BattlePreset = 31,
  CT_CharacterContractInfinite = 32,
  CT_ElementProofDungeon = 33,
  CT_WorldRaid = 34,
  CT_WorldRaidDisplay = 35,
  CT_Memorial = 36,
  CT_LordAbility = 37,
  CT_TrackingSummon = 38,
  CT_EastBridge = 39,
  CT_CustomCraftGear = 40,
  CT_DailyLife = 41,
  CT_Warfare = 42,
  CT_LordBday = 43,
  CT_PotentialPower = 44,
}

export enum CostumeAcquire {
  CA_Reward = 0,
  CA_CostumeShop = 1,
  CA_CostumeMileageShop = 2,
}

export enum CostumeEffectType {
  CET_None = 0,
  CET_StoryExpPercent = 1,
  CET_StoryGoldPercent = 2,
}

export enum CostumeGachaType {
  CGT_PrefixEnum = 0,
  CGT_GachaBeautyBasic = 1,
  CGT_GachaBeautyPromotion = 2,
  CGT_GachaBeautyWishAll = 3,
  CGT_GachaBeautyWishPickup = 4,
  CGT_GachaCostumeBeautyBasic = 5,
  CGT_GachaCostumeBeautyLimited = 6,
  CGT_GachaGroupCostumeBeauty = 7,
  CGT_GachaGroupBeauty = 8,
  CGT_GachaBeautyBday = 9,
  CGT_GachaLimitedCostumeBasic = 10,
}

export enum CostumeGrade {
  CG_Common = 0,
  CG_Limited = 1,
}

export enum CouponVariables {
  CV_PrefixEnum = 0,
  CV_BoxDefaultCount = 1,
  CV_InvalidCouponId = 101,
  CV_InvalidCouponCode = 102,
  CV_AlreadyDeletedCode = 108,
  CV_AlreadyUsedCode = 109,
  CV_AllExhausted = 110,
  CV_InvalidDate = 111,
  CV_RepeatedFailed = 114,
  CV_Cooltime = 115,
  CV_InvalidCouponRepeated = 116,
  CV_DuplicatedCouponRepeatedMax = 117,
}

export enum CubeShopItemType {
  CSIT_PrefixEnum = 0,
  CSIT_Normal = 1,
}

export enum DailyBonusDataShowType {
  DBDST_PrefixEnum = 0,
  DBDST_Normal = 1,
  DBDST_Special = 2,
}

export enum DailyBonusType {
  DBT_PrefixEnum = 0,
  DBT_NewUser = 1,
  DBT_ReturnUser = 2,
}

export enum DailyLifeCollectionParentCategoryType {
  DLCPCT_None = 0,
  DLCPCT_CategoryIngredient = 1,
  DLCPCT_CategoryBeautyRecipe = 2,
  DLCPCT_CategoryStoryItem = 3,
}

export enum DailyLifeContentsOperateType {
  DLCOT_Permanent = 0,
  DLCOT_Season = 1,
}

export enum DailyLifeContentsType {
  DLCT_None = 0,
  DLCT_Fishing = 1,
}

export enum DailyLifeFishingRoundType {
  DLFRT_None = 0,
  DLFRT_RareRound = 1,
  DLFRT_GradeRound = 2,
}

export enum DailyLifeFishingSeasonRankType {
  DLFSRT_BestSize = 0,
  DLFSRT_TotalSize = 1,
  DLFSRT_SuccessCount = 2,
}

export enum DailyLifeFishingSeasonState {
  DLFSS_Permanent = 0,
  DLFSS_OnGoing = 1,
  DLFSS_Refreshing = 2,
  DLFSS_End = 3,
}

export enum DailyRandomBonusType {
  DRBT_PrefixEnum = 0,
  DRBT_Basic = 1,
  DRBT_Bonus = 2,
}

export enum DakkeonTrainingType {
  DTT_None = 0,
  DTT_MercenaryTraining = 1,
  DTT_TrainingRoom = 2,
}

export enum DataStringCovertType {
  DSCT_None = 0,
  DSCT_Uid = 1,
}

export enum DecoSlotNum {
  DSN_None = 0,
  DSN_Deco = 1,
  DSN_Slot1 = 2,
  DSN_Slot2 = 3,
}

export enum DispatchPolicyOption {
  DPO_NotAuto = 0,
  DPO_AutoFame = 1,
  DPO_AutoGold = 2,
  DPO_AutoExp = 3,
  DPO_AutoEnergy = 4,
  DPO_Count = 5,
}

export enum DispatchState {
  DS_None = 0,
  DS_Dispatching = 1,
  DS_Complete = 2,
}

export enum DisplayCharacterTagType {
  DCTT_PrefixEnum = 0,
  DCTT_None = 1,
  DCTT_Hot = 2,
  DCTT_Event = 3,
}

export enum DisplayEventBuffTagType {
  DEBTT_None = 0,
  DEBTT_Bday = 1,
  DEBTT_Special = 2,
  DEBTT_Party = 3,
}

export enum DungeonProofConditionType {
  DPCT_PrefixEnum = 0,
  DPCT_None = 1,
  DPCT_Clear = 2,
  DPCT_AllyDead = 3,
  DPCT_TurnCount = 4,
  DPCT_Class = 5,
  DPCT_Character = 6,
  DPCT_Formation = 7,
  DPCT_AllAlive = 8,
  DPCT_Element = 9,
  DPCT_AllyReady = 10,
  DPCT_ElementExcept = 11,
  DPCT_GearNoneEquip = 12,
  DPCT_DontUseBurstskill = 13,
  DPCT_ClassExcept = 14,
  DPCT_TotalMental = 15,
  DPCT_AllyMental = 16,
  DPCT_BattleCount = 17,
}

export enum DungeonType {
  None = 0,
  Dummy = 1,
  Story = 10,
  Weekly = 20,
  Tower = 30,
  Test = 99,
}

export enum EastBridgeBlessType {
  EBBT_Grade1 = 0,
  EBBT_Grade2 = 1,
  EBBT_Grade3 = 2,
  EBBT_Special = 3,
}

export enum EastBridgeDifficultyStep {
  EBDS_0 = 0,
  EBDS_1 = 1,
  EBDS_2 = 2,
  EBDS_3 = 3,
  EBDS_4 = 4,
  EBDS_5 = 5,
}

export enum EastBridgeHiddenStageCondition {
  EBHSC_None = 0,
  EBHSC_Prob = 1,
  EBHSC_SubstageScore = 2,
}

export enum EastBridgeNoiseStageType {
  EBNST_First = 0,
  EBNST_Open = 1,
  EBNST_Change = 2,
}

export enum EffectActiveEvent {
  EAE_BossSelfTurn = 0,
  EAE_AfterVulnerableStart = 1,
  EAE_StartGroggy = 2,
}

export enum EffectGenerateType {
  EGT_Random = 0,
  EGT_Fix = 1,
}

export enum EffectType {
  ET_PrefixEnumEffectType = 0,
  ET_Action = 1,
  ET_UnstackableShown = 2,
  ET_UnstackableHidden = 3,
  ET_StackableShown = 4,
  ET_StackableHidden = 5,
}

export enum ElementType {
  ET_PrefixEnumElementType = 0,
  ET_None = 1,
  ET_Common = 2,
  ET_Fire = 3,
  ET_Water = 4,
  ET_Earth = 5,
  ET_Light = 6,
  ET_Dark = 7,
}

export enum EnhanceType {
  ET_PrefixEnum = 0,
  ET_Promote = 1,
  ET_Awake = 2,
}

export enum EventBdayType {
  EBT_Bday = 0,
  EBT_Present = 1,
}

export enum EventBuffType {
  EBT_None = 0,
  EBT_RewardStoryExpUp = 1,
  EBT_RewardStoryGoldUp = 2,
  EBT_RewardDungeonItemUp = 3,
  EBT_GearUpgradeSale = 4,
  EBT_GearCraftSale = 5,
  EBT_DispatchTime = 7,
  EBT_DispatchFameUp = 8,
  EBT_EnergyDispatch = 9,
  EBT_EnergyStory = 10,
  EBT_EnergyDungeon = 11,
  EBT_DailyBonusTime = 12,
  EBT_MysteryShopSale = 13,
  EBT_MonsterFestival = 14,
  EBT_BdayExpUp = 15,
  EBT_PartyWeakMonster = 16,
  EBT_StoryBattleStatBuff1 = 17,
  EBT_ClanEventBuffStart = 100,
  EBT_RewardEventCoinUp = 101,
  EBT_DungeonRateUp = 102,
  EBT_EnergyClanPartyDungeon = 103,
}

export enum ExcludeContentsType {
  TECT_MonsterFestival = 0,
  TECT_PartyDungeon = 1,
  TECT_Ranking = 2,
  TECT_WorldRaid = 3,
  TECT_ElementProofDungeon = 4,
  TECT_ClanDoubleClashParty = 5,
  TECT_Warfare = 6,
  TECT_DailyLifeFishing = 7,
}

export enum FamineRaidRuleType {
  FRRT_SpeedFix = 0,
  FRRT_SkillLevelFix = 1,
  FRRT_CritrateFix = 2,
}

export enum FestivalEncountInfoType {
  FEIT_Normal = 0,
  FEIT_High = 1,
}

export enum FestivalEncounterActionType {
  FEAT_None = 0,
  FEAT_Init = 1,
  FEAT_Update = 2,
  FEAT_UpdateSkip = 3,
  FEAT_Encounter = 4,
}

export enum FestivalEventCheckType {
  FECT_None = 0,
  FECT_Energy = 1,
  FECT_Monster = 2,
}

export enum FestivalEventType {
  FET_Main = 0,
  FET_Sub = 1,
}

export enum FestivalShopItemType {
  FSIT_Normal = 0,
  FSIT_Special = 1,
}

export enum FestivalState {
  FS_NotOpen = 0,
  FS_Close = 1,
  FS_Ongoing = 2,
  FS_OnlyShopOpen = 3,
}

export enum FestivalType {
  FT_All = 0,
  FT_MonsterFestival = 1,
  FT_EventExchange = 2,
  FT_EventHeroBirthday = 3,
  FT_EventHeroPresent = 4,
}

export enum FishingMiniGameNodeIconColor {
  FMGNIC_Common = 0,
  FMGNIC_Replica = 1,
  FMGNIC_Exclusive = 2,
  FMGNIC_Event = 3,
}

export enum FormationEffect {
  FE_PrefixEnum = 0,
  FE_Normal = 1,
  FE_FrontFirst = 2,
  FE_AssistProbUp = 3,
  FE_BurstEnergyUp = 4,
  FE_BlockBurst = 5,
}

export enum FreedomSquareEmotionType {
  FSET_None = 0,
  FSET_Greeting = 1,
  FSET_Photogenic = 2,
  FSET_Pose = 3,
  FSET_Emotion = 4,
}

export enum FreedomSquareJoinRoomState {
  FSJRS_None = 0,
  FSJRS_ReadyToJoin = 1,
  FSJRS_Join = 2,
  FSJRS_KeepAlive = 3,
}

export enum FriendInviteStateType {
  FIST_PrevSeason = 0,
  FIST_CurrSeason = 1,
}

export enum GMAccountType {
  GAT_PrefixEnum = 0,
  GAT_Admin = 1,
  GAT_GM = 2,
  GAT_QA = 3,
  GAT_CS = 4,
  GAT_Viewer = 5,
}

export enum GMToolEventBuffScheduleType {
  GEBST_Setting = 0,
  GEBST_PreviewSetting = 1,
  GEBST_PreviewOn = 2,
  GEBST_ServiceSetting = 3,
  GEBST_ServiceOn = 4,
}

export enum GMToolFlag {
  GMTF_Compelete = 0,
  GMTF_Reset = 1,
  GMTF_NotExistUser = 2,
}

export enum GMToolProgressType {
  GPT_Add = 0,
  GPT_Update = 1,
  GPT_InPreview = 2,
  GPT_InService = 3,
}

export enum GMToolUserSearchType {
  GUST_PrefixEnum = 0,
  GUST_AccountId = 1,
  GUST_Name = 2,
  GUST_EncryptGameBaseId = 3,
  GUST_OriginGameBaseId = 4,
}

export enum GMTopicChannelState {
  GTCS_None = 0,
  GTCS_Open = 1,
  GTCS_CloseByUser = 2,
  GTCS_CloseByGM = 3,
}

export enum GMTopicMessageDirection {
  GTMD_None = 0,
  GTMD_ToUser = 1,
  GTMD_ToGM = 2,
}

export enum GMTopicType {
  GTT_None = 0,
  GTT_General = 1,
  GTT_ReadOnly = 2,
}

export enum GachaPickupCategoryType {
  GPCT_NotPickup = 0,
  GPCT_Pickup = 1,
}

export enum GachaSelectSubType {
  GSST_None = 0,
  GSST_Contract = 1,
  GSST_Start = 2,
  GSST_Bday = 3,
  GSST_SpecialEvent = 4,
}

export enum GachaType {
  GT_GachaPromotion = 0,
  GT_GachaBasic = 1,
  GT_GachaSelect = 2,
  GT_GachaRange = 3,
  GT_GachaCustom = 4,
  GT_GachaPromotionSelect = 5,
}

export enum GameMaintenanceNotice {
  GMN_CHAT = 0,
  GMN_TOP = 1,
}

export enum GearCustomCraftRequired {
  GCCR_None = 0,
  GCCR_ClassType = 1,
  GCCR_GearSlot = 2,
  GCCR_GearSet = 3,
  GCCR_Character = 4,
  GCCR_MainEffect = 5,
}

export enum GearGachaPriceType {
  GGPT_None = 0,
  GGPT_DailyFreeGacha = 1,
  GGPT_GachaTicket = 2,
  GGPT_Gem = 3,
}

export enum GearGroupSubType {
  GGST_None = 0,
  GGST_Scenario = 1,
  GGST_Mystic = 2,
  GGST_Replica = 3,
  GGST_Relic = 4,
}

export enum GearReconstructionRangeType {
  GRRT_None = 0,
  GRRT_MainEffect = 1,
  GRRT_SubEffect = 2,
  GRRT_ExclusiveEffect = 3,
}

export enum GearSlotType {
  GST_None = 0,
  GST_Weapon = 1,
  GST_Armor = 2,
  GST_Glove = 3,
  GST_Shoes = 4,
  GST_Accessory1 = 5,
  GST_Accessory2 = 6,
}

export enum GearType {
  GT_Common = 0,
  GT_ClassCommon = 1,
  GT_ClassExclusive = 2,
}

export enum GeneralSeasonState {
  GSS_Prev = 0,
  GSS_Now = 1,
  GSS_Next = 2,
}

export enum GiftDestroyReason {
  GDR_PrefixEnum = 0,
  GDR_Receive = 1,
  GDR_Expired = 2,
  GDR_AdminToolDelete = 3,
}

export enum GiftSenderType {
  GST_PrefixEnum = 0,
  GST_System = 1,
  GST_Shop = 2,
  GST_Advertisement = 3,
}

export enum GiftType {
  GT_Normal = 0,
  GT_ProfileIconSender = 1,
  GT_VariableMessage = 2,
}

export enum GlobalDataType {
  GDT_None = 0,
  GDT_Cash = 1,
  GDT_FreeGem = 2,
  GDT_CashGem = 3,
  GDT_Gold = 4,
  GDT_Energy = 5,
  GDT_Exp = 6,
  GDT_Gem = 7,
  GDT_ArenaEnergy = 8,
  GDT_CashMileage = 9,
  GDT_ClanPoint = 10,
  GDT_Fame = 11,
  GDT_Advertisement = 12,
  GDT_ProofDungeonEnergy = 13,
  GDT_CostumeTicket = 14,
  GDT_CostumeMileage = 15,
  GDT_MercenaryTrainingEnergy = 16,
  GDT_PartyEnergy = 17,
  GDT_SeaBattleEnergy = 18,
  GDT_Cube = 19,
  GDT_SummonStone = 20,
  GDT_SummonMileage = 21,
  GDT_EastBridgeRetryEnergy = 22,
  GDT_ContentsEnergy = 50,
  GDT_ContentsEnergyItem = 51,
  GDT_ExpItem = 101,
  GDT_PromoteStone = 102,
  GDT_AwakenStone = 103,
  GDT_Skillbook = 104,
  GDT_GearMaterial = 105,
  GDT_MythrilItem = 106,
  GDT_Box = 107,
  GDT_BoxRandom = 108,
  GDT_GroupRandom = 109,
  GDT_FestivalCoin = 110,
  GDT_GachaTicket = 111,
  GDT_LordCustom = 112,
  GDT_PopupDeco = 113,
  GDT_ChatEmoticon = 114,
  GDT_BoxRandomEmoticon = 115,
  GDT_BoxGearSelect = 116,
  GDT_BoxItemSelect = 117,
  GDT_BoxCustom = 118,
  GDT_PartyCoin = 119,
  GDT_SeaBattleCoin = 120,
  GDT_SummonTicket = 121,
  GDT_BoxCharacterSelect = 122,
  GDT_ClanPartyDungeonCoin = 123,
  GDT_SkillReset = 124,
  GDT_BattleSkipTicket = 125,
  GDT_TreasuryRandom = 126,
  GDT_BoxBeautySelect = 127,
  GDT_Potential = 128,
  GDT_RoyalMission = 129,
  GDT_BoxGearCharacterSelect = 130,
  GDT_BoxCostumeSelect = 131,
  GDT_ElementProofDungeonCoin = 132,
  GDT_ConditionSummon = 133,
  GDT_BoxWeaponSelect = 134,
  GDT_MemorialGearPiece = 135,
  GDT_BoxMemorialSelect = 136,
  GDT_LinkTraceSystem = 137,
  GDT_Timeskip = 138,
  GDT_BeautyTicket = 139,
  GDT_EastBridgeReviveCharacter = 140,
  GDT_EastBridgeRetry = 141,
  GDT_WarfareCoin = 142,
  GDT_BoxRandomGift = 143,
  GDT_BeautyExpItem = 144,
  GDT_BeautyGearMaterial = 145,
  GDT_PotentialPower = 146,
  GDT_MemorialGearUnequipCoin = 147,
  GDT_Gear = 150,
  GDT_Costume = 151,
  GDT_Character = 152,
  GDT_Beauty = 153,
  GDT_Weapon = 154,
  GDT_Photocard = 155,
  GDT_MemorialGear = 156,
  GDT_MpCrystal = 200,
  GDT_HpCrystal = 201,
  GDT_Soulpiece = 202,
  GDT_Display = 300,
  GDT_InviteFestivalPoint = 400,
  GDT_EventPoint = 401,
  GDT_ContractPoint = 402,
  GDT_ClanPartyBuff = 500,
  GDT_BattleBoost = 550,
  GDT_BattleRepeat = 551,
  GDT_BattleSkip = 552,
  GDT_FreeLordCustom = 553,
  GDT_Fish = 600,
  GDT_Conversion = 601,
  GDT_StoryItem = 602,
  GDT_BeautyRecipe = 603,
  GDT_EnergyChargeItem = 900,
  GDT_ElementProofDungeonEnergy = 901,
  GDT_Uid = 999,
  GDT_NormalReward = 9999,
}

export enum IntProbType {
  IPT_PrefixEnum = 0,
  IPT_P4 = 10000,
  IPT_P6 = 1000000,
  IPT_P8 = 100000000,
}

export enum ItemRareType {
  IRT_None = 0,
  IRT_Common = 1,
  IRT_Replica = 2,
  IRT_Exclusive = 3,
  IRT_Event = 999,
}

export enum LimitedRegisterType {
  LRT_None = 0,
  LRT_Before = 1,
  LRT_After = 2,
}

export enum LinkedDataType {
  LDT_None = 0,
  LDT_ShopDisplay = 1,
  LDT_Summon = 2,
  LDT_ProofDungeon = 3,
}

export enum LoadingType {
  LT_Tip = 0,
  LT_HeroLeft = 1,
  LT_HeroRight = 2,
  LT_Birthday = 3,
  LT_Universe = 4,
  LT_PartyDungeon = 5,
  LT_GameManagePromotion = 6,
}

export enum LogArchiveHistoryType {
  LAHT_PrefixEnum = 0,
  LAHT_Create = 1,
  LAHT_AddCount = 2,
  LAHT_GetReward = 3,
  LAHT_SetCount = 4,
}

export enum LogAuctionActionType {
  LAAT_Register = 0,
  LAAT_Unregister = 1,
  LAAT_Bid = 2,
  LAAT_Rebid = 3,
}

export enum LogChangePresetType {
  LCPT_Create = 0,
  LCPT_Change = 1,
}

export enum LogGiftStateType {
  LGST_PrefixEnum = 0,
  LGST_Distribute = 1,
  LGST_Open = 2,
  LGST_Withdraw = 3,
  LGST_OpenBox = 4,
  LGST_GiftFromBox = 5,
  LGST_GiftFromCoupon = 6,
  LGST_Expired = 7,
}

export enum LogHistoryType {
  LHT_LevelUp = 0,
  LHT_Reset = 1,
  LHT_PurchasePrevStep = 2,
  LHT_CorrectLogic = 3,
  LHT_Purchase = 4,
  LHT_ForceInit = 5,
  LHT_SelectCustomPackItem = 6,
}

export enum LogInviteFestivalHistoryType {
  LIFHT_PrefixEnum = 0,
  LIFHT_Create = 1,
  LIFHT_Reset = 2,
  LIFHT_AddCount = 3,
  LIFHT_GetReward = 4,
  LIFHT_WriteComment = 5,
  LIFHT_Read = 6,
  LIFHT_SetEventUniqueId = 7,
  LIFHT_AddInviteUserCount = 8,
  LIFHT_SetState = 9,
}

export enum LogLeadershipPointChangeType {
  LLSPCT_ResetLeadershipPoint = 0,
  LLSPCT_ResetSeason = 1,
  LLSPCT_Deploy = 2,
  LLSPCT_ByGmTool = 3,
  LLSPCT_UserGetExp = 10,
  LLSPCT_UserStoryStageClear = 11,
  LLSPCT_UserTyrantWarStageClear = 12,
  LLSPCT_UserGetFame = 13,
  LLSPCT_UserMemorialStageClear = 14,
  LLSPCT_UserEastBridgeStageClear = 15,
  LLSPCT_CharacterLevelUp = 21,
  LLSPCT_CharacterPromote = 22,
  LLSPCT_CharacterAwaken = 23,
  LLSPCT_CharacterOpenPotential = 24,
  LLSPCT_CharacterWeaponChange = 25,
  LLSPCT_CharacterGearChange = 26,
  LLSPCT_CharacterBeautyChange = 27,
  LLSPCT_CharacterSkillLevelChange = 28,
  LLSPCT_GetCharacter = 29,
  LLSPCT_CharacterAssistLevelChange = 30,
  LLSPCT_CharacterMemorialGearChange = 31,
  LLSPCT_CharacterBeautyUpgrade = 32,
  LLSPCT_CharacterPotentialPowerLevelUp = 33,
}

export enum LogMercenaryTrainingHistoryType {
  LMTHT_PrefixEnum = 0,
  LMTHT_Create = 1,
  LMTHT_Reset = 2,
  LMTHT_SubstageUpdate = 3,
  LMTHT_GiveUp = 4,
  LMTHT_Clear = 5,
}

export enum LordSkillTriggerType {
  LSTT_None = 0,
  LSTT_TotalDmg = 1,
}

export enum LordSkillType {
  LST_None = 0,
  LST_Attack = 1,
  LST_Utility = 2,
  LST_Heal = 3,
}

export enum MailBoxEventType {
  MBET_Default = 0,
  MBET_MonsterFestival = 1,
  MBET_PartySeason = 2,
  MBET_ClanPartyDungeon = 3,
  MBET_ClanDoubleClashParty = 4,
}

export enum MarketCode {
  MC_ALL = 0,
  MC_EDI = 1,
  MC_LOC = 2,
  MC_APP = 3,
  MC_GOO = 4,
  MC_ONE = 5,
}

export enum MasterCustomizingGradeType {
  MCGT_PrefixEnum = 0,
  MCGT_Look = 1,
  MCGT_Free = 2,
}

export enum MasterGenderType {
  MGT_None = 0,
  MGT_Male = 1,
  MGT_Female = 2,
}

export enum MasterHairColorType {
  MHCT_None = 0,
  MHCT_Color1 = 1,
  MHCT_Color2 = 2,
  MHCT_Color3 = 3,
  MHCT_Color4 = 4,
  MHCT_Color5 = 5,
  MHCT_Color6 = 6,
  MHCT_Count = 7,
}

export enum MasterHairType {
  MHT_None = 0,
  MHT_Hair1 = 1,
  MHT_Hair2 = 2,
  MHT_Hair3 = 3,
  MHT_Hair4 = 4,
  MHT_Count = 5,
}

export enum MasterSkinType {
  MST_None = 0,
  MST_Skin1 = 1,
  MST_Skin2 = 2,
  MST_Skin3 = 3,
  MST_Skin4 = 4,
  MST_Skin5 = 5,
  MST_Count = 6,
}

export enum MemorialGroupOpenCondition {
  MGOC_None = 0,
  MGOC_StageClear = 1,
  MGOC_Stage3Clear = 2,
}

export enum MemorialGroupOpenConditionCheckValue {
  MGOCCV_None = 0,
  MGOCCV_Story = 1,
  MGOCCV_TyrantWar = 2,
  MGOCCV_Memorial = 3,
}

export enum MiniGameHitGradeType {
  MGHGT_Miss = 0,
  MGHGT_Good = 1,
  MGHGT_Great = 2,
  MGHGT_Perfect = 3,
  MGHGT_BonusGood = 4,
  MGHGT_BonusGreat = 5,
  MGHGT_BonusPerfect = 6,
}

export enum MsgCharacterAiItem_CharacterAiType {
  CAT_None = 0,
  CAT_Random = 1,
  CAT_OppositeElement = 2,
  CAT_EnemyContinuousEffect = 3,
  CAT_AllyContinuousEffect = 4,
  CAT_EnemyHpOver = 5,
  CAT_EnemyHpUnder = 6,
  CAT_AllyHpOver = 7,
  CAT_AllyHpUnder = 8,
  CAT_EnemyCountOver = 9,
  CAT_EnemyCountUnder = 10,
  CAT_NoNextRound = 11,
  CAT_ElementInferiorToMe = 12,
  CAT_ElementNoinferiorToMe = 13,
  CAT_NextSkill = 14,
  CAT_SoulMax = 15,
  CAT_AllyDead = 16,
  CAT_ClanRaid = 17,
  CAT_AllyAttackHigh = 18,
  CAT_Boss = 19,
  CAT_SeaBattle = 20,
  CAT_FriendlyMatch = 21,
  CAT_FamineRaidAllyLiveTarget = 22,
  CAT_EnemyRight = 23,
  CAT_EnemyLeft = 24,
  CAT_EnemyFatalityClose = 25,
  CAT_AllyHpLow = 26,
  CAT_AllyDeadRandom = 27,
  CAT_DeadAllyAttackHigh = 28,
}

export enum NetworkErrorShowType {
  NEST_None = 0,
  NEST_NoShow = 1,
  NEST_Restart = 2,
  NEST_Confirm = 3,
  NEST_Embeded = 4,
  NEST_Text = 5,
}

export enum NpcTalkEventType {
  NTET_None = 0,
  NTET_Prev = 1,
  NTET_MarkAndTitle1 = 2,
  NTET_MarkAndTitle2 = 3,
  NTET_ImageBg = 4,
  NTET_ImageFg = 5,
  NTET_TextBg = 6,
  NTET_TextFg = 7,
  NTET_ColorBg = 8,
  NTET_GalusIntroEvent = 9,
  NTET_TitleAndBg1 = 10,
  NTET_SubtitleAndBg1 = 11,
  NTET_NarrationTitle = 12,
  NTET_NarrationText = 13,
}

export enum NpcTalkExpressionType {
  NTET_AnimationClip = 0,
  NTET_Timeline = 1,
}

export enum NpcTalkTalkerType {
  NTTT_PreferMyself = 0,
  NTTT_PreferNpc = 1,
}

export enum NpcTalkType {
  NTT_NPCTalk = 0,
  NTT_LordTalk = 1,
  NTT_KartisTalk = 2,
  NTT_BossTalk = 3,
}

export enum OSCode {
  OC_PrefixEnum = 0,
  OC_MAC = 1,
  OC_WIN = 2,
  OC_IOS = 3,
  OC_AND = 4,
}

export enum OpenWeekday {
  OW_Mon = 0,
  OW_Tue = 1,
  OW_Wed = 2,
  OW_Thu = 3,
  OW_Fri = 4,
  OW_Sat = 5,
  OW_Sun = 6,
  OW_Weekend = 7,
  OW_All = 8,
}

export enum OverlapType {
  OT_Must = 0,
  OT_HigherTurn = 1,
  OT_Recently = 2,
}

export enum PackAloneSubType {
  PAST_PackAloneMain = 0,
  PAST_PackAloneSub = 1,
}

export enum PagingContentsType {
  PGT_None = 0,
  PGT_GearAuction = 1,
}

export enum PagingLimit {
  PL_PrefixEnum = 0,
  PL_GearAuction = 200,
}

export enum PartyDungeonMonsterType {
  PDMT_None = 0,
  PDMT_Popo = 1,
}

export enum PartyDungeonState {
  PDS_NotOpen = 0,
  PDS_Close = 1,
  PDS_Ongoing = 2,
  PDS_OnlyShopOpen = 3,
}

export enum PartyIdx {
  PI_None = 0,
  PI_PartyIdx1 = 1,
  PI_PartyIdx2 = 2,
}

export enum PartyRewardRank {
  PRR_Good = 0,
  PRR_Great = 1,
  PRR_Best = 2,
}

export enum PartyShopItemType {
  PSIT_Normal = 0,
  PSIT_Special = 1,
}

export enum PartyStageOpenCondition {
  PSOC_None = 0,
  PSOC_TotalMonsterCount = 1,
}

export enum PhaseChangeCondition {
  PCC_None = 0,
  PCC_TurnOver = 1,
  PCC_EnemyTurnOver = 2,
  PCC_TotalDamageOver = 3,
  PCC_KillAllEnemy = 4,
  PCC_KillEnemy = 5,
}

export enum PhaseChangeEvent {
  PCE_None = 0,
  PCE_SummonBossMonster = 1,
  PCE_SummonMonster = 2,
  PCE_DeleteBossMonster = 3,
  PCE_DeleteMonster = 4,
  PCE_ChangeTeam = 5,
  PCE_TimeLine = 6,
  PCE_BossAppearTimeLine = 7,
  PCE_PlayAutoSequence = 8,
  PCE_FadeIn = 9,
  PCE_FadeOut = 10,
  PCE_SaveBossCurrentHp = 11,
  PCE_LoadBossCurrentHp = 12,
  PCE_TyrantwarLordCommand = 13,
  PCE_AutoSequenceScenarioScene = 14,
  PCE_UnitDisappear = 15,
  PCE_AutoSequenceTalk = 16,
  PCE_ChangeBattleBgm = 17,
  PCE_UseChainburstInTyrantwar = 18,
}

export enum PhaseConditionCheckType {
  PCCT_None = 0,
  PCCT_Or = 1,
  PCCT_And = 2,
}

export enum PhaseConditionType {
  PCT_None = 0,
  PCT_Hp = 1,
  PCT_TotalTurn = 2,
}

export enum PhotocardGrade {
  PG_Common = 0,
}

export enum PhotocardTagCategoryType {
  PTCT_TagHeroBorn = 0,
  PTCT_TagBday = 1,
  PTCT_TagBdayMonth = 2,
  PTCT_TagEvent = 3,
  PTCT_TagDungeon = 4,
  PTCT_TagSeason = 5,
}

export enum PhotocardTypeCategory {
  PTC_None = 0,
  PTC_Bday = 1,
  PTC_Event = 2,
}

export enum PlatformAccountLinkState {
  PALS_PrefixEnum = 0,
  PALS_NotLinkAccount = 1,
  PALS_LinkAccountNotReceiveReward = 2,
  PALS_ReceiveReward = 3,
}

export enum PlatformCode {
  PC_PrefixEnum = 0,
  PC_Guest = 10,
  PC_Facebook = 11,
  PC_GooglePlay = 12,
  PC_AppleGameCenter = 13,
  PC_AppleId = 14,
  PC_Line = 15,
  PC_Gamebase = 20,
  PC_UUID = 99,
}

export enum PolicySelectPosition {
  PSP_PrefixEnum = 0,
  PSP_Left = 1,
  PSP_Right = 2,
}

export enum PopupDecoType {
  PDT_PrefixEnum = 0,
  PDT_Badge = 1,
  PDT_Ballon = 2,
  PDT_Bg = 3,
}

export enum PopupNoticeType {
  PNT_EmergencyNoticeTemplate = 0,
  PNT_BlueNoticeTemplate = 1,
  PNT_RedNoticeTemplate = 2,
}

export enum PotentialType {
  PT_None = 0,
  PT_Aquarius = 1,
  PT_Aries = 2,
  PT_Cancer = 3,
  PT_Capricorn = 4,
  PT_Gemini = 5,
  PT_Libra = 6,
  PT_Leo = 7,
  PT_Pisces = 8,
  PT_Sagittarius = 9,
  PT_Scorpio = 10,
  PT_Taurus = 11,
  PT_Virgo = 12,
}

export enum PrefabTimeType {
  PTT_None = 0,
  PTT_Time = 1,
  PTT_Date = 2,
}

export enum PremiumEventGetRewardType {
  PEGRT_None = 0,
  PEGRT_MissionAllReward = 1,
  PEGRT_MissionReward = 2,
  PEGRT_CompleteReward = 3,
}

export enum PremiumEventMissionState {
  PEMS_None = 0,
  PEMS_Progress = 1,
  PEMS_Completed = 2,
}

export enum PremiumEventMissionType {
  PEMT_Sub = 0,
  PEMT_Main = 1,
}

export enum PremiumEventType {
  PET_None = 0,
  PET_NewAndOriginalUser = 1,
}

export enum ProductType {
  PT_PrefixEnum = 0,
  PT_Cash = 1,
  PT_Event = 2,
}

export enum ProfileIconType {
  PIT_None = 0,
  PIT_Lord = 1,
  PIT_Character = 2,
  PIT_Awaken1 = 3,
  PIT_Awaken2 = 4,
  PIT_Costume = 5,
  PIT_Illust = 6,
}

export enum ProfileMessageType {
  PMT_None = 0,
  PMT_Hello = 1,
  PMT_Arena = 2,
  PMT_InviteFestival = 3,
}

export enum ProofDungeonClearGrade {
  PDCG_None = 0,
  PDCG_Bronze = 1,
  PDCG_Silver = 2,
  PDCG_Gold = 3,
}

export enum ProofDungeonRankingType {
  PDRT_PrefixEnum = 0,
  PDRT_Conquest = 1,
  PDRT_Floor = 2,
}

export enum PushState {
  PS_Block = 0,
  PS_Night = 1,
  PS_Daylight = 2,
  PS_Always = 3,
}

export enum QuestMainCondition {
  QMC_None = 0,
  QMC_UserLogin = 1,
  QMC_UserLev = 2,
  QMC_ProgressTutorial = 3,
  QMC_SetHelloMessage = 4,
  QMC_GetDailyRandomBonus = 5,
  QMC_AdCount = 6,
  QMC_UseGem = 11,
  QMC_UseGold = 12,
  QMC_UseEnergy = 13,
  QMC_GetGem = 14,
  QMC_GetGold = 15,
  QMC_UseFame = 16,
  QMC_CollectCharacter = 21,
  QMC_CharacterLev = 22,
  QMC_CharacterAwaken = 23,
  QMC_CharacterPromote = 24,
  QMC_CharacterSkillLev = 25,
  QMC_CharacterSpecificLev = 26,
  QMC_BattleEnter = 31,
  QMC_BattleStageAllClear = 32,
  QMC_BattleWin = 33,
  QMC_BattleLose = 34,
  QMC_BattleContinue = 35,
  QMC_SetArenaDefence = 36,
  QMC_ChangeArenaTier = 37,
  QMC_ArenaBattleEnd = 38,
  QMC_SubstageClear = 39,
  QMC_EquipGear = 41,
  QMC_UpgradeGear = 42,
  QMC_DismantleGear = 43,
  QMC_CraftGear = 44,
  QMC_GetCostume = 45,
  QMC_GetItem = 51,
  QMC_UseItem = 52,
  QMC_QuestClear = 61,
  QMC_Dispatch = 62,
  QMC_DispatchPolicy = 63,
  QMC_PurchaseMysteryShopItem = 71,
  QMC_GachaGetExclusiveGear = 72,
  QMC_PurchaseShopItem = 73,
  QMC_PurchaseShopItemOr = 74,
  QMC_MonsterFestivalCount = 81,
  QMC_GetInvitePoint = 90,
  QMC_TyrantWarSubstageClear = 101,
  QMC_MemorialGroupAllClear = 102,
  QMC_MemorialSubstageClear = 103,
  QMC_EastBridgeSubstageClear = 104,
  QMC_ClanRaidGroggy = 111,
}

export enum QuestSubCondition {
  QSC_None = 0,
  QSC_CharacterUid = 1,
  QSC_CharacterBaseResourceName = 2,
  QSC_CharacterLev = 3,
  QSC_AwakenLev = 4,
  QSC_CharacterElem = 5,
  QSC_Result = 6,
  QSC_Grade = 7,
  QSC_ClassType = 8,
  QSC_CharacterSkillLev = 9,
  QSC_CharacterSkillType = 10,
  QSC_BattleType = 11,
  QSC_StageUid = 12,
  QSC_SubstageUid = 13,
  QSC_ClearGrade = 14,
  QSC_StageDifficulty = 15,
  QSC_ArenaTierUid = 16,
  QSC_CharacterSupport = 17,
  QSC_Floor = 18,
  QSC_ArenaRank = 19,
  QSC_SeaBattleRank = 20,
  QSC_GearSlotType = 21,
  QSC_GearLev = 22,
  QSC_GearType = 23,
  QSC_GearCount = 24,
  QSC_CostumeUid = 25,
  QSC_ItemUid = 31,
  QSC_ItemType = 32,
  QSC_QuestType = 41,
  QSC_QuestUid = 42,
  QSC_DispatchRegionUid = 43,
  QSC_TutorialUid = 51,
  QSC_EventMonster = 61,
  QSC_ShopItemUid = 71,
  QSC_PurchaseCount = 72,
  QSC_SeasonUid = 80,
  QSC_GroupUid = 81,
  QSC_BattleDamage = 90,
}

export enum QuestType {
  QT_PrefixEnum = 0,
  QT_Achievement = 1,
  QT_Mission = 2,
  QT_ChallengeAchievement = 3,
}

export enum RankingContentsType {
  RCT_LeadershipPoint = 0,
  RCT_ClanRaid = 1,
  RCT_SeaBattle = 2,
  RCT_End = 3,
}

export enum RankingLeagueChangeType {
  RLCT_None = 0,
  RLCT_Self = 1,
  RLCT_Forced = 2,
}

export enum RankingLeagueType {
  RLT_None = 0,
  RLT_Pawn = 1,
  RLT_Knight = 2,
  RLT_Bishop = 3,
  RLT_Rook = 4,
  RLT_Royal = 5,
  RLT_End = 6,
}

export enum RankingSeasonState {
  RSS_Ongoing = 0,
  RSS_Refreshing = 1,
  RSS_ChangeLeague = 2,
  RSS_Complete = 3,
}

export enum ReceiveUserGiftType {
  RUGT_All = 0,
  RUGT_Gold = 1,
  RUGT_Energy = 2,
  RUGT_Gem = 3,
  RUGT_Etc = 4,
}

export enum RedisStoredDataType {
  RSDT_SeaBattle = 0,
}

export enum RefundResult {
  RR_RefundComplelte = 0,
  RR_ShortageOfGoods = 1,
  RR_RefundImpossiblePack = 2,
  RR_RefundAble = 3,
  RR_RefundDisable = 4,
}

export enum RegionType {
  RT_PrefixEnum = 0,
  RT_Korea = 1,
  RT_Global = 2,
  RT_Japan = 3,
}

export enum RegisterRestrictType {
  RRT_PrefixEnum = 0,
  RRT_ClassExclusive = 1,
}

export enum RegularNoticeShowTime {
  RNTST_PrefixEnum = 0,
  RNTST_Short = 1,
  RNTST_Normal = 2,
  RNTST_Long = 3,
}

export enum RegularNoticeType {
  RBT_PrefixEnum = 0,
  RNT_Regular = 1,
  RNT_Emergency = 2,
  RNT_Event = 3,
}

export enum RepeatEventTimeType {
  RETT_None = 0,
  RETT_Period = 1,
  RETT_Daily = 2,
  RETT_Month = 3,
  RETT_Weekly = 4,
}

export enum ResourceChangeType {
  RCT_PrefixEnum = 0,
  RCT_Gain = 1,
  RCT_Use = 2,
  RCT_Reset = 3,
  RCT_AuctionRegister = 4,
  RCT_AuctionUnregister = 5,
  RCT_WithdrawDeactivateEventPoint = 6,
  RCT_Upgrade = 7,
  RCT_Destroy = 8,
  RCT_AutoCharge = 9,
}

export enum RestrictType {
  RT_Always = 0,
  RT_Limited = 1,
  RT_PeriodLimited = 2,
  RT_PeriodResetDay = 3,
  RT_PeriodResetWeek = 4,
  RT_PeriodResetMonth = 5,
}

export enum RewardGrade {
  RG_PrefixEnum = 0,
  RG_Normal = 1,
  RG_Rare = 2,
  RG_SuperRare = 3,
}

export enum RoundBattleDataType {
  RBDT_PrefixEnum = 0,
  RBDT_General = 1,
  RBDT_Encounter = 2,
  RBDT_Boss = 3,
  RBDT_MonsterEvent = 4,
}

export enum RoyalMissionDifficulty {
  RMD_None = 0,
  RMD_Easy = 1,
  RMD_Normal = 2,
  RMD_Hard = 3,
}

export enum RoyalMissionLogRadomRewardChangeType {
  RMLRRCT_None = 0,
  RMLRRCT_New = 1,
  RMLRRCT_User = 2,
  RMLRRCT_Force = 3,
  RMLRRCT_Tool = 4,
}

export enum RoyalMissionLogType {
  RMLT_None = 0,
  RMLT_Time = 1,
  RMLT_Free = 2,
  RMLT_Buy = 3,
  RMLT_NewSeason = 4,
}

export enum SNSLoginOption {
  SLO_None = 0,
  SLO_UseCurrentData = 1,
  SLO_UseSNSData = 2,
}

export enum ServerControlContentsType {
  SCCT_PrefixEnum = 0,
  SCCT_Arena = 1,
  SCCT_InventoryGearDismantle = 2,
  SCCT_GearCraft = 3,
  SCCT_CharacterCostume = 4,
  SCCT_CharacterEpisode = 5,
  SCCT_Clan = 6,
  SCCT_ChangeLanguage = 7,
  SCCT_ClanRaid = 8,
  SCCT_MonsterFestival = 9,
  SCCT_ProofDungeon = 10,
  SCCT_ProofDungeonTrace = 11,
  SCCT_IgnoreStageOpenTime = 12,
  SCCT_Archive = 13,
  SCCT_LobbySeasonDungeon = 14,
  SCCT_SeaBattle = 15,
  SCCT_GearAuction = 16,
  SCCT_TyrantWar = 17,
  SCCT_IgnoreTyrantWarStageOpenTime = 18,
  SCCT_AvalonTheater = 19,
  SCCT_StageDifficultyNightmare = 20,
  SCCT_Grade7 = 21,
  SCCT_FamineRaid = 22,
  SCCT_GrowthHistory = 23,
  SCCT_TalkDebug = 24,
  SCCT_CostumeRoomWeapon = 25,
  SCCT_IgnoreSideStoryChapterOpenDate = 26,
  SCCT_ShorCutFadeIn = 27,
  SCCT_Ranking = 28,
  SCCT_CheckLeadershipPoint = 29,
  SCCT_ElementProofDungeon = 30,
  SCCT_WorldRaid = 31,
  SCCT_ToastContentsIndicator = 32,
  SCCT_VoiceRoom = 33,
  SCCT_WarfareBanner = 34,
}

export enum SetEffectCond {
  SEC_PrefixEnum = 0,
  SEC_Always = 1,
  SEC_EachRoundStart = 2,
}

export enum ShopCategory {
  SC_Costume = 0,
  SC_Gacha = 1,
  SC_Charge = 2,
  SC_CharacterPackage = 3,
  SC_TermPackage = 4,
  SC_EventPackage = 5,
  SC_GooglePreRegister = 6,
  SC_FreePackage = 8,
  SC_ConditionPackage = 10,
  SC_CostumeMileage = 11,
  SC_AlonePackage = 12,
  SC_PassPackage = 13,
  SC_CustomPackage = 14,
  SC_Summon = 18,
  SC_Subscription = 19,
  SC_MissionPassPackage = 20,
  SC_EventBdayPackage = 21,
  SC_FestivalPackage = 22,
  SC_CostumePurchase = 23,
  SC_AttendancePremium = 24,
  SC_StepPackage = 25,
  SC_ConditionPeriodPackage = 26,
  SC_ClanPoint = 100,
  SC_MonsterFestival = 101,
  SC_PartyDungeon = 102,
  SC_SeaBattle = 103,
  SC_Cube = 104,
  SC_SummonMileage = 105,
  SC_ClanPartyDungeonShop = 106,
  SC_ElementProofDungeonShop = 107,
  SC_ClanAttendanceShop = 108,
  SC_WarfareShop = 109,
  SC_DailyLifeFishingExchange = 110,
}

export enum ShopDisplayViewType {
  SDVT_None = 0,
  SDVT_Special = 1,
  SDVT_Period = 2,
  SDVT_Normal = 3,
}

export enum ShopItemMark {
  SIM_Common = 0,
  SIM_New = 1,
  SIM_Sale = 2,
  SIM_Limited = 3,
  SIM_Hot = 4,
}

export enum ShopItemOpenState {
  SIOS_PrefixEnum = 0,
  SIOS_Open = 1,
  SIOS_Close = 2,
  SIOS_Reward = 3,
  SIOS_Package = 10,
  SIOS_Viewing = 11,
  SIOS_Contract = 12,
}

export enum ShopItemState {
  SIS_Close = 0,
  SIS_NotSatisfyOpenCondition = 1,
  SIS_Open = 2,
  SIS_Purchased = 3,
}

export enum ShopItemType {
  SIT_ChargeGem = 0,
  SIT_ChargeEnergy = 1,
  SIT_ChargeGold = 2,
  SIT_ChargeCostumeTicket = 3,
  SIT_ChargeSummonStone = 4,
  SIT_ChargeAllThings = 5,
  SIT_PackTerm = 11,
  SIT_PackCharacter = 12,
  SIT_PackEvent = 13,
  SIT_GooglePreRegister = 14,
  SIT_PackFree = 15,
  SIT_PackCondition = 16,
  SIT_Costume = 17,
  SIT_CostumeMileage = 18,
  SIT_PackAlone = 19,
  SIT_PackCustom = 20,
  SIT_Subscription = 21,
  SIT_StoryPass = 22,
  SIT_MissionPass = 23,
  SIT_PackEventBday = 24,
  SIT_PackFestival = 25,
  SIT_PackAttendance = 26,
  SIT_PackStep = 27,
  SIT_PackConditionPeriod = 28,
  SIT_CostumeMileageRecipe = 29,
}

export enum ShortCut {
  SC_PrefixEnum = 0,
  SC_Story = 1,
  SC_Dungeon = 2,
  SC_WeeklyDungeon = 3,
  SC_HiddenDungeon = 4,
  SC_Arena = 5,
  SC_Tower = 6,
  SC_Character = 7,
  SC_CharacterGear = 8,
  SC_CharacterPromote = 9,
  SC_CharacterAwake = 10,
  SC_Clan = 11,
  SC_Shop = 12,
  SC_Mystery = 13,
  SC_Universe = 14,
  SC_GearCraft = 15,
  SC_StoryHard = 16,
  SC_StoryElite = 17,
  SC_ClanRaid = 18,
  SC_StoryRecent = 19,
  SC_ProofDungeon = 20,
  SC_LordProfile = 21,
  SC_Lobby = 22,
  SC_GachaShop = 23,
  SC_CostumeShop = 24,
  SC_CostumeMileageShop = 25,
  SC_TimeEvent = 26,
  SC_Archive = 27,
  SC_MercenaryTraining = 28,
  SC_FreedomSquare = 29,
  SC_PartyDungeonMain = 30,
  SC_SeaBattleMain = 31,
  SC_Auction = 32,
  SC_Festival = 33,
  SC_SummonMain = 34,
  SC_TyrantWarWorldMap = 35,
  SC_InviteFestival = 36,
  SC_AvalonTheater = 37,
  SC_ClanPartyDungeon = 38,
  SC_TrainingRoom = 39,
  SC_SubscriptionShortCut = 40,
  SC_ClanAttendance = 41,
  SC_EventExchange = 42,
  SC_StoryNightmare = 43,
  SC_EventHeroBirthday = 44,
  SC_FamineRaid = 45,
  SC_CharacterSkill = 46,
  SC_CharacterExp = 47,
  SC_CharacterPotential = 48,
  SC_SideStory = 49,
  SC_StageNightmare = 50,
  SC_StageElite = 51,
  SC_StageHard = 52,
  SC_StageNormal = 53,
  SC_Ranking = 54,
  SC_ElementProofDungeon = 55,
  SC_ClanDoubleClashParty = 56,
  SC_Memorial = 57,
  SC_TrackingSummon = 58,
  SC_CharacterContract = 59,
  SC_ClanShop = 60,
  SC_EastBridgeWorldMap = 61,
  SC_EastBridge = 62,
  SC_Warfare = 63,
  SC_FishingEvent = 64,
  SC_ArenaBridge = 65,
}

export enum SideStoryMissionCondition {
  SSMC_None = 0,
  SSMC_BattleWin = 1,
  SSMC_BattleEnd = 2,
}

export enum Skill {
  S_None = 0,
  S_DamageAttack = 1,
  S_DamageGivDebuff = 3,
  S_DamageGiv = 4,
  S_DamageTak = 5,
  S_DamageHp = 6,
  S_DamageAttackAddHp = 7,
  S_DamageDefence = 8,
  S_DamageAttackAddDefence = 9,
  S_DamageSpeed = 10,
  S_DamageAttackAddSpeed = 11,
  S_DamageAttackCriticalIgnoreDefence = 12,
  S_DamagePerHp = 13,
  S_DamageAllyPerCurrentHp = 14,
  S_DamageTrueIgnoreAll = 15,
  S_HealGiv = 21,
  S_HealAttack = 22,
  S_HealAttackAddHp = 23,
  S_HealDefence = 24,
  S_HealAttackAddDefence = 25,
  S_HealHp = 26,
  S_HealTargetHp = 27,
  S_TurnAddBuff = 31,
  S_TurnAddDebuff = 32,
  S_DeleteBuff = 33,
  S_DeleteDebuff = 34,
  S_DeleteBuffProtection = 35,
  S_StackAddBuff = 36,
  S_StackAddDebuff = 37,
  S_AddGauge = 41,
  S_BuffAdditionalTurn = 42,
  S_DebuffBlockAdditionalTurn = 43,
  S_CooldownReset = 51,
  S_CooldownIncrease = 52,
  S_CooldownDecrease = 53,
  S_AddActionGauge = 61,
  S_SubtractActionGauge = 62,
  S_AddActionGaugeExceptCounterAssist = 63,
  S_AddConstantActionGauge = 64,
  S_AddActionGaugeAfterAttackToSelf = 65,
  S_AddActionGaugeExceptAdditionalTurn = 66,
  S_Revival = 71,
  S_BuffAttack = 101,
  S_BuffDefence = 102,
  S_BuffHp = 103,
  S_BuffSpeed = 104,
  S_BuffCriticalProb = 105,
  S_BuffCriticalDamage = 106,
  S_BuffAccuracy = 107,
  S_BuffResistance = 108,
  S_BuffCriticalResistanceProb = 109,
  S_BuffImmune = 111,
  S_BuffImmuneControl = 112,
  S_BuffImmuneDebuff = 113,
  S_BuffImmuneCc = 114,
  S_BuffImmuneBossMighty = 115,
  S_BuffImmuneBossLesstargetfix = 116,
  S_BuffInvincible = 117,
  S_BuffCounterattack = 118,
  S_BuffThorns = 119,
  S_BuffImmuneBossSuper = 120,
  S_BuffShieldHp = 121,
  S_BuffShieldAttack = 122,
  S_BuffCounterattackCommander = 123,
  S_BuffDamageAddAccuracy = 130,
  S_BuffDamageAddBurstJoin = 131,
  S_BuffDamageAddTargetBuff = 132,
  S_BuffDamageAddTargetDebuff = 133,
  S_BuffDamageAddSelfBuff = 134,
  S_BuffDamageAddSelfDebuff = 135,
  S_BuffDamageAddSelfLostHp = 136,
  S_BuffDamageAddTargetCurrentHp = 137,
  S_BuffDamageAddTargetMaxHp = 138,
  S_BuffDamageAddTargetNumber = 139,
  S_BuffDamageAddTargetAttack = 140,
  S_BuffHealDot = 141,
  S_BuffRevival = 151,
  S_BuffReflectDebuff = 152,
  S_BuffRevivalPassive = 153,
  S_BuffDamageTaken = 161,
  S_BuffDamageTakenGear = 162,
  S_BuffLimitDamage = 163,
  S_BuffHealDamage = 171,
  S_BuffHealCriticalDamage = 172,
  S_BuffHealDamageNoRandom = 173,
  S_BuffHealDamageLostHp = 174,
  S_BuffAttackTargetLostHp = 181,
  S_BuffDefenceTargetLostHp = 182,
  S_BuffHpTargetLostHp = 183,
  S_BuffSpeedTargetLostHp = 184,
  S_BuffCriticalProbTargetLostHp = 185,
  S_BuffCriticalDamageTargetLostHp = 186,
  S_BuffAccuracyTargetLostHp = 187,
  S_BuffResistanceTargetLostHp = 188,
  S_BuffCriticalResistanceProbTargetLostHp = 189,
  S_BuffAssistAttackOccurProb = 190,
  S_BuffAtkAddTeamNumberAllAlly = 191,
  S_BuffAtkAddTeamNumberFire = 192,
  S_BuffAtkAddTeamNumberWater = 193,
  S_BuffAtkAddTeamNumberEarth = 194,
  S_BuffAtkAddTeamNumberLight = 195,
  S_BuffAtkAddTeamNumberDark = 196,
  S_BuffDefenceAddTeamNumberAllAlly = 197,
  S_BuffDefenceAddTeamNumberFire = 198,
  S_BuffDefenceAddTeamNumberWater = 199,
  S_BuffDefenceAddTeamNumberEarth = 200,
  S_BuffDefenceAddTeamNumberLight = 201,
  S_BuffDefenceAddTeamNumberDark = 202,
  S_BuffCriticalProbAddTeamNumberAllAlly = 203,
  S_BuffCriticalProbAddTeamNumberFire = 204,
  S_BuffCriticalProbAddTeamNumberWater = 205,
  S_BuffCriticalProbAddTeamNumberEarth = 206,
  S_BuffCriticalProbAddTeamNumberLight = 207,
  S_BuffCriticalProbAddTeamNumberDark = 208,
  S_BuffCriticalDamageAddTeamNumberAllAlly = 209,
  S_BuffCriticalDamageAddTeamNumberFire = 210,
  S_BuffCriticalDamageAddTeamNumberWater = 211,
  S_BuffCriticalDamageAddTeamNumberEarth = 212,
  S_BuffCriticalDamageAddTeamNumberLight = 213,
  S_BuffCriticalDamageAddTeamNumberDark = 214,
  S_BuffSpeedAddTeamNumberAllAlly = 215,
  S_BuffSpeedAddTeamNumberFire = 216,
  S_BuffSpeedAddTeamNumberWater = 217,
  S_BuffSpeedAddTeamNumberEarth = 218,
  S_BuffSpeedAddTeamNumberLight = 219,
  S_BuffSpeedAddTeamNumberDark = 220,
  S_BuffResistanceAddTeamNumberAllAlly = 221,
  S_BuffResistanceAddTeamNumberFire = 222,
  S_BuffResistanceAddTeamNumberWater = 223,
  S_BuffResistanceAddTeamNumberEarth = 224,
  S_BuffResistanceAddTeamNumberLight = 225,
  S_BuffResistanceAddTeamNumberDark = 226,
  S_BuffAccuracyAddTeamNumberAllAlly = 227,
  S_BuffAccuracyAddTeamNumberFire = 228,
  S_BuffAccuracyAddTeamNumberWater = 229,
  S_BuffAccuracyAddTeamNumberEarth = 230,
  S_BuffAccuracyAddTeamNumberLight = 231,
  S_BuffAccuracyAddTeamNumberDark = 232,
  S_BuffCriticalDamageTargetLostHpWorldRaidVanguard = 233,
  S_BuffDamageTrueIgnoreAll = 234,
  S_BuffDamageGivenAction = 235,
  S_DebuffAttack = 301,
  S_DebuffDefence = 302,
  S_DebuffHp = 303,
  S_DebuffSpeed = 304,
  S_DebuffCriticalProb = 305,
  S_DebuffCriticalDamage = 306,
  S_DebuffAccuracy = 307,
  S_DebuffResistance = 308,
  S_DebuffCriticalResistanceProb = 309,
  S_DebuffDefenceAdditional = 310,
  S_DebuffHealFail = 311,
  S_DebuffRevivalFail = 312,
  S_DebuffBuffFail = 313,
  S_DebuffDamageAddHeal = 314,
  S_DebuffDamageGiven = 321,
  S_DebuffDamageTaken = 322,
  S_DebuffDamageMultiplicationTaken = 323,
  S_DebuffDamageMultiplicationTakenClanRaid = 324,
  S_DebuffDotDamage = 331,
  S_BuffLimitDotDamage = 332,
  S_DebuffLimitBurstGauge = 341,
  S_DebuffDecreaseBurstGauge = 342,
  S_DebuffAttackPriorityRecently = 351,
  S_DebuffDefencePriorityRecently = 352,
  S_DebuffSilence = 401,
  S_DebuffStun = 402,
  S_DebuffFrozen = 403,
  S_DebuffSkipTurn = 404,
  S_DebuffTaunt = 421,
  S_DebuffPetrify = 441,
  S_DebuffSleep = 442,
  S_DebuffOblivion = 461,
  S_DebuffRandom = 462,
  S_DebuffInstantDeath = 463,
  S_DebuffRandomAttack = 471,
  S_BuffStackSpd = 501,
  S_BuffAttackStackable = 601,
  S_BuffDefenceStackable = 602,
  S_BuffHpStackable = 603,
  S_BuffSpeedStackable = 604,
  S_BuffCriticalProbStackable = 605,
  S_BuffCriticalDamageStackable = 606,
  S_BuffAccuracyStackable = 607,
  S_BuffResistanceStackable = 608,
  S_BuffCommanderStackable = 609,
  S_DebuffImmuneBuff = 610,
  S_BuffCriticalProbStackableWorldRaidAllAlly1 = 611,
  S_BuffCriticalProbStackableWorldRaidAllAlly2 = 612,
  S_BuffCriticalProbStackableWorldRaidAllAlly3 = 613,
  S_BuffDetectionStackableAddAttack = 615,
  S_BuffCommanderStackableRaligon = 616,
  S_BuffCommanderStackableUiChecker = 617,
  S_BuffCommanderStackableCommanderGear = 618,
  S_BuffCommanderStackableShooterGear = 619,
  S_Groggy = 621,
  S_SelectSkillFatality = 622,
  S_SealFreed = 623,
  S_BuffImmuneVulnerableGauge = 624,
  S_SystemBuffAttack = 651,
  S_SystemBuffHp = 652,
  S_SystemBuffDefence = 653,
  S_SystemDebuffDamageGiven = 654,
  S_SystemDebuffDecreaseBurstGauge = 655,
  S_SystemDebuffDecreaseSoulpieceSkilluse = 656,
  S_BuffElementDamageGivenToFirePartner = 690,
  S_BuffElementDamageGivenToEarthPartner = 691,
  S_BuffElementDamageGivenToWaterPartner = 692,
  S_BuffElementDamageGivenToLightPartner = 693,
  S_BuffElementDamageGivenToDarkPartner = 694,
  S_BuffElementDamageGivenToFire = 701,
  S_BuffElementDamageGivenToEarth = 702,
  S_BuffElementDamageGivenToWater = 703,
  S_BuffElementDamageGivenToLight = 704,
  S_BuffElementDamageGivenToDark = 705,
  S_BuffElementDamageTakenFromFire = 706,
  S_BuffElementDamageTakenFromEarth = 707,
  S_BuffElementDamageTakenFromWater = 708,
  S_BuffElementDamageTakenFromLight = 709,
  S_BuffElementDamageTakenFromDark = 710,
  S_BuffElementDamageGivenToFireWeapon = 711,
  S_BuffElementDamageGivenToEarthWeapon = 712,
  S_BuffElementDamageGivenToWaterWeapon = 713,
  S_BuffElementDamageGivenToLightWeapon = 714,
  S_BuffElementDamageGivenToDarkWeapon = 715,
  S_BuffElementDamageTakenFromFireShown = 716,
  S_BuffElementDamageTakenFromEarthShown = 717,
  S_BuffElementDamageTakenFromWaterShown = 718,
  S_BuffElementDamageTakenFromLightShown = 719,
  S_BuffElementDamageTakenFromDarkShown = 720,
  S_BuffAddSoulpieceSkilluse = 721,
  S_BuffAddSoulpieceFormation = 722,
  S_BuffAddAssistProb = 723,
  S_BuffAddSoulpieceCommanderSkill = 724,
  S_BuffAddSoulpiece = 725,
  S_BuffAddSoulpiecePartner = 726,
  S_DebuffDecreaseSoulpieceSkilluse = 727,
  S_BuffIgnoreDefence = 731,
  S_BuffAdditionalDamage = 732,
  S_BuffIgnoreDefencePassive = 733,
  S_BuffAdditionalDamageWorldRaidAllAlly1 = 734,
  S_BuffAdditionalDamageWorldRaidAllAlly2 = 735,
  S_BuffAdditionalDamageWorldRaidAllWarrior1 = 736,
  S_BuffAdditionalDamageWorldRaidAllWarrior2 = 737,
  S_BuffAdditionalDamageWorldRaidVanguard1 = 738,
  S_BuffAdditionalDamageWorldRaidVanguard2 = 739,
  S_RobBuff = 741,
  S_RobBuffLately = 742,
  S_BuffImmortal = 751,
  S_BuffElementDamageGivenToEarthBeforeSkill = 761,
  S_BuffElementDamageGivenToFireBeforeSkill = 762,
  S_BuffElementDamageGivenToWaterBeforeSkill = 763,
  S_BuffElementDamageGivenToLightBeforeSkill = 764,
  S_BuffElementDamageGivenToDarkBeforeSkill = 765,
  S_BuffImmuneBossSuperExceptGauge = 801,
  S_BuffAddActiveGaugeTargetAll = 811,
  S_BuffAddMaxBurstAmount = 812,
  S_ActionCounterParticularNumberAttacked = 813,
  S_CommanderSkillCommon = 814,
  S_StartRoundShowing = 815,
  S_BuffDamageTakenCommander = 816,
  S_CommanderBuffCriticalDamage = 817,
  S_GroupProbAccuracyApply = 901,
  S_GroupProbAccuracyNotApply = 902,
  S_BuffImmuneBossObelisk = 921,
  S_DebuffElementWeaken = 931,
  S_BuffSkillAutoTrigger = 941,
  S_WeaponBuffHp = 951,
  S_WeaponBuffAttack = 952,
  S_WeaponBuffDefence = 953,
  S_WeaponBuffSpeed = 954,
  S_WeaponBuffCriticalProb = 955,
  S_WeaponBuffCriticalDamage = 956,
  S_WeaponBuffAccuracy = 957,
  S_WeaponBuffResistance = 958,
  S_WeaponBuffCriticalResistanceProb = 959,
  S_GearPowerfulBuffAttack = 1001,
  S_GearSetCommanderBuffAttack = 1002,
  S_GearSetBuffSpeed = 1003,
  S_BuffDodge = 1101,
  S_BuffBerserkAtkDef = 1111,
  S_BuffThornsAfterHeal = 1201,
  S_BuffAllAllyElementDamageTakenFromFirePotential = 1301,
  S_BuffAllAllyElementDamageTakenFromEarthPotential = 1302,
  S_BuffAllAllyElementDamageTakenFromWaterPotential = 1303,
  S_BuffAllAllyElementDamageTakenFromLightPotential = 1304,
  S_BuffAllAllyElementDamageTakenFromDarkPotential = 1305,
  S_BuffAllAllyElementDamageGivenToFirePotential = 1306,
  S_BuffAllAllyElementDamageGivenToEarthPotential = 1307,
  S_BuffAllAllyElementDamageGivenToWaterPotential = 1308,
  S_BuffAllAllyElementDamageGivenToLightPotential = 1309,
  S_BuffAllAllyElementDamageGivenToDarkPotential = 1310,
  S_BuffElementDamageGivenToFirePotential = 1311,
  S_BuffElementDamageGivenToEarthPotential = 1312,
  S_BuffElementDamageGivenToWaterPotential = 1313,
  S_BuffElementDamageGivenToLightPotential = 1314,
  S_BuffElementDamageGivenToDarkPotential = 1315,
  S_BuffAtkAddTeamNumberPotential = 1399,
  S_BuffDefAddTeamNumberPotential = 1400,
  S_DebuffDecreaseAddActionGauge = 1450,
  S_BuffImmuneSubtractActionGauge = 1451,
  S_BuffElementDamageGivenToFireShown = 1500,
  S_BuffElementDamageGivenToEarthShown = 1501,
  S_BuffElementDamageGivenToWaterShown = 1502,
  S_BuffElementDamageGivenToLightShown = 1503,
  S_BuffElementDamageGivenToDarkShown = 1504,
  S_BuffGuardianWill = 1550,
  S_DebuffWarriorSignStackable = 1551,
  S_BuffGuardianWill2 = 1552,
  S_BuffSpeedAdditional = 1600,
  S_BuffAddAssistPartnerProbAdd = 1650,
  S_DebuffShieldAmountControl = 1700,
  S_DebuffHealAmountControl = 1701,
  S_DebuffAmountSoulsNeededControl = 1702,
  S_BuffSelfDamageAddSelfBuff = 1750,
  S_BuffSelfDamageAddSelfDebuff = 1751,
  S_BuffAttackValueTeam = 1800,
  S_MemorialBuffHp = 1850,
  S_MemorialBuffAttack = 1851,
  S_MemorialBuffDefence = 1852,
  S_MemorialBuffSpeed = 1853,
  S_MemorialBuffCriticalProb = 1854,
  S_MemorialBuffCriticalDamage = 1855,
  S_MemorialBuffAccuracy = 1856,
  S_MemorialBuffResistance = 1857,
  S_MemorialBuffCounterattack = 1858,
  S_LordAbilityBuffDamageTrueIgnoreAll = 1900,
  S_LordAbilityBuffAttackElemental3 = 1901,
  S_LordAbilityBuffAttackElemental5 = 1902,
  S_LordAbilityBuffAttackPriest = 1903,
  S_LordAbilityBuffAttack = 1904,
  S_LordAbilityBuffAttackVanguard = 1905,
  S_LordAbilityBuffDefenceElemental3 = 1906,
  S_LordAbilityBuffDefenceElemental5 = 1907,
  S_LordAbilityBuffDefence = 1908,
  S_LordAbilityBuffDefenceStriker = 1909,
  S_LordAbilityBuffDefenceVanguard = 1910,
  S_LordAbilityBuffHpElemental3 = 1911,
  S_LordAbilityBuffHpElemental5 = 1912,
  S_LordAbilityBuffHpPriest = 1913,
  S_LordAbilityBuffHp = 1914,
  S_LordAbilityBuffHpStriker = 1915,
  S_LordAbilityBuffHpVanguard = 1916,
  S_LordAbilityBuffAddAssistProbAdd = 1917,
  S_LordAbilityBuffThorns = 1918,
  S_LordAbilityBuffAdditionalDamage = 1919,
  S_LordAbilityBuffCounterattack = 1920,
  S_LordAbilityBuffCriticalDamage = 1921,
  S_LordAbilityBuffCriticalProb = 1922,
  S_BuffEnforceUltimate = 2000,
  S_BuffAttackStackableAttackToSelf = 2010,
  S_BuffSpeedStackableAttackToSelf = 2011,
  S_BuffCriticalDamageStackableAttackToSelf = 2012,
  S_EastBuffSpeed = 2050,
  S_EastSpecialBuffHp = 2051,
  S_EastBuffHp = 2052,
  S_EastCoreBuffHp = 2053,
  S_EastSpecialBuffAttack = 2054,
  S_EastBuffAttack = 2055,
  S_EastSpecialBuffDefence = 2056,
  S_EastBuffDefence = 2057,
  S_EastCoreBuffDefence = 2058,
  S_EastBuffAdditionalDamage = 2059,
  S_EastCoreBuffCriticalDamageTargetLostHp = 2060,
  S_EastBuffAttackStackable = 2061,
  S_EastCoreBuffAttackStackable = 2062,
  S_EastCoreBuffCriticalDamageStackable = 2063,
  S_GmtoolEventIconShowing = 2070,
  S_GmtoolEventBuffHp = 2071,
  S_GmtoolEventBuffAttack = 2072,
  S_GmtoolEventBuffDefence = 2073,
  S_GmtoolEventBuffSpeed = 2074,
  S_GmtoolEventBuffCriticalProb = 2075,
  S_GmtoolEventBuffCriticalDamage = 2076,
  S_GmtoolEventBuffAccuracy = 2077,
  S_GmtoolEventBuffResistance = 2078,
  S_WarfareBuffHp = 2100,
  S_WarfareBuffAttackStackable = 2101,
  S_WarfareBuffAdditionalDamage = 2102,
  S_WarfareAddActionGaugeAfterAttackToSelf = 2103,
  S_WarfareBuffAttackStackableAttackToSelf = 2104,
  S_PotentialPowerBuffHp = 2200,
  S_PotentialPowerBuffAttack = 2201,
  S_PotentialPowerBuffDefence = 2202,
  S_PotentialPowerBuffHp1 = 2203,
  S_PotentialPowerBuffAttack1 = 2204,
  S_PotentialPowerBuffDefence1 = 2205,
}

export enum SkillActiveType {
  None = 0,
  Attack = 100,
  Heal = 200,
}

export enum SkillActorType {
  SkillActorType_UNSPECIFIED = 0,
  Skill = 10,
  SkillPassive = 11,
  SkillEffect = 20,
  SkillComp = 30,
}

export enum SkillEffectDetailType {
  SEDT_None = 0,
  SEDT_Given = 1,
  SEDT_Normal = 2,
  SEDT_Boss = 3,
  SEDT_Counter = 4,
  SEDT_Thorns = 5,
  SEDT_Dot = 6,
  SEDT_Attack = 7,
  SEDT_Mez = 8,
  SEDT_TargetFix = 9,
  SEDT_Skill = 10,
  SEDT_Buff = 11,
  SEDT_Debuff = 12,
  SEDT_Good = 13,
  SEDT_Bad = 14,
  SEDT_Taken = 15,
  SEDT_Stackable = 16,
  SEDT_Prob = 17,
  SEDT_Condition = 18,
  SEDT_Unconditional = 19,
  SEDT_BuffProtection = 20,
  SEDT_Subtract = 21,
  SEDT_SkilluseUnconditional = 22,
  SEDT_Conditional = 23,
  SEDT_IgnoreControlBad = 24,
  SEDT_AllAlly = 25,
  SEDT_Fire = 26,
  SEDT_Water = 27,
  SEDT_Earth = 28,
  SEDT_Light = 29,
  SEDT_Dark = 30,
  SEDT_Decrease = 31,
  SEDT_StackableMerged = 32,
}

export enum SkillEffectSubType {
  SEST_None = 0,
  SEST_Attack = 1,
  SEST_Heal = 2,
  SEST_TurnAdd = 3,
  SEST_Delete = 4,
  SEST_ActiveTime = 5,
  SEST_Cooldown = 6,
  SEST_Stat = 7,
  SEST_Damage = 8,
  SEST_Shield = 9,
  SEST_Immune = 10,
  SEST_Invicible = 11,
  SEST_Revival = 12,
  SEST_Cc = 13,
  SEST_Fail = 14,
  SEST_Invincible = 15,
  SEST_ElementDamage = 16,
  SEST_AdditionalTurn = 17,
  SEST_SoulPiece = 18,
  SEST_IgnoreDefence = 19,
  SEST_ResistActionGauge = 20,
  SEST_Rob = 21,
  SEST_InstantDeath = 22,
  SEST_AutoTrigger = 23,
  SEST_ElementWeak = 24,
  SEST_AssistAttack = 25,
  SEST_Reflect = 26,
  SEST_Fatality = 27,
  SEST_ShieldAmount = 28,
  SEST_HealAmount = 29,
}

export enum SkillEffectType {
  SET_None = 0,
  SET_Debuff = 1,
  SET_Buff = 2,
  SET_Attack = 3,
  SET_Heal = 4,
  SET_ControlBad = 5,
  SET_ControlGood = 6,
  SET_Independence = 7,
  SET_IndependenceDebuff = 8,
  SET_IndependenceBuff = 9,
  SET_CasterBuff = 10,
  SET_CasterDebuff = 11,
}

export enum SkillPreCondition {
  SPC_PrefixEnum = 0,
  SPC_None = 1,
  SPC_SelfBurstJoinMin = 2,
  SPC_SelfBuff = 3,
  SPC_SelfDebuff = 4,
  SPC_ThornsExceptElement = 5,
  SPC_AliveAllyCountMin = 6,
  SPC_SelfSkillEffectStackEqual = 7,
  SPC_SelfSkillEffectStackHigher = 8,
  SPC_SelfSkillEffectStackLower = 9,
  SPC_AliveFireAllyCountMin = 10,
  SPC_AliveWaterAllyCountMin = 11,
  SPC_AliveEarthAllyCountMin = 12,
  SPC_AliveLightAllyCountMin = 13,
  SPC_AliveDarkAllyCountMin = 14,
  SPC_IsPartnerAlive = 15,
  SPC_AliveEnemyCountEqual = 16,
  SPC_AliveEnemyCountHigher = 17,
  SPC_AliveEnemyCountLower = 18,
  SPC_BurstPositionEqual = 19,
  SPC_BurstPositionHigher = 20,
  SPC_BurstPositionLower = 21,
  SPC_SelfSkillEffectRemainTurnEqual = 22,
  SPC_SelfSkillEffectRemainTurnHigher = 23,
  SPC_SelfSkillEffectRemainTurnLower = 24,
  SPC_DeadAllyCountEqual = 25,
  SPC_DeadAllyCountHigher = 26,
  SPC_DeadAllyCountLower = 27,
  SPC_AliveFireAllyCountEqual = 28,
  SPC_AliveWaterAllyCountEqual = 29,
  SPC_AliveEarthAllyCountEqual = 30,
  SPC_AliveLightAllyCountEqual = 31,
  SPC_AliveDarkAllyCountEqual = 32,
  SPC_AliveFireEnemyCountEqual = 33,
  SPC_AliveWaterEnemyCountEqual = 34,
  SPC_AliveEarthEnemyCountEqual = 35,
  SPC_AliveLightEnemyCountEqual = 36,
  SPC_AliveDarkEnemyCountEqual = 37,
  SPC_AliveFireEnemyCountHigher = 38,
  SPC_AliveWaterEnemyCountHigher = 39,
  SPC_AliveEarthEnemyCountHigher = 40,
  SPC_AliveLightEnemyCountHigher = 41,
  SPC_AliveDarkEnemyCountHigher = 42,
  SPC_CasterElement = 43,
  SPC_SelfPotentialEqual = 44,
  SPC_SelfPotentialHigher = 45,
}

export enum SkillPriorityRule {
  SPR_None = 0,
  SPR_UseActiveSkillFirst = 1,
  SPR_UseUltimateSkillFirst = 2,
  SPR_NotUseActiveSkill = 3,
  SPR_NotUseUltimateSkill = 4,
  SPR_OnlyUseDefaultSkill = 5,
}

export enum SkillTargetCondition {
  STC_PrefixEnum = 0,
  STC_None = 1,
  STC_TargetDebuffNon = 2,
  STC_TargetElementBasic3 = 3,
  STC_TargetBuff = 4,
  STC_TargetDebuff = 5,
  STC_TargetSameSkillStackCountHigher = 6,
  STC_SkillEffectHigher = 7,
  STC_LowerHp = 8,
  STC_TargetElement = 9,
  STC_TargetSkillEffectStackEqual = 10,
  STC_TargetSkillEffectStackHigher = 11,
  STC_AllyGuardian = 12,
  STC_AllyStriker = 13,
  STC_AllyWarrior = 14,
  STC_AllyShooter = 15,
  STC_AllyPriest = 16,
  STC_AllyCommander = 17,
  STC_HiddenSkillEffectHigher = 18,
}

export enum SkillTargetType {
  STT_None = 0,
  STT_Target = 1,
  STT_Self = 2,
  STT_AllEnemy = 3,
  STT_AllAlly = 4,
  STT_TargetMinHp = 5,
  STT_ActiveEventTarget = 6,
  STT_RandomEnemy = 7,
  STT_LowerHpEnemy = 8,
  STT_HigherHpEnemy = 9,
  STT_RandomAlly = 10,
  STT_LowerHpAlly = 11,
  STT_NextTurnAlly = 12,
  STT_MaxDebuffAlly = 13,
  STT_Boss = 14,
  STT_Team = 15,
  STT_ActiveTimeAlly = 16,
  STT_ActiveTimeEnemy = 17,
  STT_HigherAttackAlly = 18,
  STT_LowerHpAllyLowerSelf = 19,
  STT_LowerHpPerAlly = 20,
  STT_LowerHpPerAllyLowerSelf = 21,
  STT_HigherAttackAllyLowerSelf = 22,
  STT_HigherSpeedAlly = 23,
  STT_HigherSpeedAllyLowerSelf = 24,
  STT_LowerSpeedAlly = 25,
  STT_LowerSpeedAllyLowerSelf = 26,
  STT_HigherCriticalPerAlly = 27,
  STT_HigherCriticalPerAllyLowerSelf = 28,
  STT_LowerCriticalPerAlly = 29,
  STT_LowerCriticalPerAllyLowerSelf = 30,
  STT_HigherCriticalDamagePerAlly = 31,
  STT_HigherCriticalDamagePerAllyLowerSelf = 32,
  STT_LowerCriticalDamagePerAlly = 33,
  STT_LowerCriticalDamagePerAllyLowerSelf = 34,
  STT_HigherAttackEnemy = 35,
  STT_AllAllyNotSelf = 36,
  STT_RandomEachTeam = 37,
  STT_Vanguard = 38,
}

export enum SkillUsageType {
  None = 0,
  HaveDebuffInEnemy = 1000,
  HaveDebuffInEnemies = 1010,
  HaveDebuffInFriend = 1020,
  HaveDebuffInFriends = 1030,
}

export enum SkillValueTargetType {
  SVTT_None = 0,
  SVTT_Caster = 1,
  SVTT_Owner = 2,
  SVTT_Target = 3,
}

export enum SkillValueType {
  SVT_None = 0,
  SVT_Attack = 1,
  SVT_Defence = 2,
  SVT_Hp = 3,
  SVT_Speed = 4,
  SVT_CriticalRate = 50,
  SVT_CriticalDamage = 60,
  SVT_Accuracy = 70,
  SVT_Resistance = 80,
}

export enum StageDifficulty {
  SD_None = 0,
  SD_Normal = 1,
  SD_Hard = 2,
  SD_Elite = 3,
  SD_Nightmare = 4,
  SD_Max = 5,
  SD_Event = 6,
}

export enum StageOpenState {
  SOS_PrefixEnum = 0,
  SOS_Open = 1,
  SOS_Closed = 2,
  SOS_ComingSoon = 3,
}

export enum StandardTime {
  ST_None = 0,
  ST_UserTime = 1,
  ST_ServerTime = 2,
}

export enum StatGrade {
  SG_Ss = 0,
  SG_S = 1,
  SG_A = 2,
  SG_B = 3,
}

export enum StatType {
  StatType_UNSPECIFIED = 0,
  Attack = 10,
  Defence = 20,
  HP = 30,
  Speed = 40,
  CriticalProb = 50,
  CriticalDamage = 60,
  Accuracy = 70,
  Resistance = 80,
  CritRegsistance = 90,
  Mental = 100,
}

export enum StatusEffectIfCond {
  SEIC_PrefixEnum = 0,
  SEIC_All = 1,
  SEIC_Critical = 2,
  SEIC_StatusEffect = 3,
}

export enum StepPackageType {
  SPT_Step = 0,
  SPT_DailyStep = 1,
}

export enum SubStageType {
  SST_PrefixEnum = 0,
  SST_Normal = 1,
  SST_MiddleBoss = 2,
  SST_Boss = 3,
  SST_StoryOnly = 4,
}

export enum SubscriptionDurationType {
  SDT_None = 0,
  SDT_Day = 1,
  SDT_Week = 2,
  SDT_Month = 3,
}

export enum SubscriptionItemOperationType {
  SIOT_None = 0,
  SIOT_Normal = 1,
  SIOT_NewReturn = 2,
}

export enum SubscriptionProductItemState {
  SPIS_Subscribing = 0,
  SPIS_Deactivate = 1,
  SPIS_Reset = 2,
  SPIS_FreeSubscribing = 3,
  SPIS_Cancel = 4,
  SPIS_Ended = 5,
}

export enum SubscriptionServiceType {
  SST_None = 0,
  SST_Present = 1,
  SST_ContinuousPresent = 2,
  SST_Benefit = 3,
  SST_BenefitDaily = 4,
  SST_BenefitMonthly = 5,
  SST_BenefitDailyPresent = 6,
}

export enum SummonCeilType {
  SCT_Normal = 0,
  SCT_Event = 1,
}

export enum SummonRewardType {
  SRT_Character = 0,
  SRT_WeaponBasic = 1,
  SRT_WeaponElegant = 2,
  SRT_WeaponDesperado = 3,
}

export enum SummonTabType {
  STT_Normal = 0,
  STT_Condition = 1,
}

export enum SummonType {
  ST_SummonSelect = 0,
  ST_SummonPromotion = 1,
  ST_SummonWeapon = 2,
  ST_SummonWeaponSelect = 3,
  ST_SummonCharacterSelect = 4,
  ST_SummonTutorial = 5,
  ST_SummonWeaponPromotion = 6,
  ST_SummonCharacterSelectForWeapon = 7,
}

export enum SummonWeaponRefreshType {
  SWRT_None = 0,
  SWRT_Pay = 1,
  SWRT_Time = 2,
}

export enum TextValueType {
  TVT_String = 0,
  TVT_ElementType = 1,
}

export enum TickEventType {
  None = 0,
  UnitAction = 1,
  CastingAction = 2,
  EffectTick = 3,
  ChannelingTick = 4,
}

export enum TimeControlType {
  TCT_Lobby = 0,
  TCT_ShopDisplayItem = 1,
  TCT_CostumeShop = 2,
  TCT_CostumeMileageItem = 3,
  TCT_Gacha = 4,
  TCT_BuffEvent = 5,
  TCT_MonsterFestival = 6,
  TCT_TimeEvent = 7,
  TCT_AdvertisementGift = 8,
  TCT_PartyDungeon = 9,
  TCT_Summon = 10,
  TCT_InviteFestival = 11,
  TCT_AvalonTheaterContents = 12,
  TCT_ClanPartyDungeon = 13,
  TCT_Subscription = 14,
  TCT_ClanAttendance = 15,
  TCT_EventExchange = 16,
  TCT_AttendanceEvent = 17,
  TCT_AttendanceCountdown = 18,
  TCT_EventBday = 19,
  TCT_FamineRaid = 20,
  TCT_TimeEventMission = 21,
  TCT_TimeEventContract = 22,
  TCT_WorldmapBanner = 23,
  TCT_SideStory = 24,
  TCT_CostumePurchase = 25,
  TCT_AttendanceMonthly = 26,
  TCT_AttendancePremium = 27,
  TCT_RoyalMission = 28,
  TCT_RankingDev = 29,
  TCT_PremiumEventSeason = 30,
  TCT_AttendanceStack = 31,
  TCT_ClanDoubleClashParty = 32,
  TCT_FishingSeason = 33,
}

export enum TimeEventAdvertisementType {
  TEAT_None = 0,
  TEBT_Gift = 1,
  TEBT_MysteryShop = 2,
  TEBT_TimeEvent = 3,
  TEBT_TrainingRoom = 4,
}

export enum TimeEventBattleType {
  TEBT_None = 0,
  TEBT_Story = 1,
  TEBT_Dungeon = 2,
  TEBT_Arena = 3,
  TEBT_ProofDungeon = 4,
  TEBT_ClanRaid = 5,
  TEBT_FriendlyMatch = 6,
  TEBT_MercenaryTraining = 7,
  TEBT_SeaBattle = 8,
  TEBT_TyrantWar = 9,
  TEBT_Ordinary01Dungeon = 10,
  TEBT_Ordinary02Dungeon = 11,
  TEBT_PromoteDungeon = 12,
  TEBT_GoldDungeon = 13,
  TEBT_ExpDungeon = 14,
  TEBT_FamineRaid = 15,
  TEBT_WorldRaid = 16,
  TEBT_ClanDoubleClashParty = 17,
  TEBT_EastBridge = 18,
  TEBT_Warfare = 19,
}

export enum TimeEventCheckCondition {
  TECC_None = 0,
  TECC_UseEnergy = 1,
  TECC_UseGold = 2,
  TECC_UseGem = 3,
  TECC_UseFame = 4,
  TECC_ConnectionTime = 5,
  TECC_AdCount = 6,
  TECC_LoginDailyCount = 7,
  TECC_UseCube = 8,
  TECC_GachaGetCube = 9,
  TECC_GetCube = 10,
  TECC_UseProofEnergy = 11,
  TECC_UseClanPoint = 12,
  TECC_BattleStartArena = 51,
  TECC_BattleStartClanRaid = 52,
  TECC_BattleStartProofDungeon = 53,
  TECC_ClanRaidGroggy = 54,
  TECC_FamineRaidUseBonusCharacter = 55,
  TECC_ClanRaidGetRank = 56,
  TECC_BattleEnd = 101,
  TECC_BattleWin = 102,
  TECC_BattleEndStory = 103,
  TECC_BattleEndDungeon = 104,
  TECC_BattleMonsterFestival = 105,
  TECC_JoinClanPartyDungeon = 106,
  TECC_ArenaTier = 107,
  TECC_BattleEndClanDoubleClashParty = 108,
  TECC_BattleWinPromoteDungeon = 110,
  TECC_BattleWinGoldDungeon = 111,
  TECC_BattleWinExpDungeon = 112,
  TECC_BattleWinOrdinary1Dungeon = 113,
  TECC_BattleWinOrdinary2Dungeon = 114,
  TECC_ClearProofDungeonFloor = 115,
  TECC_EncounterOrWinClanPartyDungeon = 116,
  TECC_JoinPartyDungeon = 117,
  TECC_ClearElementProofFloorTotal = 118,
  TECC_WorldRaidTotalPoint = 119,
  TECC_CharacterEquipGear = 151,
  TECC_UpgradeGear = 201,
  TECC_SellGear = 202,
  TECC_GetCostume = 203,
  TECC_GetBeauty = 204,
  TECC_DismantleCostume = 205,
  TECC_DismantleBeauty = 206,
  TECC_GearSubType = 207,
  TECC_TimeEventGetReward = 251,
  TECC_Dispatch = 252,
  TECC_DispatchRegionCount = 253,
  TECC_GachaGetGear = 301,
  TECC_PurchaseMysteryShopItem = 302,
  TECC_PurchaseShopPartyPopoItem = 303,
  TECC_UseExpItem = 351,
  TECC_CombinationItem = 352,
  TECC_RegistrationItem = 401,
  TECC_BidItem = 402,
  TECC_GetRewardBySucceedBid = 403,
  TECC_SummonCount = 451,
  TECC_TrainingRoomStart = 500,
  TECC_Treasury = 530,
  TECC_SeaBattleGetDamage = 550,
  TECC_ClearGrade = 600,
  TECC_GetGold = 603,
  TECC_GetItemUid = 604,
  TECC_WinClassWarrior = 605,
  TECC_WinClassGuardian = 606,
  TECC_WinClassStriker = 607,
  TECC_WinClassShooter = 608,
  TECC_WinClassPriest = 609,
  TECC_WinClassCommander = 610,
  TECC_WinElementWater = 612,
  TECC_WinElementFire = 613,
  TECC_WinElementEarth = 614,
  TECC_WinElementLight = 615,
  TECC_WinElementDark = 616,
  TECC_PromoteLevelUp = 620,
  TECC_CharacterPromoteCount = 622,
  TECC_CharacterAwakenCount = 623,
  TECC_CharacterSkillUpgradeCount = 624,
  TECC_PotentialCount = 625,
  TECC_PremiumEventMissionPercent = 626,
  TECC_GearSubTypeAll = 627,
  TECC_PremiumEventCollectCharacter = 628,
  TECC_UpgradeGearLevel = 629,
  TECC_ClanAttendanceCharacterFavorability = 630,
  TECC_ClanAttendanceMembers = 631,
  TECC_ClanAttendanceFavorability = 632,
  TECC_CharacterPromote = 1001,
  TECC_CharacterAwaken = 1002,
  TECC_CharacterTotalLevel = 1003,
  TECC_CharacterLevelUp = 1004,
  TECC_CharacterSpecificLevelUp = 1005,
  TECC_CharacterSkillUpgrade = 1006,
  TECC_UpgradeGearCount = 1007,
  TECC_ArchiveRumorClearCount = 1008,
  TECC_CharacterEquipCostume = 1009,
  TECC_CharacterEquipBeauty = 1010,
  TECC_StageClear = 1011,
  TECC_UserLev = 1012,
  TECC_FamineRaidElementTotalClearLevel = 1013,
  TECC_CollectCharacter = 1014,
  TECC_CollectBadge = 1015,
  TECC_ClearFamineRaidFloor = 1016,
  TECC_RegionClear = 1017,
  TECC_PremiumEventStoryGetCharacter = 1018,
  TECC_PremiumEventRareCurrencyGetCharacter = 1019,
  TECC_LeadershipPoint = 1020,
  TECC_StageClearCount = 1021,
  TECC_TyrantWarClearGrade = 1051,
}

export enum TimeEventLogStateType {
  TELST_Create = 0,
  TELST_Update = 1,
  TELST_Reset = 2,
  TELST_GetReward = 3,
  TELST_Retroactivity = 4,
  TELST_UpdateNewDay = 5,
  TELST_ResetConnectionTime = 6,
}

export enum TimeEventMessageType {
  TEMT_Idle = 0,
  TEMT_MissionDone = 1,
}

export enum TimeEventResetType {
  TERT_None = 0,
  TERT_Daily = 1,
  TERT_Weekly = 2,
}

export enum TimeEventSerialType {
  TEST_None = 0,
  TEST_SerialOne = 1,
  TEST_SerialAll = 2,
}

export enum TimeEventType {
  TET_None = 0,
  TET_TimeEvent = 1,
  TET_StoryPass = 2,
  TET_InviteFestival = 3,
  TET_MissionPass = 4,
  TET_Contract = 5,
  TET_RoyalMission = 6,
}

export enum TrackingSummonGrade {
  TSG_None = 0,
  TSG_Aa = 1,
  TSG_A = 2,
  TSG_Bb = 3,
  TSG_B = 4,
  TSG_Cc = 5,
  TSG_C = 6,
  TSG_D = 7,
  TSG_E = 8,
}

export enum TrainingRoomBuffType {
  TRBT_None = 0,
  TRBT_MultiplyExp = 1,
}

export enum TrainingRoomSlotType {
  TRST_None = 0,
  TRST_Basic = 1,
}

export enum TrainingSlotOpenState {
  TSOS_PrefixEnum = 0,
  TSOS_Open = 1,
}

export enum TrainingSlotState {
  TSS_PrefixEnum = 0,
  TSS_NotOpen = 1,
  TSS_Empty = 2,
  TSS_Training = 3,
  TSS_TrainingEnd = 4,
}

export enum TutorialScene {
  TS_None = 0,
  TS_Intro = 1,
  TS_Title = 2,
  TS_Lobby = 3,
  TS_Combat = 4,
  TS_Restart = 5,
  TS_UserRegister = 6,
}

export enum TutorialType {
  TT_None = 0,
  TT_PlayVideo = 1,
  TT_NpcTalk = 3,
  TT_EnterScene = 4,
  TT_OpenPopup = 5,
  TT_GuiGuide = 6,
  TT_GuiGuideOnlyPosition = 7,
  TT_GuiGuideWithoutButton = 8,
  TT_GuiScroll = 9,
  TT_GuiBanner = 10,
  TT_ShowBanner = 11,
  TT_HideBanner = 12,
  TT_GuideImage = 13,
  TT_TriggerButton = 14,
  TT_WaitEvent = 15,
  TT_BlockUntil = 16,
  TT_Command = 17,
  TT_Status = 18,
  TT_Stop = 19,
  TT_WaitTrigger = 20,
  TT_Highlight = 21,
  TT_BattleStep = 22,
  TT_RestartScene = 23,
  TT_RecruitAnimation = 24,
  TT_BattleScenario = 25,
  TT_UnloadBattleScenario = 26,
}

export enum TyrantWarClearGrade {
  TWCG_None = 0,
  TWCG_One = 1,
  TWCG_Two = 2,
  TWCG_Three = 3,
}

export enum TyrantWarContentType {
  TWCT_PrefixEnum = 0,
  TWCT_Battle = 1,
  TWCT_Talk = 2,
}

export enum TyrantWarPhase {
  TWP_None = 0,
  TWP_Phase1 = 1,
  TWP_Count = 2,
}

export enum TyrantWarPhasePart {
  TWPP_None = 0,
  TWPP_PhasePart1 = 1,
  TWPP_PhasePart2 = 2,
  TWPP_PhasePart3 = 3,
}

export enum UTCTimeOffsetSecond {
  UTOS_PrefixEnum = 0,
  UTOS_OneHour = 3600,
  UTOS_Korea = 32400,
}

export enum UnitSkillGroupType {
  USGT_None = 0,
  USGT_Random = 1,
  USGT_LowerHp = 2,
  USGT_AfterAfter = 3,
}

export enum UnitSkillSlotType {
  USST_None = 0,
  USST_Skill1 = 1,
  USST_Skill2 = 2,
  USST_Skill3 = 3,
  USST_Passive1 = 4,
  USST_Passive2 = 5,
  USST_ClassSkill1 = 6,
  USST_PotentialSkill = 7,
  USST_PotentialPowerSkill1 = 8,
  USST_PotentialPowerSkill2 = 9,
  USST_PotentialPowerSkill3 = 10,
}

export enum UnitSkillType {
  UST_PrefixEnum = 0,
  UST_Default = 1,
  UST_Active = 2,
  UST_Passive = 3,
  UST_Ultimate = 4,
  UST_Gear = 5,
  UST_Formation = 6,
  UST_Lord = 7,
  UST_Commander = 8,
  UST_Potential = 9,
  UST_Assist = 10,
  UST_MemorialGear = 11,
}

export enum UnitState {
  Ready = 0,
  Immortal = 1,
  Silence = 4,
  Stun = 16,
  Sleep = 32,
  Oblivion = 128,
  Dodge = 256,
  FailRecovery = 512,
  FailRevive = 1024,
  FailBuff = 2048,
  Invincible = 4096,
  Taunt = 8192,
  Petrify = 16384,
  Dead = 32768,
  RandomAttack = 65536,
  Fronzen = 131072,
  Groggy = 262144,
  TurnSkip = 524288,
  BattleDelete = 1048576,
}

export enum UpgradeGearResult {
  UG_Success = 0,
  UG_Failed = 1,
}

export enum UserLoginTermType {
  ULTT_None = 0,
  ULTT_NewUser = 1,
  ULTT_ReturnUser = 2,
}

export enum VfxControllerType {
  Base = 0,
  Hit = 1,
  Projectile = 2,
}

export enum VfxHitTextType {
  Spiral = 0,
  Center = 1,
  PositionDelta = 2,
}

export enum VfxHitWeightType {
  High = 0,
  Middle = 1,
  Low = 2,
}

export enum WarfareCharacterSlotType {
  WCST_WarfareAttack = 0,
  WCST_WarfareDefence = 1,
}

export enum WarfareLeagueGrade {
  WLG_Normal = 0,
  WLG_Hard = 1,
  WLG_Elite = 2,
}

export enum WarfareMissionCondition {
  WMC_AttackCount = 0,
  WMC_DefenceWinCount = 1,
}

export enum WarfareRankingChangeState {
  WRCS_None = 0,
  WRCS_Promote = 1,
  WRCS_Demote = 2,
}

export enum WarfareSeasonState {
  WSS_NotOpen = 0,
  WSS_SetDefence = 1,
  WSS_OnGoing = 2,
  WSS_Refreshing = 3,
}

export enum WarningLevel {
  WL_Warning = 0,
  WL_Danger = 1,
}

export enum WeaponSkillTargetType {
  WSTT_All = 0,
  WSTT_Default = 1,
  WSTT_Active = 2,
  WSTT_Ultimate = 3,
}

export enum WeaponType {
  WT_Basic = 0,
  WT_Elegant = 1,
  WT_Desperado = 2,
}

export enum WorldFriendshipType {
  WFT_PrefixEnum = 0,
  WFT_Friendly = 1,
  WFT_Hostile = 2,
}

export enum WorldOpenState {
  WOS_PrefixEnum = 0,
  WOS_Open = 1,
  WOS_Closed = 2,
  WOS_ComingSoon = 3,
}

export enum WorldRaidCharacterSlotType {
  WRCST_WorldRaidDark1 = 0,
  WRCST_WorldRaidDark2 = 1,
  WRCST_WorldRaidDark3 = 2,
  WRCST_WorldRaidFire1 = 3,
  WRCST_WorldRaidFire2 = 4,
  WRCST_WorldRaidFire3 = 5,
  WRCST_WorldRaidWater1 = 6,
  WRCST_WorldRaidWater2 = 7,
  WRCST_WorldRaidWater3 = 8,
  WRCST_WorldRaidEarth1 = 9,
  WRCST_WorldRaidEarth2 = 10,
  WRCST_WorldRaidEarth3 = 11,
  WRCST_WorldRaidLight1 = 12,
  WRCST_WorldRaidLight2 = 13,
  WRCST_WorldRaidLight3 = 14,
  WRCST_WorldRaidVRDark = 15,
  WRCST_WorldRaidVRFire = 16,
  WRCST_WorldRaidVRWater = 17,
  WRCST_WorldRaidVREarth = 18,
  WRCST_WorldRaidVRLight = 19,
}

export enum WorldRaidDifficulty {
  WRD_Low = 0,
  WRD_Medium = 1,
  WRD_High = 2,
  WRD_None = 3,
}

export enum WorldRaidSeasonState {
  WRSS_Searching = 0,
  WRSS_Battle = 1,
  WRSS_Refreshing = 2,
}


// ─── Interfaces ─────────────────────────────────────────


export interface MsgAchievement {
  uid?: number;
  open_condition?: MsgOpenCondition;
  repeat?: number;
  start_achievement?: boolean;
  title?: number;
  icon_name?: string;
  main_condition?: MsgQuestMainCondition;
  sub_condition1?: MsgQuestSubCondition;
  sub_condition2?: MsgQuestSubCondition;
  sub_condition3?: MsgQuestSubCondition;
  sub_condition4?: MsgQuestSubCondition;
  reward: MsgReward[];
  short_cut?: MsgShortCut;
  next?: number;
  legacy?: boolean;
}

export interface MsgAdvertisementGift {
  uid?: number;
  send_date?: MsgUserLocalTimestamp;
  send_end_date?: MsgUserLocalTimestamp;
  reward?: MsgReward;
}

export interface MsgAdvertisementGiftAuto {
  uid?: number;
  send_date?: MsgUserLocalTimestamp;
  reward_list: MsgAdvertisementGiftAutoReward[];
}

export interface MsgAdvertisementGiftAutoReward {
  event_type?: MailBoxEventType;
  event_state?: PartyDungeonState;
  reward?: MsgReward;
}

export interface MsgArchiveEffect {
  uid?: number;
  name?: number;
  type?: CommonStatusEffectType;
  effect_val?: number;
  is_apply_all?: boolean;
}

export interface MsgArchiveIllust {
  uid?: number;
  character_resource_name_list: string[];
  open_date?: MsgUTCTimestamp;
  title?: number;
  img?: string;
  condition_desc?: number;
  main_condition?: MsgQuestMainCondition;
  sub_condition1?: MsgQuestSubCondition;
  sub_condition2?: MsgQuestSubCondition;
  sub_condition3?: MsgQuestSubCondition;
  sub_condition4?: MsgQuestSubCondition;
  comments: MsgArchiveIllustComment[];
}

export interface MsgArchiveIllustComment {
  sender?: number;
  sender_icon?: string;
  comment?: number;
}

export interface MsgArchiveSequenceImage {
  uid?: number;
  items: MsgArchiveSequenceImageItem[];
}

export interface MsgArchiveSequenceImageItem {
  difficulty?: StageDifficulty;
  index?: number;
  image?: string;
}

export interface MsgArchiveSequenceSeason {
  uid?: number;
  order_type?: ArchiveSequenceSeasonOrderType;
  start_date?: MsgUserLocalTimestamp;
  end_date?: MsgUserLocalTimestamp;
  sequence_image_group_uid?: number;
}

export interface MsgArena {
  uid?: number;
  league_type?: ArenaLeagueType;
  league_name?: number;
  tier_datas: MsgArenaTier[];
}

export interface MsgArenaAIEnemy {
  uid?: number;
  league_type?: ArenaLeagueType;
  ai_user_name?: number;
  ai_user_lev?: number;
  arena_score?: number;
  arena_message?: number;
  master_gender?: MasterGenderType;
  master_hair_type?: MasterHairType;
  master_hair_color?: MasterHairColorType;
  master_skin_type?: MasterSkinType;
  character1_uid?: number;
  character2_uid?: number;
  character3_uid?: number;
  character4_uid?: number;
  character5_uid?: number;
  character_lev?: number;
  character_promote_grade?: number;
  character_promote_awaken?: number;
}

export interface MsgArenaBuffSchedule {
  uid?: number;
  start_date?: MsgUTCTimestamp;
  end_date?: MsgUTCTimestamp;
  character_1?: number;
  character_2?: number;
  character_3?: number;
  buff: MsgStatAndValue[];
}

export interface MsgArenaLeagueChangeSchedule {
  uid?: number;
  start_date?: MsgUTCTimestamp;
  end_date?: MsgUTCTimestamp;
}

export interface MsgArenaTier {
  tier_uid?: number;
  tier_name?: number;
  tier_num?: number;
  icon?: string;
  min_score?: number;
  max_score?: number;
  base_score?: number;
  reward: MsgReward[];
  matching_weight?: number;
  higher_offender_score_weight?: number;
  same_offender_score_weight?: number;
  lower_offender_score_weight?: number;
  higher_defender_score_weight?: number;
  same_defender_score_weight?: number;
  lower_defender_score_weight?: number;
  stage_prefab?: string;
  stage_bgm?: number;
  win_reward: number[];
  lose_reward: number[];
  tier_color?: number;
}

export interface MsgAssistPartnerSkillUpgrade {
  uid?: number;
  element?: ElementType;
  class_type?: ClassType;
  skill_level?: number;
  required_items: MsgRequiredItem[];
  price?: MsgPrice;
}

export interface MsgAttendanceCountdown {
  uid?: number;
  countdown_desc?: string;
  d_day_name?: string;
  start_date?: MsgUTCTimestamp;
  end_date?: MsgUTCTimestamp;
  items: MsgCountdownDay[];
  attendance_check_time?: MsgTime;
  unlock_character: number[];
  type?: AttendanceCountDownType;
  countdown_title?: string;
  short_cut?: MsgShortCut;
  goods_open_date?: MsgUTCTimestamp;
  unlock_condition_desc?: string;
}

export interface MsgAttendanceEvent {
  uid?: number;
  image?: string;
  guide_icon?: string;
  title?: number;
  title_color?: string;
  title2?: number;
  title2_color?: string;
  desc?: number;
  gift_sender?: number;
  gift_msg?: number;
  expire_day?: number;
  items: MsgAttendanceEventItem[];
  attendance_price?: MsgPrice;
}

export interface MsgAttendanceEventItem {
  day?: number;
  show_type?: DailyBonusDataShowType;
  slot_color?: string;
  reward?: MsgReward;
}

export interface MsgAttendanceEventSeason {
  uid?: number;
  start_date?: MsgUTCTimestamp;
  end_date?: MsgUTCTimestamp;
  attendance_event_table?: number;
  purchase_start_date?: MsgUTCTimestamp;
  attendance_type?: AttendanceEventType;
  time_type?: StandardTime;
}

export interface MsgAttendanceMonthly {
  uid?: number;
  lobby_banner_icon?: string;
  title?: number;
  image?: string;
  gift_sender?: number;
  gift_msg?: number;
  consecutive_day?: number;
  consecutive_reward?: MsgReward;
  items: MsgAttendanceMonthlyItem[];
  open_date?: MsgUTCTimestamp;
  close_date?: MsgUTCTimestamp;
}

export interface MsgAttendanceMonthlyItem {
  show_type?: DailyBonusDataShowType;
  day?: number;
  choosable?: boolean;
  reward: MsgReward[];
}

export interface MsgAttendancePackageShopItem {
  uid?: number;
  name?: number;
  type?: ShopItemType;
  attendance_premium_uid?: number;
  price?: MsgPrice;
  price_usd?: MsgPrice;
  restrict?: MsgRestrict;
  pid_google?: string;
  pid_appstore?: string;
  pid_onestore?: string;
}

export interface MsgAttendancePremium {
  uid?: number;
  open_date?: MsgUserLocalTimestamp;
  close_date?: MsgUserLocalTimestamp;
  purchase_reset_remain_hour?: number;
  gift_sender?: number;
  gift_msg?: number;
  premium_gift_sender?: number;
  premium_gift_msg?: number;
  reward_bonus?: MsgReward;
  ad_push_count?: number;
  items: MsgAttendancePremiumItem[];
}

export interface MsgAttendancePremiumItem {
  day?: number;
  show_type?: DailyBonusDataShowType;
  reward?: MsgReward;
  premium_show_type?: DailyBonusDataShowType;
  premium_reward?: MsgReward;
}

export interface MsgAttendanceStack {
  uid?: number;
  image?: string;
  guide_icon?: string;
  title?: number;
  title_color?: string;
  title2?: number;
  title2_color?: string;
  desc?: number;
  start_date?: MsgUTCTimestamp;
  end_date?: MsgUTCTimestamp;
  attendance_check_time?: MsgTime;
  gift_sender?: number;
  gift_msg?: number;
  items: MsgAttendanceStackDay[];
}

export interface MsgAttendanceStackDay {
  day?: number;
  is_direct_receive?: boolean;
  show_type?: AttendanceStackShowType;
  slot_cover_img?: string;
  slot_color?: string;
  reward?: MsgReward;
}

export interface MsgAuction {
  uid?: number;
  name?: number;
  auction_desc?: number;
  open_state?: AuctionOpenState;
  auction_open_weekday?: OpenWeekday;
  auction_open_time?: MsgTime;
  auction_close_time?: MsgTime;
  auction_lobby_uid?: number;
  auction_register_uid?: number;
  auction_bidding_uid?: number;
  auction_currency?: GlobalDataType;
}

export interface MsgAuctionBidding {
  uid?: number;
  name?: number;
  desc?: number;
  auction_bidding_limit?: number;
  auction_bidding_increase?: number;
  auction_bidding_success_time?: number;
  auction_bidding_refresh_cooltime?: number;
  post_sender?: number;
  post_msg?: number;
  post_list_max?: number;
  auction_bidding_loading_num?: number;
}

export interface MsgAuctionLobby {
  uid?: number;
  name?: number;
  desc?: number;
  renew_timer?: MsgTime;
  slots: MsgAuctionLobbySlot[];
}

export interface MsgAuctionLobbySlot {
  slot?: number;
  notice_type?: AuctionNoticeType;
  notice_type_title?: number;
}

export interface MsgAuctionRegister {
  uid?: number;
  name?: number;
  desc?: number;
  register_open_weekday?: OpenWeekday;
  register_open_time?: MsgTime;
  register_close_weekday?: OpenWeekday;
  register_close_time?: MsgTime;
  auction_type?: AuctionItemType;
  auction_register_type?: RegisterRestrictType;
  auction_register_limit?: number;
  auction_register_cost_min?: number;
  auction_register_cost_max?: number;
  auction_register_calculate_time?: number;
  post_sender?: number;
  post_msg?: number;
  post_list_max?: number;
  auction_commission?: number;
  auction_register_time_min?: string;
  auction_register_time_max?: string;
  time_limits: MsgAuctionTimeLimit[];
}

export interface MsgAuctionTimeLimit {
  auction_bidding_time_limit?: string;
}

export interface MsgAutoSequence {
  uid?: number;
  trigger?: AutoSequenceEventTrigger;
  trigger_uid?: number;
  rewards: MsgReward[];
  actions: MsgAutoSequenceAction[];
  disable_auto_checked?: boolean;
  skip_condition?: string;
  include_language: string[];
  exclude_language: string[];
  archive_type?: ArchiveAutoSequenceType;
  archive_title?: number;
  archive_desc?: number;
  archive_open_date?: MsgUTCTimestamp;
  archive_character_list: string[];
  archive_trigger_uid?: number;
}

export interface MsgAutoSequenceAction {
  type?: AutoSequenceType;
  scene?: AutoSequenceScene;
  action_trigger?: string;
  action_uid?: number;
  meta?: string;
}

export interface MsgAutoSequenceSeries {
  uid?: number;
  archive_title?: number;
  auto_seq_img?: string;
  archive_type?: ArchiveAutoSequenceType;
  archive_open_date?: MsgUTCTimestamp;
  items: MsgAutoSequenceSeriesItem[];
}

export interface MsgAutoSequenceSeriesItem {
  auto_seq_uid?: number;
}

export interface MsgAvalonTheaterContents {
  uid?: number;
  open_condition?: MsgOpenCondition;
  contents_title?: number;
  contents_desc?: number;
  contents_bgm?: string;
  contents_term_time?: number;
  open_date?: MsgUTCTimestamp;
  lock_date?: MsgUTCTimestamp;
  close_date?: MsgUTCTimestamp;
  banner_image?: string;
  thumbnail_image?: string;
  language_pack: string[];
}

export interface MsgAvalonTheaterEpisode {
  uid?: number;
  contents_uid?: number;
  index?: number;
  episode_open_price?: MsgPrice;
  required_energy?: number;
  title?: number;
  is_locked?: boolean;
  required_battle_power?: number;
  episode_type?: AvalonTheaterEpisodeType;
}

export interface MsgAvalonTheaterPromotionBanner {
  uid?: number;
  contents_uid?: number;
  open_date?: MsgUTCTimestamp;
  close_date?: MsgUTCTimestamp;
}

export interface MsgAwakenCostume {
  uid?: number;
  character_uid?: number;
  costume_items: MsgAwakenCostumeItem[];
}

export interface MsgAwakenCostumeItem {
  awaken_costume_uid?: number;
  awaken?: number;
  resource_name?: string;
  open_date?: MsgUTCTimestamp;
}

export interface MsgBattleGroggyItem {
  groggy_condition_skill?: BattleGroggyCondition;
  groggy_condition_skill_effect?: Skill;
  value?: number;
}

export interface MsgBattlePreset {
  uid?: number;
  slot_num?: number;
  price?: MsgPrice;
}

export interface MsgBattleSystemSkill {
  uid?: number;
  battle_type?: BattleType;
  sub_stage?: number;
  items: MsgBattleSystemSkillItem[];
}

export interface MsgBattleSystemSkillItem {
  skill_list?: number;
}

export interface MsgBattleSystemUiEffect {
  uid?: number;
  battle_type?: BattleType;
  sub_stage?: number;
  items: MsgBattleSystemUiEffectItem[];
}

export interface MsgBattleSystemUiEffectItem {
  active_event?: EffectActiveEvent;
  pre_condition?: SkillPreCondition;
  pre_condition_value?: number;
  pre_condition_skill_effect_uid?: number;
  effect_prefab?: string;
  title?: string;
  desc?: string;
  start_value?: number;
  end_value?: number;
}

export interface MsgBattleVulnerableGauge {
  uid?: number;
  monster_type?: BattleVulnerableGaugeMonsterType;
  items: MsgBattleVulnerableGaugeItem[];
}

export interface MsgBattleVulnerableGaugeItem {
  vulnerable_count?: number;
  max_vulnerable_gauge?: number;
  value_1?: number;
  value_2?: number;
  value_3?: number;
  value_4?: number;
  value_5?: number;
  max_groggy_gauge?: number;
  current_groggy_damage?: number;
}

export interface MsgBeauty {
  uid?: number;
  character_base_resource_name?: string;
  prefab?: string;
  name?: number;
  desc?: number;
  icon?: string;
  type?: BeautyGachaRewardType;
  effect_random_uid?: number;
  ignore_gacha?: boolean;
  open_date?: MsgUTCTimestamp;
  attach_point?: BeautyAttachPoint;
  sub_Type?: BeautyGachaRewardSubType;
}

export interface MsgBeautyEffect {
  uid?: number;
  name?: number;
  type?: CommonStatusEffectType;
  effect_val?: number;
  battle_power_value?: number;
}

export interface MsgBeautyEffectLevel {
  uid?: number;
  beauty_effect_uid?: number;
  items: MsgBeautyEffectLevelItem[];
}

export interface MsgBeautyEffectLevelItem {
  effect_lev?: number;
  effect_val?: number;
  battle_power_value?: number;
}

export interface MsgBeautyEffectRandomUid {
  uid?: number;
  effect_type?: EffectGenerateType;
  items: MsgBeautyEffectRandomUidItem[];
}

export interface MsgBeautyEffectRandomUidItem {
  effect_uid?: number;
  type?: CommonStatusEffectType;
  prob?: number;
}

export interface MsgBeautyGachaCategory {
  uid?: number;
  type?: CostumeGachaType;
  items: MsgBeautyGachaCategoryItem[];
}

export interface MsgBeautyGachaCategoryItem {
  gear_type?: BeautyGachaRewardType;
  category_prob?: number;
  is_ceiling_guarantee?: boolean;
}

export interface MsgBeautyGachaGroup {
  uid?: number;
  items: MsgBeautyGachaGroupItem[];
}

export interface MsgBeautyGachaGroupItem {
  beauty_gacha_reward_type?: BeautyGachaRewardType;
  reward_uid?: number;
  prob?: number;
}

export interface MsgBeautyLevel {
  uid?: number;
  lev?: number;
  exp?: number;
  type?: BeautyGachaRewardType;
}

export interface MsgBeautyRecipe {
  uid?: number;
  item?: number;
  icon?: string;
  name?: number;
  items: MsgBeautyRecipeItem[];
}

export interface MsgBeautyRecipeItem {
  beauty?: number;
  item1?: MsgReward;
  item2?: MsgReward;
  item3?: MsgReward;
  item4?: MsgReward;
  price?: MsgPrice;
}

export interface MsgBeautyThemeImage {
  uid?: number;
  imageData: MsgBeautyThemeImageName[];
}

export interface MsgBeautyThemeImageName {
  index?: number;
  image?: string;
}

export interface MsgBox {
  uid?: number;
  name?: number;
  desc?: number;
  show_items?: boolean;
  icon?: string;
  open_effect?: string;
  items: MsgBoxItem[];
}

export interface MsgBoxBeautySelect {
  uid?: number;
  name?: number;
  desc?: number;
  show_items?: boolean;
  icon?: string;
  items: MsgBoxBeautySelectItem[];
}

export interface MsgBoxBeautySelectItem {
  beauty_uid?: number;
}

export interface MsgBoxCharacterSelect {
  uid?: number;
  name?: number;
  desc?: number;
  icon?: string;
  items: MsgBoxCharacterSelectItem[];
}

export interface MsgBoxCharacterSelectItem {
  item_no?: number;
  character_uid?: number;
}

export interface MsgBoxCostumeSelect {
  uid?: number;
  name?: string;
  desc?: string;
  icon?: string;
  show_items?: boolean;
  items: MsgBoxCostumeSelectItem[];
}

export interface MsgBoxCostumeSelectItem {
  item_no?: number;
  reward_costume_uid?: number;
}

export interface MsgBoxCustom {
  uid?: number;
  name?: number;
  desc?: number;
  icon?: string;
  gift_sender?: number;
  gift_msg?: number;
  post_term_hour?: number;
}

export interface MsgBoxGearCharacterSelect {
  uid?: number;
  name?: string;
  desc?: string;
  icon?: string;
  character_uid?: number;
  rare?: number;
}

export interface MsgBoxGearSelect {
  uid?: number;
  name?: number;
  desc?: number;
  icon?: string;
  items: MsgBoxGearSelectItem[];
}

export interface MsgBoxGearSelectItem {
  gear_class?: ClassType;
  gear_set_uid?: number;
  gear_uid?: number;
  gear_set_name?: number;
}

export interface MsgBoxItem {
  item_no?: number;
  item?: MsgReward;
  post_term_hour?: number;
  goods_effect_type?: BoxGoodsEffectType;
}

export interface MsgBoxItemSelect {
  uid?: number;
  name?: number;
  desc?: number;
  show_items?: boolean;
  icon?: string;
  product_type?: ProductType;
  post_term_hour?: number;
  items: MsgBoxItemSelectItem[];
}

export interface MsgBoxItemSelectItem {
  item_no?: number;
  item?: MsgReward;
}

export interface MsgBoxMemorialSelect {
  uid?: number;
  name?: string;
  desc?: string;
  icon?: string;
  show_items?: boolean;
  items: MsgBoxMemorialSelectItem[];
}

export interface MsgBoxMemorialSelectItem {
  item_no?: number;
  item?: MsgReward;
}

export interface MsgBoxRandom {
  uid?: number;
  name?: number;
  desc?: number;
  icon?: string;
  is_open?: boolean;
  random_msg?: string;
  random_msg_range?: number;
  open_effect?: string;
  items: MsgBoxRandomItem[];
  show_prob?: boolean;
}

export interface MsgBoxRandomEmoticon {
  uid?: number;
  name?: number;
  desc?: number;
  icon?: string;
  open_effect?: string;
  replace_reward?: MsgReward;
  items: MsgBoxRandomEmoticonItem[];
}

export interface MsgBoxRandomEmoticonItem {
  item_no?: number;
  chat_emoticon_uid?: number;
}

export interface MsgBoxRandomGift {
  uid?: number;
  name?: number;
  desc?: number;
  show_items?: boolean;
  icon?: string;
  open_count?: number;
  gift_sender?: number;
  gift_msg?: number;
  post_term_hour?: number;
  items: MsgBoxRandomGiftItem[];
  big_icon?: string;
}

export interface MsgBoxRandomGiftItem {
  item_no?: number;
  item?: MsgReward;
  prob?: number;
  reward_type?: BoxRandomGiftRewardType;
  limit_count?: number;
}

export interface MsgBoxRandomItem {
  item_no?: number;
  item?: MsgReward;
  prob?: number;
  post_term_hour?: number;
  is_lucky?: boolean;
}

export interface MsgBoxWeaponSelect {
  uid?: number;
  name?: string;
  desc?: string;
  icon?: string;
  show_items?: boolean;
  items: MsgBoxWeaponSelectItem[];
}

export interface MsgBoxWeaponSelectItem {
  item_no?: number;
  reward_weapon_uid?: number;
}

export interface MsgCcEffectGroup {
  uid?: number;
  unavailable_action?: boolean;
  unavailable_assist_attack?: boolean;
  unavailable_chain_burst?: boolean;
  unavailable_decrease_cooldown?: boolean;
  unavailable_decrease_continuous_turn?: boolean;
}

export interface MsgCelebration {
  uid?: number;
  type?: ClanCelebrationType;
  value_number?: number;
  value_uid?: number;
  string_uid?: number;
  icon?: string;
  clan_chat_string_uid?: number;
}

export interface MsgChallengeAchievement {
  uid?: number;
  main_idx?: number;
  sub_idx?: number;
  title?: number;
  desc?: number;
  hidden?: boolean;
  main_condition?: MsgQuestMainCondition;
  sub_condition1?: MsgQuestSubCondition;
  sub_condition2?: MsgQuestSubCondition;
  sub_condition3?: MsgQuestSubCondition;
  next?: number;
  reward: MsgReward[];
  short_cut?: MsgShortCut;
  legacy?: boolean;
}

export interface MsgCharacter {
  uid?: number;
  root_resource_name?: string;
  base_resource_name?: string;
  resource_name?: string;
  grade?: number;
  element?: ElementType;
  class_type?: ClassType;
  hp?: number;
  attack?: number;
  defence?: number;
  critical_damage?: number;
  critical_prob?: number;
  resistance?: number;
  accuracy?: number;
  speed?: number;
  mental?: number;
  passive1?: number;
  passive2?: number;
  skill1?: number;
  skill2?: number;
  skill3?: number;
  size_factor?: number;
  name?: number;
  english_name?: number;
  skill1_ai?: number;
  skill2_ai?: number;
  skill3_ai?: number;
  npc?: boolean;
  character_story?: number;
  awake_open_state?: number;
  size?: CharacterSizeType;
  is_base?: boolean;
  bday?: string;
  potential_type?: PotentialType;
  weapon_open?: boolean;
  recruit_cut_scene_type?: CharacterRecruitCutSceneType;
  summon_voice_uid?: number;
  summon_string_uid?: number;
  class_skill1?: number;
  initial_awaken?: number;
}

export interface MsgCharacterAi {
  uid?: number;
  fail_over?: number;
  cond1: MsgCharacterAiItem[];
  cond2: MsgCharacterAiItem[];
  cond3: MsgCharacterAiItem[];
}

export interface MsgCharacterAiItem {
  ai_type?: MsgCharacterAiItem_CharacterAiType;
  cnt?: number;
  val?: number;
  skill_effect?: Skill;
}

export interface MsgCharacterAlonePackageShopItem {
  uid?: number;
  name?: number;
  type?: ShopItemType;
  price?: MsgPrice;
  price_usd?: MsgPrice;
  goods: MsgReward[];
  clan_aid_random_reward?: number;
  pid_google?: string;
  pid_appstore?: string;
  pid_onestore?: string;
  buy_count_appeal?: number;
  character_uid?: number;
  gift_sender_uid?: number;
  gift_msg?: number;
  restrict?: MsgRestrict;
  sub_type?: PackAloneSubType;
  restrict_reward?: MsgReward;
  bg_img?: string;
  reward_img?: string;
  is_talk_left?: boolean;
  lobby_banner_img?: string;
  story_appeal?: number;
  story_seq_uid?: number;
}

export interface MsgCharacterAwaken {
  uid?: number;
  element?: ElementType;
  class_type?: ClassType;
  awake_step?: number;
  required_items: MsgRequiredItem[];
  price?: MsgPrice;
}

export interface MsgCharacterContract {
  uid?: number;
  next_contract_uid?: number;
  title?: number;
  selectable_contract?: boolean;
  contract_index?: number;
  last_day?: number;
  reward_uid?: number;
  lobby_banner_icon?: string;
  items: MsgCharacterContractItem[];
}

export interface MsgCharacterContractInfinite {
  uid?: number;
  reward_uid?: number;
  character_uid?: number;
  gift_sender?: number;
  gift_msg?: number;
  commenter: number[];
  comment: number[];
  contract_msg: number[];
  recontract_seq_uid?: number;
}

export interface MsgCharacterContractItem {
  index?: number;
  character_uid?: number;
  gift_sender?: number;
  gift_msg?: number;
  commenter: number[];
  comment: number[];
  contract_msg: number[];
  recontract_seq_uid?: number;
}

export interface MsgCharacterContractReward {
  uid?: number;
  items: MsgCharacterContractRewardItem[];
}

export interface MsgCharacterContractRewardItem {
  attendance_day?: number;
  reward?: MsgReward;
  restore_price?: MsgPrice;
}

export interface MsgCharacterEnhanceStatus {
  uid?: number;
  enhance_type?: EnhanceType;
  grade?: number;
  class_type?: ClassType;
  hp?: number;
  attack?: number;
  defence?: number;
  critical_damage?: number;
  critical_prob?: number;
  resistance?: number;
  accuracy?: number;
  speed?: number;
}

export interface MsgCharacterGrowthHistory {
  uid?: number;
  title?: string;
  type?: CharacterGrowthHistoryMissionType;
  short_cut?: MsgShortCut;
  items: MsgCharacterGrowthHistoryItem[];
}

export interface MsgCharacterGrowthHistoryGroup {
  uid?: number;
  element?: ElementType;
  items: MsgCharacterGrowthHistoryGroupItem[];
}

export interface MsgCharacterGrowthHistoryGroupItem {
  character_growth_history_mission?: number;
}

export interface MsgCharacterGrowthHistoryItem {
  order?: number;
  icon_name?: string;
  goal_count?: number;
  desc?: string;
  reward?: MsgReward;
}

export interface MsgCharacterInfoVoice {
  uid?: number;
  character_uid?: number;
  language?: CharacterVoiceLanguage;
  category?: CharacterInfoVoiceCategory;
  index?: number;
  condition?: MsgVoiceConditionItem;
  voice_uid?: number;
  voice_group?: number;
  base_resource?: string;
}

export interface MsgCharacterInfoVoiceFilter {
  uid?: number;
  title?: string;
  items: MsgCharacterInfoVoiceFilterItem[];
}

export interface MsgCharacterInfoVoiceFilterItem {
  info_voice_category?: CharacterInfoVoiceCategory;
  info_voice_title?: string;
}

export interface MsgCharacterInfoVoiceGroup {
  uid?: number;
  items: MsgCharacterInfoVoiceGroupItem[];
}

export interface MsgCharacterInfoVoiceGroupItem {
  voice_uid?: number;
  next_play_term?: number;
}

export interface MsgCharacterLevel {
  uid?: number;
  grade?: number;
  lev?: number;
  exp?: number;
}

export interface MsgCharacterPackageQuest {
  quest_no?: number;
  character_lev?: number;
  quest_goods?: MsgReward;
  quest_goods_gift_msg?: number;
  short_cut?: MsgShortCut;
}

export interface MsgCharacterPackageShopItem {
  uid?: number;
  name?: number;
  type?: ShopItemType;
  price?: MsgPrice;
  price_usd?: MsgPrice;
  goods: MsgReward[];
  clan_aid_random_reward?: number;
  pid_google?: string;
  pid_appstore?: string;
  pid_onestore?: string;
  buy_count_appeal?: number;
  character_uid?: number;
  gift_sender_uid?: number;
  gift_msg?: number;
  quest: MsgCharacterPackageQuest[];
  story_appeal?: number;
  story_seq_uid?: number;
  bg_img?: string;
  discount_desc?: number;
}

export interface MsgCharacterPromote {
  uid?: number;
  class_type?: ClassType;
  promote_grade?: number;
  required_items: MsgRequiredItem[];
  price?: MsgPrice;
}

export interface MsgCharacterSkill {
  uid?: number;
  skill_type?: UnitSkillType;
  side_type?: BattleSideType;
  max_level?: number;
  soul_piece_gain: MsgSkillLevelValueFloat[];
  cooldown: MsgSkillLevelValueInt[];
  start_cooldown: MsgSkillLevelValueInt[];
  burst_gauge: MsgSkillLevelValueInt[];
  skill_icon?: string;
  skill_name?: number;
  skill_desc?: number;
  group_type?: UnitSkillGroupType;
  group_value: MsgSkillLevelValueWithRepeatedFloat[];
  items: MsgCharacterSkillItem[];
  apply_content: BattleType[];
}

export interface MsgCharacterSkillDesc {
  uid?: number;
  items: MsgCharacterSkillDescItem[];
}

export interface MsgCharacterSkillDescItem {
  optional_desc_uid?: number;
  skill_level?: number;
  skill_desc_main?: number;
  skill_desc_level?: number;
  skill_desc_level_variable?: number;
}

export interface MsgCharacterSkillItem {
  effect_type?: EffectType;
  skill_effect_uid?: number;
  skill_level_min?: number;
  skill_level_max?: number;
  target?: SkillTargetType;
  target_count: MsgSkillLevelValueInt[];
  value1: MsgSkillLevelValueFloat[];
  value2: MsgSkillLevelValueFloat[];
  turn: MsgSkillLevelValueInt[];
  pre_condition?: SkillPreCondition;
  pre_condition_value?: number;
  active_event?: ActiveEvent;
  prob: MsgSkillLevelValueFloat[];
  target_condition: SkillTargetCondition[];
  target_condition_value: number[];
  ignore_defence: MsgSkillLevelValueFloat[];
  ignore_defence_prob: MsgSkillLevelValueFloat[];
  ignore_shield: MsgSkillLevelValueFloat[];
  ignore_critical_prob?: boolean;
  stack_limit?: number;
  ai_targeting?: boolean;
  group_name?: string;
  target_condition_skill_effect_uid: number[];
  interval_start_turn?: number;
  interval_start_turn_first?: boolean;
  pre_condition_skill_effect_uid?: number;
  value_string_type?: DataStringCovertType;
  value_string?: string;
}

export interface MsgCharacterSkillUpgrade {
  uid?: number;
  element?: ElementType;
  random_required_item1?: MsgRequiredItem;
  random_required_item2?: MsgRequiredItem;
  specific_required_item?: MsgRequiredItem;
  price?: MsgPrice;
}

export interface MsgCharacterStatGrade {
  uid?: number;
  status_type?: SkillValueType;
  grade?: StatGrade;
  min?: number;
  max?: number;
  name?: number;
}

export interface MsgCharacterVoiceSetting {
  uid?: number;
  category?: CharacterVoiceCategory;
  character_name?: number;
  directory: string[];
  ko?: boolean;
  ja?: boolean;
  open_date?: MsgUTCTimestamp;
  close_date?: MsgUTCTimestamp;
}

export interface MsgCharacterWeapon {
  uid?: number;
  title?: number;
  name?: number;
  desc?: number;
  weapon_type?: WeaponType;
  equiptable_character_uid?: number;
  target_skill_type?: WeaponSkillTargetType;
  loader?: string;
  weapon_skill_uid?: number;
  replace_reward?: MsgReward;
}

export interface MsgCharacterWeaponTier {
  uid?: number;
  weapon_type?: WeaponType;
  items: MsgCharacterWeaponTierItem[];
}

export interface MsgCharacterWeaponTierItem {
  tier?: number;
  exp?: number;
}

export interface MsgChargeShopItem {
  uid?: number;
  type?: ShopItemType;
  name?: number;
  price?: MsgPrice;
  price_usd?: MsgPrice;
  mark?: ShopItemMark;
  goods?: MsgReward;
  bonus_display?: MsgReward;
  first_bonus?: MsgReward;
  first_bonus_desc?: number;
  first_bonus_reset_date?: MsgUTCTimestamp;
  img?: string;
  pid_google?: string;
  pid_appstore?: string;
  pid_onestore?: string;
  restrict?: MsgRestrict;
  gift_sender?: number;
  gift_msg?: number;
}

export interface MsgChatEmoticon {
  uid?: number;
  default_emoticon?: boolean;
  name?: number;
  desc?: number;
  icon?: string;
  chat_desc?: number;
  replace_reward?: MsgReward;
}

export interface MsgClanAttendanceCharacterList {
  uid?: number;
  clan_attendance_bg?: string;
  conversation_option?: number;
  max_favorability_point?: number;
  recruitment_character?: number;
  first_entrance_auto_sequence?: number;
  recruitment_success_auto_sequence?: number;
  title?: string;
  desc?: string;
  banner_img?: string;
  banner_title?: string;
  gift_blast_price?: MsgReward;
  gift_blast_favorability?: number;
  gift_blast_reward?: MsgReward;
  gift_sender?: number;
  gift_msg?: number;
  bgm?: number;
}

export interface MsgClanAttendanceConversation {
  uid?: number;
  conversation_start_uid?: number;
  conversation_animation?: string;
  items: MsgClanAttendanceConversationOptionItem[];
}

export interface MsgClanAttendanceConversationGroup {
  uid?: number;
  items: MsgClanAttendanceConversationItem[];
}

export interface MsgClanAttendanceConversationItem {
  conversation_uid?: number;
  min_favorability?: number;
}

export interface MsgClanAttendanceConversationOptionItem {
  conversation_option_uid?: number;
  conversation_text?: number;
  reaction_text?: number;
  favorability_point?: number;
  reward?: MsgReward;
  use_item?: MsgReward;
  reaction_animation?: string;
}

export interface MsgClanAttendanceGroupMission {
  uid?: number;
  count?: number;
  reward?: MsgReward;
  gift_sender?: number;
  gift_msg?: number;
}

export interface MsgClanAttendanceMission {
  uid?: number;
  mission_target_type?: ClanAttendanceMissionTargetType;
  reset_type?: TimeEventResetType;
  desc?: string;
  condition?: TimeEventCheckCondition;
  check_value: number[];
  check_uid?: number;
  mission_items: MsgClanAttendanceMissionNewItem[];
  gift_sender?: number;
  gift_msg?: number;
}

export interface MsgClanAttendanceMissionGroup {
  uid?: number;
  missions: MsgClanAttendanceMissionItem[];
}

export interface MsgClanAttendanceMissionItem {
  mission_idx?: number;
  mission_uid?: number;
  count?: number;
  reward?: MsgReward;
}

export interface MsgClanAttendanceMissionNewItem {
  index?: number;
  goal_count?: number;
  reward?: MsgReward;
}

export interface MsgClanAttendanceSeason {
  uid?: number;
  start_date?: MsgUTCTimestamp;
  end_date?: MsgUTCTimestamp;
  event_point_item?: number;
  starting_character?: number;
  change_shop?: number;
  clan_event_aid_reward?: MsgReward;
  clan_event_aid_reward_expire?: number;
  attendance_reward?: MsgReward;
}

export interface MsgClanAttendanceShop {
  uid?: number;
  gift_sender_uid?: number;
  gift_msg_uid?: number;
  items: MsgClanAttendanceShopItem[];
}

export interface MsgClanAttendanceShopItem {
  shop_item_uid?: number;
  reward?: MsgReward;
  reward_type?: ClanAttendanceShopRewardType;
  price?: MsgPrice;
  restrict?: MsgRestrict;
  item_desc?: number;
}

export interface MsgClanBanner {
  uid?: number;
  img?: string;
}

export interface MsgClanDoubleClashPartyBattleRewardGroup {
  uid?: number;
  first_clear_reward: MsgReward[];
  reward_prob: MsgRewardProbability[];
  all_reward_general?: number;
  reward_must?: number;
  display_reward: MsgReward[];
}

export interface MsgClanDoubleClashPartyClanReward {
  uid?: number;
  reward_list: MsgClanDoubleClashPartyClanRewardList[];
}

export interface MsgClanDoubleClashPartyClanRewardList {
  reward_idx?: number;
  value?: number;
  reward?: MsgReward;
  reward_auto_sequence?: number;
}

export interface MsgClanDoubleClashPartyDungeon {
  dungeon_idx?: number;
  main_character_uid?: number;
  costume_resource_name?: string;
  monster_group_uid?: number;
  clan_reward_uid?: number;
  gift_sender?: number;
  gift_msg?: number;
  dungeon_title?: string;
  dungeon_desc?: string;
  stage_prefab?: string;
  stage_bgm?: number;
}

export interface MsgClanDoubleClashPartyMonster {
  uid_stage_monster?: number;
  required_energy?: number;
  reward_group_uid?: number;
  prob?: number;
  count?: number;
  monster?: number;
  monster_lev?: number;
  monster_skill_lev?: number;
  required_battle_power?: number;
  hp_ability?: number;
  attack_ability?: number;
  defence_ability?: number;
  speed_ability?: number;
  add_critical_damage?: number;
  add_critical_prob?: number;
  add_accuracy?: number;
  add_resistance?: number;
  scale?: number;
  hit_drop_1?: MsgUidAmountAndProb;
  hitted_drop: number[];
  hit_drop_2?: MsgUidAmountAndProb;
  hit_drop_3?: MsgUidAmountAndProb;
  hit_drop_4?: MsgUidAmountAndProb;
  hit_drop_5?: MsgUidAmountAndProb;
  is_boss?: boolean;
  phase_condition_type?: PhaseConditionType;
  phase_condition_value?: number;
}

export interface MsgClanDoubleClashPartyMonsterGroup {
  uid?: number;
  monsters: MsgClanDoubleClashPartyMonster[];
}

export interface MsgClanDoubleClashPartySeason {
  uid?: number;
  start_date?: MsgUTCTimestamp;
  end_date?: MsgUTCTimestamp;
  shop_end_date?: MsgUTCTimestamp;
  lobby_banner?: string;
  lobby_banner_bg?: string;
  lobby_banner_title?: number;
  main_bg?: string;
  bgm?: number;
  enter_auto_sequence?: number;
  energy_event_point_item_uid?: number;
  get_prob?: number;
  min_count?: number;
  max_count?: number;
  dungeon_list: MsgClanDoubleClashPartyDungeon[];
}

export interface MsgClanPartyDungeonBuff {
  uid?: number;
  clan_party_dungeon_buff_type?: EventBuffType;
  clan_party_dungeon_buff_item_desc?: number;
  clan_party_dungeon_buff_title?: number;
  buff_value?: number;
  buff_duration?: string;
  item_icon?: string;
  buff_icon?: string;
}

export interface MsgClanPartyDungeonClanLevel {
  uid?: number;
  items: MsgClanPartyDungeonClanLevelItem[];
}

export interface MsgClanPartyDungeonClanLevelItem {
  clan_party_dungeon_level?: number;
  monster_level_min?: number;
  monster_level_max?: number;
  monster_count_until_levelup?: number;
}

export interface MsgClanPartyDungeonFreedomSquare {
  uid?: number;
  items: MsgClanPartyDungeonFreedomSquareItem[];
}

export interface MsgClanPartyDungeonFreedomSquareItem {
  idx?: number;
  day_of_week?: OpenWeekday;
  open_time?: MsgTime;
  close_time?: MsgTime;
  monster?: number;
}

export interface MsgClanPartyDungeonGiftMsgGroup {
  uid?: number;
  items: MsgClanPartyDungeonGiftMsgGroupItem[];
}

export interface MsgClanPartyDungeonGiftMsgGroupItem {
  index?: number;
  text?: number;
}

export interface MsgClanPartyDungeonMissionGroup {
  uid?: number;
  missions: MsgClanPartyDungeonMissionItem[];
}

export interface MsgClanPartyDungeonMissionItem {
  mission_uid?: number;
  main_condition?: ClanPartyDungeonMissionConditionType;
  check_value?: number;
  sub_condition?: ClanPartyDungeonMissionSubConditionType;
  mission_title?: number;
  mission_desc?: number;
  mission_reward?: MsgReward;
}

export interface MsgClanPartyDungeonMonster {
  uid?: number;
  items: MsgClanPartyDungeonMonsterItem[];
}

export interface MsgClanPartyDungeonMonsterAbuse {
  clan_party_dungeon_monster?: number;
  abusing_individual_damage?: number;
}

export interface MsgClanPartyDungeonMonsterAbuseGroup {
  uid?: number;
  abuse_datas: MsgClanPartyDungeonMonsterAbuse[];
}

export interface MsgClanPartyDungeonMonsterItem {
  monster_uid: number[];
  monster_group_uid?: number;
  prob?: number;
  stage_bgm?: number;
  mission_check_type?: ClanPartyDungeonMissionSubConditionType;
}

export interface MsgClanPartyDungeonMonsterLevel {
  uid?: number;
  items: MsgClanPartyDungeonMonsterLevelItem[];
}

export interface MsgClanPartyDungeonMonsterLevelItem {
  monster_group_uid?: number;
  level?: number;
  required_battle_power?: number;
  clan_party_dungeon_kill_reward?: number;
  clan_party_dungeon_encounter_reward?: number;
  clan_party_dungeon_join_reward?: number;
  required_energy?: number;
}

export interface MsgClanPartyDungeonSeason {
  uid?: number;
  start_date?: MsgUTCTimestamp;
  end_date?: MsgUTCTimestamp;
  shop_end_date?: MsgUTCTimestamp;
  clan_party_dungeon_help?: number;
  lobby_banner?: string;
  event_monster_uid?: number;
  clan_level_uid?: number;
  clan_party_dungeon_name?: number;
  clan_party_dungeon_item_uid?: number;
  clan_party_dungeon_shop_uid?: number;
  round_bgm?: number;
  round_bgm_name?: number;
  juke_box_icon_name?: string;
  clan_party_dungeon_mission: number[];
  clan_party_dungeon_freedom_square?: number;
  clan_party_dungeon_basic_reward: number[];
  clan_party_dungeon_monster_level_uid?: number;
  clan_party_dungeon_common_sender?: number;
  clan_party_dungeon_encounter_msg?: number;
  clan_party_dungeon_exchange_msg?: number;
  shop_display_uid?: number;
  time_event_group_uid?: number;
}

export interface MsgClanPartyDungeonShop {
  uid?: number;
  gift_sender_uid?: number;
  gift_msg_uid?: number;
  clan_party_dungeon_shop_itmes: MsgClanPartyDungeonShopItem[];
}

export interface MsgClanPartyDungeonShopItem {
  shop_item_uid?: number;
  party_shop_item_uid?: number;
  gift_msg_group?: number;
  gift_sender_group?: number;
  reward?: MsgReward;
  reward_type?: ClanPartyDungeonShopItemRewardType;
  price?: MsgPrice;
  restrict?: MsgRestrict;
}

export interface MsgClanPointShopItem {
  uid?: number;
  name?: number;
  price?: MsgPrice;
  reward?: MsgReward;
  display_item_uid?: number;
  gift_sender_uid?: number;
  gift_msg_uid?: number;
  restrict?: MsgRestrict;
}

export interface MsgClanRaidBattleChallengeInfo {
  uid?: number;
  items: MsgClanRaidHelpItem[];
}

export interface MsgClanRaidHelp {
  uid?: number;
  items: MsgClanRaidHelpItem[];
}

export interface MsgClanRaidHelpItem {
  help_uid?: number;
  index?: number;
  image?: string;
  title?: number;
  desc?: number;
}

export interface MsgClanRaidMonsterAbuse {
  clan_raid_stage_monster?: number;
  abusing_individual_damage?: string;
  abusing_doubt_damage?: string;
  abusing_doubt_lord_level?: number;
}

export interface MsgClanRaidMonsterAbuseGroup {
  uid?: number;
  abuse_datas: MsgClanRaidMonsterAbuse[];
}

export interface MsgClanRaidPhase {
  uid?: number;
  phase_idx?: number;
  day_of_week?: OpenWeekday;
  open_time?: MsgTime;
  close_time?: MsgTime;
  element?: ElementType;
}

export interface MsgClanRaidRewardRank {
  uid?: number;
  rank?: ClanRaidRewardRank;
  damage_min?: string;
  damage_max?: string;
  rewards: number[];
}

export interface MsgClanRaidSeason {
  uid?: number;
  season_idx?: number;
  start_date?: MsgUserLocalTimestamp;
  end_date?: MsgUserLocalTimestamp;
  substage_uid?: number;
  weekend_element?: ElementType;
}

export interface MsgClanRaidSeasonReward {
  uid?: number;
  min_tier?: number;
  max_tier?: number;
  reward_distribute_per?: MsgIntProb;
}

export interface MsgClanRaidSeasonRewardGrade {
  uid?: number;
  total_dmg_min?: string;
  total_dmg_max?: string;
  champion?: boolean;
  rewards_distribution: MsgReward[];
  rewards_each: MsgReward[];
  rank?: ClanRaidRewardRank;
}

export interface MsgClanRaidSubStage {
  uid?: number;
  battle_type?: BattleType;
  stage_prefab?: string;
  required_energy?: number;
  stage_bgm?: number;
  boss_uid?: number;
  vulnerable_system_uid?: number;
}

export interface MsgColor {
  uid?: number;
  color?: string;
}

export interface MsgConditionPackageShopItem {
  uid?: number;
  name?: number;
  type?: ShopItemType;
  remain_hour?: number;
  price?: MsgPrice;
  price_usd?: MsgPrice;
  promotion_message?: number;
  goods?: MsgReward;
  gift_sender_uid?: number;
  gift_msg?: number;
  open_condition_package?: number;
  open_condition_package_desc?: number;
  open_condition?: MsgOpenCondition;
  open_condition_desc?: number;
  pid_google?: string;
  pid_appstore?: string;
  pid_onestore?: string;
  pack_condition_notify_type?: ConditionPackageNotifyType;
  pack_condition_bg?: string;
  is_add_hour?: boolean;
  desc?: number;
  name_text_color?: string;
  promotion_percent?: number;
  caution_message?: number;
  auto_sequence?: number;
  banner_name?: number;
}

export interface MsgConditionPeriodPackageShopItem {
  uid?: number;
  name?: number;
  type?: ShopItemType;
  remain_hour?: number;
  price?: MsgPrice;
  price_usd?: MsgPrice;
  promotion_message?: number;
  goods?: MsgReward;
  gift_sender_uid?: number;
  gift_msg?: number;
  open_condition_package?: number;
  open_condition_package_desc?: number;
  open_condition?: ContentsOpenCondition;
  open_condition_desc?: number;
  pid_google?: string;
  pid_appstore?: string;
  pid_onestore?: string;
  pack_condition_notify_type?: ConditionPackageNotifyType;
  pack_condition_bg?: string;
  is_add_hour?: boolean;
  desc?: number;
  name_text_color?: string;
  promotion_percent?: number;
  caution_message?: number;
  auto_sequence?: number;
  banner_name?: number;
  goal_count?: number;
  check_value?: number;
  check_uid?: number;
}

export interface MsgConditionSummon {
  uid?: number;
  expire_hour?: number;
  summon_type?: SummonType;
  summon_prob_uid?: number;
  event_character_group: number[];
  event_weapon_group: number[];
  event_prob_up?: number;
  event_weapon_prob_up?: number;
  select_character_count?: number;
  summon_group_uid?: number;
  banner_img?: string;
  banner_list_img?: string;
  title_color?: string;
  dialog_bg?: string;
  dialog_img?: string;
  weapon_display?: number;
  name?: number;
  tab_name?: number;
  desc?: number;
  info_desc?: number;
  pre_price_1: MsgPrice[];
  pre_price_continuous: MsgPrice[];
  price_1?: MsgPrice;
  price_continuous?: MsgPrice;
  count_continuous?: number;
  purchase_restrict_count?: number;
  icon_img?: string;
  icon_desc?: number;
}

export interface MsgContentsEnergy {
  uid?: number;
  contents_type?: ContentsType;
  max_charge_count?: string;
  limit_count?: string;
  charge_type?: ContentsEnergyChargeType;
  term_seconds?: number;
  fixed_korea_time?: MsgTime;
  add_count_per_charge?: string;
  icon?: string;
  name?: number;
  desc?: number;
  is_default_contents?: boolean;
}

export interface MsgContentsOpen {
  uid?: number;
  contents_type?: ContentsType;
  open_conditions: MsgOpenCondition[];
}

export interface MsgConversionRewardTypeProbItem {
  reward_type?: GlobalDataType;
  prob?: number;
}

export interface MsgCostume {
  uid?: number;
  costume_grade?: CostumeGrade;
  costume_acquire?: CostumeAcquire;
  open_date?: MsgUTCTimestamp;
  gacha_open_date?: MsgUTCTimestamp;
  character_base_resource_name?: string;
  resource_name?: string;
  shop_display_element?: ElementType;
  name?: number;
  effect_slot_count?: number;
  effect_random_uid?: number;
  gacha_voice_uid?: number;
}

export interface MsgCostumeEffect {
  uid?: number;
  name?: number;
  type?: CostumeEffectType;
  effect_val?: number;
}

export interface MsgCostumeMileageItem {
  uid?: number;
  open_date?: MsgUTCTimestamp;
  close_date?: MsgUTCTimestamp;
  reward?: MsgReward;
  price?: MsgPrice;
  restrict?: MsgRestrict;
  type?: ShopItemType;
  name?: number;
}

export interface MsgCostumePurchaseShop {
  uid?: number;
  character_costume_uid?: number;
  price?: MsgPrice;
  open_date?: MsgUTCTimestamp;
  close_date?: MsgUTCTimestamp;
}

export interface MsgCostumeRandomEffect {
  uid?: number;
  effect_type?: EffectGenerateType;
  items: MsgCostumeRandomEffectItem[];
}

export interface MsgCostumeRandomEffectItem {
  effect_uid?: number;
  type?: CostumeEffectType;
  prob?: number;
}

export interface MsgCostumeShopItem {
  uid?: number;
  name?: number;
  open_date?: MsgUTCTimestamp;
  close_date?: MsgUTCTimestamp;
  gacha_type?: CostumeGachaType;
  purchase_costume_uid?: number;
  banner_prefab?: string;
  banner_img?: string;
  count?: number;
  price?: MsgPrice;
  pickup_character_prob?: number;
  beauty_wear_prefab?: string;
  banner_bg_img?: string;
  pickup_characters: string[];
  select_count?: number;
  restrict?: MsgRestrict;
  beauty_gacha_group_uid?: number;
  fixed_term?: ActiveControlType;
  pre_price: MsgPrice[];
}

export interface MsgCountPrice {
  count?: number;
  price?: number;
}

export interface MsgCountdownDay {
  auto_sequence?: number;
  gift_sender?: number;
  gift_msg?: number;
  show_type?: AttendanceCountdownShowType;
  day_count?: number;
  attendance_character_uid: number[];
  attendance_character_loader: string[];
  animation: string[];
  reward?: MsgReward;
}

export interface MsgCubeShop {
  uid?: number;
  gift_sender_uid?: number;
  gift_msg_uid?: number;
  cube_shop_items: MsgCubeShopItem[];
}

export interface MsgCubeShopItem {
  cube_shop_item_uid?: number;
  reward?: MsgReward;
  reward_type?: CubeShopItemType;
  price?: MsgPrice;
  restrict?: MsgRestrict;
  display_item_uid?: number;
  prob_view?: boolean;
}

export interface MsgCustomPackageShopItem {
  uid?: number;
  name?: number;
  type?: ShopItemType;
  price?: MsgPrice;
  price_usd?: MsgPrice;
  promotion_message?: number;
  pid_google?: string;
  pid_appstore?: string;
  pid_onestore?: string;
  gift_item?: number;
  gift_sender?: number;
  gift_msg?: number;
  restrict?: MsgRestrict;
  select_goods: MsgCustomPackageShopSelectGoods[];
}

export interface MsgCustomPackageShopSelectGoods {
  select_group?: number;
  select_index?: number;
  goods?: MsgReward;
}

export interface MsgDailyBonus {
  uid?: number;
  items: MsgDailyBonusItem[];
  image?: string;
  guide_icon?: string;
  title?: number;
  title_color?: string;
  title2?: number;
  title2_color?: string;
  desc?: number;
  gift_sender?: number;
  gift_msg?: number;
}

export interface MsgDailyBonusItem {
  day?: number;
  show_type?: DailyBonusDataShowType;
  reward?: MsgReward;
  slot_color?: string;
}

export interface MsgDailyBonusSeason {
  uid?: number;
  start_season?: MsgUserLocalTimestamp;
  newuser_table?: number;
  returnuser_table?: number;
  is_common_type?: boolean;
}

export interface MsgDailyLifeCollectionCategory {
  uid?: number;
  parent_category_type?: DailyLifeCollectionParentCategoryType;
  child_category_name?: number;
  reward_group?: number;
  items: MsgDailyLifeCollectionItem[];
}

export interface MsgDailyLifeCollectionItem {
  collection_uid?: number;
  open_date?: MsgUTCTimestamp;
}

export interface MsgDailyLifeCollectionRewardGroup {
  uid?: number;
  items: MsgDailyLifeCollectionRewardItem[];
}

export interface MsgDailyLifeCollectionRewardItem {
  goal_count?: number;
  reward_1?: MsgReward;
  reward_2?: MsgReward;
  reward_3?: MsgReward;
  reward_4?: MsgReward;
}

export interface MsgDailyLifeContents {
  uid?: number;
  daily_life_type?: DailyLifeContentsType;
  play_resource?: MsgPrice;
}

export interface MsgDailyLifeConversion {
  uid?: number;
  conversion_target?: number;
  conversion_time_sec?: number;
  reward_count_min?: number;
  reward_count_max?: number;
  reward_type_prob?: number;
  special_reward_recipe_group?: number;
  special_reward_story_item_group?: number;
  common_reward_group?: number;
}

export interface MsgDailyLifeConversionRewardGroup {
  uid?: number;
  name?: string;
  icon?: string;
  items: MsgRewardProbItem[];
}

export interface MsgDailyLifeConversionRewardTypeProb {
  uid?: number;
  items: MsgConversionRewardTypeProbItem[];
}

export interface MsgDailyRandomBonus {
  uid?: number;
  start_level?: number;
  end_level?: number;
  reward?: number;
  grade?: number;
  grade_name?: number;
  type?: DailyRandomBonusType;
}

export interface MsgDakkeonTraining {
  uid?: number;
  name?: number;
  desc?: number;
  training_type?: DakkeonTrainingType;
  open_date?: MsgUTCTimestamp;
  open_weekday: OpenWeekday[];
  stage_icon?: string;
  comment?: number;
  dungeon_symbol?: string;
  substage_uid?: number;
}

export interface MsgDependencyResolver {
  uid?: number;
  from_prefab_name?: string;
  reload_object_name?: string;
  reload_object_type?: string;
}

export interface MsgDispatchDisplay {
  uid?: number;
  difficulty?: StageDifficulty;
  dispatch_time?: number;
  display_reward: MsgReward[];
  display_reward_clan?: MsgReward;
  clan_aid_random_reward?: number;
}

export interface MsgDispatchPolicy {
  uid?: number;
  difficulty?: StageDifficulty;
  dispatch_policy_index?: number;
  dispatch_policy_title?: number;
  dispatch_policy_desc?: number;
  left_reward?: MsgReward;
  right_reward?: MsgReward;
}

export interface MsgDispatchPolicyMessage {
  uid?: number;
  base_resource_name?: string;
  dispatch_policy_index?: number;
  dispatch_policy_position?: PolicySelectPosition;
  dispatch_policy_animation?: string;
  dispatch_policy_flag?: string;
  dispatch_policy_text_uid?: number;
}

export interface MsgDispatchReward {
  uid?: number;
  difficulty?: StageDifficulty;
  dispatch_time?: number;
  world_uid?: number;
  region_batch_character?: number;
  region_required_energy?: number;
  dispatch_reward_must?: number;
  reward_prob: MsgRewardProbability[];
  dispatch_reward_general?: number;
  required_sub_stage_uid?: number;
}

export interface MsgDisplayCharacter {
  uid?: number;
  character_uid?: number;
  group_?: number;
  root_resource_name?: string;
  open_state?: ShopItemOpenState;
  price?: MsgPrice;
  hero_born?: number;
  world_bg?: number;
  region_name?: number;
  tag?: DisplayCharacterTagType;
  open_conditions: MsgOpenCondition[];
  condition_text_uid?: number;
  representation?: boolean;
  discount_start_date?: MsgUTCTimestamp;
  discount_end_date?: MsgUTCTimestamp;
  discount_price?: MsgPrice;
  universe_type?: string;
  open_date?: MsgUTCTimestamp;
  potential_item?: number;
  info_class_text?: number;
  info_gear_text?: number;
  info_skill_text?: number;
  hero_talk_text?: number;
  potential_power_type?: CharacterPotentialPowerType;
}

export interface MsgDisplayItem {
  uid?: number;
  name?: number;
  desc?: number;
  icon?: string;
  display_desc?: number;
}

export interface MsgDungeonMileageReward {
  uid?: number;
  required_mileage?: number;
  random_reward_uid?: number;
  display_reward?: MsgReward;
}

export interface MsgDungeonStage {
  uid?: number;
  name?: number;
  battle_type?: BattleType;
  open_state?: StageOpenState;
  open_weekday: OpenWeekday[];
  stage_icon?: string;
  list_type?: ElementType;
  dungeon_symbol?: string;
  desc?: number;
  reset_count?: number;
  reset_goods?: GlobalDataType;
  reset_price: MsgCountPrice[];
  promote_class?: ClassType;
}

export interface MsgDungeonSubStage {
  uid?: number;
  stage_uid?: number;
  index?: number;
  dungeon_prefab?: string;
  dungeon_bgm?: number;
  name?: number;
  required_battle_power?: number;
  monster_exp?: number;
  reward_gold?: number;
  mileage?: number;
  first_clear_reward: MsgReward[];
  completion_reward?: MsgReward;
  reward_prob: MsgRewardProbability[];
  all_reward_general?: number;
  reward_must?: number;
  required_energy?: number;
  boss_monster_uid?: number;
  display_reward: MsgReward[];
}

export interface MsgEastBridgeBless {
  uid?: number;
  bless_type?: EastBridgeBlessType;
  restrict_class: ClassType[];
  restrict_element: ElementType[];
  max_lev?: number;
  icon?: string;
  desc?: number;
  skill_uid?: number;
}

export interface MsgEastBridgeBlessGroup {
  uid?: number;
  items: MsgEastBridgeBlessGroupItem[];
}

export interface MsgEastBridgeBlessGroupItem {
  east_bridge_bless_uid?: number;
  bless_prob?: number;
}

export interface MsgEastBridgeBlessSkillDesc {
  uid?: number;
  items: MsgEastBridgeBlessSkillDescItem[];
}

export interface MsgEastBridgeBlessSkillDescItem {
  optional_desc_uid?: number;
  skill_level?: number;
  skill_desc_main?: number;
  skill_desc_level?: number;
  skill_desc_level_variable?: number;
  skill_desc_level_variable_additional?: number;
}

export interface MsgEastBridgeChapter {
  uid?: number;
  chapter_idx?: number;
  open_date?: MsgUTCTimestamp;
  expedition_count?: number;
  chapter_clear_rank_group_uid?: number;
  individual_reward_uid?: number;
  retry_special_bless_uid_list: number[];
  chapter_name?: number;
  chapter_sub_name?: number;
  chapter_desc?: number;
  difficulty_score_group_uid?: number;
  enemy_turn_score_group_uid?: number;
  bless_score_group_uid?: number;
  star_string_1?: number;
  star_string_2?: number;
  star_string_3?: number;
  archive_stage_bg?: string;
  star_conditon_1: MsgProofDungeonCondition[];
  star_conditon_2: MsgProofDungeonCondition[];
  star_conditon_3: MsgProofDungeonCondition[];
}

export interface MsgEastBridgeChapterClearRankReward {
  uid?: number;
  items: MsgEastBridgeChapterClearRankRewardItem[];
}

export interface MsgEastBridgeChapterClearRankRewardItem {
  rank?: ClanRaidRewardRank;
  point_min?: string;
  point_max?: string;
  reward_1?: MsgReward;
  reward_2?: MsgReward;
  reward_3?: MsgReward;
  reward_4?: MsgReward;
  reward_5?: MsgReward;
  reward_6?: MsgReward;
}

export interface MsgEastBridgeHiddenStage {
  uid?: number;
  position?: string;
  chapter_uid?: number;
  substage_index?: number;
  stage_prefab?: string;
  archive_stage_bg?: string;
  stage_bgm?: number;
  name?: number;
  substage_type?: SubStageType;
  monster_exp?: number;
  reward_gold?: number;
  first_clear_reward: MsgReward[];
  completion_reward?: MsgReward;
  reward_prob: MsgRewardProbability[];
  all_reward_general?: number;
  reward_must?: number;
  display_reward: MsgReward[];
  required_energy?: number;
  display_mon_1?: number;
  display_mon_2?: number;
  display_mon_3?: number;
  display_mon_4?: number;
  bless_group_uid?: number;
  bless_prob?: number;
  difficulty_step?: EastBridgeDifficultyStep;
  tip_desc?: number;
  required_battle_power?: number;
  stage_desc?: number;
  stage_position?: number;
}

export interface MsgEastBridgeHiddenStageCondition {
  condition?: EastBridgeHiddenStageCondition;
  count?: number;
}

export interface MsgEastBridgeIndividualReward {
  uid?: number;
  gift_sender_uid?: number;
  gift_msg_uid?: number;
  items: MsgEastBridgeIndividualRewardItem[];
}

export interface MsgEastBridgeIndividualRewardItem {
  index?: number;
  total_point?: number;
  reward?: MsgReward;
}

export interface MsgEastBridgeNoiseStage {
  uid?: number;
  position?: string;
  chapter_uid?: number;
  hidden_stage_uid?: number;
  stage_type?: EastBridgeNoiseStageType;
  story_desc?: number;
  voice_sound?: number;
  npc_talk_event_group_uid?: number;
}

export interface MsgEastBridgeScoreByBlessType {
  uid?: number;
  items: MsgEastBridgeScoreByBlessTypeItem[];
}

export interface MsgEastBridgeScoreByBlessTypeItem {
  bless_type?: EastBridgeBlessType;
  score_value?: number;
}

export interface MsgEastBridgeScoreByDifficultyStep {
  uid?: number;
  items: MsgEastBridgeScoreByDifficultyStepItem[];
}

export interface MsgEastBridgeScoreByDifficultyStepItem {
  difficulty_step?: EastBridgeDifficultyStep;
  score_value?: number;
  max_score_value?: number;
}

export interface MsgEastBridgeSubStage {
  uid?: number;
  position?: string;
  chapter_uid?: number;
  substage_index?: number;
  stage_prefab?: string;
  archive_stage_bg?: string;
  stage_bgm?: number;
  name?: number;
  substage_type?: SubStageType;
  monster_exp?: number;
  reward_gold?: number;
  first_clear_reward: MsgReward[];
  completion_reward?: MsgReward;
  reward_prob: MsgRewardProbability[];
  all_reward_general?: number;
  reward_must?: number;
  display_reward: MsgReward[];
  required_energy?: number;
  display_mon_1?: number;
  display_mon_2?: number;
  display_mon_3?: number;
  display_mon_4?: number;
  bless_group_uid?: number;
  bless_prob?: number;
  difficulty_step?: EastBridgeDifficultyStep;
  tip_desc?: number;
  hidden_stage_condition1?: MsgEastBridgeHiddenStageCondition;
  hidden_stage_condition2?: MsgEastBridgeHiddenStageCondition;
  hidden_stage_condition3?: MsgEastBridgeHiddenStageCondition;
  hidden_stage_uid?: number;
  required_battle_power?: number;
  stage_desc?: number;
  tag_txt: string[];
  stage_position?: number;
}

export interface MsgEastBridgeSubStageRound {
  uid?: number;
  substage_uid?: number;
  round?: number;
  monster_count?: number;
  position_value?: number;
  monster_basic_speed_range?: MsgRangeFloat;
  monster_group?: number;
  required_monster?: number;
  phase_controller_group_uid?: number;
  round_bgm?: number;
}

export interface MsgEffectScale {
  uid?: number;
  base_resource_name?: string;
  items: MsgEffectScaleItem[];
}

export interface MsgEffectScaleItem {
  original_effect_prefab_name?: string;
  change_effect_prefab_name?: string;
  scale?: number;
}

export interface MsgElementProofDungeon {
  uid?: number;
  dungeon_bgm?: number;
  open_state?: StageOpenState;
  open_weekday: OpenWeekday[];
  list_type?: ElementType;
  floor_story_list_img?: string;
  floors: MsgElementProofDungeonFloor[];
  name?: number;
}

export interface MsgElementProofDungeonFloor {
  floor?: number;
  floor_story_bg?: string;
  floor_uid?: number;
  stage_prefab?: string;
  boss_monster_uid?: number;
  required_battle_power?: number;
  monster_exp?: number;
  reward_gold?: number;
  required_proof_dungeon_energy?: number;
  bronze_condition: MsgProofDungeonCondition[];
  bronze_reward?: MsgReward;
  silver_condition: MsgProofDungeonCondition[];
  silver_reward?: MsgReward;
  gold_condition: MsgProofDungeonCondition[];
  gold_reward?: MsgReward;
  is_trace?: boolean;
  abusing_turn?: number;
  reward_must?: number;
  display_reward: MsgReward[];
}

export interface MsgElementProofDungeonFloorReward {
  uid?: number;
  clear_floor_count?: number;
  reward?: MsgReward;
  play_count?: number;
  floor_reward_step?: number;
}

export interface MsgElementProofDungeonRound {
  uid?: number;
  round_monsters: MsgElementProofDungeonRoundMonster[];
}

export interface MsgElementProofDungeonRoundMonster {
  round?: number;
  monster_count?: number;
  monster_basic_speed_range?: MsgRangeFloat;
  monster_group?: number;
  required_monster?: number;
  auto_sequence_trigger?: number;
  encounter_monter_must_before_first_win?: boolean;
  encounter_monster_prob?: number;
  encounter_monster_group?: number;
  encounter_monster_count?: number;
  encounter_backside_monster_count?: number;
  encounter_backside_monster_basic_speed_range?: MsgRangeFloat;
  encounter_monster_group_name?: number;
  position_value?: number;
}

export interface MsgElementProofDungeonShop {
  uid?: number;
  list_type?: ElementType;
  gift_sender_uid?: number;
  gift_msg_uid?: number;
  element_proof_dungeon_shop_items: MsgElementProofDungeonShopItem[];
}

export interface MsgElementProofDungeonShopItem {
  shop_item_uid?: number;
  reward?: MsgReward;
  price?: MsgPrice;
  restrict?: MsgRestrict;
}

export interface MsgEventBdayCharacterInfo {
  character_uid?: number;
  bday_character_reaction?: number;
  event_bday_character_satisfied?: number;
  gift_sender?: number;
  gift_msg?: number;
  full_satisfied_reward?: MsgReward;
  character_bg?: string;
  replace_reward?: MsgReward;
  replace_gift_sender?: number;
  replace_gift_msg?: number;
}

export interface MsgEventBdayCharacterReaction {
  uid?: number;
  gift_reaction_items: MsgEventBdayGiftReactionItem[];
}

export interface MsgEventBdayCharacterReactionGroup {
  uid?: number;
  satisfied_value?: string;
  satisfied_color?: string;
  reaction_items: MsgEventBdayCharacterReactionItem[];
}

export interface MsgEventBdayCharacterReactionItem {
  reaction_animation?: string;
  reaction_text?: string;
  prob?: number;
  reaction_sound?: string;
}

export interface MsgEventBdayCharacterSatisfied {
  uid?: number;
  items: MsgEventBdaySatisfiedItem[];
}

export interface MsgEventBdayGiftReactionItem {
  gift_item_uid?: number;
  reaction_group_uid?: number;
  gift_item_amount?: number;
}

export interface MsgEventBdayItemList {
  uid?: number;
  items: MsgEventBdayStageItem[];
}

export interface MsgEventBdayPackageShopItem {
  uid?: number;
  name?: number;
  type?: ShopItemType;
  price?: MsgPrice;
  price_usd?: MsgPrice;
  promotion_message?: number;
  goods?: MsgReward;
  gift_sender_uid?: number;
  gift_msg?: number;
  open_condition_package?: number;
  open_condition_desc?: number;
  restrict?: MsgRestrict;
  character_uid?: number;
  img?: string;
  balloon_type?: string;
  pid_google?: string;
  pid_appstore?: string;
  pid_onestore?: string;
  banner_img?: string;
}

export interface MsgEventBdayReward {
  uid?: number;
  items: MsgEventBdayRewardItem[];
}

export interface MsgEventBdayRewardItem {
  reward?: MsgReward;
  prob?: number;
}

export interface MsgEventBdaySatisfiedItem {
  satisfied_step?: number;
  satisfied_percent?: number;
  lobby_animation?: string;
  lobby_talk?: string;
  reward_auto_sequence?: number;
}

export interface MsgEventBdaySeason {
  uid?: number;
  type?: EventBdayType;
  open_date?: MsgUTCTimestamp;
  close_date?: MsgUTCTimestamp;
  bday_item_list?: number;
  help?: number;
  event_apply_coin?: number;
  is_apply_event?: boolean;
  lobby_banner?: string;
  lobby_title?: string;
  title?: string;
  desc?: string;
  bgm?: string;
  reward_list?: number;
  satisfied_full_value?: number;
  character_list: MsgEventBdayCharacterInfo[];
}

export interface MsgEventBdayStageItem {
  stage_uid?: number;
  stage_reward?: MsgReward;
}

export interface MsgEventBuff {
  uid?: number;
  event_buff_type?: EventBuffType;
  start_local_date?: MsgUserLocalTimestamp;
  end_local_date?: MsgUserLocalTimestamp;
  event_value?: number;
  event_stage_uid: number[];
  event_character_uid: number[];
  event_title_text?: number;
  short_cut?: MsgShortCut;
  add_tag?: DisplayEventBuffTagType;
  event_party_system_buff_uid?: number;
  common_uid?: number;
}

export interface MsgEventBuffTitle {
  uid?: number;
  msg?: number;
}

export interface MsgEventBuffType {
  uid?: number;
  event_buff_type?: EventBuffType;
  min?: number;
  max?: number;
  short_cut?: MsgShortCut;
  event_title_text?: number;
  common_uid?: number;
}

export interface MsgEventExchangeReward {
  uid?: number;
  items: MsgEventExchangeRewardItem[];
}

export interface MsgEventExchangeRewardDisplay {
  uid?: number;
  items: MsgEventExchangeRewardDisplayItem[];
}

export interface MsgEventExchangeRewardDisplayItem {
  display_multiple?: number;
  display_prob?: number;
  is_lucky?: boolean;
}

export interface MsgEventExchangeRewardItem {
  reward_display_uid?: number;
  reward?: MsgReward;
  prob?: number;
}

export interface MsgEventExchangeSeason {
  uid?: number;
  open_date?: MsgUTCTimestamp;
  close_date?: MsgUTCTimestamp;
  exchange_material_item_list: GlobalDataType[];
  exchange_reward?: number;
  exchange_talk?: number;
  event_exchange_coin?: number;
  event_apply_coin?: number;
  event_exchange_gacha_price?: number;
  season_npc?: number;
  lobby_talk?: number;
  lobby_banner?: string;
  main_bg?: string;
  title?: number;
  desc?: number;
  gift_sender?: number;
  gift_msg?: number;
  bgm?: number;
  is_apply_event?: boolean;
  season_npc_idle?: string;
}

export interface MsgEventExchangeTalk {
  uid?: number;
  items: MsgEventExchangeTalkItem[];
}

export interface MsgEventExchangeTalkItem {
  talk_sequence_uid?: number;
  talk_sequence_prob?: number;
}

export interface MsgEventExchangeTalkList {
  uid?: number;
  items: MsgEventExchangeTalkListItem[];
}

export interface MsgEventExchangeTalkListItem {
  icon?: string;
  prob?: number;
  exchange_talk_uid?: number;
  lucky_talk_sequence_uid?: number;
}

export interface MsgEventFortuneTellingGrade {
  uid?: number;
  title_color?: string;
  grade?: number;
  grade_title?: number;
}

export interface MsgEventFortuneTellingGroup {
  uid?: number;
  main_character_uid?: number;
  enter_auto_sequence?: number;
  category_list: MsgEventFortuneTellingSeasonCategory[];
}

export interface MsgEventFortuneTellingGroupUid {
  fortune_telling_group_uid?: number;
}

export interface MsgEventFortuneTellingReward {
  uid?: number;
  reward_list: MsgEventFortuneTellingRewardData[];
}

export interface MsgEventFortuneTellingRewardData {
  reward?: MsgReward;
  prob?: number;
  fortune_grade_uid?: number;
}

export interface MsgEventFortuneTellingSeason {
  uid?: number;
  side_story_season_uid?: number;
  event_fortune_telling_coin?: number;
  event_fortune_telling_price?: number;
  lobby_banner?: string;
  lobby_banner_bg?: string;
  main_bg?: string;
  title?: number;
  desc?: number;
  bgm?: number;
  group_uid: MsgEventFortuneTellingGroupUid[];
}

export interface MsgEventFortuneTellingSeasonCategory {
  fortune_category_uid?: number;
  season_npc_idle?: string;
  fortune_telling_reward_uid?: number;
  fortune_talk_data_uid?: number;
  fortune_complete_reward?: MsgReward;
  fortune_complete_auto_sequence?: number;
  lobby_talk?: number;
  gift_sender?: number;
  gift_msg?: number;
  fortune_title?: number;
  fortune_prograss_img_front_color?: string;
  fortune_prograss_img_back_color?: string;
}

export interface MsgEventFortuneTellingTalk {
  uid?: number;
  talk_list: MsgEventFortuneTellingTalkData[];
}

export interface MsgEventFortuneTellingTalkData {
  fortune_grade_uid?: number;
  fortune_talk_uid?: number;
  fortune_talk?: number;
}

export interface MsgEventMonster {
  uid?: number;
  items: MsgEventMonsterItem[];
}

export interface MsgEventMonsterItem {
  battle_type?: BattleType;
  stage_uid?: number;
  monster_group?: number;
}

export interface MsgEventPackageShopItem {
  uid?: number;
  name?: number;
  type?: ShopItemType;
  price?: MsgPrice;
  price_usd?: MsgPrice;
  promotion_message?: number;
  goods?: MsgReward;
  gift_sender_uid?: number;
  gift_msg?: number;
  open_condition_package?: number;
  open_condition_desc?: number;
  restrict?: MsgRestrict;
  pid_google?: string;
  pid_appstore?: string;
  pid_onestore?: string;
  banner_name?: string;
  banner_img?: string;
  banner_bg_color?: string;
  img?: string;
  name_text_color?: string;
  promotion_percent?: number;
  cover_color?: string;
}

export interface MsgEventTreasureHuntEventCharacter {
  uid?: number;
  character_list: MsgEventTreasureHuntEventCharacterData[];
  open_term_hour?: number;
}

export interface MsgEventTreasureHuntEventCharacterData {
  event_character_uid?: number;
  character_resource?: string;
  treasure_hunt_reward_uid?: number;
  treasure_hunt_talk_data_uid_1?: number;
  treasure_hunt_talk_data_uid_2?: number;
  treasure_hunt_talk_data_uid_3?: number;
  open_condition_talk_count?: number;
  open_auto_sequence?: number;
}

export interface MsgEventTreasureHuntReward {
  uid?: number;
  reward_list: MsgEventTreasureHuntRewardData[];
}

export interface MsgEventTreasureHuntRewardData {
  reward?: MsgReward;
  is_lucky?: boolean;
  prob?: number;
}

export interface MsgEventTreasureHuntSeason {
  uid?: number;
  side_story_season_uid?: number;
  event_treasure_hunt_coin?: number;
  event_treasure_hunt_price?: number;
  event_theme?: string;
  lobby_banner?: string;
  lobby_banner_bg?: string;
  main_bg?: string;
  title?: number;
  desc?: number;
  bgm?: number;
  exchange_hero_price?: MsgPrice;
  event_character_list_uid?: number;
  exchange_hero_cooltime?: number;
  main_characters: MsgEventTreasureHuntSeasonMainCharacter[];
  talk_all_complete_reward_auto_sequence?: number;
  title_bg_color?: string;
}

export interface MsgEventTreasureHuntSeasonMainCharacter {
  main_character_uid?: number;
  index?: number;
  main_character_icon?: string;
  season_npc_idle?: string;
  lobby_talk?: number;
  gift_sender?: number;
  gift_msg?: number;
  enter_auto_sequence?: number;
}

export interface MsgEventTreasureHuntTalk {
  uid?: number;
  talk_complete_reward?: MsgReward;
  talk_list: MsgEventTreasureHuntTalkData[];
}

export interface MsgEventTreasureHuntTalkData {
  talk_auto_sequence_uid?: number;
  is_lucky?: boolean;
}

export interface MsgFamineRaidAdditionalReward {
  uid?: number;
  items: MsgFamineRaidAdditionalRewardItem[];
}

export interface MsgFamineRaidAdditionalRewardItem {
  index?: number;
  buff_character_count?: number;
  percent?: number;
  reward_count?: number;
  reward_uid?: number;
}

export interface MsgFamineRaidRule {
  uid?: number;
  famine_raid_rule_type?: FamineRaidRuleType;
  famine_raid_rule_effect?: string;
  famine_raid_rule_desc?: number;
  famine_raid_rule_value?: number;
}

export interface MsgFamineRaidSubStage {
  uid?: number;
  stage_uid?: number;
  index?: number;
  stage_prefab?: string;
  boss_monster_uid?: number;
  uid_monster_group?: number;
  required_battle_power?: number;
  defeated_reward?: number;
  reward_prob: MsgRewardProbability[];
  all_reward_general?: number;
  reward_must?: number;
  required_energy?: number;
  display_reward: MsgReward[];
  stage_bgm?: number;
  name?: number;
  position_value?: number;
  additional_reward?: number;
  hard_difficulty?: boolean;
  stage_position?: number;
}

export interface MsgFamineRaidTimeTable {
  uid?: number;
  start_date?: MsgUTCTimestamp;
  end_date?: MsgUTCTimestamp;
  season?: number;
  element?: ElementType;
  stage_uid?: number;
  famine_raid_rule?: number;
  buff_character_1?: string;
  buff_character_2?: string;
  buff_character_3?: string;
}

export interface MsgFamineraidCharacterAi {
  uid?: number;
  type?: CharacterBattleAiType;
  desc?: number;
  character_ai_uid?: number;
}

export interface MsgFestivalEventReward {
  uid?: number;
  event_type?: FestivalEventCheckType;
  gift_sender?: number;
  gift_msg?: number;
  items: MsgFestivalEventRewardItem[];
}

export interface MsgFestivalEventRewardItem {
  index?: number;
  value?: number;
  reward?: MsgReward;
}

export interface MsgFestivalHelp {
  uid?: number;
  items: MsgFestivalHelpItem[];
}

export interface MsgFestivalHelpItem {
  help_uid?: number;
  index?: number;
  image?: string;
  title?: number;
  desc?: number;
}

export interface MsgFestivalPackageShopItem {
  uid?: number;
  name?: number;
  type?: ShopItemType;
  banner_img?: string;
  banner_bg_color?: string;
  img?: string;
  price?: MsgPrice;
  price_usd?: MsgPrice;
  goods?: MsgReward;
  gift_sender_uid?: number;
  gift_msg?: number;
  open_condition_package?: number;
  open_condition_desc?: number;
  restrict?: MsgRestrict;
  pid_google?: string;
  pid_appstore?: string;
  pid_onestore?: string;
  desc_text_icon?: string;
  banner_name?: string;
  time_control_type?: TimeControlType;
}

export interface MsgFestivalShopGroup {
  uid?: number;
  gift_sender_uid?: number;
  gift_msg_uid?: number;
  festival_shop_items: MsgFestivalShopItem[];
}

export interface MsgFestivalShopItem {
  festival_shop_item_uid?: number;
  reward_type?: FestivalShopItemType;
  price?: MsgPrice;
  reward?: MsgReward;
  restrict?: MsgRestrict;
}

export interface MsgFishingEventExchange {
  uid?: number;
  items: MsgFishingEventExchangeItem[];
}

export interface MsgFishingEventExchangeItem {
  shop_item_uid?: number;
  price_1?: MsgPrice;
  price_2?: MsgPrice;
  price_3?: MsgPrice;
  price_4?: MsgPrice;
  reward?: MsgReward;
  restrict?: MsgRestrict;
}

export interface MsgFishingEventIndividualItem {
  index?: number;
  total_count?: number;
  reward?: MsgReward;
}

export interface MsgFishingEventIndividualReward {
  uid?: number;
  gift_sender_uid?: number;
  gift_msg_uid?: number;
  items: MsgFishingEventIndividualItem[];
}

export interface MsgFishingEventItemGroup {
  uid?: number;
  display_event_item?: number;
  items: MsgFishingEventItemGroupItem[];
}

export interface MsgFishingEventItemGroupItem {
  event_item?: number;
}

export interface MsgFishingGradeRound {
  uid?: number;
  items: MsgFishingGradeRoundItem[];
  rank_group?: number;
}

export interface MsgFishingGradeRoundItem {
  note_uid?: number;
  speed?: number;
  count?: number;
  min_term?: number;
  max_term?: number;
}

export interface MsgFishingHitGrade {
  uid?: number;
  hit_grade?: MiniGameHitGradeType;
  point?: number;
}

export interface MsgFishingNote {
  uid?: number;
  icon?: string;
  size_ratio?: number;
  icon_color?: FishingMiniGameNodeIconColor;
}

export interface MsgFishingPointRank {
  uid?: number;
  items: MsgFishingPointRankItem[];
}

export interface MsgFishingPointRankItem {
  star_grade?: number;
  point_min?: number;
  reward_group?: number;
  auto_prob?: number;
}

export interface MsgFishingRareCategory {
  uid?: number;
  items: MsgFishingRareCategoryItem[];
}

export interface MsgFishingRareCategoryItem {
  rare_type?: ItemRareType;
  prob?: number;
  grade_round?: number;
  icon?: string;
}

export interface MsgFishingRareRound {
  uid?: number;
  items: MsgFishingRareRoundItem[];
  note_count?: number;
}

export interface MsgFishingRareRoundItem {
  note_uid?: number;
  rare_category?: number;
  speed?: number;
  min_term?: number;
  max_term?: number;
  prob?: number;
}

export interface MsgFishingRewardGroup {
  uid?: number;
  items: MsgFishingRewardGroupItem[];
}

export interface MsgFishingRewardGroupItem {
  reward?: MsgReward;
  prob?: number;
}

export interface MsgFishingSeason {
  uid?: number;
  operate_type?: DailyLifeContentsOperateType;
  start_date?: MsgUTCTimestamp;
  end_date?: MsgUTCTimestamp;
  display_end_date?: MsgUTCTimestamp;
  items: MsgFishingSeasonRareRoundItem[];
  ranking_type?: DailyLifeFishingSeasonRankType;
  event_ranking_reward?: number;
  event_shop?: number;
  event_mission?: number;
  event_item_group?: number;
  title?: number;
  event_character_uid?: number;
  notice_condition?: string;
}

export interface MsgFishingSeasonRareRoundItem {
  square_theme_uid?: number;
  start_rare_round?: number;
}

export interface MsgFishingSizeCategory {
  uid?: number;
  items: MsgFishingSizeCategoryItem[];
}

export interface MsgFishingSizeCategoryItem {
  grade_idx?: number;
  min_size?: string;
  prob?: number;
  lock?: boolean;
}

export interface MsgFormation {
  uid?: number;
  name?: number;
  desc?: number;
  title?: number;
  forward_range?: number;
  front_line_prob?: number;
  effect?: FormationEffect;
  open_condition?: MsgOpenCondition;
  type?: BattleType;
  skill_uid?: number;
}

export interface MsgFreePackageShopItem {
  uid?: number;
  name?: number;
  type?: ShopItemType;
  goods?: MsgReward;
  gift_msg?: number;
  restrict?: MsgRestrict;
  price?: MsgPrice;
}

export interface MsgFreedomSquareEmotion {
  uid?: number;
  base_resource_name?: string;
  walk_speed?: number;
  run_speed?: number;
  emotions: MsgFreedomSquareEmotionItem[];
}

export interface MsgFreedomSquareEmotionItem {
  emotion?: string;
  use?: boolean;
  pose_frame?: number;
  emotion_type?: FreedomSquareEmotionType;
  emotion_idx?: number;
  condition_main?: MsgOpenCondition;
}

export interface MsgFreedomSquareGuard {
  uid?: number;
  guard_uid?: number;
  spawn_idx?: number;
  touch_msg?: number;
}

export interface MsgFreedomSquareRoom {
  uid?: number;
  idx?: number;
  people_limited?: number;
  room_name?: number;
  square_select_theme_uid?: number;
  open_date?: MsgUTCTimestamp;
  close_date?: MsgUTCTimestamp;
}

export interface MsgFreedomSquareSpawnPoint {
  uid?: number;
  center_x?: number;
  center_z?: number;
  size?: number;
}

export interface MsgFullSceneMaterialLink {
  uid?: number;
  scene_name?: string;
  object_name?: string;
  material_name?: string;
}

export interface MsgGacha {
  uid?: number;
  type?: GachaType;
  sub_type?: GachaSelectSubType;
  event_character: number[];
  character_prob_up?: number;
  open_date?: MsgUTCTimestamp;
  close_date?: MsgUTCTimestamp;
  banner_img?: string;
  popup_name?: number;
  fixed_term?: ActiveControlType;
  is_linked?: boolean;
  linked_data?: MsgLinkedData;
}

export interface MsgGachaCategory {
  uid?: number;
  type?: GachaType;
  class_type?: ClassType;
  items: MsgGachaCategoryItem[];
  gear_slot_type_prob?: number;
}

export interface MsgGachaCategoryItem {
  gear_type?: GearType;
  rare?: number;
  category_prob?: number;
}

export interface MsgGachaProbInfo {
  uid?: number;
  gacha_type?: GachaType;
  items: MsgGachaProbInfoItem[];
}

export interface MsgGachaProbInfoItem {
  gear_type?: GearType;
  gear_type_name?: number;
  rare?: number;
}

export interface MsgGachaSet {
  uid?: number;
  type?: GachaType;
  class_type?: ClassType;
  gear_type?: GearType;
  rare?: number;
  items: MsgGachaSetItem[];
}

export interface MsgGachaSetItem {
  gear_set_uid?: number;
  gear_set_prob?: number;
}

export interface MsgGachaShop {
  uid?: number;
  count?: number;
  price?: MsgPrice;
  ticket?: MsgRequiredItem;
  gacha_type?: GachaType;
  gacha_sub_type?: GachaSelectSubType;
  restrict?: MsgRestrict;
  reset_price?: MsgPrice;
  name?: number;
}

export interface MsgGameData {
  version?: number;
  settings: MsgSetting[];
  levels: MsgLevel[];
  giftSender: MsgGiftSender[];
  giftMessage: MsgGiftMessage[];
  sounds: MsgSound[];
  colors: MsgColor[];
  formations: MsgFormation[];
  chatEmoticons: MsgChatEmoticon[];
  helps: MsgHelpInfo[];
  contentsOpen: MsgContentsOpen[];
  loadings: MsgLoading[];
  event_buffs: MsgEventBuff[];
  event_buff_type: MsgEventBuffType[];
  pre_registration: MsgPreRegistration[];
  dependency_resolver: MsgDependencyResolver[];
  fullscene_material_link: MsgFullSceneMaterialLink[];
  network_error_handler: MsgNetworkErrorHandler[];
  titlePrefabTimes: MsgTitlePrefabTime[];
  lobbyPrefabTimes: MsgLobbyPrefabTime[];
  lobbyExtensionPrefabTimes: MsgLobbyExtensionPrefabTime[];
  eventBuffTitle: MsgEventBuffTitle[];
  noticeMsg: MsgNoticeMsg[];
  probabilityNotice: MsgProbabilityNotice[];
  local_push: MsgLocalPush[];
  gift_sender_groups: MsgGiftSenderGroup[];
  worldmap_banner: MsgWorldmapBanner[];
  image_help: MsgImageHelp[];
  popup_notice_contents: MsgPopupNoticeContents[];
  qualitySettings: MsgQualitySetting[];
  contents_energy: MsgContentsEnergy[];
  items: MsgItem[];
  display_items: MsgDisplayItem[];
  boxes: MsgBox[];
  boxRandoms: MsgBoxRandom[];
  boxRandomEmoticons: MsgBoxRandomEmoticon[];
  groupRandoms: MsgGroupRandom[];
  popupDecos: MsgPopupDeco[];
  boxGearSelects: MsgBoxGearSelect[];
  boxItemSelects: MsgBoxItemSelect[];
  boxCustoms: MsgBoxCustom[];
  boxCharacterSelects: MsgBoxCharacterSelect[];
  treasury_random: MsgTreasuryRandom[];
  boxBeautySelects: MsgBoxBeautySelect[];
  boxGearCharacterSelects: MsgBoxGearCharacterSelect[];
  itemsCombines: MsgItemCombine[];
  boxCostumeSelects: MsgBoxCostumeSelect[];
  boxWeaponSelects: MsgBoxWeaponSelect[];
  boxMemorialSelects: MsgBoxMemorialSelect[];
  beautyRecipes: MsgBeautyRecipe[];
  storyItems: MsgStoryItem[];
  boxRandomGifts: MsgBoxRandomGift[];
  characters: MsgCharacter[];
  support_characters: MsgSupportCharacter[];
  characterLevels: MsgCharacterLevel[];
  monsters: MsgMonster[];
  characterAi: MsgCharacterAi[];
  startCharacters: MsgStartCharacter[];
  displayCharacters: MsgDisplayCharacter[];
  universePositions: MsgUniversePosition[];
  skillEffects: MsgSkillEffect[];
  characterSkills: MsgCharacterSkill[];
  monsterSkills: MsgCharacterSkill[];
  gearSkills: MsgCharacterSkill[];
  formationSkills: MsgCharacterSkill[];
  characterSkillDesc: MsgCharacterSkillDesc[];
  characterSkillUpgrade: MsgCharacterSkillUpgrade[];
  characterPromotes: MsgCharacterPromote[];
  characterEnhanceStatus: MsgCharacterEnhanceStatus[];
  characterAwakens: MsgCharacterAwaken[];
  skillPriority: MsgSkillPriority[];
  ccEffectGroup: MsgCcEffectGroup[];
  costumes: MsgCostume[];
  costumeRandomEffects: MsgCostumeRandomEffect[];
  costumeEffects: MsgCostumeEffect[];
  effectScales: MsgEffectScale[];
  awakenCostumes: MsgAwakenCostume[];
  lord_skill: MsgCharacterSkill[];
  phase_skill: MsgPhaseSkill[];
  potential_effects: MsgPotentialEffect[];
  characterStatGrade: MsgCharacterStatGrade[];
  universePositionsTyrantWar: MsgUniversePosition[];
  characterGrowthHistoryGroup: MsgCharacterGrowthHistoryGroup[];
  characterGrowthHistory: MsgCharacterGrowthHistory[];
  universePositionsEvent: MsgUniversePosition[];
  profileIcon: MsgProfileIcon[];
  battlePreset: MsgBattlePreset[];
  assistPartnerSkillUpgrade: MsgAssistPartnerSkillUpgrade[];
  worlds: MsgWorld[];
  stages: MsgStage[];
  subStages: MsgSubStage[];
  stageRounds: MsgSubStageRound[];
  uidRandomRewards: MsgUidRandomReward[];
  stageMonsterGroups: MsgStageMonsterGroup[];
  dungeons: MsgDungeonStage[];
  dungeonSubStages: MsgDungeonSubStage[];
  dungeonRounds: MsgSubStageRound[];
  dungeonMonsterGroups: MsgStageMonsterGroup[];
  arenaDatas: MsgArena[];
  arenaAIEnemys: MsgArenaAIEnemy[];
  arena_league_change_schedule: MsgArenaLeagueChangeSchedule[];
  arena_buff_schedule: MsgArenaBuffSchedule[];
  dungeon_mileage_rewards: MsgDungeonMileageReward[];
  dakkeonTrainings: MsgDakkeonTraining[];
  mercenaryTrainings: MsgMercenaryTraining[];
  mercenaryTrainingRounds: MsgMercenaryTrainingRound[];
  mercenaryTrainingMonsterGroups: MsgStageMonsterGroup[];
  worldMapDisplayRewards: MsgWoldMapDisplayRewards[];
  gears: MsgGear[];
  gearSetEffects: MsgGearSetEffect[];
  gearMainEffectRandomUid: MsgGearEffectRandomUid[];
  gearMainEffects: MsgGearMainEffect[];
  gearOptionalEffectRandomUid: MsgGearEffectRandomUid[];
  gearOptionalEffects: MsgGearOptionalEffect[];
  gearExclusiveEffectRandomUid: MsgGearExclusiveEffectRandomUid[];
  gearExclusiveEffects: MsgGearExclusiveEffect[];
  gearUpgrade: MsgGearUpgrade[];
  gearMaterials: MsgGearMaterial[];
  gearCrafts: MsgGearCraft[];
  beauties: MsgBeauty[];
  beautyEffectRandomUids: MsgBeautyEffectRandomUid[];
  beautyEffects: MsgBeautyEffect[];
  gear_reconstructions: MsgGearReconstruction[];
  beautyThemeImage: MsgBeautyThemeImage[];
  gear_custom_craft: MsgGearCustomCraft[];
  gear_custom_craft_material: MsgGearCustomCraftMaterial[];
  gear_custom_craft_set: MsgGearCustomCraftSet[];
  beauty_level: MsgBeautyLevel[];
  beauty_effect_level: MsgBeautyEffectLevel[];
  npcTalkSeqs: MsgNPCTalkSeq[];
  npcTalkSeqsStoryNormal: MsgNPCTalkSeq[];
  npcTalkSeqsStoryHard: MsgNPCTalkSeq[];
  npcTalkSeqsStoryElite: MsgNPCTalkSeq[];
  npcTalkSeqsStoryElite2: MsgNPCTalkSeq[];
  npcTalkSeqsStoryRecruit: MsgNPCTalkSeq[];
  npcTalkSeqsStoryTyrantWar: MsgNPCTalkSeq[];
  npcTalkEvents: MsgNPCTalkEvent[];
  autoSequences: MsgAutoSequence[];
  autoSequencesTyrantWar: MsgAutoSequence[];
  npcTalkSeqsLordBDay: MsgNPCTalkSeq[];
  voices: MsgVoice[];
  character_voice_setting: MsgCharacterVoiceSetting[];
  npcTalkSeqStoryNightmare: MsgNPCTalkSeq[];
  autoSequencesNightmare: MsgAutoSequence[];
  npcTalkSeqSubstory: MsgNPCTalkSeq[];
  autoSequenceSubstory: MsgAutoSequence[];
  autoSequenceSeries: MsgAutoSequenceSeries[];
  npcTalkSeqsStorySide: MsgNPCTalkSeq[];
  autoSequencesSideStory: MsgAutoSequence[];
  autoSequencesMemorial: MsgAutoSequence[];
  npcTalkSeqsMemorial: MsgNPCTalkSeq[];
  autoSequencesEast: MsgAutoSequence[];
  npcTalkSeqsEast: MsgNPCTalkSeq[];
  autoSequencesLordBday: MsgAutoSequence[];
  freedomSquareRooms: MsgFreedomSquareRoom[];
  freedomSquareEmotion: MsgFreedomSquareEmotion[];
  photoLens: MsgPhotoLens[];
  photoFilter: MsgPhotoFilter[];
  freedomSquareSpawnPoint: MsgFreedomSquareSpawnPoint[];
  freedomSquareGuard: MsgFreedomSquareGuard[];
  themePrefabTime: MsgThemePrefabTime[];
  shopDisplay: MsgShopDisplay[];
  costumeShopItems: MsgCostumeShopItem[];
  termPackageShopItems: MsgTermPackageShopItem[];
  chargeShopItems: MsgChargeShopItem[];
  mysteryShopSlots: MsgMysteryShopSlot[];
  mysteryShop: MsgMysteryShop[];
  gachaShop: MsgGachaShop[];
  characterPackageShopItems: MsgCharacterPackageShopItem[];
  eventPackageShopItems: MsgEventPackageShopItem[];
  freePackageShopItems: MsgFreePackageShopItem[];
  conditionPackageShopItems: MsgConditionPackageShopItem[];
  costumeMileageItems: MsgCostumeMileageItem[];
  characterAlonePackageShopItems: MsgCharacterAlonePackageShopItem[];
  passPackageShopItems: MsgPassPackageShopItem[];
  customPackageShopItems: MsgCustomPackageShopItem[];
  clan_point_shop_items: MsgClanPointShopItem[];
  festival_shop_groups: MsgFestivalShopGroup[];
  party_shop_groups: MsgPartyShopGroup[];
  cube_shop_groups: MsgCubeShop[];
  summon_mileage_shop: MsgSummonMileageShop[];
  clan_party_dungeon_shop: MsgClanPartyDungeonShop[];
  subscriptionGroups: MsgSubscriptionGroup[];
  subscriptionServiceGroups: MsgSubscriptionServiceGroup[];
  missionPassPackageShopItems: MsgMissionPassPackageShopItem[];
  eventBdayPackageShopItems: MsgEventBdayPackageShopItem[];
  festivalPackageShopItems: MsgFestivalPackageShopItem[];
  costume_purchase_shop_items: MsgCostumePurchaseShop[];
  attendancePackageShopItems: MsgAttendancePackageShopItem[];
  stepPackageShopItems: MsgStepPackageShopItem[];
  conditionPeriodPackageShopItems: MsgConditionPeriodPackageShopItem[];
  elementProofDungeonShop: MsgElementProofDungeonShop[];
  shopDisplayGroup: MsgShopDisplayGroup[];
  clan_attendance_shop: MsgClanAttendanceShop[];
  tutorials: MsgTutorial[];
  tutorialBattles: MsgTutorialBattle[];
  dailyBonusSeasons: MsgDailyBonusSeason[];
  dailyBonusNewusers: MsgDailyBonus[];
  dailyBonusReturnusers: MsgDailyBonus[];
  dailyRandomBonus: MsgDailyRandomBonus[];
  characterContract: MsgCharacterContract[];
  characterContractRewards: MsgCharacterContractReward[];
  advertisementGifts: MsgAdvertisementGift[];
  attendance_event: MsgAttendanceEvent[];
  attendance_event_season: MsgAttendanceEventSeason[];
  attendanceMonthly: MsgAttendanceMonthly[];
  treasury_rewards: MsgTreasuryReward[];
  treasury_level: MsgTreasurylevel[];
  treasury_season: MsgTreasurySeason[];
  attendance_countdown_seasons: MsgAttendanceCountdown[];
  advertisementGiftsAuto: MsgAdvertisementGiftAuto[];
  attendance_premium: MsgAttendancePremium[];
  character_contract_infinite: MsgCharacterContractInfinite[];
  attendance_stack_seasons: MsgAttendanceStack[];
  achievements: MsgAchievement[];
  missions: MsgMission[];
  dispatchDisplay: MsgDispatchDisplay[];
  dispatchRewards: MsgDispatchReward[];
  dispatchPolicy: MsgDispatchPolicy[];
  dispatchPolicyMessage: MsgDispatchPolicyMessage[];
  platform_achievement: MsgPlatformAchievement[];
  challenge_achievements: MsgChallengeAchievement[];
  hashtags: MsgHashtag[];
  clan_banners: MsgClanBanner[];
  clan_celebrations: MsgCelebration[];
  clan_raid_seasons: MsgClanRaidSeason[];
  clan_raid_phases: MsgClanRaidPhase[];
  clan_raid_sub_stages: MsgClanRaidSubStage[];
  clan_raid_monsters: MsgStageMonsterGroup[];
  clan_raid_reward_ranks: MsgClanRaidRewardRank[];
  clan_raid_season_reward_grade: MsgClanRaidSeasonRewardGrade[];
  clan_raid_season_reward: MsgClanRaidSeasonReward[];
  clan_raid_monster_abuse_groups: MsgClanRaidMonsterAbuseGroup[];
  clan_raid_help: MsgClanRaidHelp[];
  clan_raid_battle_info: MsgClanRaidBattleChallengeInfo[];
  monster_festivals: MsgMonsterFestival[];
  event_monsters: MsgEventMonster[];
  festival_help: MsgFestivalHelp[];
  festival_event_reward: MsgFestivalEventReward[];
  time_event_groups: MsgTimeEventGroup[];
  time_events: MsgTimeEvent[];
  time_event_pass: MsgTimeEventPass[];
  time_event_contract_group: MsgTimeEventContractGroup[];
  partySeason: MsgPartySeason[];
  partySubStage: MsgPartySubStage[];
  partyMonsterPhase: MsgPartyMonsterPhase[];
  partyMonsters: MsgStageMonsterGroup[];
  partyTiers: MsgPartyTier[];
  partySizeRewards: MsgPartySizeReward[];
  partyLobbyMonster: MsgPartyLobbyMonster[];
  party_abuse_groups: MsgClanRaidMonsterAbuseGroup[];
  partySystemSkill: MsgPartySystemSkill[];
  partyChatting: MsgPartyChatting[];
  event_exchange_seasons: MsgEventExchangeSeason[];
  event_exchange_reward: MsgEventExchangeReward[];
  event_exchange_reward_display: MsgEventExchangeRewardDisplay[];
  event_exchange_talk_list: MsgEventExchangeTalkList[];
  event_exchange_talk: MsgEventExchangeTalk[];
  time_event_mission_group: MsgTimeEventMissionGroup[];
  time_event_mission: MsgTimeEventMission[];
  time_event_mission_point_reward: MsgTimeEventMissionPointReward[];
  time_event_contract_mission: MsgTimeEventContractMission[];
  time_event_contract_dialogue: MsgTimeEventContractDialogue[];
  gachas: MsgGacha[];
  gachaCategorys: MsgGachaCategory[];
  gachaSets: MsgGachaSet[];
  gachaProbInfos: MsgGachaProbInfo[];
  beautyGachaCategorys: MsgBeautyGachaCategory[];
  beautyGachaGroups: MsgBeautyGachaGroup[];
  rumors: MsgRumor[];
  rumor_quest: MsgRumorQuest[];
  rumor_reward: MsgRumorReward[];
  archive_illust: MsgArchiveIllust[];
  archive_effect: MsgArchiveEffect[];
  archive_sequence_seasons: MsgArchiveSequenceSeason[];
  archive_sequence_images: MsgArchiveSequenceImage[];
  photocard_book: MsgPhotocardBook[];
  sea_battle_seasons: MsgSeaBattleSeason[];
  sea_battle_stages: MsgSeaBattleStage[];
  sea_battle_monster_groups: MsgSeaBattleMonsterGroup[];
  sea_battle_monsters: MsgStageMonsterGroup[];
  sea_battle_monster_abuse_groups: MsgClanRaidMonsterAbuseGroup[];
  sea_battle_lord_skill_triggers: MsgSeaBattleLordSkillTrigger[];
  sea_battle_lord_skill: MsgSeaBattleLordSkill[];
  sea_battle_reward_grades: MsgSeaBattleRewardGrade[];
  sea_battle_reward_groups: MsgSeaBattleRewardGroup[];
  sea_battle_shop: MsgSeaBattleShop[];
  sea_battle_chat_preset: MsgSeaBattleChatPreset[];
  sea_battle_match_tip: MsgSeaBattleMatchTip[];
  sea_battle_individual_reward: MsgSeaBattleIndividualReward[];
  gear_gacha_rewards: MsgGearGachaReward[];
  auctions: MsgAuction[];
  auction_lobbys: MsgAuctionLobby[];
  auction_biddings: MsgAuctionBidding[];
  auction_registers: MsgAuctionRegister[];
  summons: MsgSummon[];
  summon_probs: MsgSummonProb[];
  summon_groups: MsgSummonGroup[];
  summon_weapon_display: MsgSummonWeaponDisplay[];
  condition_summons: MsgConditionSummon[];
  summon_resource: MsgSummonResource[];
  character_weapons: MsgCharacterWeapon[];
  character_weapon_tiers: MsgCharacterWeaponTier[];
  weaponSkills: MsgCharacterSkill[];
  weaponSkillDesc: MsgCharacterSkillDesc[];
  memorialGears: MsgMemorialGear[];
  memorialGearSkills: MsgCharacterSkill[];
  memorialGearDesc: MsgCharacterSkillDesc[];
  memorialGearTiers: MsgMemorialGearTier[];
  invite_festivals: MsgInviteFestival[];
  invite_festival_missions: MsgInviteFestivalMission[];
  invite_festival_special_missions: MsgInviteFestivalSpecialMission[];
  clan_attendance_seasons: MsgClanAttendanceSeason[];
  clan_attendance_conversations: MsgClanAttendanceConversation[];
  clan_attendance_conversation_group: MsgClanAttendanceConversationGroup[];
  clan_attendance_group_mission: MsgClanAttendanceGroupMission[];
  clan_attendance_character_list: MsgClanAttendanceCharacterList[];
  clan_attendance_mission: MsgClanAttendanceMission[];
  tyrantwar_world: MsgTyrantWarWorld[];
  tyrantwar_stage: MsgTyrantWarStage[];
  tyrantwar_subStage: MsgTyrantWarSubStage[];
  tyrantwar_history: MsgTyrantWarHistory[];
  tyrantwar_history_round: MsgTyrantWarHistoryRound[];
  tyrantwarMonsterGroups: MsgStageMonsterGroup[];
  tyrantwarResonanceGrade: MsgResonanceGrade[];
  avalon_theater_contents: MsgAvalonTheaterContents[];
  avalon_theater_promotion_banners: MsgAvalonTheaterPromotionBanner[];
  avalon_theater_episodes: MsgAvalonTheaterEpisode[];
  clan_party_dungeon_seasons: MsgClanPartyDungeonSeason[];
  clan_party_dungeon_monsters: MsgClanPartyDungeonMonster[];
  clan_party_dungeon_monster_groups: MsgStageMonsterGroup[];
  clan_party_dungeon_clan_levels: MsgClanPartyDungeonClanLevel[];
  clan_party_dungeon_monster_level: MsgClanPartyDungeonMonsterLevel[];
  clan_party_dungeon_gift_msg_groups: MsgClanPartyDungeonGiftMsgGroup[];
  clan_party_dungeon_buffs: MsgClanPartyDungeonBuff[];
  clan_party_dungeon_mission_groups: MsgClanPartyDungeonMissionGroup[];
  clan_party_abuse_groups: MsgClanPartyDungeonMonsterAbuseGroup[];
  clan_party_dungeon_freedom_square: MsgClanPartyDungeonFreedomSquare[];
  clan_double_clash_party_setting: MsgSetting[];
  clan_double_clash_party_season: MsgClanDoubleClashPartySeason[];
  clan_double_clash_party_clan_reward: MsgClanDoubleClashPartyClanReward[];
  clan_double_clash_party_monster_group: MsgClanDoubleClashPartyMonsterGroup[];
  clan_double_clash_party_battle_reward_group: MsgClanDoubleClashPartyBattleRewardGroup[];
  training_room_slot: MsgTrainingRoomSlot[];
  training_room_slot_option: MsgTrainingRoomSlotOption[];
  training_room_ad_buff: MsgTrainingRoomAdBuff[];
  battle_system_skill: MsgBattleSystemSkill[];
  battleSystemSkills: MsgCharacterSkill[];
  potentialSKillList: MsgPotentialSkillList[];
  potentialSKill: MsgCharacterSkill[];
  potentialSKillDesc: MsgCharacterSkillDesc[];
  battleSystemSkillDesc: MsgCharacterSkillDesc[];
  clan_raid_vulnerable_gauge: MsgBattleVulnerableGauge[];
  battleSystemUiEffect: MsgBattleSystemUiEffect[];
  phase_controller: MsgPhaseController[];
  phase_controller_group: MsgPhaseControllerGroup[];
  vanguard_skill_group: MsgVanguardSkillGroup[];
  phase_controller_ui_prefab: MsgPhaseControllerUiPrefab[];
  support_team_group: MsgSupportTeamGroup[];
  potentialPowerList: MsgPotentialPowerList[];
  event_bday_seasons: MsgEventBdaySeason[];
  event_bday_character_reaction: MsgEventBdayCharacterReaction[];
  event_bday_character_reaction_groups: MsgEventBdayCharacterReactionGroup[];
  event_bday_item_list: MsgEventBdayItemList[];
  event_bday_character_satisfied: MsgEventBdayCharacterSatisfied[];
  event_bday_reward: MsgEventBdayReward[];
  photocards: MsgPhotocard[];
  photocard_tags: MsgPhotocardTag[];
  famine_raid_time_table: MsgFamineRaidTimeTable[];
  famineraid_character_ai: MsgFamineraidCharacterAi[];
  famine_raid_sub_stage: MsgFamineRaidSubStage[];
  famine_raid_additional_reward: MsgFamineRaidAdditionalReward[];
  famine_raid_monster: MsgStageMonsterGroup[];
  famine_raid_rule: MsgFamineRaidRule[];
  famine_raid_setting: MsgSetting[];
  side_story_season: MsgSideStorySeason[];
  side_story: MsgSideStory[];
  side_story_chapter: MsgSideStoryChapter[];
  side_story_sub_stage: MsgSideStorySubStage[];
  side_story_sub_stage_round: MsgSubStageRound[];
  side_story_monster: MsgStageMonsterGroup[];
  side_story_mission_group: MsgSideStoryMissionGroup[];
  side_story_mission: MsgSideStoryMission[];
  event_treasure_hunt_season: MsgEventTreasureHuntSeason[];
  event_treasure_hunt_event_character: MsgEventTreasureHuntEventCharacter[];
  event_treasure_hunt_talk: MsgEventTreasureHuntTalk[];
  event_treasure_hunt_reward: MsgEventTreasureHuntReward[];
  event_fortune_telling_season: MsgEventFortuneTellingSeason[];
  event_fortune_telling_group: MsgEventFortuneTellingGroup[];
  event_fortune_telling_grade: MsgEventFortuneTellingGrade[];
  event_fortune_telling_reward: MsgEventFortuneTellingReward[];
  event_fortune_telling_talk: MsgEventFortuneTellingTalk[];
  royal_mission_season: MsgRoyalMissionSeason[];
  royal_mission_slot_group: MsgRoyalMissionSlotGroup[];
  royal_mission_slot: MsgRoyalMissionSlot[];
  royal_mission: MsgRoyalMission[];
  royal_mission_reward: MsgRoyalMissionReward[];
  royal_mission_reward_slot: MsgRoyalMissionRewardSlot[];
  royal_mission_reward_grade: MsgRoyalMissionRewardGrade[];
  ranking_setting: MsgSetting[];
  ranking_season_dev: MsgRankingSeason[];
  ranking_league: MsgRankingLeague[];
  ranking_season_live: MsgRankingSeason[];
  ranking_reward_group_leadership_point: MsgRankingRewardGroup[];
  ranking_reward_leadership_point: MsgRankingReward[];
  ranking_reward_group_clan_raid: MsgRankingRewardGroup[];
  ranking_reward_clan_raid: MsgRankingReward[];
  ranking_reward_group_sea_battle: MsgRankingRewardGroup[];
  ranking_reward_sea_battle: MsgRankingReward[];
  ranking_content: MsgRankingContent[];
  elementProofDungeons: MsgElementProofDungeon[];
  elementProofDungeonRounds: MsgElementProofDungeonRound[];
  elementProofDungeonGroups: MsgStageMonsterGroup[];
  elementProofDungeonFloorReward: MsgElementProofDungeonFloorReward[];
  world_raid_setting: MsgSetting[];
  world_raid_monster_rotation: MsgWorldRaidMonsterRotation[];
  world_raid_sub_stage_group: MsgWorldRaidSubStageGroup[];
  world_raid_sub_stage_round: MsgWorldRaidSubStageRound[];
  world_raid_total_searching_level: MsgWorldRaidTotalSearchingLevel[];
  world_raid_user_energy_rank_reward: MsgWorldRaidEnergyRankReward[];
  world_raid_total_safety_level: MsgWorldRaidTotalSafetyLevel[];
  world_raid_user_battle_point_rank_reward: MsgWorldRaidBattlePointRankReward[];
  world_raid_battle_reward: MsgWorldRaidBattleReward[];
  world_raid_individual_reward: MsgWorldRaidIndividualReward[];
  world_raid_monster: MsgStageMonsterGroup[];
  world_raid_battle_info: MsgWorldRaidBattleInfo[];
  world_raid_monster_abuse: MsgWorldRaidMonsterAbuse[];
  premium_event_season: MsgPremiumEventSeason[];
  premium_event_mission_group: MsgPremiumEventMissionGroup[];
  premium_event_mission_list: MsgPremiumEventMissionList[];
  memorial_setting: MsgSetting[];
  memorial_group_open_mission: MsgMemorialGroupOpenMission[];
  memorial_illust: MsgMemorialIllust[];
  memorial_group: MsgMemorialGroup[];
  memorial_chapter: MsgMemorialChapter[];
  memorial_sub_stage_round: MsgMemorialSubStageRound[];
  memorial_monster: MsgStageMonsterGroup[];
  memorial_box: MsgMemorialBoxReward[];
  memorial_gear_collect: MsgMemorialGearCollect[];
  link_trace_system: MsgLinkTraceSystem[];
  link_trace_system_complete_reward: MsgLinkTraceSystemCompleteReward[];
  link_trace_system_step_reward: MsgLinkTraceSystemStepReward[];
  link_trace_system_text: MsgLinkTraceSystemText[];
  lord_ability_group: MsgLordAbilityGroup[];
  lord_ability_group_step: MsgLordAbilityGroupStep[];
  lord_ability_skill_upgrade_cost: MsgLordAbilitySkillUpgradeCost[];
  lord_ability_skill_list: MsgCharacterSkill[];
  lord_ability_skill_desc: MsgCharacterSkillDesc[];
  tracking_summon_setting: MsgSetting[];
  tracking_summon: MsgTrackingSummon[];
  tracking_summon_grade: MsgTrackingSummonGrade[];
  tracking_summon_general_reward: MsgTrackingSummonGeneralReward[];
  tracking_summon_first_clear_reward: MsgTrackingSummonFirstClearReward[];
  east_bridge_setting: MsgSetting[];
  east_bridge_chapter: MsgEastBridgeChapter[];
  east_bridge_sub_stage: MsgEastBridgeSubStage[];
  east_bridge_hidden_stage: MsgEastBridgeHiddenStage[];
  east_bridge_noise_stage: MsgEastBridgeNoiseStage[];
  east_bridge_sub_stage_round: MsgEastBridgeSubStageRound[];
  east_bridge_monster: MsgStageMonsterGroup[];
  east_bridge_bless: MsgEastBridgeBless[];
  east_bridge_bless_skill: MsgCharacterSkill[];
  east_bridge_bless_group: MsgEastBridgeBlessGroup[];
  east_bridge_chapter_clear_rank_reward: MsgEastBridgeChapterClearRankReward[];
  east_bridge_individual_reward: MsgEastBridgeIndividualReward[];
  east_bridge_bless_skill_desc: MsgEastBridgeBlessSkillDesc[];
  east_bridge_score_by_difficulty_step: MsgEastBridgeScoreByDifficultyStep[];
  east_bridge_score_by_bless_type: MsgEastBridgeScoreByBlessType[];
  character_info_voice_filter: MsgCharacterInfoVoiceFilter[];
  character_info_voice: MsgCharacterInfoVoice[];
  character_info_voice_group: MsgCharacterInfoVoiceGroup[];
  warfare_setting: MsgSetting[];
  warfare_season_rotation: MsgWarfareSeasonRotation[];
  warfare_league: MsgWarfareLeague[];
  warfare_ranking_reward: MsgWarfareRankingReward[];
  warfare_mission: MsgWarfareMission[];
  warfare_shop: MsgWarfareShop[];
  warfare_character_group: MsgWarfareCharacterGroup[];
  warfare_ai_enemy: MsgWarfareAIEnemy[];
  dailyLifeContents: MsgDailyLifeContents[];
  daily_life_collection_category: MsgDailyLifeCollectionCategory[];
  daily_life_collection_reward_group: MsgDailyLifeCollectionRewardGroup[];
  daily_life_conversion: MsgDailyLifeConversion[];
  daily_life_conversion_reward_type_prob: MsgDailyLifeConversionRewardTypeProb[];
  daily_life_conversion_reward_group: MsgDailyLifeConversionRewardGroup[];
  fishing_reward_group: MsgFishingRewardGroup[];
  daily_life_setting: MsgSetting[];
  fishing_note: MsgFishingNote[];
  fishing_rare_category: MsgFishingRareCategory[];
  fishing_hit_grade: MsgFishingHitGrade[];
  fishing_rare_round: MsgFishingRareRound[];
  fishing_point_rank: MsgFishingPointRank[];
  fishing_size_category: MsgFishingSizeCategory[];
  fishing_grade_round: MsgFishingGradeRound[];
  fishing_setting: MsgSetting[];
  fishing_season: MsgFishingSeason[];
  fishing_event_ranking_reward: MsgRankingReward[];
  fishing_event_exchange: MsgFishingEventExchange[];
  fishing_event_individual_reward: MsgFishingEventIndividualReward[];
  fishing_event_item_group: MsgFishingEventItemGroup[];
  lord_setting: MsgSetting[];
  lord_bday_illust: MsgLordBdayIllust[];
  lord_bday_seasons: MsgLordBdaySeason[];
  lord_bday_attendance_reward: MsgLordBdayAttendanceReward[];
  lord_bday_celebrate_character: MsgLordBdayCelebrateCharacter[];
}

export interface MsgGear {
  uid?: number;
  name?: number;
  gear_set_uid?: number;
  gear_slot_type?: GearSlotType;
  icon?: string;
  main_effect_random_uid?: number;
  optional_effect_random_uid?: number;
  gear_type?: GearType;
  equip_limit?: ClassType;
  exclusive_effect_random_uid?: number;
  gear_material?: number;
  ignore_gacha?: boolean;
  gear_sub_type?: GearGroupSubType;
}

export interface MsgGearCraft {
  uid?: number;
  class?: ClassType;
  gear_set_uid?: number;
  items: MsgGearCraftItem[];
}

export interface MsgGearCraftItem {
  gear_slot_type?: GearSlotType;
  gear?: number;
  gear_material?: number;
}

export interface MsgGearCustomCraft {
  uid?: number;
  gear_custom_material_uid?: number;
  craft_required?: GearCustomCraftRequired;
}

export interface MsgGearCustomCraftMaterial {
  uid?: number;
  item1?: MsgReward;
  item2?: MsgReward;
  item3?: MsgReward;
  item4?: MsgReward;
  price?: MsgPrice;
}

export interface MsgGearCustomCraftSet {
  uid?: number;
  gear_class?: ClassType;
  rare?: number;
  items: MsgGearCustomCraftSetItem[];
}

export interface MsgGearCustomCraftSetItem {
  gear_slot_type?: GearSlotType;
  gear_set_uid?: number;
  gear_uid?: number;
  main_effect_random_uid?: number;
}

export interface MsgGearEffectRandomUid {
  uid?: number;
  items: MsgGearEffectRandomUidItem[];
}

export interface MsgGearEffectRandomUidItem {
  effect_uid?: number;
  type?: CommonStatusEffectType;
  rare?: number;
  prob?: number;
}

export interface MsgGearExclusiveEffect {
  uid?: number;
  skill_slot_type?: UnitSkillSlotType;
  skill_level_add_value?: number;
}

export interface MsgGearExclusiveEffectRandomItem {
  character_uid?: number;
  exclusive_effect_uid: number[];
}

export interface MsgGearExclusiveEffectRandomUid {
  uid?: number;
  items: MsgGearExclusiveEffectRandomItem[];
}

export interface MsgGearGachaReward {
  uid?: number;
  uesd_type?: GearGachaPriceType;
  items: MsgGearGachaRewardItem[];
}

export interface MsgGearGachaRewardItem {
  gacha_result?: GearType;
  gacha_result_text?: number;
  reward?: MsgReward;
}

export interface MsgGearMainEffect {
  uid?: number;
  name?: number;
  type?: CommonStatusEffectType;
  rare?: number;
  effect_val?: number;
  lev_up_val?: number;
  max_lev_up_val?: number;
}

export interface MsgGearMaterial {
  uid?: number;
  items: MsgGearMaterialItem[];
}

export interface MsgGearMaterialItem {
  rare?: number;
  item1?: MsgReward;
  item2?: MsgReward;
  item3?: MsgReward;
  item4?: MsgReward;
  price?: MsgPrice;
}

export interface MsgGearOptionalEffect {
  uid?: number;
  name?: number;
  type?: CommonStatusEffectType;
  rare?: number;
  effect_val?: number;
  add_val?: number;
  battle_power_value?: number;
}

export interface MsgGearReconstruction {
  uid?: number;
  gear_type?: GearType;
  reconstruction_range: GearReconstructionRangeType[];
  reconstruction_material_item?: MsgRequiredItem;
  reconstruction_material_gear_type?: GearType;
  reconstruction_material_gear_count?: number;
  reconstruction_cost?: MsgPrice;
  desc?: number;
}

export interface MsgGearSetEffect {
  uid?: number;
  index?: number;
  name?: number;
  desc?: number;
  sub_desc?: number;
  effect_condition?: number;
  effect_type?: CommonStatusEffectType;
  effect_val?: number;
  skill_uid?: number;
  class?: ClassType;
  icon_name?: string;
}

export interface MsgGearUpgrade {
  uid?: number;
  rare?: number;
  upgrade_level?: number;
  success_prob?: number;
  upgrade_price?: MsgPrice;
  sell_price?: MsgReward;
  optional_upgrade?: boolean;
}

export interface MsgGiftMessage {
  uid?: number;
  msg?: number;
}

export interface MsgGiftSender {
  uid?: number;
  name?: number;
  sender_icon?: string;
}

export interface MsgGiftSenderGroup {
  uid?: number;
  items: MsgGiftSenderGroupItem[];
}

export interface MsgGiftSenderGroupItem {
  sender?: number;
  name?: number;
  sender_icon?: string;
}

export interface MsgGroupRandom {
  uid?: number;
  items: MsgGroupRandomItem[];
}

export interface MsgGroupRandomItem {
  type?: GlobalDataType;
  item_uid?: number;
  item_amount?: number;
  item_prob?: number;
}

export interface MsgHashtag {
  uid?: number;
  string_uid?: number;
}

export interface MsgHelpInfo {
  uid?: number;
  title?: number;
  dlg_name: string[];
  sub_ui_path?: string;
  items: MsgHelpInfoItem[];
}

export interface MsgHelpInfoItem {
  sub_title?: number;
  sub_desc?: number;
}

export interface MsgImageHelp {
  uid?: number;
  items: MsgImageHelpItem[];
}

export interface MsgImageHelpItem {
  help_uid?: number;
  index?: number;
  image?: string;
  title?: number;
  desc?: number;
}

export interface MsgIntProb {
  prob_type?: IntProbType;
  prob?: number;
}

export interface MsgInviteFestival {
  uid?: number;
  start_date?: MsgUTCTimestamp;
  end_date?: MsgUTCTimestamp;
  display_end_date?: MsgUTCTimestamp;
  invite_mission_uid?: number;
  special_mission_uid_new?: number;
  special_mission_uid_return?: number;
  donation_deed_open_condition?: MsgPrice;
  invite_festival_point_icon?: string;
  invite_festival_point_name?: number;
  invite_festival_point_desc?: number;
  invite_festival_name?: number;
  event_start_talk?: number;
  invite_talk?: number;
  invite_help?: number;
  board_key?: string;
  promotion_txt_uid?: number;
  user_unique_code_prefix?: string;
  main_bg?: string;
  main_img?: string;
  collabo_img?: string;
  desc_text?: string;
  desc2_text?: string;
  character_talk_text?: string;
  caution_text?: string;
}

export interface MsgInviteFestivalMission {
  uid?: number;
  missions: MsgInviteFestivalMissionItem[];
}

export interface MsgInviteFestivalMissionItem {
  index?: number;
  repeat?: number;
  invite_mission_title?: number;
  invite_mission_desc?: number;
  gift_sender?: number;
  gift_msg?: number;
  invite_festival_point_condition?: number;
  reward?: MsgReward;
}

export interface MsgInviteFestivalSpecialMission {
  uid?: number;
  special_missions: MsgInviteFestivalSpecialMissionItem[];
}

export interface MsgInviteFestivalSpecialMissionItem {
  index?: number;
  repeat?: number;
  invite_mission_desc?: number;
  condition?: TimeEventCheckCondition;
  check_value?: number;
  check_uid?: number;
  goal_count?: number;
  reward?: MsgReward;
  invite_reward?: MsgReward;
  short_cut?: number;
}

export interface MsgItem {
  uid?: number;
  name?: number;
  desc?: number;
  type?: GlobalDataType;
  grade?: number;
  value?: number;
  icon?: string;
  combination_resource?: MsgRequiredItem;
  combination_gold?: number;
  combination_item_list_uid?: number;
  sub_character_uid?: number;
  contents_type?: ContentsType;
  rare?: ItemRareType;
  record_value_category?: number;
  gain_route: number[];
}

export interface MsgItemCombine {
  uid?: number;
  combination_ratio?: number;
  combination_gold?: number;
  items: MsgItemCombineItems[];
}

export interface MsgItemCombineItems {
  combination_item_uid?: number;
}

export interface MsgLevel {
  uid?: number;
  lev?: number;
  exp?: number;
  rewards: MsgReward[];
  max_energy?: number;
  formation_count?: number;
  formation_before_desc?: number;
  formation_after_desc?: number;
  mysteryshop_count?: number;
  dailybonus_grade?: number;
  chat_color?: number;
  max_soul?: number;
  formation_curr_desc?: number;
  max_battle_repeat?: number;
  auto_sequence_uid?: number;
}

export interface MsgLinkTraceSystem {
  uid?: number;
  items: MsgLinkTraceSystemItem[];
}

export interface MsgLinkTraceSystemCompleteReward {
  uid?: number;
  items: MsgLinkTraceSystemCompleteRewardItem[];
}

export interface MsgLinkTraceSystemCompleteRewardItem {
  index?: number;
  complete_reward?: MsgReward;
}

export interface MsgLinkTraceSystemItem {
  reward_index?: number;
  title?: number;
  desc?: number;
  reset_title?: number;
  reset_desc?: number;
  dialog_bg?: string;
  required_item_uid?: number;
  complete_reward_uid?: number;
  step_reward_uid?: number;
  auto_sequence?: number;
}

export interface MsgLinkTraceSystemStepReward {
  uid?: number;
  required_item_count?: number;
  items: MsgLinkTraceSystemStepRewardItem[];
}

export interface MsgLinkTraceSystemStepRewardItem {
  step?: number;
  step_reward?: MsgReward;
  gift_sender?: number;
  gift_msg?: number;
  text_step_uid?: number;
}

export interface MsgLinkTraceSystemText {
  uid?: number;
  items: MsgLinkTraceSystemTextItem[];
}

export interface MsgLinkTraceSystemTextItem {
  text_uid_title?: number;
  text_uid?: number;
  progress_item_count?: number;
}

export interface MsgLinkedData {
  type?: LinkedDataType;
  uid?: number;
}

export interface MsgLoading {
  uid?: number;
  type?: LoadingType;
  img?: string;
  position?: string;
  prop?: number;
  text?: number;
  text_hero_nick?: number;
  text_hero_story?: number;
  profile_1?: number;
  profile_2?: number;
  profile_3?: number;
  profile_4?: number;
  profile_5?: number;
  profile_voice?: number;
  meta?: string;
  element?: ElementType;
  best_fit_min?: number;
  character_uid?: number;
}

export interface MsgLobbyExtensionPrefabTime {
  uid?: number;
  start_date?: MsgUserLocalTimestamp;
  end_date?: MsgUserLocalTimestamp;
  parent_lobby_prefab_time_uid?: number;
  prefab_name?: string;
}

export interface MsgLobbyPrefabTime {
  uid?: number;
  type?: PrefabTimeType;
  start_date?: MsgUserLocalTimestamp;
  end_date?: MsgUserLocalTimestamp;
  prefab_name?: string;
  freedom_square_prefab_name?: string;
  bgm_uid_str?: string;
}

export interface MsgLocalPush {
  uid?: number;
  title?: string;
  add_day?: number;
  push_time?: MsgTime;
  message_?: string;
  big_picture?: string;
}

export interface MsgLordAbilityGroup {
  uid?: number;
  lord_ability_group_step_uid?: number;
  lord_ability_group_icon?: string;
  lord_ability_group_title?: string;
  apply_contents: BattleType[];
  open_condition_contents_type?: ContentsType;
  contents_type_title?: string;
  items: MsgLordAbilityGroupItem[];
}

export interface MsgLordAbilityGroupItem {
  lord_ability_skill_index?: number;
  lord_ability_skill_uid?: number;
  upgrade_cost_uid?: number;
}

export interface MsgLordAbilityGroupStep {
  uid?: number;
  items: MsgLordAbilityGroupStepItem[];
}

export interface MsgLordAbilityGroupStepItem {
  lord_ability_group_step?: number;
  lord_ability_skill1?: number;
  lord_ability_skill2?: number;
  lord_ability_skill3?: number;
  lord_ability_skill4?: number;
  lord_ability_skill5?: number;
  lord_ability_skill6?: number;
  lord_ability_skill7?: number;
  lord_ability_skill8?: number;
  lord_ability_skill9?: number;
  lord_ability_skill10?: number;
  lord_ability_skill11?: number;
  lord_ability_skill12?: number;
  lord_ability_skill13?: number;
  lord_ability_skill14?: number;
  lord_ability_skill15?: number;
  lord_ability_skill16?: number;
  lord_ability_skill17?: number;
  lord_ability_skill18?: number;
  lord_ability_skill19?: number;
  lord_ability_skill20?: number;
  lord_ability_skill21?: number;
  lord_ability_skill22?: number;
  lord_ability_skill23?: number;
  lord_ability_skill24?: number;
  lord_ability_skill25?: number;
  lord_ability_skill26?: number;
  lord_ability_skill27?: number;
  lord_ability_skill28?: number;
  lord_ability_skill29?: number;
  lord_ability_skill30?: number;
  lord_ability_skill31?: number;
  lord_ability_skill32?: number;
  lord_ability_skill33?: number;
  lord_ability_skill34?: number;
  lord_ability_skill35?: number;
}

export interface MsgLordAbilitySkillUpgradeCost {
  uid?: number;
  items: MsgLordAbilitySkillUpgradeCostItem[];
}

export interface MsgLordAbilitySkillUpgradeCostItem {
  skill_level?: number;
  required_item?: MsgRequiredItem;
  upgrade_price?: MsgPrice;
}

export interface MsgLordBdayAttendanceReward {
  uid?: number;
  image?: string;
  guide_icon?: string;
  title?: number;
  title_color?: string;
  title2?: number;
  title2_color?: string;
  desc?: number;
  items: MsgLordBdayAttendanceRewardItem[];
}

export interface MsgLordBdayAttendanceRewardItem {
  day?: number;
  slot_color?: string;
  reward?: MsgReward;
  default_sender?: number;
  default_msg?: number;
  default_talk?: number;
  bday_user_reward?: MsgReward;
  celebrate_user_reward?: MsgReward;
  celebrate_max_cnt?: number;
}

export interface MsgLordBdayCelebrateCharacter {
  uid?: number;
  character_uid?: number;
  sequence_uid?: number;
  gift_msg?: number;
}

export interface MsgLordBdayIllust {
  uid?: number;
  illust_uid?: number;
  character_resource_name_list: string[];
}

export interface MsgLordBdaySeason {
  uid?: number;
  start_season?: MsgUserLocalTimestamp;
  attendance_reward_uid?: number;
}

export interface MsgMemorialBoxReward {
  uid?: number;
  required_mileage?: number;
  reward?: MsgReward;
}

export interface MsgMemorialChapter {
  uid?: number;
  chapter_title?: number;
  archive_stage_bg?: string;
  items: MsgMemorialChapterItem[];
}

export interface MsgMemorialChapterItem {
  substage_idx?: number;
  memorial_substage_uid?: number;
  position?: string;
  substage_title?: number;
  substage_desc?: string;
  tag_txt: string[];
  substage_type?: SubStageType;
  stage_prefab?: string;
  stage_position?: number;
  desc_mission?: string;
  mission_condition?: TimeEventCheckCondition;
  check_value: number[];
  check_uid?: number;
  goal_count?: number;
  mission_reward?: MsgReward;
  mission_short_cut?: MsgShortCut;
  star_conditon_1: MsgProofDungeonCondition[];
  star_conditon_2: MsgProofDungeonCondition[];
  star_conditon_3: MsgProofDungeonCondition[];
  star_string_1?: number;
  star_string_2?: number;
  star_string_3?: number;
  star_reward_1?: MsgReward;
  star_reward_2?: MsgReward;
  star_reward_3?: MsgReward;
  required_battle_power?: number;
  stage_bgm?: number;
  monster_exp?: number;
  reward_gold?: number;
  reward_prob: MsgRewardProbability[];
  all_reward_general?: number;
  reward_must?: number;
  display_reward: MsgReward[];
  required_energy?: number;
  open_slot?: number;
  formation_idx_1?: number;
  formation_idx_2?: number;
  formation_idx_3?: number;
  formation_idx_4?: number;
  formation_idx_5?: number;
  display_mon_1?: number;
  display_mon_2?: number;
  display_mon_3?: number;
  display_mon_4?: number;
}

export interface MsgMemorialGear {
  uid?: number;
  class_type?: ClassType;
  name?: number;
  desc?: number;
  icon?: string;
  memorial_skill_uid?: number;
  combine_piece_item?: MsgRequiredItem;
  gear_get_group?: number;
}

export interface MsgMemorialGearCollect {
  uid?: number;
  group_uid?: number;
  items: MsgMemorialGearCollectItem[];
}

export interface MsgMemorialGearCollectItem {
  index?: number;
  memorial_gear_uid?: number;
  desc_step_1?: number;
  desc_step_2?: number;
  piece_symbol?: string;
}

export interface MsgMemorialGearTier {
  uid?: number;
  items: MsgMemorialGearTierItem[];
}

export interface MsgMemorialGearTierItem {
  tier?: number;
  upgrade_piece_amount?: number;
  upgrade_price?: MsgPrice;
  bg_img?: string;
  sell_gold_reward?: number;
  combat_power?: number;
  small_bg_img?: string;
}

export interface MsgMemorialGroup {
  uid?: number;
  position?: string;
  open_mission_uid?: number;
  recode_illust?: string;
  recode_name?: number;
  recode_desc?: number;
  recommend_desc?: number;
  recommend_battle_type?: BattleType;
  recommend_sub_stage_uid?: number;
  memorial_box_uid?: number;
  gift_sender?: number;
  gift_msg?: number;
  chapter_list: MsgMemorialGroupItems[];
}

export interface MsgMemorialGroupItems {
  chapter_idx?: number;
  chapter_uid?: number;
  open_date?: MsgUTCTimestamp;
}

export interface MsgMemorialGroupOpenMission {
  uid?: number;
  condition_complete_count?: number;
  mission_list: MsgMemorialGroupOpenMissionItem[];
}

export interface MsgMemorialGroupOpenMissionItem {
  memorial_group_open_mission_uid?: number;
  condition?: MemorialGroupOpenCondition;
  check_value?: number;
  check_uid?: number;
  desc?: string;
  battle_type?: BattleType;
  short_cut?: MsgShortCut;
}

export interface MsgMemorialIllust {
  uid?: number;
  archive_illust_uid?: number;
  illust_open_order?: string;
  illust_open_star_count?: number;
  memorial_group_uid?: number;
}

export interface MsgMemorialSubStageRound {
  uid?: number;
  substage_uid?: number;
  round?: number;
  monster_count?: number;
  monster_basic_speed_range?: MsgRangeFloat;
  monster_group?: number;
  required_monster?: number;
  encounter_monter_must_before_first_win?: boolean;
  encounter_monster_prob?: number;
  encounter_monster_group?: number;
  encounter_monster_count?: number;
  encounter_backside_monster_count?: number;
  encounter_backside_monster_basic_speed_range?: MsgRangeFloat;
  encounter_monster_group_name?: number;
  round_bgm?: number;
  position_value?: number;
  phase_controller_group_uid?: number;
}

export interface MsgMercenaryTraining {
  uid?: number;
  stage_uid?: number;
  name?: number;
  boss_monster_uid?: number;
  items: MsgMercenaryTrainingItem[];
}

export interface MsgMercenaryTrainingItem {
  index?: number;
  dungeon_prefab?: string;
  dungeon_bgm?: number;
  required_battle_power?: number;
  monster_exp?: number;
  reward_gold?: number;
  reward_buff_value?: number;
  reward?: number;
  display_reward: MsgReward[];
}

export interface MsgMercenaryTrainingRound {
  uid?: number;
  substage_uid?: number;
  round?: number;
  monster_count?: number;
  monster_basic_speed_range?: MsgRangeFloat;
  monster_group?: number;
  required_monster?: number;
  round_bgm?: number;
  position_value?: number;
}

export interface MsgMission {
  uid?: number;
  chapter?: number;
  title?: number;
  main_condition?: MsgQuestMainCondition;
  sub_condition1?: MsgQuestSubCondition;
  sub_condition2?: MsgQuestSubCondition;
  sub_condition3?: MsgQuestSubCondition;
  sub_condition4?: MsgQuestSubCondition;
  reward: MsgReward[];
  short_cut?: MsgShortCut;
  next?: number;
  sub_image?: string;
}

export interface MsgMissionPassPackageShopItem {
  uid?: number;
  name?: number;
  time_event_group_uid?: number;
  price?: MsgPrice;
  price_usd?: MsgPrice;
  restrict?: MsgRestrict;
  pid_google?: string;
  pid_appstore?: string;
  pid_onestore?: string;
  type?: ShopItemType;
}

export interface MsgMonster {
  uid?: number;
  root_resource_name?: string;
  base_resource_name?: string;
  resource_name?: string;
  icon_name?: string;
  portrait_name?: string;
  element?: ElementType;
  hp?: number;
  attack?: number;
  defence?: number;
  critical_damage?: number;
  critical_prob?: number;
  resistance?: number;
  accuracy?: number;
  speed?: number;
  passive1?: number;
  passive2?: number;
  passive3?: number;
  passive4?: number;
  passive5?: number;
  skill1?: number;
  skill2?: number;
  skill3?: number;
  skill4?: number;
  title_name?: number;
  title_name_desc?: number;
  name?: number;
  desc?: number;
  skill1_ai?: number;
  skill2_ai?: number;
  skill3_ai?: number;
  skill4_ai?: number;
  system_skill?: number;
}

export interface MsgMonsterFestival {
  uid?: number;
  lobby_banner?: string;
  main_image?: string;
  start_date?: MsgUTCTimestamp;
  end_date?: MsgUTCTimestamp;
  shop_end_date?: MsgUTCTimestamp;
  festival_item_uid?: number;
  festival_shop_uid?: number;
  event_monster_group_uid?: number;
  main_event_reward_uid?: number;
  sub_event_reward_uid?: number;
  gift_sender?: number;
  gift_msg?: number;
  festival_help?: number;
  name?: number;
  round_bgm?: number;
  festival_tag?: string;
  main_banner?: string;
  round_bgm_name?: number;
  juke_box_icon_name?: string;
}

export interface MsgMysteryShop {
  uid?: number;
  slot?: number;
  prob?: number;
  reward?: MsgReward;
  price?: MsgPrice;
  open_date?: MsgUTCTimestamp;
  close_date?: MsgUTCTimestamp;
  meta?: string;
  mark?: ShopItemMark;
}

export interface MsgMysteryShopSlot {
  uid?: number;
  slot?: number;
  open_condition?: MsgOpenCondition;
}

export interface MsgNPCTalkEvent {
  uid?: number;
  event_type?: NpcTalkEventType;
  fade_in_time?: number;
  block_time?: number;
  fade_out_time?: number;
  meta?: string;
  items: MsgNPCTalkEventItem[];
}

export interface MsgNPCTalkEventItem {
  title?: string;
  text?: string;
  image?: string;
  color?: string;
  sound?: string;
}

export interface MsgNPCTalkExpression {
  load_name?: string;
  expression_type?: NpcTalkExpressionType;
}

export interface MsgNPCTalkSeq {
  uid?: number;
  talk_type?: NpcTalkType;
  boss_talk_setting?: string;
  intro_event?: number;
  sequences: MsgNPCTalkSeqItem[];
}

export interface MsgNPCTalkSeqItem {
  speaker?: string;
  balloon_type?: string;
  unit1?: MsgNPCTalkUnitItem;
  unit2?: MsgNPCTalkUnitItem;
  unit3?: MsgNPCTalkUnitItem;
  text?: number;
  interrupt_event?: string;
  display_event?: number;
  trans_event?: string;
  zoom_event?: string;
  bg_unit1?: string;
  bg_unit2?: string;
  bg_unit3?: string;
  unit1_name?: number;
  unit2_name?: number;
  unit3_name?: number;
  voice?: number;
}

export interface MsgNPCTalkUnitItem {
  uid?: string;
  expression_item?: MsgNPCTalkExpression;
  talker_type?: NpcTalkTalkerType;
  costumeResourceName?: string;
}

export interface MsgNameAndAnchor {
  prefab_name?: string;
  anchor?: string;
}

export interface MsgNetworkErrorHandler {
  uid?: number;
  type?: string;
  response_type?: string;
  show_type?: NetworkErrorShowType;
  message_uid?: number;
  ignore_web_log?: boolean;
}

export interface MsgNoticeMsg {
  uid?: number;
  type?: PopupNoticeType;
  text_uid?: number;
}

export interface MsgOpenCondition {
  condition?: ContentsOpenCondition;
  value?: number;
  uid?: number;
  class_type?: ClassType;
  element_type?: ElementType;
}

export interface MsgPartyChatting {
  uid?: number;
  target_season?: number;
  chat_uid?: number;
  monster_name?: number;
  targetDamages: MsgPartyChattingDamage[];
}

export interface MsgPartyChattingDamage {
  damage?: number;
}

export interface MsgPartyLobbyMonster {
  uid?: number;
  target_season?: number;
  sizeData: MsgPartyLobbyMonsterItem[];
}

export interface MsgPartyLobbyMonsterItem {
  damage?: number;
  lobby_monster_size?: number;
  animation?: string;
}

export interface MsgPartyMonsterPhase {
  uid?: number;
  boss_uid?: number;
  phases: MsgPartyPhaseInfo[];
}

export interface MsgPartyPhaseInfo {
  phase_uid?: number;
  day_of_week?: OpenWeekday;
  open_time?: MsgTime;
  close_time?: MsgTime;
  element?: ElementType;
  monster?: number;
}

export interface MsgPartySeason {
  uid?: number;
  start_date?: MsgUTCTimestamp;
  end_date?: MsgUTCTimestamp;
  shop_end_date?: MsgUTCTimestamp;
  party_item_uid?: number;
  party_shop_uid?: number;
  party_stage_uid?: number;
  gift_sender?: number;
  gift_msg?: number;
  party_help?: number;
  party_entrance_prefab?: string;
  monster_size_display_step?: number;
  stage_name?: number;
  party_size_reward?: number;
  stage_reward?: number;
  start_autoseq_uid?: number;
  season_bgm?: number;
  juke_box_bgm_name?: number;
  juke_box_bgm?: number;
  juke_box_icon_name?: string;
  type?: PartyDungeonMonsterType;
  shop_display_uid?: number;
  time_event_group_uid?: number;
}

export interface MsgPartyShopGroup {
  uid?: number;
  gift_sender_uid?: number;
  gift_msg_uid?: number;
  party_shop_items: MsgPartyShopItem[];
}

export interface MsgPartyShopItem {
  party_shop_item_uid?: number;
  reward_type?: PartyShopItemType;
  price?: MsgPrice;
  reward?: MsgReward;
  restrict?: MsgRestrict;
  deco_img?: string;
}

export interface MsgPartySizeReward {
  uid?: number;
  gift_sender?: number;
  gift_msg?: number;
  rewards: MsgPartySizeRewardItem[];
}

export interface MsgPartySizeRewardItem {
  index?: number;
  value?: number;
  reward?: MsgReward;
}

export interface MsgPartySubStage {
  uid?: number;
  battle_type?: BattleType;
  stage_prefab?: string;
  stage_bgm?: number;
  phase_uid?: number;
}

export interface MsgPartySystemSkill {
  uid?: number;
  skillItems: MsgCharacterSkillItem[];
}

export interface MsgPartyTier {
  uid?: number;
  tier_infos: MsgPartyTierInfo[];
}

export interface MsgPartyTierInfo {
  rank?: PartyRewardRank;
  damage_min?: string;
  damage_max?: string;
  rewards: number[];
}

export interface MsgPassPackageShopItem {
  uid?: number;
  name?: number;
  time_event_group_uid?: number;
  price?: MsgPrice;
  price_usd?: MsgPrice;
  restrict?: MsgRestrict;
  pid_google?: string;
  pid_appstore?: string;
  pid_onestore?: string;
  type?: ShopItemType;
  unlock_icon?: string;
}

export interface MsgPhaseController {
  uid?: number;
  conditions_check_type?: PhaseConditionCheckType;
  phase_change_condition?: PhaseChangeCondition;
  phase_change_condition_value?: string;
  phase_change_condition02?: PhaseChangeCondition;
  phase_change_condition_value02?: string;
  phase_change_condition_battle_ui_prefab_uid?: string;
  items: MsgPhaseEventItems[];
}

export interface MsgPhaseControllerGroup {
  uid?: number;
  items: MsgPhaseControllerGroupItems[];
}

export interface MsgPhaseControllerGroupItems {
  phase_controller_uid?: number;
}

export interface MsgPhaseControllerUiPrefab {
  uid?: number;
  ui_prefab?: string;
  title?: number;
  condition_1_desc?: number;
  condition_2_desc?: number;
  phase_info_title?: number;
  phase_info_desc?: number;
}

export interface MsgPhaseEventItems {
  phase_change_event?: PhaseChangeEvent;
  phase_change_event_string_value?: string;
  sheet_value?: string;
}

export interface MsgPhaseSkill {
  uid?: number;
  monster_uid?: number;
  skill1?: number;
  skill2?: number;
  skill3?: number;
  skill4?: number;
  skill1_ai?: number;
  skill2_ai?: number;
  skill3_ai?: number;
  skill4_ai?: number;
}

export interface MsgPhotoFilter {
  uid?: number;
  filter_name?: number;
  filter_onoff?: boolean;
  filter_thumbnail_name?: string;
  filter_script_name?: string;
}

export interface MsgPhotoLens {
  uid?: number;
  lens_name?: number;
  fov?: number;
}

export interface MsgPhotocard {
  uid?: number;
  open_date?: MsgUTCTimestamp;
  type?: PhotocardTypeCategory;
  grade?: PhotocardGrade;
  character?: number;
  world_name?: number;
  world_symbol?: string;
  name?: string;
  desc?: string;
  story?: number;
  icon?: string;
  img_front?: string;
  img_back?: string;
  tags: MsgPhotocardTagItem[];
  card_name?: string;
  error_desc?: string;
}

export interface MsgPhotocardBook {
  uid?: number;
  items: MsgPhotocardBookItem[];
}

export interface MsgPhotocardBookItem {
  index?: number;
  photocard_uid?: number;
}

export interface MsgPhotocardTag {
  uid?: number;
  tag_type?: PhotocardTagCategoryType;
  name?: string;
}

export interface MsgPhotocardTagItem {
  tag?: number;
}

export interface MsgPlatformAchievement {
  uid?: number;
  type?: QuestType;
  data?: number;
  aos_code?: string;
  ios_code?: string;
}

export interface MsgPopupDeco {
  uid?: number;
  icon?: string;
  name?: number;
  desc?: number;
}

export interface MsgPopupNoticeContents {
  uid?: number;
  sender_uid?: number;
  notice_msg?: number;
  display_seconds_period?: number;
}

export interface MsgPotentialEffect {
  uid?: number;
  class_type?: ClassType;
  grade?: number;
  grade_desc?: number;
  skill_level?: number;
  skill_level_desc?: number;
  items: MsgPotentialEffectItem[];
}

export interface MsgPotentialEffectItem {
  name?: number;
  type?: CommonStatusEffectType;
  value?: number;
}

export interface MsgPotentialPowerList {
  uid?: number;
  potential_power_type?: CharacterPotentialPowerType;
  element_type?: ElementType;
  skill_upgrade_item_uid?: number;
  skill_uid?: number;
  transfer_desc?: number;
}

export interface MsgPotentialSkillList {
  uid?: number;
  element_type?: ElementType;
  class_type?: ClassType;
  skill_uid?: number;
}

export interface MsgPreRegistration {
  uid?: number;
  goods: MsgReward[];
  gift_sender?: number;
  gift_msg?: number;
  start_date?: MsgUTCTimestamp;
  end_date?: MsgUTCTimestamp;
  post_duration?: number;
}

export interface MsgPremiumEventMissionGroup {
  uid?: number;
  prefab_name?: string;
  premium_event_bg?: string;
  open_condition?: MsgOpenCondition;
  reward?: MsgReward;
  sub_title?: string;
  main_title?: string;
  main_desc?: string;
  main_desc2?: string;
  complete_reward_title?: string;
  complete_reward_desc?: string;
  items: MsgPremiumEventMissionListItem[];
}

export interface MsgPremiumEventMissionGroupItem {
  index?: number;
  mission_group_uid?: number;
  mission_type?: PremiumEventMissionType;
  sub_mission_group?: number;
}

export interface MsgPremiumEventMissionItem {
  index?: number;
  goal_count?: number;
  reward?: MsgReward;
  reward_title?: string;
  reward_desc?: string;
  mission_title?: string;
  mission_desc?: string;
}

export interface MsgPremiumEventMissionList {
  uid?: number;
  condition?: TimeEventCheckCondition;
  check_value: number[];
  check_uid?: number;
  short_cut?: MsgShortCut;
  help_uid?: number;
  gift_sender?: number;
  gift_msg?: number;
  items: MsgPremiumEventMissionItem[];
}

export interface MsgPremiumEventMissionListItem {
  index?: number;
  event_mission_uid?: number;
}

export interface MsgPremiumEventSeason {
  uid?: number;
  event_type?: PremiumEventType;
  open_date?: MsgUTCTimestamp;
  close_date?: MsgUTCTimestamp;
  open_condition?: MsgOpenCondition;
  event_start_condition?: number;
  items: MsgPremiumEventMissionGroupItem[];
  banner_prefab?: string;
  banner_img?: string;
  banner_title?: number;
  banner_tag?: number;
  banner_bg_color?: string;
  banner_title_color?: string;
  gift_sender?: number;
  gift_msg?: number;
  is_period?: boolean;
}

export interface MsgPrice {
  type?: GlobalDataType;
  uid?: number;
  price?: number;
}

export interface MsgProbabilityNotice {
  uid?: number;
  use_language: string[];
  dlg_name: string[];
  probability_url?: string;
  probability_prefab?: string;
}

export interface MsgProfileIcon {
  uid?: number;
  condition?: ProfileIconType;
  sub_uid?: number;
  character_resource_name?: string;
  master_gender_type?: number;
  master_skin_type?: number;
  master_hair_type?: number;
  master_hair_color_type?: number;
  fixed_character_uid?: number;
}

export interface MsgProofDungeon {
  uid?: number;
  dungeon_bgm?: number;
  floor_story_list_img?: string;
  floors: MsgProofDungeonFloor[];
}

export interface MsgProofDungeonCondition {
  condition_type?: DungeonProofConditionType;
  count?: number;
  value?: number;
  target_uid?: number;
  class_type?: ClassType;
  element_type?: ElementType;
}

export interface MsgProofDungeonFloor {
  floor?: number;
  floor_story_bg?: string;
  floor_uid?: number;
  stage_prefab?: string;
  boss_monster_uid?: number;
  required_battle_power?: number;
  monster_exp?: number;
  reward_gold?: number;
  required_proof_dungeon_energy?: number;
  bronze_condition: MsgProofDungeonCondition[];
  bronze_reward?: MsgReward;
  silver_condition: MsgProofDungeonCondition[];
  silver_reward?: MsgReward;
  gold_condition: MsgProofDungeonCondition[];
  gold_reward?: MsgReward;
  is_trace?: boolean;
  abusing_turn?: number;
}

export interface MsgProofDungeonRound {
  uid?: number;
  round_monsters: MsgProofDungeonRoundMonster[];
}

export interface MsgProofDungeonRoundMonster {
  round?: number;
  monster_count?: number;
  monster_basic_speed_range?: MsgRangeFloat;
  monster_group?: number;
  required_monster?: number;
  auto_sequence_trigger?: number;
  encounter_monter_must_before_first_win?: boolean;
  encounter_monster_prob?: number;
  encounter_monster_group?: number;
  encounter_monster_count?: number;
  encounter_backside_monster_count?: number;
  encounter_backside_monster_basic_speed_range?: MsgRangeFloat;
  encounter_monster_group_name?: number;
  position_value?: number;
}

export interface MsgProofDungeonSeason {
  uid?: number;
  season_idx?: number;
  start_date?: MsgUserLocalTimestamp;
  end_date?: MsgUserLocalTimestamp;
  proof_dungeon_uid?: number;
}

export interface MsgQualitySetting {
  uid?: number;
  pixel_light_count?: number;
  texture_quality?: string;
  anisotropic_textures?: string;
  anti_aliasing?: number;
  soft_particles?: boolean;
  realtime_reflection_probes?: boolean;
  billboards_face_camera_position?: boolean;
  resolution_scaling_fixed_dpi_factor?: number;
  texture_streaming?: boolean;
  streaming_mipmaps_add_allcameras?: boolean;
  streaming_mipmaps_memory_budget?: number;
  streaming_mipmaps_renderers_per_frame?: number;
  streaming_mipmaps_max_level_reduction?: number;
  streaming_mipmaps_max_file_io_requests?: number;
  shadowmask_mode?: string;
  shadows?: string;
  shadow_resolution?: string;
  shadow_projection?: string;
  shadow_distance?: number;
  shadow_near_plane_offset?: number;
  shadow_cascades?: number;
  bled_weights?: string;
  v_sync_count?: string;
  lod_bias?: number;
  maximum_lod_level?: number;
  particle_raycast_budget?: number;
  async_upload_time_slice?: number;
  async_upload_buffer_size?: number;
  async_upload_persistent_buffer?: boolean;
}

export interface MsgQuestMainCondition {
  main_condition?: QuestMainCondition;
  goal_count?: number;
}

export interface MsgQuestSubCondition {
  sub_condition?: QuestSubCondition;
  v_int?: number;
  v_uid?: number;
  v_string?: string;
  v_bool?: boolean;
}

export interface MsgRangeFloat {
  min?: number;
  max?: number;
}

export interface MsgRankingContent {
  uid?: number;
  content_type?: RankingContentsType;
  name?: string;
}

export interface MsgRankingLeague {
  uid?: number;
  league_type?: RankingLeagueType;
  league_name?: string;
  league_story_desc?: string;
  league_reward_grade_desc?: string;
  leadership_point_min_value?: number;
  leadership_point_max_value?: number;
  league_symbol_icon?: string;
  league_theme_color_key?: string;
}

export interface MsgRankingReward {
  uid?: number;
  rewards: MsgRankingRewardItems[];
}

export interface MsgRankingRewardGroup {
  uid?: number;
  gift_sender?: number;
  gift_msg?: number;
  ranking_reward_groups: MsgRankingRewardGroupItems[];
}

export interface MsgRankingRewardGroupItems {
  league_type?: RankingLeagueType;
  reward_uid?: number;
}

export interface MsgRankingRewardItems {
  reward_ranking?: number;
  reward_1?: MsgReward;
  reward_2?: MsgReward;
  reward_3?: MsgReward;
  reward_4?: MsgReward;
  reward_5?: MsgReward;
  reward_6?: MsgReward;
}

export interface MsgRankingSeason {
  uid?: number;
  season_idx?: number;
  start_date?: MsgUTCTimestamp;
  end_date?: MsgUTCTimestamp;
  leadership_point_reward?: number;
  clan_raid_reward?: number;
  sea_battle_reward?: number;
}

export interface MsgRequiredItem {
  item_uid?: number;
  amount?: number;
}

export interface MsgResonanceGrade {
  uid?: number;
  battle_power_min?: number;
  battle_power_max?: number;
  resonance?: number;
}

export interface MsgRestrict {
  restrict_type?: RestrictType;
  restrict_count?: number;
}

export interface MsgReward {
  type?: GlobalDataType;
  uid?: number;
  value?: number;
}

export interface MsgRewardProbItem {
  reward?: MsgReward;
  prob?: number;
}

export interface MsgRewardProbability {
  count?: number;
  probability?: number;
}

export interface MsgRewardType {
  type?: GlobalDataType;
  uid?: number;
}

export interface MsgRoyalMission {
  uid?: number;
  items: MsgRoyalMissionItem[];
}

export interface MsgRoyalMissionItem {
  index?: number;
  mission_uid?: number;
  condition?: TimeEventCheckCondition;
  check_value: number[];
  check_uid?: number;
  mission_title?: string;
  mission_desc?: string;
  mission_point?: number;
  short_cut?: MsgShortCut;
  mission_reward?: MsgReward;
  goal_count?: number;
  mission_prob?: number;
}

export interface MsgRoyalMissionReward {
  uid?: number;
  title?: string;
  desc?: string;
  gift_sender?: number;
  gift_msg?: number;
  expire_period?: number;
  royal_mission_reward_desc?: string;
  items: MsgRoyalMissionRewardItem[];
  season_end_exchange_msg?: number;
}

export interface MsgRoyalMissionRewardGrade {
  uid?: number;
  items: MsgRoyalMissionRewardGradeItem[];
}

export interface MsgRoyalMissionRewardGradeItem {
  reward?: MsgReward;
  index?: number;
}

export interface MsgRoyalMissionRewardItem {
  royal_mission_reward_slot_uid?: number;
  reward_level?: number;
}

export interface MsgRoyalMissionRewardSlot {
  uid?: number;
  reward_level_resource?: string;
  price?: MsgPrice;
  items: MsgRoyalMissionRewardSlotItem[];
}

export interface MsgRoyalMissionRewardSlotItem {
  royal_slot_reward_group?: number;
  count?: number;
  grade_prob?: number;
  is_key_item?: boolean;
}

export interface MsgRoyalMissionSeason {
  uid?: number;
  start_date?: MsgUTCTimestamp;
  end_date?: MsgUTCTimestamp;
  title?: string;
  desc?: string;
  prefab?: string;
  round_bgm?: string;
  round_bgm_name?: string;
  royal_mission_help?: string;
  royal_mission_uid?: number;
  reward_uid?: number;
  reward_count?: number;
  total_mission_bonus?: number;
  mission_bonus_reward?: MsgReward;
  mission_cooltime?: number;
  mission_reset_price?: MsgPrice;
  mission_reset_count?: number;
  event_type?: TimeEventType;
  mission_free_reset_count?: number;
  royal_mission_exchange_value?: number;
  royal_mission_exchange_item_uid?: number;
}

export interface MsgRoyalMissionSlot {
  uid?: number;
  items: MsgRoyalMissionSlotItem[];
}

export interface MsgRoyalMissionSlotGroup {
  uid?: number;
  items: MsgRoyalMissionSlotGroupItem[];
}

export interface MsgRoyalMissionSlotGroupItem {
  royal_mission_slot_uid?: number;
}

export interface MsgRoyalMissionSlotItem {
  royal_mission_level_uid?: number;
  prob?: number;
}

export interface MsgRumor {
  uid?: number;
  character_uid?: number;
  rumor_reward_uid?: number;
  gift_sender?: number;
  gift_msg?: number;
  open_date?: MsgUTCTimestamp;
  quest_items: MsgRumorQuestItem[];
}

export interface MsgRumorQuest {
  uid?: number;
  conditions: MsgRumorQuestCondition[];
}

export interface MsgRumorQuestCondition {
  main_condition?: MsgQuestMainCondition;
  desc?: number;
  sub_condition1?: MsgQuestSubCondition;
  sub_condition2?: MsgQuestSubCondition;
  sub_condition3?: MsgQuestSubCondition;
  sub_condition4?: MsgQuestSubCondition;
}

export interface MsgRumorQuestItem {
  index?: number;
  rumor_sender?: number;
  rumor_sender_icon?: string;
  rumor_quest_uid?: number;
  rumor_msg?: number;
}

export interface MsgRumorReward {
  uid?: number;
  items: MsgRumorRewardItem[];
}

export interface MsgRumorRewardItem {
  goal_count?: number;
  reward?: MsgReward;
  archive_effect?: number;
}

export interface MsgSeaBattleChatPreset {
  uid?: number;
  name?: number;
  chat_desc?: string;
}

export interface MsgSeaBattleGrade {
  total_dmg_min?: string;
  total_dmg_max?: string;
  reward_group_uid?: number;
  monster_exp?: number;
}

export interface MsgSeaBattleIndividualItem {
  index?: number;
  total_dmg?: number;
  reward?: MsgReward;
}

export interface MsgSeaBattleIndividualReward {
  uid?: number;
  uid_reward_grade?: number;
  element?: ElementType;
  gift_sender_uid?: number;
  gift_msg_uid?: number;
  items: MsgSeaBattleIndividualItem[];
}

export interface MsgSeaBattleLordSkill {
  uid?: number;
  items: MsgSeaBattleLordSkillItem[];
}

export interface MsgSeaBattleLordSkillItem {
  lord_skill_uid?: number;
  lord_skill_type?: LordSkillType;
  skill_uid?: number;
  lord_skill_title?: number;
  prob?: number;
}

export interface MsgSeaBattleLordSkillTrigger {
  uid?: number;
  trigger_type?: LordSkillTriggerType;
  items: MsgSeaBattleLordSkillTriggerItem[];
}

export interface MsgSeaBattleLordSkillTriggerItem {
  trigger_condition?: number;
  skill_duplication?: boolean;
  lord_skill_1?: number;
  lord_skill_prob_1?: number;
  lord_skill_2?: number;
  lord_skill_prob_2?: number;
  lord_skill_3?: number;
  lord_skill_prob_3?: number;
}

export interface MsgSeaBattleMatchTip {
  uid?: number;
  tip_desc?: number;
}

export interface MsgSeaBattleMonsterGroup {
  uid?: number;
  use_count?: number;
  items: MsgSeaBattleMonsterGroupItem[];
}

export interface MsgSeaBattleMonsterGroupItem {
  prob?: number;
  count?: number;
  stage_monster_group_uid?: number;
  uid_monster?: number;
  is_boss?: boolean;
}

export interface MsgSeaBattleRewardGrade {
  uid?: number;
  grades: MsgSeaBattleGrade[];
}

export interface MsgSeaBattleRewardGroup {
  uid?: number;
  reward_box_icon?: string;
  reward_box_name?: number;
  reward_box_desc?: number;
  open_effect?: string;
  rewards: MsgSeabattleReward[];
}

export interface MsgSeaBattleSeason {
  uid?: number;
  name?: number;
  desc?: number;
  open_state?: StageOpenState;
  open_date?: MsgUTCTimestamp;
  close_date?: MsgUTCTimestamp;
  dungeon_symbol?: string;
  lobby_bgm?: string;
  uid_shop?: number;
  season_stages: MsgSeaBattleSeasonStage[];
}

export interface MsgSeaBattleSeasonStage {
  uid_stage?: number;
  open_weekday?: OpenWeekday;
  open_time?: MsgTime;
  close_time?: MsgTime;
  uid_reward_grade?: number;
  boss_prefab?: string;
  boss_name?: number;
  boss_desc?: number;
}

export interface MsgSeaBattleShop {
  uid?: number;
  items: MsgSeaBattleShopItem[];
}

export interface MsgSeaBattleShopItem {
  shop_item_uid?: number;
  name?: number;
  price?: MsgPrice;
  reward?: MsgReward;
  display_item_uid?: number;
  gift_sender_uid?: number;
  gift_msg_uid?: number;
  restrict?: MsgRestrict;
}

export interface MsgSeaBattleStage {
  uid?: number;
  battle_type?: BattleType;
  stage_prefab?: string;
  boss_element?: ElementType;
  lord_skill_trigger_uid?: number;
  stage_bgm?: number;
  uid_monster_group?: number;
  boss_monster?: number;
  position_value?: number;
  monster_basic_speed_range?: MsgRangeFloat;
  phase_condition_type?: PhaseConditionType;
  phase_condition_value?: number;
}

export interface MsgSeabattleReward {
  random_reward_uid?: number;
  display_icon?: string;
  display_name?: number;
  display_desc?: number;
}

export interface MsgSetEventPackageItem {
  pack_event_uid?: number;
}

export interface MsgSetting {
  uid?: number;
  type?: string;
  v_bool?: boolean;
  v_int?: number;
  v_float?: number;
  v_uid?: number;
  v_price?: MsgPrice;
  v_string?: string;
  v_date?: string;
  v_time?: MsgTime;
  v_reward?: MsgReward;
}

export interface MsgShopDisplay {
  uid?: number;
  name?: number;
  open_date?: MsgUTCTimestamp;
  close_date?: MsgUTCTimestamp;
  shop_item_type?: ShopItemType;
  store_banner?: string;
  remove_tab_after_last_purchase_hour?: number;
  display_condition?: ContentsOpenCondition;
  base_value?: number;
  interval_value?: number;
  items: MsgShopDisplayItem[];
  include_markets: MarketCode[];
  exclude_markets: MarketCode[];
  fixed_term?: ActiveControlType;
  is_review_hide?: boolean;
  display_type?: ShopDisplayViewType;
  display_group_uid?: number;
}

export interface MsgShopDisplayGroup {
  uid?: number;
  name?: number;
}

export interface MsgShopDisplayItem {
  shop_item_uid?: number;
  term_display?: boolean;
  lobby_banner_icon?: string;
  desc_text_uid?: number;
}

export interface MsgShortCut {
  shortcut?: ShortCut;
  uid?: number;
}

export interface MsgSideStory {
  uid?: number;
  side_story_bg?: string;
  threed_place?: string;
  side_story_mission_group_uid?: number;
  side_story_chapter_list: MsgSideStoryChapterData[];
}

export interface MsgSideStoryChapter {
  uid?: number;
  sub_stage_list: MsgSideStorySubStageData[];
}

export interface MsgSideStoryChapterData {
  chapter_idx?: number;
  chapter_uid?: number;
  prev_chapter_uid?: number;
  open_term_hour?: number;
  title?: string;
  desc?: string;
  difficulty?: StageDifficulty;
  title_color?: string;
  lock_chapter?: boolean;
  chapter_threed_place?: string;
  chapter_bg?: string;
}

export interface MsgSideStoryMission {
  uid?: number;
  mission_title?: number;
  reset_type?: TimeEventResetType;
  condition?: SideStoryMissionCondition;
  check_uid?: number;
  check_character: number[];
  goal_count?: number;
  reward?: MsgReward;
}

export interface MsgSideStoryMissionData {
  side_story_mission_uid?: number;
}

export interface MsgSideStoryMissionGroup {
  uid?: number;
  gift_sender?: number;
  gift_msg?: number;
  missions: MsgSideStoryMissionData[];
}

export interface MsgSideStorySeason {
  uid?: number;
  open_date?: MsgUTCTimestamp;
  close_date?: MsgUTCTimestamp;
  side_story_uid?: number;
  bgm?: number;
  banner_list: MsgSideStorySeasonBanner[];
}

export interface MsgSideStorySeasonBanner {
  open_term_hour?: number;
  banner_img?: string;
  banner_title?: number;
  banner_bg_color?: string;
  banner_title_color?: string;
  banner_tag?: number;
}

export interface MsgSideStorySubStage {
  uid?: number;
  chapter_uid?: number;
  sub_stage_idx?: number;
  is_talk_left?: boolean;
  character_img?: string;
  substage_desc?: string;
  stage_prefab?: string;
  stage_bgm?: number;
  name?: number;
  substage_type?: SubStageType;
  required_battle_power?: number;
  monster_exp?: number;
  reward_gold?: number;
  first_clear_reward: MsgReward[];
  completion_reward?: MsgReward;
  reward_prob: MsgRewardProbability[];
  all_reward_general?: number;
  reward_must?: number;
  display_reward: MsgReward[];
  required_energy?: number;
  display_mon_1?: number;
  display_mon_2?: number;
  display_mon_3?: number;
  display_mon_4?: number;
}

export interface MsgSideStorySubStageData {
  sub_stage_idx?: number;
  sub_stage_uid?: number;
}

export interface MsgSkillEffect {
  uid?: number;
  skill_effect_base?: Skill;
  skill_effect_name?: string;
  type?: SkillEffectType;
  sub_type?: SkillEffectSubType;
  detail_type?: SkillEffectDetailType;
  accuracy_applicable?: boolean;
  icon_name?: string;
  sct_continuous_applied?: number;
  sct_excuted?: number;
  effect_prefab_name: MsgNameAndAnchor[];
  destroy_effect_prefab_name: MsgNameAndAnchor[];
  excuted_effect_prefab_name: MsgNameAndAnchor[];
  cc_effect_group?: number;
}

export interface MsgSkillLevelValueFloat {
  lev?: number;
  value?: number;
}

export interface MsgSkillLevelValueInt {
  lev?: number;
  value?: number;
}

export interface MsgSkillLevelValueWithRepeatedFloat {
  lev?: number;
  value: number[];
}

export interface MsgSkillPriority {
  uid?: number;
  overlap_type?: OverlapType;
  skill_effect_acquired?: Skill;
  items: MsgSkillPriorityItem[];
}

export interface MsgSkillPriorityItem {
  skill_effect_owned?: Skill;
}

export interface MsgSound {
  uid?: number;
  main_type?: string;
  sub_type?: string;
  file_name?: string;
  delay?: number;
  volume?: number;
}

export interface MsgStage {
  uid?: number;
  world?: number;
  world_uid?: number;
  difficulty?: StageDifficulty;
  open_state?: StageOpenState;
  battle_type?: BattleType;
  stage_index?: number;
  sub_stage_last_index?: number;
  open_date?: MsgUTCTimestamp;
  archive_bg_img?: string;
}

export interface MsgStageMonster {
  uid_stage_monster?: number;
  prob?: number;
  count?: number;
  monster?: number;
  festival_reward?: number;
  monster_lev?: number;
  monster_skill_lev?: number;
  attack_ability?: number;
  defence_ability?: number;
  hp_ability?: number;
  speed_ability?: number;
  add_critical_damage?: number;
  add_critical_prob?: number;
  add_accuracy?: number;
  add_resistance?: number;
  is_boss?: boolean;
  hit_drop_1?: MsgUidAmountAndProb;
  hit_drop_2?: MsgUidAmountAndProb;
  hit_drop_3?: MsgUidAmountAndProb;
  hit_drop_4?: MsgUidAmountAndProb;
  hit_drop_5?: MsgUidAmountAndProb;
  scale?: number;
  hitted_drop: number[];
  phase_condition_type?: PhaseConditionType;
  phase_condition_value?: number;
}

export interface MsgStageMonsterGroup {
  uid?: number;
  stage_monsters: MsgStageMonster[];
}

export interface MsgStartCharacter {
  uid?: number;
  character_uid?: number;
  lev?: number;
}

export interface MsgStatAndValue {
  type?: CommonStatusEffectType;
  value?: number;
}

export interface MsgStepPackageEachStepItem {
  step_item_uid?: number;
  name?: number;
  name_text_color?: string;
  img?: string;
  goods?: MsgReward;
  price?: MsgPrice;
  price_usd?: MsgPrice;
  gift_sender?: number;
  gift_msg?: number;
  open_condition_package?: number;
  open_condition_desc?: number;
  restrict?: MsgRestrict;
  pid_google?: string;
  pid_appstore?: string;
  pid_onestore?: string;
  type?: ShopItemType;
}

export interface MsgStepPackageShopItem {
  uid?: number;
  step_type?: StepPackageType;
  banner_name?: string;
  banner_img?: string;
  banner_bg_color?: string;
  pack_color?: string;
  desc?: number;
  complete_reward?: MsgReward;
  complete_sender?: number;
  complete_msg?: number;
  items: MsgStepPackageEachStepItem[];
}

export interface MsgStoryItem {
  uid?: number;
  item?: number;
  icon?: string;
  name?: number;
  story_text?: number;
  condition_1?: MsgOpenCondition;
  condition_2?: MsgOpenCondition;
}

export interface MsgSubStage {
  uid?: number;
  stage_uid?: number;
  substage_index?: number;
  stage_prefab?: string;
  stage_position?: number;
  stage_bgm?: number;
  name?: number;
  difficulty?: StageDifficulty;
  tag_txt: string[];
  substage_type?: SubStageType;
  required_battle_power?: number;
  monster_exp?: number;
  reward_gold?: number;
  first_clear_reward: MsgReward[];
  completion_reward?: MsgReward;
  reward_prob: MsgRewardProbability[];
  all_reward_general?: number;
  reward_must?: number;
  display_reward: MsgReward[];
  required_energy?: number;
  display_mon_1?: number;
  display_mon_2?: number;
  display_mon_3?: number;
  display_mon_4?: number;
  seize?: number;
  archive_stage_bg?: string;
  ignore_monster_festival?: boolean;
}

export interface MsgSubStageRound {
  uid?: number;
  substage_uid?: number;
  round?: number;
  monster_count?: number;
  monster_basic_speed_range?: MsgRangeFloat;
  monster_group?: number;
  required_monster?: number;
  encounter_monter_must_before_first_win?: boolean;
  encounter_monster_prob?: number;
  encounter_monster_group?: number;
  encounter_monster_count?: number;
  encounter_backside_monster_count?: number;
  encounter_backside_monster_basic_speed_range?: MsgRangeFloat;
  encounter_monster_group_name?: number;
  round_bgm?: number;
  position_value?: number;
}

export interface MsgSubscriptionGroup {
  uid?: number;
  name?: number;
  service_?: number;
  start_date?: MsgUTCTimestamp;
  end_date?: MsgUTCTimestamp;
  subscription_items: MsgSubscriptionItem[];
}

export interface MsgSubscriptionItem {
  shop_item_uid?: number;
  type?: ShopItemType;
  operation_type?: SubscriptionItemOperationType;
  price?: MsgPrice;
  price_usd?: MsgPrice;
  pid_google?: string;
  pid_appstore?: string;
  desc?: number;
  duration?: number;
  duration_type?: SubscriptionDurationType;
}

export interface MsgSubscriptionService {
  type?: SubscriptionServiceType;
  reward?: MsgReward;
  gift_sender?: number;
  gift_msg?: number;
  gift_expire_hour?: number;
}

export interface MsgSubscriptionServiceGroup {
  uid?: number;
  subscription_services: MsgSubscriptionService[];
}

export interface MsgSummon {
  uid?: number;
  open_date?: MsgUTCTimestamp;
  close_date?: MsgUTCTimestamp;
  summon_type?: SummonType;
  summon_prob_uid?: number;
  event_character_group: number[];
  event_weapon_group: number[];
  event_prob_up?: number;
  select_character_count?: number;
  summon_group_uid?: number;
  banner_img?: string;
  banner_list_img?: string;
  name?: number;
  tab_name?: number;
  desc?: number;
  info_desc?: number;
  price_1?: MsgPrice;
  price_continuous?: MsgPrice;
  count_continuous?: number;
  restrict?: MsgRestrict;
  free_group_index?: number;
  free_restrict?: MsgRestrict;
  dialog_bg?: string;
  is_ongoing?: boolean;
  weapon_display?: number;
  threed_place?: string;
  title_color?: string;
  event_weapon_prob_up?: number;
  summon_ceil_type?: SummonCeilType;
  pre_price_1: MsgPrice[];
  pre_price_continuous: MsgPrice[];
}

export interface MsgSummonGroup {
  uid?: number;
  items: MsgSummonGroupItem[];
}

export interface MsgSummonGroupItem {
  summon_reward_type?: SummonRewardType;
  rare?: number;
  reward?: MsgReward;
  reward_voice_desc: number[];
  prob?: number;
  is_ceiling?: boolean;
}

export interface MsgSummonMileageShop {
  uid?: number;
  gift_sender_uid?: number;
  gift_msg_uid?: number;
  summon_shop_items: MsgSummonMileageShopItem[];
}

export interface MsgSummonMileageShopItem {
  shop_item_uid?: number;
  reward_type?: FestivalShopItemType;
  price?: MsgPrice;
  reward?: MsgReward;
  restrict?: MsgRestrict;
}

export interface MsgSummonProb {
  uid?: number;
  items: MsgSummonProbItem[];
}

export interface MsgSummonProbItem {
  summon_reward_type?: SummonRewardType;
  rare?: number;
  is_ceiling_guarantee?: boolean;
  selectable?: boolean;
  prob?: number;
  replace_mileage?: MsgReward;
  desc_title?: number;
}

export interface MsgSummonResource {
  uid?: number;
  select_character_uid?: number;
  event_weapon_group: number[];
  dialog_bg?: string;
  threed_place?: string;
  name?: number;
  desc?: number;
  name_weapon?: number;
  desc_weapon?: number;
  title_color?: string;
}

export interface MsgSummonWeaponDisplay {
  uid?: number;
  items: MsgSummonWeaponDisplayItem[];
}

export interface MsgSummonWeaponDisplayItem {
  slot?: number;
  weaponUid: number[];
}

export interface MsgSupportCharacter {
  uid?: number;
  battle_type?: BattleType;
  start_local_date?: MsgUserLocalTimestamp;
  end_local_date?: MsgUserLocalTimestamp;
  is_monster?: boolean;
  character?: number;
  grade?: number;
  lev?: number;
  costume?: number;
  awake_step?: number;
  hp_ability?: number;
  attack_ability?: number;
  defence_ability?: number;
  speed_ability?: number;
  support_character_battle_power?: number;
}

export interface MsgSupportTeamGroup {
  uid?: number;
  formation_idx_1?: number;
  formation_idx_2?: number;
  formation_idx_3?: number;
  formation_idx_4?: number;
  formation_idx_5?: number;
  formation_idx_6?: number;
  formation_idx_7?: number;
  formation_idx_8?: number;
  formation_idx_9?: number;
  formation_idx_10?: number;
  formation_idx_11?: number;
  formation_idx_12?: number;
}

export interface MsgTermPackageBenefit {
  benefit_term_no?: number;
  benefit_term_type?: BenefitTermType;
  benefit_term_reward?: MsgReward;
  benefit_term_value?: number;
  benefit_term_desc?: number;
}

export interface MsgTermPackageShopItem {
  uid?: number;
  name?: number;
  type?: ShopItemType;
  price?: MsgPrice;
  price_usd?: MsgPrice;
  term_day?: number;
  prefab_type?: string;
  pid_google?: string;
  pid_appstore?: string;
  pid_onestore?: string;
  goods_immediate: MsgReward[];
  gift_msg?: number;
  benefit_term_gift_msg?: number;
  benefits: MsgTermPackageBenefit[];
}

export interface MsgText {
  uid?: number;
  text?: string;
}

export interface MsgTextData {
  lang: MsgText[];
}

export interface MsgTextLoader {
  world: MsgTextRow[];
  string: MsgTextRow[];
  character: MsgTextRow[];
  monster: MsgTextRow[];
  skill_effect: MsgTextRow[];
  skill: MsgTextRow[];
  shop: MsgTextRow[];
  item: MsgTextRow[];
  event_bday: MsgTextRow[];
  error: MsgTextRow[];
  popup: MsgTextRow[];
  loading: MsgTextRow[];
  talk: MsgTextRow[];
  talk_recruit: MsgTextRow[];
  gear: MsgTextRow[];
  quest: MsgTextRow[];
  help: MsgTextRow[];
  episode: MsgTextRow[];
  subtitle: MsgTextRow[];
  time_event: MsgTextRow[];
  costume: MsgTextRow[];
  archive: MsgTextRow[];
  archive_rumor: MsgTextRow[];
  summon: MsgTextRow[];
  tyrantwar_history: MsgTextRow[];
  talk_substory: MsgTextRow[];
  talk_lord_bday: MsgTextRow[];
  talk_story_normal: MsgTextRow[];
  talk_story_hard: MsgTextRow[];
  talk_story_elite: MsgTextRow[];
  talk_story_elite2: MsgTextRow[];
  talk_story_tyrantwar: MsgTextRow[];
  talk_story_nightmare: MsgTextRow[];
  talk_story_east: MsgTextRow[];
  embedded: MsgTextRow[];
  talk_avalontheater: MsgTextRow[];
  talk_story_side: MsgTextRow[];
  talk_story_memorial: MsgTextRow[];
}

export interface MsgTextRow {
  uid?: number;
  ko?: string;
  en?: string;
  ja?: string;
  zh_cn?: string;
  zh_tw?: string;
  es?: string;
  pt?: string;
  it?: string;
  fr?: string;
  de?: string;
  ru?: string;
}

export interface MsgTextRowDiff {
  diff: MsgTextRow[];
}

export interface MsgThemePrefabTime {
  uid?: number;
  select_banner?: string;
  select_background?: string;
  theme_room: MsgThemeRoom[];
}

export interface MsgThemeRoom {
  start_time?: MsgTime;
  end_time?: MsgTime;
  prefab?: string;
}

export interface MsgTime {
  h?: number;
  m?: number;
  s?: number;
}

export interface MsgTimeEvent {
  uid?: number;
  is_total_count?: boolean;
  desc?: number;
  condition?: TimeEventCheckCondition;
  check_value: number[];
  check_uid?: number;
  short_cut?: MsgShortCut;
  items: MsgTimeEventItem[];
}

export interface MsgTimeEventContractDialogue {
  uid?: number;
  items: MsgTimeEventContractDialogueItem[];
}

export interface MsgTimeEventContractDialogueItem {
  type?: TimeEventMessageType;
  string?: string;
}

export interface MsgTimeEventContractGroup {
  uid?: number;
  event_group_title?: number;
  event_type?: TimeEventType;
  open_condition?: MsgOpenCondition;
  prefab_name?: string;
  event_group_bg_perfab?: string;
  gift_sender?: number;
  gift_msg?: number;
  character_dialogue?: number;
  reward?: MsgReward;
  replace_reward?: MsgReward;
  goal_point_text?: string;
  goal_point_count?: number;
  reward_point_text?: string;
  serial_type?: TimeEventSerialType;
  start_date?: MsgUTCTimestamp;
  end_date?: MsgUTCTimestamp;
  items: MsgTimeEventContractMissionItem[];
  complete_reward_gift_sender?: number;
  complete_reward_gift_msg?: number;
  complete_reward?: MsgReward;
}

export interface MsgTimeEventContractMission {
  uid?: number;
  mission_index?: number;
  reset_type?: TimeEventResetType;
  auto_shorten?: boolean;
  mission_title?: string;
  mission_desc?: string;
  condition?: TimeEventCheckCondition;
  check_value: number[];
  check_uid?: number;
  short_cut?: MsgShortCut;
  items: MsgTimeEventContractMissionRewardItem[];
}

export interface MsgTimeEventContractMissionItem {
  group_index?: number;
  event_uid?: number;
}

export interface MsgTimeEventContractMissionRewardItem {
  index?: number;
  goal_count?: number;
  reward?: MsgReward;
}

export interface MsgTimeEventGroup {
  uid?: number;
  event_type?: TimeEventType;
  open_condition?: MsgOpenCondition;
  prev_group_uid?: number;
  completion_hide_time?: number;
  start_date?: MsgUTCTimestamp;
  end_date?: MsgUTCTimestamp;
  term_display?: boolean;
  reset_type?: TimeEventResetType;
  gift_sender?: number;
  gift_msg?: number;
  prefab_name?: string;
  event_group_bg_perfab?: string;
  event_group_title?: number;
  event_group_desc?: number;
  serial_type?: TimeEventSerialType;
  items: MsgTimeEventGroupItem[];
  repeat_type?: RepeatEventTimeType;
  day_of_week?: OpenWeekday;
  open_date?: MsgUTCTimestamp;
  close_date?: MsgUTCTimestamp;
  time_type?: StandardTime;
}

export interface MsgTimeEventGroupItem {
  group_index?: number;
  event_uid?: number;
  event_stepwise?: number;
}

export interface MsgTimeEventItem {
  index?: number;
  goal_count?: number;
  check_ad_view?: boolean;
  reward?: MsgReward;
}

export interface MsgTimeEventMission {
  uid?: number;
  desc?: number;
  condition?: TimeEventCheckCondition;
  check_value: number[];
  check_uid?: number;
  short_cut?: MsgShortCut;
  items: MsgTimeEventMissionItem[];
}

export interface MsgTimeEventMissionGroup {
  uid?: number;
  event_type?: TimeEventType;
  start_date?: MsgUTCTimestamp;
  shop_end_date?: MsgUTCTimestamp;
  end_date?: MsgUTCTimestamp;
  term_display?: boolean;
  shop_item_uid?: number;
  gift_sender?: number;
  gift_msg?: number;
  paid_gift_sender?: number;
  paid_gift_msg?: number;
  prefab_name?: string;
  event_group_bg_perfab?: string;
  event_group_title?: number;
  event_group_desc?: number;
  img_event_character?: string;
  reward_costume_uid?: number;
  banner_reward?: MsgReward;
  point_reward_group_uid?: number;
  serial_type?: TimeEventSerialType;
  items: MsgTimeEventMissionGroupItem[];
  banner_color?: string;
  banner_img?: string;
}

export interface MsgTimeEventMissionGroupItem {
  mission_reset_type?: TimeEventResetType;
  group_index?: number;
  event_uid?: number;
}

export interface MsgTimeEventMissionItem {
  index?: number;
  goal_count?: number;
  reward_point?: number;
}

export interface MsgTimeEventMissionPointReward {
  uid?: number;
  items: MsgTimeEventMissionPointRewardItem[];
}

export interface MsgTimeEventMissionPointRewardItem {
  point_level?: number;
  levelup_point?: number;
  skip_cost?: MsgPrice;
  free_reward: MsgReward[];
  paid_reward: MsgReward[];
}

export interface MsgTimeEventPass {
  uid?: number;
  story_pass_title?: number;
  shop_item_uid?: number;
  paid_gift_sender?: number;
  paid_gift_msg?: number;
  desc?: number;
  battle_type?: BattleType;
  items: MsgTimeEventPassItem[];
  story_pass_tap_title?: number;
  color?: string;
  image?: string;
}

export interface MsgTimeEventPassItem {
  index?: number;
  check_uid?: number;
  free_reward?: MsgReward;
  paid_reward?: MsgReward;
}

export interface MsgTitlePrefabTime {
  uid?: number;
  type?: PrefabTimeType;
  start_date?: MsgUserLocalTimestamp;
  end_date?: MsgUserLocalTimestamp;
  prefab_name?: string;
  bgm_uid?: number;
}

export interface MsgTrackingSummon {
  uid?: number;
  tracking_character_uid?: number;
  summon_uid?: number;
  weapon_uid?: number;
  tracking_bonus_group: number[];
  free_summon_reward?: MsgReward;
  free_weapon_reward?: MsgReward;
  general_reward_uid?: number;
  first_clear_reward_uid?: number;
  complete_autoseq?: number;
  bonus_reward_1?: MsgReward;
  bonus_reward_2?: MsgReward;
  bonus_reward_3?: MsgReward;
  items: MsgTrackingSummonItem[];
}

export interface MsgTrackingSummonFirstClearReward {
  uid?: number;
  items: MsgTrackingSummonFirstClearRewardItem[];
}

export interface MsgTrackingSummonFirstClearRewardItem {
  index?: number;
  gauge_count?: number;
  first_reward: MsgReward[];
}

export interface MsgTrackingSummonGeneralReward {
  uid?: number;
  items: MsgTrackingSummonGeneralRewardItem[];
}

export interface MsgTrackingSummonGeneralRewardItem {
  index?: number;
  bonus_character_count?: number;
  bonus_character_count_min?: number;
  default_reward_1?: MsgReward;
  default_reward_2?: MsgReward;
  default_reward_3?: MsgReward;
  bonus_character_reward_count?: number;
}

export interface MsgTrackingSummonGrade {
  uid?: number;
  rank?: TrackingSummonGrade;
  combat_power_min?: number;
  combat_power_max?: number;
  bonus_rate?: number;
  desc?: string;
}

export interface MsgTrackingSummonItem {
  dialog_index?: number;
  dialog_uid?: number;
}

export interface MsgTrainingRoomAdBuff {
  uid?: number;
  buff_type?: TrainingRoomBuffType;
  buff_value?: number;
}

export interface MsgTrainingRoomSlot {
  uid?: number;
  slot_type?: TrainingRoomSlotType;
  slot_open_state?: TrainingSlotOpenState;
  option_list: number[];
  buff_uid?: number;
}

export interface MsgTrainingRoomSlotOption {
  uid?: number;
  exp_per_minute?: number;
  training_minute?: number;
}

export interface MsgTreasureLevelAmount {
  reward_level?: number;
  reward_value?: number;
}

export interface MsgTreasuryRandom {
  uid?: number;
  name?: number;
  desc?: number;
  icon?: string;
  items: MsgTreasuryRandomItem[];
}

export interface MsgTreasuryRandomItem {
  reward?: MsgReward;
  display_prob?: number;
  is_lucky?: boolean;
}

export interface MsgTreasuryReward {
  uid?: number;
  reward_per_minute?: number;
  reward_type?: MsgRewardType;
  desc_change_amount?: number;
  reward_amount_by_treasury_level: MsgTreasureLevelAmount[];
  is_skip_reward?: boolean;
}

export interface MsgTreasuryRewardList {
  treasury_reward?: number;
}

export interface MsgTreasurySeason {
  uid?: number;
  start_date?: MsgUTCTimestamp;
  end_date?: MsgUTCTimestamp;
  treasury_reward_list: MsgTreasuryRewardList[];
}

export interface MsgTreasurylevel {
  uid?: number;
  treasury_level?: number;
  level_condition?: number;
  desc_list: number[];
}

export interface MsgTutorial {
  uid?: number;
  save?: boolean;
  active?: boolean;
  skipCondition?: string;
  actions: MsgTutorialAction[];
}

export interface MsgTutorialAction {
  type?: TutorialType;
  scene?: TutorialScene;
  event_uid?: number;
  trigger?: string;
  param?: string;
  message_uid?: number;
}

export interface MsgTutorialBattle {
  uid?: number;
  substage_uid?: number;
  formation_uid?: number;
  parties: MsgTutorialBattleCharacter[];
  battlerounds: MsgTutorialBattleRound[];
}

export interface MsgTutorialBattleCharacter {
  uid?: number;
  alter_atk?: number;
  alter_max_hp?: number;
  alter_hp?: number;
}

export interface MsgTutorialBattleRound {
  round_battle_data_type?: RoundBattleDataType;
  stage_monsters: MsgTutorialBattleCharacter[];
}

export interface MsgTyrantWarHistory {
  uid?: number;
  substage_uid?: number;
  play_flow?: number;
  chapter?: number;
  history_day?: number;
  history_time?: string;
  before_history?: number;
  after_history?: number;
  archive_stage_bg?: string;
  content_type?: TyrantWarContentType;
  tag_txt: string[];
  substage_type?: SubStageType;
  region_event_icon?: string;
  required_battle_power?: number;
  monster_exp?: number;
  reward_gold?: number;
  stage_prefab?: string;
  stage_bgm?: number;
  stage_position?: number;
  phase?: TyrantWarPhase;
  part?: TyrantWarPhasePart;
  star_conditon_1: MsgProofDungeonCondition[];
  star_string_1?: number;
  star_reward_1?: MsgReward;
  star_conditon_2: MsgProofDungeonCondition[];
  star_string_2?: number;
  star_reward_2?: MsgReward;
  star_conditon_3: MsgProofDungeonCondition[];
  star_string_3?: number;
  star_reward_3?: MsgReward;
  reward_prob: MsgRewardProbability[];
  all_reward_general?: number;
  reward_must?: number;
  display_reward: MsgReward[];
  required_energy?: number;
  formation?: number;
  open_slot?: number;
  formation_idx_1?: number;
  formation_idx_2?: number;
  formation_idx_3?: number;
  formation_idx_4?: number;
  formation_idx_5?: number;
  display_mon_1?: number;
  display_mon_2?: number;
  display_mon_3?: number;
  display_mon_4?: number;
  appsflyer_key?: string;
  resonance?: boolean;
  display_world_uid?: number;
  support_team_group_uid?: number;
}

export interface MsgTyrantWarHistoryRound {
  uid?: number;
  history_uid?: number;
  round?: number;
  wave: MsgTyrantWarWaveInfo[];
  round_bgm?: number;
  round_buff_mental?: number;
  phase_controller_group_uid?: number;
}

export interface MsgTyrantWarStage {
  uid?: number;
  world_uid?: number;
  battle_type?: BattleType;
  sub_stage_last_index?: number;
  archive_stage_bg?: string;
  stage_index?: number;
}

export interface MsgTyrantWarSubStage {
  uid?: number;
  stage_uid?: number;
  substage_index?: number;
}

export interface MsgTyrantWarWaveInfo {
  wave?: number;
  wave_uid?: number;
  monster_count?: number;
  monster_basic_speed_range?: MsgRangeFloat;
  monster_group?: number;
  required_monster?: number;
  encounter_monter_must_before_first_win?: boolean;
  encounter_monster_prob?: number;
  encounter_monster_group?: number;
  encounter_monster_count?: number;
  encounter_backside_monster_count?: number;
  encounter_backside_monster_basic_speed_range?: MsgRangeFloat;
  encounter_monster_group_name?: number;
  position_value?: number;
}

export interface MsgTyrantWarWorld {
  uid?: number;
  resource_root_name?: string;
  world_idx?: number;
  btn_action?: string;
  world_name?: number;
  phase1_open_state?: WorldOpenState;
  phase1_open_date?: MsgUTCTimestamp;
  region_symbol?: string;
  region_desc?: number;
}

export interface MsgUTCTimestamp {
  timestamp?: string;
}

export interface MsgUid {
  uid?: number;
  str_uid?: string;
}

export interface MsgUidAmountAndProb {
  type?: GlobalDataType;
  min_amount?: number;
  max_amount?: number;
  capacity?: number;
  prob?: number;
}

export interface MsgUidRandomReward {
  uid?: number;
  items: MsgUidRandomRewardItem[];
}

export interface MsgUidRandomRewardItem {
  type?: GlobalDataType;
  item_uid?: number;
  item_amount?: number;
  item_prob?: number;
  grade?: RewardGrade;
}

export interface MsgUniversePosition {
  uid?: number;
  pos_x_0?: string;
  pos_x_1?: string;
  pos_x_2?: string;
  pos_x_3?: string;
  pos_x_4?: string;
  pos_x_5?: string;
  pos_x_6?: string;
  pos_x_7?: string;
  pos_x_8?: string;
  pos_x_9?: string;
  pos_x_10?: string;
  pos_x_11?: string;
  pos_x_12?: string;
  pos_x_13?: string;
  pos_x_14?: string;
  pos_x_15?: string;
  pos_x_16?: string;
  pos_x_17?: string;
  pos_x_18?: string;
  pos_x_19?: string;
  pos_x_20?: string;
  pos_x_21?: string;
  pos_x_22?: string;
  pos_x_23?: string;
  pos_x_24?: string;
  pos_x_25?: string;
  pos_x_26?: string;
  pos_x_27?: string;
  pos_x_28?: string;
  pos_x_29?: string;
  pos_x_30?: string;
  pos_x_31?: string;
  pos_x_32?: string;
  pos_x_33?: string;
  pos_x_34?: string;
  pos_x_35?: string;
  pos_x_36?: string;
  pos_x_37?: string;
  pos_x_38?: string;
  pos_x_39?: string;
  pos_x_40?: string;
}

export interface MsgUserAttendancePremium {
  attendance_premium_uid?: number;
  day_cnt?: number;
  premium_day_cnt?: number;
}

export interface MsgUserLocalTimestamp {
  timestamp?: string;
}

export interface MsgVanguardSkillGroup {
  uid?: number;
  items: MsgVanguardSkillGroupItems[];
}

export interface MsgVanguardSkillGroupItems {
  vanguard_skill_uid?: number;
  element_condition: ElementType[];
  class_condition: ClassType[];
  skill_icon?: string;
  skill_desc?: string;
  mental_cost?: number;
}

export interface MsgVoice {
  uid?: number;
  alternative_uid?: number;
  text_uid?: number;
  category?: string;
  directory?: string;
  ko?: string;
  ja?: string;
  calm_bgm?: boolean;
  apply_water?: boolean;
  apply_earth?: boolean;
  apply_fire?: boolean;
  apply_dark?: boolean;
  apply_light?: boolean;
  open_condition: MsgOpenCondition[];
}

export interface MsgVoiceConditionItem {
  condition_type?: CharacterInfoVoiceOpenCondition;
  check_uid?: number;
  count?: number;
}

export interface MsgWarfareAIEnemy {
  uid?: number;
  league_grade?: WarfareLeagueGrade;
  ai_user_name?: number;
  ai_user_lev?: number;
  arena_score?: number;
  arena_message?: number;
  profile_icon_uid?: number;
  master_gender?: MasterGenderType;
  master_hair_type?: MasterHairType;
  master_hair_color?: MasterHairColorType;
  master_skin_type?: MasterSkinType;
  character1_uid?: number;
  character2_uid?: number;
  character3_uid?: number;
  character4_uid?: number;
  character5_uid?: number;
  character6_uid?: number;
  character7_uid?: number;
  character8_uid?: number;
  character9_uid?: number;
  character10_uid?: number;
  character_lev?: number;
  character_grade?: number;
  character_awake_step?: number;
}

export interface MsgWarfareCharacterGroup {
  uid?: number;
  items: MsgWarfareCharacterGroupItem[];
}

export interface MsgWarfareCharacterGroupItem {
  character_uid?: number;
}

export interface MsgWarfareLeague {
  uid?: number;
  league_grade?: WarfareLeagueGrade;
  league_title?: number;
  league_icon?: string;
  league_start_point?: number;
  league_promote?: number;
  league_demote?: number;
  ranking_reward_group_uid?: number;
  battle_reward?: number;
  battle_win_reward?: number;
}

export interface MsgWarfareMission {
  uid?: number;
  mission_condition?: WarfareMissionCondition;
  mission_bg?: string;
  gift_sender_uid?: number;
  gift_msg_uid?: number;
  items: MsgWarfareMissionItem[];
}

export interface MsgWarfareMissionItem {
  index?: number;
  goal_count?: number;
  reward?: MsgReward;
}

export interface MsgWarfareRankingReward {
  uid?: number;
  items: MsgWarfareRankingRewardItem[];
}

export interface MsgWarfareRankingRewardItem {
  reward_ranking?: number;
  reward_1?: MsgReward;
  reward_2?: MsgReward;
  reward_3?: MsgReward;
  reward_4?: MsgReward;
  reward_5?: MsgReward;
  reward_6?: MsgReward;
}

export interface MsgWarfareSeasonRotation {
  uid?: number;
  loop_index?: number;
  league_list: MsgWarfareSeasonRotationItem[];
}

export interface MsgWarfareSeasonRotationItem {
  league_grade?: WarfareLeagueGrade;
  buff_character_uid_0?: number;
  buff_skill_uid_0?: number;
  buff_character_uid_1?: number;
  buff_skill_uid_1?: number;
  buff_character_uid_2?: number;
  buff_skill_uid_2?: number;
  available_character_group_list: number[];
  ban_character_group?: number;
  stage_prefab?: string;
  stage_bgm?: number;
}

export interface MsgWarfareShop {
  uid?: number;
  items: MsgWarfareShopItem[];
}

export interface MsgWarfareShopItem {
  shop_item_uid?: number;
  name?: number;
  restrict?: MsgRestrict;
  league_condition?: WarfareLeagueGrade;
  price?: MsgPrice;
  reward?: MsgReward;
  display_item_uid?: number;
  gift_sender_uid?: number;
  gift_msg_uid?: number;
}

export interface MsgWoldMapDisplayRewards {
  uid?: number;
  contents_type?: ContentsType;
  display_reward: MsgReward[];
}

export interface MsgWorld {
  uid?: number;
  world_name?: number;
  resource_root_name?: string;
  btn_action?: string;
  open_state?: WorldOpenState;
  conquer_virtual_stage?: number;
  world_idx?: number;
  normal_stage_uid?: number;
  hard_stage_uid?: number;
  elite_stage_uid?: number;
  nightmare_stage_uid?: number;
  region_desc?: number;
  region_leader?: number;
  region_capital?: number;
  region_area?: number;
  region_population?: number;
  friendship_type?: WorldFriendshipType;
  friendship_talk?: number;
  hostile_talk?: number;
  region_hero: string[];
  region_symbol?: string;
  friendship_talk_character?: number;
  friendship_text?: number;
  hostile_talk_character?: number;
  hostile_text?: number;
  nightmare_after_immediately?: boolean;
}

export interface MsgWorldRaidBattleInfo {
  uid?: number;
  items: MsgWorldRaidHelpItem[];
}

export interface MsgWorldRaidBattlePointRankReward {
  uid?: number;
  items: MsgWorldRaidBattlePointRankRewardItem[];
}

export interface MsgWorldRaidBattlePointRankRewardItem {
  reward_ranking?: number;
  reward_1?: MsgReward;
  reward_2?: MsgReward;
  reward_3?: MsgReward;
  reward_4?: MsgReward;
  reward_5?: MsgReward;
  reward_6?: MsgReward;
  clan_reward?: MsgReward;
}

export interface MsgWorldRaidBattleReward {
  uid?: number;
  rank?: ClanRaidRewardRank;
  point_min?: string;
  point_max?: string;
  reward_1?: MsgReward;
  reward_2?: MsgReward;
  reward_3?: MsgReward;
  reward_4?: MsgReward;
  reward_5?: MsgReward;
  reward_6?: MsgReward;
}

export interface MsgWorldRaidEnergyRankReward {
  uid?: number;
  items: MsgWorldRaidEnergyRankRewardItem[];
}

export interface MsgWorldRaidEnergyRankRewardItem {
  reward_ranking?: number;
  reward_1?: MsgReward;
  reward_2?: MsgReward;
  reward_3?: MsgReward;
  reward_4?: MsgReward;
  reward_5?: MsgReward;
  reward_6?: MsgReward;
  clan_reward?: MsgReward;
}

export interface MsgWorldRaidHelpItem {
  help_uid?: number;
  index?: number;
  image?: string;
  title?: number;
  desc?: number;
}

export interface MsgWorldRaidIndividualItem {
  index?: number;
  total_point?: number;
  reward?: MsgReward;
}

export interface MsgWorldRaidIndividualReward {
  uid?: number;
  gift_sender_uid?: number;
  gift_msg_uid?: number;
  items: MsgWorldRaidIndividualItem[];
}

export interface MsgWorldRaidMonsterAbuse {
  uid?: number;
  monster_rotation_uid?: number;
  abuse_delta_damage_warning?: string;
  abuse_delta_damage_danger?: string;
}

export interface MsgWorldRaidMonsterElement {
  monster_element?: ElementType;
  stage_group_uid?: number;
  world_raid_individual_reward_uid?: number;
  represent_stage_monster_uid?: number;
  world_raid_use_energy_rank_reward_uid?: number;
  world_raid_battle_point_rank_reward_uid?: number;
}

export interface MsgWorldRaidMonsterRotation {
  uid?: number;
  repeat_count?: number;
  vanguard_skill_list_uid?: number;
  vanguard_apply_class: ClassType[];
  monsters: MsgWorldRaidMonsterElement[];
  display_max_low_battle_point?: number;
  display_max_medium_battle_point?: number;
}

export interface MsgWorldRaidSUbStageGroupItems {
  substage_uid?: number;
  substage_difficulty?: WorldRaidDifficulty;
  substage_title?: number;
  substage_desc?: number;
  substage_bg?: string;
  stage_prefab?: string;
  stage_bgm?: number;
  required_battle_power?: number;
}

export interface MsgWorldRaidSubStageGroup {
  uid?: number;
  sub_stages: MsgWorldRaidSUbStageGroupItems[];
}

export interface MsgWorldRaidSubStageRound {
  uid?: number;
  substage_uid?: number;
  round?: number;
  monster_count?: number;
  monster_basic_speed_range?: MsgRangeFloat;
  monster_group?: number;
  required_monster?: number;
  encounter_monter_must_before_first_win?: boolean;
  encounter_monster_prob?: number;
  encounter_monster_group?: number;
  encounter_monster_count?: number;
  encounter_backside_monster_count?: number;
  encounter_backside_monster_basic_speed_range?: MsgRangeFloat;
  encounter_monster_group_name?: number;
  round_bgm?: number;
  position_value?: number;
  phase_controller_group_uid?: number;
}

export interface MsgWorldRaidTotalSafetyLevel {
  uid?: number;
  safety_level?: number;
  total_battle_point?: string;
  reward_1?: MsgReward;
  reward_2?: MsgReward;
  reward_3?: MsgReward;
  reward_4?: MsgReward;
  safety_level_bg?: string;
  bg_color?: string;
}

export interface MsgWorldRaidTotalSearchingLevel {
  uid?: number;
  searching_level?: number;
  total_use_energy?: string;
  searching_point_per_sec?: number;
}

export interface MsgWorldmapBanner {
  uid?: number;
  time_type?: StandardTime;
  open_date?: MsgUTCTimestamp;
  close_date?: MsgUTCTimestamp;
  banner_title?: number;
  banner_img?: string;
}


// ─── Codec helpers ────────────────────────────────────────────────────────────
// Requires: npm install protobufjs
// Usage:
//   import { encode, decode } from "./codec";
//   const buf  = encode("MsgUser", myUser);
//   const user = decode<MsgUser>("MsgUser", buf);

import protobufjs from "protobufjs";

let _root: protobufjs.Root | null = null;

export function loadProto(protoPath: string): Promise<protobufjs.Root> {
    return new Promise((resolve, reject) => {
        protobufjs.load(protoPath, (err, root) => {
            if (err || !root) return reject(err);
            _root = root;
            resolve(root);
        });
    });
}

function getRoot(): protobufjs.Root {
    if (!_root) throw new Error("Proto not loaded. Call loadProto() first.");
    return _root;
}

/** Encode a typed object into raw protobuf bytes */
export function encode<T extends object>(messageName: string, obj: T): Uint8Array {
    const Type = getRoot().lookupType(messageName);
    const err  = Type.verify(obj);
    if (err) throw new Error(`encode(${messageName}): ${err}`);
    return Type.encode(Type.fromObject(obj)).finish();
}

/** Decode raw protobuf bytes into a typed object */
export function decode<T>(messageName: string, buf: Uint8Array | Buffer): T {
    const Type = getRoot().lookupType(messageName);
    return Type.decode(buf).toJSON() as T;
}

/** Encode to base64 string (for HTTP transport) */
export function encodeBase64<T extends object>(messageName: string, obj: T): string {
    return Buffer.from(encode(messageName, obj)).toString("base64");
}

/** Decode from base64 string */
export function decodeBase64<T>(messageName: string, b64: string): T {
    return decode<T>(messageName, Buffer.from(b64, "base64"));
}
