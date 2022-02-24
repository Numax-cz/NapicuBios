import {animate, state, style, transition, trigger,} from '@angular/animations';
import {Component, OnInit} from '@angular/core';
import {SystemAlert} from 'src/app/Sys/Alert';
import {Process, ProcessWindowValueMetadata} from 'src/app/Sys/Process';
import {Window} from 'src/app/Sys/Window';
import {window_animations} from '../../config/windowAnimations';
import {percentage, percentageValue} from '../../scripts/getPercentage';
import {NapicuOS} from '../../system.napicuos';
import {InputsType} from 'ng-dynamic-component';
import {NapicuOSComponent} from "../../components/napicu-os/napicu-os.component";

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss'],
  animations: [
    trigger('NapicuOSWindowAnimation', [
      //All application window animations
      //All parts of the animation depend on the state of the application window
      //Remember: Animation normal will return the application window
      // to the default position where the animation started.
      transition(':enter', [
        style({transform: 'scale(0)'}),
        animate(window_animations, style({transform: 'scale(1)'})),
      ]),
      transition(':leave', [
        style({transform: 'scale(1) translateX(-{{translate}}%) translateY(-{{translate}}%)'}),
        animate(window_animations, style({transform: 'scale(0) translateX(-{{translate}}%) translateY(-{{translate}}%)'})),
      ], {params: {translate: 0}}),
      state(
        'maximized',
        style({
          width: '100%',
          height: '100%',
          top: '0%',
          left: '0%',
        })
      ),
      state(
        'normal',
        style({
          width: '{{width}}',
          height: '{{height}}',
          top: '{{top}}%',
          left: '{{left}}%'
        }),
        {params: {width: 0, height: 0, top: 0, left: 0}}
      ),
      state(
        'left',
        style({
          width: '50%',
          height: '100%',
          top: '0%',
          left: '0%',
        })
      ),
      state(
        'right',
        style({
          width: '50%',
          height: '100%',
          top: '0%',
          left: '50%',
        })
      ),
      state(
        'top-left',
        style({
          width: '50%',
          height: '50%',
          top: '0%',
          left: '0%',
        })
      ),
      state(
        'top-right',
        style({
          width: '50%',
          height: '50%',
          top: '0%',
          left: '50%',
        })
      ),
      transition(`*=>*`, animate(window_animations)),
    ]),

  ],

})
export class WindowComponent implements OnInit {
  /**
   * History of overlay windows
   */
  public static WindowHistory: Window[] = [];
  /**
   * Minimum window width in pixels
   */
  static readonly MinWindowWidth: number = 300;
  /**
   * Minimum window height in pixels
   */
  static readonly MinWindowHeight: number = 150;
  /**
   * Specifies whether the window can be moved
   */
  public move: boolean = false;
  /**
   * Specifies whether the window can be resized
   */
  public resize: boolean = false;
  /**
   * Original window X location
   */
  protected originalX: number = 0;
  /**
   * Original window Y location
   */
  protected originalY: number = 0;
  /**
   * Original mouse location X
   */
  protected declare originalMouseX: number;
  /**
   * Original mouse location Y
   */
  protected declare originalMouseY: number;
  /**
   * Original window width
   */
  protected declare originalWidth: number;
  /**
   * Original window height
   */
  protected declare originalHeight: number;
  /**
   * Specifies the selected window border when resizing
   */
  public declare selectedDiv: HTMLElement;
  /**
   * Specifies the selected application window
   */
  static declare selectedWindow: ProcessWindowValueMetadata;
  /**
   * Indicates whether a mode other than normal mode was activated when you clicked on the application window.
   */
  protected declare activeWindowState: boolean;

  constructor() {
  }

  ngOnInit(): void {
    window.addEventListener('mouseup', () => {
      this.WindowOut();
    });
    window.addEventListener('mousemove', (event: any) => {
      this.moveWindow(event);
      this.resizeWindow(event);
    });
    window.addEventListener('mousedown', (e: MouseEvent) => {
      let p = e.target as HTMLElement;
      if (
        p.offsetParent?.id !== 'napicuos-App-window' &&
        WindowComponent.selectedWindow?.activated && !p.offsetParent?.classList.contains("DockIcon")
      ) {
        WindowComponent.selectedWindow.activated = false;
        NapicuOS.update_dock_items();
      }
    });
  }

