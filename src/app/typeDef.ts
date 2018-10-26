export enum sex {
    GIRL = 'GIRL',
    BOY = 'BOY',
}
/** 全局事件 */
export enum globalEvent {
    NO_LOGIN = 'NO_LOGIN',
}
/** 权限菜单类型 */
export enum menuType {
    CATALOG = 'CATALOG',
    MENU = 'MENU',
    MODULE = 'MODULE',
    API = 'API',
}
/** 服务器返回code */
export enum serverCode {
  SUCCESS = 0,
  NO_LOGIN_ERROR_CODE = 401,
}
/** socket注册类型 */
export enum SocketRegisterType {
  MATCH_SCHEDULE = 'MATCH_SCHEDULE_ID',
}
/**  图片上传的空间类型 */
export enum systemType {
  ADMIN = 'ADMIN',
  ACCOUNT = 'ACCOUNT',
  APP = 'LIVEAPP',
}
/**  直播间类型 */
export enum liveType {
  BASKETBALL = 'BASKETBALL',
  OTHER = 'OTHER',
}

/**  直播人数显示类型 */
export enum personCountType {
  REAL = 'REAL',
  VIRTUAL = 'VIRTUAL',
  CLICK = 'CLICK',
}
export const personCountTypeLabMap = {
  REAL: '真实',
  VIRTUAL: '虚假',
  CLICK: '点击',
};


