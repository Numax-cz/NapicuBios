import {SystemFilePermissionsMetadata} from '../Permissions';

declare const enum SystemFileTypeEnumMetadata {
  executable = 'Executable',
  text = 'txt',
  apps = 'Applications',
}

export declare interface SystemFileConsMetadata {
  /**
   * File value
   */
  value: any;
  /**
   * File name
   */
  fileName: string;
  /**
   * File type
   */
  fileType: SystemFileTypeEnumMetadata;
  /**
   * File permissions
   */
  permissions?: SystemFilePermissionsMetadata;
  /**
   * File icon
   */
  iconPath?: string
}