  /**
   * Returns the value for the dynamic component
   * @param p Application window process
   */
  public getInput(p: Process): InputsType {
    let x = p.Window as SystemAlert;
    return {alertContent: x?.value || '', alertType: x?.type, windowValue: WindowComponent.selectedWindow};
  }

  /**
   * Function that closes the application window
   * @param window Application window
   * @param event The mouse event
   */
  public close(window: ProcessWindowValueMetadata, event: MouseEvent): void {
    window.close();
    NapicuOS.update_dock_items();
    event.stopPropagation();
  }

  /**
   * Function that maximizes or minimizes the window
   * @param window Application window
   * @param event The mouse event
   */
  public maximize(window: ProcessWindowValueMetadata, event: MouseEvent): void {
    //window.appData.maximized = window.appData.maximized ? false : true;
    window.state = window.isStateMaximized() ? 'normal' : 'maximized';
    event.stopPropagation();
  }

  /**
   * Function that minimizes the window into a bar
   * @param event - The mouse event
   */
  public minimized(event: MouseEvent): void {
    event.stopPropagation();
  }

  /**
   *  Functions for moving the application window
   * @param event - The mouse event
   */
  protected moveWindow(event: MouseEvent): void {
    const MouseValueX = event.pageX;
    const MouseValueY = event.pageY;
    const p = event.target as HTMLElement;
    if (!this.move || this.resize || !WindowComponent.selectedWindow) return;

    if (WindowComponent.selectedWindow.windowData.height && WindowComponent.selectedWindow.windowData.width) {
      this.unSnappingWindow(event);
      this.snappingWindow(event);
    }

    let x = MouseValueX + this.originalX;
    let y = MouseValueY + this.originalY;
    if (MouseValueY > 0) {
      WindowComponent.selectedWindow.setTop(y);
      WindowComponent.selectedWindow.setLeft(x);
    }

  }

  /**
   * Function to enlarge/reduce the window along the edges of the application window
   * @param event - The mouse event
   */
  protected resizeWindow(event: MouseEvent): void {
    if (WindowComponent.selectedWindow?.isStateMaximized()) return;
    if (this.move || !this.resize) return;
    let MouseValueX: number = event.pageX;
    let MouseValueY: number = event.pageY;
    let x;
    let y;
    let left;
    let top;

    if (this.selectedDiv.classList.contains('resizer')) {
      if (this.selectedDiv.classList.contains('bottom-right')) {
        x = this.originalWidth + (MouseValueX - this.originalMouseX);
        y = this.originalHeight + (MouseValueY - this.originalMouseY);
      } else if (this.selectedDiv.classList.contains('bottom-left')) {
        x = this.originalWidth - (MouseValueX - this.originalMouseX);
        y = this.originalHeight + (MouseValueY - this.originalMouseY);
        left = this.originalX + (MouseValueX - this.originalMouseX);
      } else if (this.selectedDiv.classList.contains('top-right')) {
        x = this.originalWidth + (MouseValueX - this.originalMouseX);
        y = this.originalHeight - (MouseValueY - this.originalMouseY);
        top = this.originalY + (MouseValueY - this.originalMouseY);
      } else if (this.selectedDiv.classList.contains('top-left')) {
        x = this.originalWidth - (MouseValueX - this.originalMouseX);
        y = this.originalHeight - (MouseValueY - this.originalMouseY);
        top = this.originalY + (MouseValueY - this.originalMouseY);
        left = this.originalMouseX + (MouseValueX - this.originalMouseX);
      } else if (this.selectedDiv.classList.contains('right')) {
        x = this.originalWidth + (MouseValueX - this.originalMouseX);
      } else if (this.selectedDiv.classList.contains('left')) {
        x = this.originalWidth - (MouseValueX - this.originalMouseX);
        left = this.originalX + (MouseValueX - this.originalMouseX);
      } else if (this.selectedDiv.classList.contains('bottom')) {
        y = this.originalHeight + (MouseValueY - this.originalMouseY);
      } else {
        y = this.originalHeight - (MouseValueY - this.originalMouseY);
        top = this.originalY + (MouseValueY - this.originalMouseY);
      }
    }

    if (x && x > WindowComponent.MinWindowWidth) {
      WindowComponent.selectedWindow.setWidth(x);
      if (left) WindowComponent.selectedWindow.setLeft(left);
    }
    if (y && y > WindowComponent.MinWindowHeight) {
      WindowComponent.selectedWindow.setHeight(y);
      if (top) WindowComponent.selectedWindow.setTop(top);
    }
  }

