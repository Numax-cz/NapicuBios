import {systemDirAFileMetadata, systemDirMetadata} from "../FilesDirs/systemDir";
import {SystemRemindNotificationConstructorMetadata} from "../remidNotification";
import {SystemUserPermissionsEnumMetadata} from "./UserPerms";


export declare interface SystemUserDataMetadata {
  appsInDock: string[];
  notifications: {
    allow: boolean,
    receive: boolean,
    notificationsList: { title: string, msg: string, icon: string, time: string }[],
    remindNotificationList: SystemRemindNotificationConstructorMetadata[]
  };
  audioVolume: number,
}


export declare interface UserConstructorMetadata {
  username: string,
  password: string,
  permissions?: SystemUserPermissionsEnumMetadata,
  userSetting?: SystemUserDataMetadata
}
