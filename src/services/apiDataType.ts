
/**
 * 所有的类型生命最好都使用 "I" 开头
 */
export interface IApiData {
    isSuccess: boolean;
    data: any;
    errMsg?: string;
}

// interface IApiResData {
//     perms: string[];
//     router: any[];
//     token: string;
//     user: any;
// }



/** menu data */
export interface IMenuListData extends IApiData {
    data: IMenuListItem[];
}

export interface IRoleMenuBody {
    createTime: number;
    createUser: number;
    hidden: boolean;
    menuId: number;
    name: string;
    orderNum: number;
    parentId: number;
    requestType: string;
    type: string;
    updateTime: number;
    updateUser: number;
    url: string;
}

interface IMenuListItem {
    attributes: object;
    checked: boolean;
    children: any[];
    hasChildren: boolean;
    hasParent: boolean;
    id: string;
    parentId: string;
    object: any;
    state: any;
    text: string;
}

/** user */
export interface IUserListResData extends IApiData {
    data: IUserListData;
}
export interface IUserListData  {
    currentPage: number;
    data: IUserListItem[];
    pageSize: number;
    start: number;
    total: number;
}
export interface IUserListItem {
    birth: number;
    gmtCreate?: number;
    gmtModified?: number;
    picId: number;
    mobile: number;
    city: string;
    district: string;
    hobby: string;
    liveAddress: string;
    email: string;
    name: string;
    province: string;
    roleIds: number[] | null;
    sex: number;
    status: number;
    userId: number;
    userIdCreate: number;
    tenantId: number;
    username: string;
}

/** role */
export interface IRoleListData extends IApiData {
    data: {
        data: IUserRoleInfoItem[];
        currentPage: number;
        pageSize: number;
        start: number;
        total: number;
    };
}
export interface IUserRoleInfoItem {
    roleId: number;
    menuIds: number;
    userIdCreate: number;
    roleName: string;
    roleSign: string;
    remark: string;
    gmtCreate: number | null;
    gmtModified: number | null;
}

/** liveapp */

// lives
export interface ILiveInfoData extends IApiData {
  data: {
      data: ILiveInfoItem[];
      currentPage: number;
      pageSize: number;
      start: number;
      total: number;
  };
}
export interface ILiveInfoItem {
  id: number;
  /** 首页时显示的封面  */
  coverImage: string;
  createTime: number;
  createUser: number;
  deleted: boolean;
  /** 直播间未开播时显示的图片  */
  homeImage: string;
  /** 直播间简介  */
  liveRemark: string;
  liveTitle: string;
  /**  直播间类型 ['BASKETBALL']  */
  liveType: string;
  /**  主播名   */
  masterName: string;
  /** 电脑直播播放地址 */
  pcLiveUrl: string;
  /** 手机直播播放地址 */
  phoneLiveUrl: string;
  /** 直播人数显示类型 ['REAL', 'VIRTUAL'] */
  personCountType: string;
  /** 最高人数 */
  personCountMax: number;
  /** 最低人数 */
  personCountMin: number;
  updateTime: number;
  updateUser: number;
  /** 微信分享图标 */
  wechatShareIco: string;
  /** 微信分享详情  */
  wechatShareRemark: string;
  /** 微信分享标题 */
  wechatShareTitle: string;
}


// matchs
export interface IMatchInfoItem {
  matchName: string;
  matchAddress: string;
  mainImage: string;
  /** 主办方 */
  matchHost: string;
  /** 承办方 */
  matchUndertake: string;
  /** 冠名商 */
  namingQuotient: string;
  /** 比赛开始时间 */
  startMatchTime: number;
  /** 比赛结束时间 */
  endMatchTime: number;
  /** 报名开始时间 */
  startSignUpTime: number;
  /** 报名结束时间 */
  endSignUpTime: number;
  updateTime: number;
  updateUser: number;

  createTime?: number;
  createUser?: number;
  deleted?: boolean;
  enabled?: 'ON' | 'OFF';
}

export interface IMatchScheduleInfoItem {
  createUser?: number;
  homeCourtTeam: IHomeCourtTeam;
  live: ILiveInfoItem;
  matchAddress: string;
  matchScheduleName: string;
  matchId: number;
  matchType: string;
  opponentTeam: IHomeCourtTeam;
  startTime: number;
}

export interface IMathTeamInfoItem {
  id: number;
  /** 赛事组 */
  matchGroup: string;
  /** 赛事id */
  matchId: number;
  /** 队员列表 */
  matchTeamPlayerVOs: ITeamPlayerVOs[];
  /** 教练名 */
  teamCoachName: string;
  /** 队标 */
  teamIco: string;
  /** 队伍宣传图 */
  teamImage: string;
  /** 队名 */
  teamName: string;
  /** 队伍积分 */
  teamPoints: string;
  // other
  createTime: number;
  createUser: string;
  updateTime: number;
  updateUser: string;
}

export interface ITeamPlayerVOs {
  /** 赛事队伍id */
  matchTeamId: number;
  /**  队员id */
  playerId: number;
  /** 队员名称 */
  playerName: number;
}

export interface IScheduleScoringInfoData extends IApiData {
  data: IScheduleScoringInfo;
}
export interface IScheduleScoringInfo {
  /** 主场球队 */
  homeCourtTeam: IHomeCourtTeam;
  /** 赛程id  */
  matchScheduleId: number;
  /** 客场球队 */
  opponentTeam: IHomeCourtTeam;
}
export interface IHomeCourtTeam {
  matchScheduleTeamPlayers: IScheduleTeamPlayerInfo[];
  matchTeamId: number;
  matchTeamName: string;
}
export interface IScheduleTeamPlayerInfo {
  playerId: number;
  playerTeamNum: number;
  playerName: string;
  /** 赛程阶段 */
  matchStageType: string; // 'UN_START', 'PART_ONE', 'PART_TWO', 'PART_THREE', 'PART_FOUR',
  // 'OVERTIME', 'FIRST_HALF', 'SECOND_HALF', 'END']
  matchTeamPlayerId: number;
  matchTeamPlmatchTeamIdayerId: number;
  /** 赛事球员比赛情况 */
  matchScheduleTeamPlayerActions: ISchedulePlayerActions[];
}
export interface ISchedulePlayerActions {
  id: number;
  failTimes: number;
  matchScheduleId: number;
  matchTeamPlayerId: number;
  matchStageType: string;
  successTimes: number;
  // 'ASSIST', 'BLOCK_SHOT', 'DEFENSIVE_REBOUND', 'OFFENSIVE_REBOUND', 'REBOUND', 'THREE_POINT_SHOT',
  // 'TWO_POINT_SHOT', 'FREE_THROW', 'STEAL', 'TURNOVER', 'FOUL']
  matchPlayerActionType: string;
}