  /**
   * @param window Application window process
   * @param index Process index
   */
  public activeWindow(
    window: ProcessWindowValueMetadata,
    index: number
  ): void {
    if (WindowComponent.selectedWindow?.activated) WindowComponent.selectedWindow.activated = false;
    WindowComponent.switchWindowIndex(window, index);
  }

  public static switchWindowIndex(window: ProcessWindowValueMetadata, index: number): void {
    WindowComponent.WindowHistory.slice(index, 1);
    WindowComponent.WindowHistory.push(window);
    WindowComponent.WindowHistory.forEach((element: Window, int: number) => {
      element.z_index = int;
    });
    WindowComponent.selectedWindow = window;
    window.activated = true;
    NapicuOS.update_dock_items();
  }

  /**
   * Functions for saving parameters
   * @param process Application window process
   * @param event The mouse event
   */
  public resizesIn(
    process: ProcessWindowValueMetadata,
    event: MouseEvent
  ): void {
    this.resize = true;
    WindowComponent.selectedWindow = process;
    this.originalMouseX = event.pageX;
    this.originalMouseY = event.pageY;

    this.originalWidth = process.getWidth();
    this.originalHeight = process.getHeight();

    this.originalX = process.getLeft();
    this.originalY = process.getTop();

    this.selectedDiv = event.target as HTMLElement;
  }

  /**
   * Functions for saving parameters
   * @param process Application window process
   * @param event The mouse event
   */
  public moveWindowIn(
    process: ProcessWindowValueMetadata,
    event: MouseEvent
  ): void {
    this.originalX = process.getLeft() - event.pageX;
    this.originalY = process.getTop() - event.pageY;
    this.activeWindowState = !process.isStateNormal();
    this.move = true;
    WindowComponent.selectedWindow = process;
    //event.stopPropagation();
  }

  /**
   * Function for unsnapping the application window
   */
  protected unSnappingWindow(event: MouseEvent): void {
    if (
      this.activeWindowState &&
      (WindowComponent.selectedWindow.isStateMaximized() ||
        WindowComponent.selectedWindow.isStateLeft() ||
        WindowComponent.selectedWindow.isStateRight())
    ) {
      const v: Window = WindowComponent.selectedWindow;
      let w: number = window.innerWidth;
      let h: number = window.innerHeight;
      let x: number = event.pageX;
      let y: number = event.pageY;

      if (v.isStateLeft() || v.isStateRight()) {
        w /= 2;
      } else if (v.isStateTopLeft() || v.isStateTopRight()) {
        w /= 2;
        h /= 2;
      }
      let perNowX = percentageValue(
        percentage(x - (v.isStateRight() ? window.innerWidth / 2 : 0), w),
        WindowComponent.selectedWindow.getWidth()
      );
      let perNowY = percentageValue(
        percentage(y + 50, h),
        WindowComponent.selectedWindow.getHeight()
      );

      this.originalX = -perNowX;
      this.originalY = -perNowY;

      WindowComponent.selectedWindow.state = 'normal';
    }
  }

  /**
   * Function for snapping the application window
   */
  protected snappingWindow(event: MouseEvent): void {
    const p = event.target as HTMLElement;
    if (p.classList.contains('left')) {
      WindowComponent.selectedWindow.setStateLeft();
    } else if (p.classList.contains('right')) {
      WindowComponent.selectedWindow.setStateRight();
      return;
    } else if (event.pageY <= 0 && !p.classList.contains('resizer')) {
      WindowComponent.selectedWindow.setStateMaximized();
      return;
    } else if (p.classList.contains('top-left')) {
      WindowComponent.selectedWindow.setStateTopLeft();
      return;
    } else if (p.classList.contains('top-right')) {
      WindowComponent.selectedWindow.setStateTopRight();
      return;
    } else {
      WindowComponent.selectedWindow.setStateNormal();
    }
  }

  /**
   * Function to cancel active events when
   */
  public WindowOut(): void {
    this.move = false;
    this.resize = false;
  }

  /**
   * Application process rollback function
   */
  get AppProcess(): Process[] {
    return (
      NapicuOS.get_user_process(NapicuOS.get_active_user()?.username) || []
    );
  }

  /**
   * Returns whether the system has been started
   */
  get SystemBoot(): boolean {
    return NapicuOS.get_system_boot();
  }

  /**
   * Returns minimum window width in pixels
   */
  get MinWindowWidth(): number {
    return WindowComponent.MinWindowWidth;
  }
}
