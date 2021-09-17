import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';
import { BlackscreenComponent } from 'src/app/Bios/blackscreen/blackscreen.component';
import {
  CursorAnimationIN,
  CursorAnimationTimeIn,
  CursorMoveDown,
  CUrsorTimeOut,
} from 'src/app/Config/Animation/animationCursor';

export function setDisplayText(text: string[], index?: number): void {
  if (index && BlackscreenComponent.text[index]) {
    BlackscreenComponent.text[index] = text[0];
  } else {
    BlackscreenComponent.text = text;
  }
}
//TODO
//? Class
//? In Function

export class animationCursor {
  constructor() {}

  /**
   * Interval for blinking cursor
   */
  protected interval: any;

  /**
   * Array that shows up in BlackscreenComponent.text
   */
  protected arrayText: string[] = [];

  /**
   * Starts a blinking cursor animation
   */
  blinking(): void {
    //TODO async
    setDisplayText(['_']);
    this.interval = setInterval(() => {
      setTimeout(() => {
        BlackscreenComponent.text.push('_');
        setTimeout(() => {
          BlackscreenComponent.text.splice(BlackscreenComponent.text.length - 1, 1);
        }, 500);
      }, CursorAnimationTimeIn);
    }, CursorAnimationIN);
  }

  /**
   * Moves the cursor down in blackscreen
   */
  moveDown(): void {
    var i: number = 0;
    var maxTime: number = 10;
    var id: any;
    id = setInterval(() => {
      setTimeout(() => {
        if (i <= maxTime) {
          BlackscreenComponent.text.unshift(' ');
          i++;
        } else {
          clearInterval(id);
        }
      }, CUrsorTimeOut);
    }, CursorMoveDown);
  }
  /**
   * Stop blinking
   */
  stop(): void {
    this.interval = undefined;
  }
}