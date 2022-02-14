import {SystemUserDataMetadata, SystemUserPermissionsEnumMetadata,} from './Systems/NapicuOS/interface/User/user';
import {SystemFile} from "./File";
import {SystemFileTypeEnumMetadata} from "./Systems/NapicuOS/interface/FilesDirs/file";
import {copy} from "../Scripts/DeepClone";

export class User {
  private _username: string = 'user';
  private _running: boolean = false;
  private declare _password: string;
  private declare _permissions: SystemUserPermissionsEnumMetadata;
  private declare _userSettings: SystemUserDataMetadata;

  public static readonly defaultUserSettings: SystemUserDataMetadata = {
    appsInDock: [],
  };

  constructor(
    username: string,
    password: string,
    userPermissions?: SystemUserPermissionsEnumMetadata,
  ) {
    this._username = username;
    this._password = password;
    this._permissions = userPermissions
      ? userPermissions
      : SystemUserPermissionsEnumMetadata.User;

    this._userSettings = User.defaultUserSettings;
    // this._userSetting = User.defaultUserSettings;


  }

  //* * * *  Functions * * *

  //* * * *  Getters * * *
  /**
   * Returns the user's name
   */
  get username(): string {
    return this._username;
  }

  //TODO DOC
  get running(): boolean {
    return this._running;
  }

  /**
   * Returns the user's password
   */
  get password(): string {
    return this._password;
  }

  /**
   * Returns the user's permissions
   */
  get permissions(): SystemUserPermissionsEnumMetadata {
    return this._permissions;
  }

  /**
   * Returns the user's settings
   */
  get userSetting(): SystemUserDataMetadata {
    return this._userSettings;
  }

  //* * * *  Setters * * *
  /**
   * Sets the user's username
   */
  set username(value: string) {
    this._username = value;
  }

  //TODO DOC
  set running(value: boolean) {
    this._running = value;
  }

  /**
   * Sets the user's password
   */
  set password(value: string) {
    this._password = value;
  }

  /**
   * Sets the user's permissions
   */
  set permissions(value: SystemUserPermissionsEnumMetadata) {
    this._permissions = value;
  }

  /**
   * Sets the user's settings
   */
  set userSetting(value: SystemUserDataMetadata) {
    this._userSettings = value;
  }
}
