
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
