/**
 * Enum for system commands prefix
 */
export const enum SystemCommandsPrefixEnum {
  shellCommand = "shell",
  addUserCommand = "adduser",
  getCommand = "get",
  setCommand = "set",
  killCommand = "kill",
  logoutCommand = "logout",
  exitCommand = "exit",
  openAppCommand = "openapp",
  clearCommand = "clear",
  cdCommand = "cd",
  echoCommand = "echo",
  listCommand = "ls",
  pwdCommand = "pwd",
  touchCommand = "touch",
  mkdirCommand = "mkdir",
  notePadCommand = "note",
  fileManagerCommand = "filemanager",
}


export const enum SystemCommandsArgsEnum {
  //Get
  get_SystemProcess = "process",
  get_Apps = "apps",
  get_Users = "users",
  get_Commands ="commands",

}
