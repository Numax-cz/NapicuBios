import {SystemFile} from 'src/app/Sys/Systems/NapicuOS/SystemComponents/File';

export declare interface systemDrivesMetadata {
  [index: string]: systemDirAFileMetadata;
}

export declare interface systemDirAFileMetadata {
  // name: string;

  files?: SystemFile[];
  dir?: systemDirMetadata;
}

export declare type systemDirMetadata = {
  [index: string]: systemDirAFileMetadata;
};
