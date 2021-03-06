import {SystemApp} from "../SystemApp";
import {NapicuApp} from "../../scripts/Decorators";
import {SystemAppsProcessName} from "../../config/Apps/AppsNames";
import {WordpadComponent} from "../../Apps/wordpad/wordpad.component";
import {Window} from "../Window";
import {SYSTEM_IMAGES} from "../../config/System";
import {AppCreatMetadata} from "../../interface/System";

@NapicuApp({
  appTitle: 'NotePad',
  processTitle: SystemAppsProcessName.note,
  appComponent: WordpadComponent,
  windowData: Window.centerPos(45, 45),
  resizeAllowed: true,
  fileIconPath: SYSTEM_IMAGES.AppDocText,
  addToDock: true,
})
export class SystemAppsNotepad extends SystemApp{
  public static declare appData: AppCreatMetadata;

  constructor() {
    super(SystemAppsNotepad.appData);
  }
}