/** 赛事类型 */
export const matchType = {
  BASKETBALL: 'BASKETBALL',
  FOOTBALL: 'FOOTBALL',
};
export const matchTypeLabMap: {[key: string]: string} = {
  BASKETBALL: '篮球',
  FOOTBALL: '足球',
};
export const playActionType = {
  // 篮球
  TWO_POINT_SHOT: 'TWO_POINT_SHOT',
  THREE_POINT_SHOT: 'THREE_POINT_SHOT',
  FREE_THROW: 'FREE_THROW',
  ASSIST: 'ASSIST',
  BLOCK_SHOT: 'BLOCK_SHOT',
  DEFENSIVE_REBOUND: 'DEFENSIVE_REBOUND',
  OFFENSIVE_REBOUND: 'OFFENSIVE_REBOUND',
  REBOUND: 'REBOUND',
  STEAL: 'STEAL',
  TURNOVER: 'TURNOVER',
  FOUL: 'FOUL',
  // 足球
  TO_SHOOT: 'TO_SHOOT',
  PENALTY_KICK: 'PENALTY_KICK',
  YELLOW_CARD: 'YELLOW_CARD',
  RED_CARD: 'RED_CARD',
};
export enum playerActionTypeMap {
  // 篮球
  TWO_POINT_SHOT = '两分球',
  THREE_POINT_SHOT = '三分球',
  FREE_THROW = '罚球',
  ASSIST = '助攻',
  BLOCK_SHOT = '盖帽',
  DEFENSIVE_REBOUND = '防守篮板球',
  OFFENSIVE_REBOUND = '进攻篮板球',
  REBOUND = '篮板球',
  STEAL = '抢断',
  TURNOVER = '失误',
  FOUL = '犯规',
  // 足球
  TO_SHOOT = '射门',
  PENALTY_KICK = '点球',
  YELLOW_CARD = '黄牌',
  RED_CARD = '红牌',
}
export const playerActionTypeArr = [
  // 篮球
  {
    toolVal: 'TWO_POINT_SHOT',
    toolName: playerActionTypeMap.TWO_POINT_SHOT,
    actions: ['ADD', 'MINUS', 'MISS'],
    score: 2,
  },
  {
    toolVal: 'THREE_POINT_SHOT',
    toolName: playerActionTypeMap.THREE_POINT_SHOT,
    actions: ['ADD', 'MINUS', 'MISS'],
    score: 3,
  },
  {
    toolVal: 'FREE_THROW',
    toolName: playerActionTypeMap.FREE_THROW,
    actions: ['ADD', 'MINUS', 'MISS'],
    score: 1,
  },
  {
    toolVal: 'REBOUND',
    toolName: playerActionTypeMap.REBOUND,
    actions: ['ADD', 'MINUS'],
  },
  {
    toolVal: 'ASSIST',
    toolName: playerActionTypeMap.ASSIST,
    actions: ['ADD', 'MINUS'],
  },
  {
    toolVal: 'STEAL',
    toolName: playerActionTypeMap.STEAL,
    actions: ['ADD', 'MINUS'],
  },
  {
    toolVal: 'TURNOVER',
    toolName: playerActionTypeMap.TURNOVER,
    actions: ['ADD', 'MINUS'],
  },
  {
    toolVal: 'BLOCK_SHOT',
    toolName: playerActionTypeMap.BLOCK_SHOT,
    actions: ['ADD', 'MINUS'],
  },
  {
    toolVal: 'FOUL',
    toolName: playerActionTypeMap.FOUL,
    actions: ['ADD', 'MINUS'],
  },
  {
    toolVal: 'DEFENSIVE_REBOUND',
    toolName: playerActionTypeMap.DEFENSIVE_REBOUND,
    actions: ['ADD', 'MINUS'],
  },
  {
    toolVal: 'OFFENSIVE_REBOUND',
    toolName: playerActionTypeMap.OFFENSIVE_REBOUND,
    actions: ['ADD', 'MINUS'],
  },
  // 足球
  {
    toolVal: 'TO_SHOOT',
    toolName: playerActionTypeMap.TO_SHOOT,
    actions: ['ADD', 'MINUS', 'MISS'],
    score: 1,
  },
  {
    toolVal: 'PENALTY_KICK',
    toolName: playerActionTypeMap.PENALTY_KICK,
    actions: ['ADD', 'MINUS', 'MISS'],
    score: 1,
  },
  {
    toolVal: 'YELLOW_CARD',
    toolName: playerActionTypeMap.YELLOW_CARD,
    actions: ['ADD', 'MINUS'],
  },
  {
    toolVal: 'RED_CARD',
    toolName: playerActionTypeMap.RED_CARD,
    actions: ['ADD', 'MINUS'],
  },
];
export const matchStageType = {
  UN_START: 'UN_START',
  PART_ONE: 'PART_ONE',
  PART_TWO: 'PART_TWO',
  PART_THREE: 'PART_THREE',
  PART_FOUR: 'PART_FOUR',
  OVERTIME: 'OVERTIME',
  FIRST_HALF: 'FIRST_HALF',
  SECOND_HALF: 'SECOND_HALF',
  END: 'END',
};
export const matchStageTypeLab: {[key: string]: string } = {
  UN_START: '未开始',
  PART_ONE: '第一节',
  PART_TWO: '第二节',
  PART_THREE: '第三节',
  PART_FOUR: '第四节',
  OVERTIME: '加时',
  FIRST_HALF: '上半场',
  SECOND_HALF: '下半场',
  END: '结束',
};

// 赛事类型球员行为表
export const matchTypeActionsMap: {[key: string]: string[]} = {
  [matchType.BASKETBALL]: [
    playActionType.TWO_POINT_SHOT, playActionType.THREE_POINT_SHOT, playActionType.FREE_THROW,
    playActionType.ASSIST, playActionType.BLOCK_SHOT, playActionType.DEFENSIVE_REBOUND,
    playActionType.OFFENSIVE_REBOUND, playActionType.REBOUND, playActionType.STEAL,
    playActionType.TURNOVER, playActionType.FOUL,
  ],
  [matchType.FOOTBALL]: [
    playActionType.TO_SHOOT, playActionType.PENALTY_KICK, playActionType.YELLOW_CARD, playActionType.RED_CARD,
    playActionType.FOUL,
  ],
};
export const matchTypeStageMap: {[key: string]: string[]} = {
  [matchType.BASKETBALL]: [
    matchStageType.PART_ONE, matchStageType.PART_TWO,
    matchStageType.PART_THREE, matchStageType.PART_FOUR,
  ],
  [matchType.FOOTBALL]: [
    matchStageType.FIRST_HALF, matchStageType.SECOND_HALF,
  ],
};
