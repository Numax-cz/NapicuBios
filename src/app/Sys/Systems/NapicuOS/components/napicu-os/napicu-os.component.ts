import {animate, query, stagger, style, transition, trigger,} from '@angular/animations';
import {Component, OnInit} from '@angular/core';
import {Process} from 'src/app/Sys/Process';
import {boot_animation_time} from '../../config/boot';
import {wallpaper} from '../../config/wallpaper';
import {NapicuOS} from '../../system.napicuos';
import {SystemFile} from 'src/app/Sys/File';
import {SystemDockDisplay} from "../../interface/System/dock";
import {WindowComponent} from "../../template/window/window.component";
import {SystemNotification} from "../../../../Notification";
import {notification_animations} from "../../config/notificationAnimations";
import {global} from "@angular/compiler/src/util";

@Component({
  selector: 'app-napicu-os',
  templateUrl: './napicu-os.component.html',
  styleUrls: ['./napicu-os.component.scss'],
  animations: [
    trigger('NapicuOSfeoreStartUp', [
      transition('* => *', [
        query(
          ':self',
          stagger('20ms', [
            style({
              transform: 'scale(0.2) rotateX(70deg)',
              opacity: 0,
              transformOrigin: 'bottom',
            }),
            animate(`${boot_animation_time}ms ease-in-out`),
          ])
        ),
      ]),
    ]),
    trigger('NapicuOSfeoreNotification', [
      transition(':enter', [
        style({transform: 'translate(-50%, -125%)', opacity: 0}),
        animate(notification_animations, style({transform: 'translate(-50%, 0)', opacity: 1})),
      ]),
      transition(':leave', [
        style({transform: 'translate(-50%, 0)', opacity: 1}),
        animate(notification_animations, style({transform: 'translate(-50%, -125%)', opacity: 0})),
      ]),
    ]),
  ],
})
export class NapicuOSComponent implements OnInit {
  /**
   * Determines if the bottom dock is displayed
   */
  public static BottomDockDisplay: boolean = false;

  /**
   * Specifies whether to display the context menu with the date
   */
  public static DataDisplay: boolean = false;
  public static BottomDockProcess: SystemDockDisplay[] = [];
  public static NotificationActive: SystemNotification | null = null;
  public selectedAppContext: number | null = null;

  constructor() {
  }

  get systemTime(): string {
    return NapicuOS.get_system_time();
  }

  get wallpaper(): string {
    return wallpaper;
  }

  get GetBottomDockProcess(): SystemDockDisplay[] {
    return NapicuOSComponent.BottomDockProcess;
  }

  get GetDateDisplay(): boolean {
    return NapicuOSComponent.DataDisplay;
  }

  get SystemBoot(): boolean {
    return NapicuOS.get_system_boot();
  }

  get Process(): Process[] {
    return NapicuOS.get_system_process();
  }

  get BottomDockDisplay(): boolean {
    return NapicuOS.get_system_bottom_dock_display();
  }

  ngOnInit(): void {
    NapicuOSComponent.BottomDockDisplay = true;
    window.addEventListener('mousedown', (e: MouseEvent) => {
      let p = e.target as HTMLElement;
      if (
        !p.offsetParent?.classList.contains("napicu-os-clickable")
      ) {
        this.closeAppContextMenu();
        NapicuOSComponent.DataDisplay = false;
      }
      // e.preventDefault();
    });
  }

  public dockRunner(file: SystemFile, running: boolean): void {
    if (WindowComponent.selectedWindow && !WindowComponent.selectedWindow.display) {
      WindowComponent.selectedWindow.display = true;
    }
    if (!running) {
      NapicuOS.open_app(file.fileName);
    } else {
      const windows = NapicuOS.get_apps_running_by_process_title(file.fileName)
      let x = NapicuOS.get_apps_running_by_process_title(file.fileName);
      let p: Process;


      let windowsMin = windows.filter((i: Process) => {
        return !i.Window.display;
      });
      if (windowsMin.length) {
        p = windowsMin.sort((a: Process, b: Process) => {
          return a.Window.z_index - b.Window.z_index
        })[windowsMin.length - 1];
      } else {
        p = x.sort((a: Process, b: Process) => {
          return a.Window.z_index - b.Window.z_index
        })[x.length - 1]; //TODO INDEX ON MINIM
      }


      let i = WindowComponent.WindowHistory.indexOf(p.Window);
      if (WindowComponent.selectedWindow) WindowComponent.selectedWindow.activated = false;
      WindowComponent.switchWindowIndex(p.Window, i);
    }
  }

  public openFileInContextMenu(file: SystemFile): void {
    NapicuOS.open_app(file.fileName);
    this.closeAppContextMenu();
  }

  public pinFunFileInContextMenu(file: SystemFile, index: number, pinned: boolean): void {
    if (pinned) {
      NapicuOS.remove_file_from_dock_by_index(index);
    } else {
      NapicuOS.add_file_to_dock(file);
    }
    NapicuOS.update_dock_items();
    this.closeAppContextMenu();
  }

  public clickDate(): void {
    if (!NapicuOSComponent.DataDisplay) {
      NapicuOSComponent.NotificationActive = null
    }
    NapicuOSComponent.DataDisplay = !NapicuOSComponent.DataDisplay;
  }

  public onRightClick(index: number, event: Event): void {
    this.selectedAppContext = index;
    event.preventDefault();
  }

  public clearNotifications(): void {
    const user = NapicuOS.get_active_user();
    if (user) NapicuOS.clear_user_notification(user);
  }

  public onCloseNotification(): void {
    const user = NapicuOS.get_active_user();
    if (user) {
      let x = user.userSetting.notifications.notificationsList || [];
      user.userSetting.notifications.notificationsList = x.slice(x.length, 1);
    }
    NapicuOSComponent.NotificationActive = null;
  }

  public changeUserNotificationReceive(): void {
    const userConfig = NapicuOS.get_active_user()?.userSetting.notifications;
    if (userConfig) {
      userConfig.receive = !userConfig.receive;
    }
  }

  protected closeAppContextMenu(): void {
    this.selectedAppContext = null;
  }

  get GetNotification(): SystemNotification | null {
    return NapicuOSComponent.NotificationActive;
  }

  get GetUserNotificationA(): boolean {
    return NapicuOS.get_active_user()?.userSetting.notifications.receive || false;
  }

  get GetNotificationsMenu(): SystemNotification[] {
    return NapicuOS.get_active_user()?.userSetting.notifications.notificationsList || [];
  }
}
