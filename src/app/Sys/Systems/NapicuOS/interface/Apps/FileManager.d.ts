export declare interface fileConfigMetadata {
  displayedDirectorys: fileConfigDisplayedMetadata[]
}

export declare interface fileConfigDisplayedMetadata {
  name: string,
  directory: string,
  icon: string,
}


export declare interface filesAndDirsViewMetadata {
  name: string,
  icon: string,
  isDir: boolean
}