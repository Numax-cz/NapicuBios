import { FlashingText } from 'src/app/Array/FlashInformation';
import { FlashComponent } from 'src/app/flash/flash.component';

export function ProgressBar(time: number, callback: () => void): void {
  var bar = FlashComponent.ProgressBar;
  var i = 0;
  if (bar) {
    if (i == 0) {
      i = 1;
      var width = 10;
      var id = setInterval(frame, time);
      function frame() {
        var d = Math.random();
        if (d < 0.5) {
          setTimeout(() => {
            Move();
          }, time * 8);
        } else if (d < 0.7) {
          setTimeout(() => {
            Move();
          }, time * 11);
        } else {
          Move();
        }
        function Move() {
          if (width >= 100) {
            clearInterval(id);
            //TODO Exit witch setTimeOut
            if (i == 0) return;
            i = 0;
            callback();
          } else {
            width++;
            bar.style.width = width + '%';
          }
        }
      }
    }
  }
}

//Restart
