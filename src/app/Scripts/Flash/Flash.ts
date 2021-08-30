import { FlashingText } from 'src/app/Array/FlashInformation';
import { Checking, Erasing, Verifying, Writing } from 'src/app/Config/Animation/Flash';
import { FlashComponent } from 'src/app/flash/flash.component';
import { OptionPanelComponent } from 'src/app/option-panel/option-panel.component';
import { Window } from '../Window';
import { ReadyToFlash, SuccesFlash } from './OpenWindow';
import { ProgressBar } from './ProgressBar';

export function CheckBIOSFile() {
  FlashComponent.Flashing = true;
  FlashComponent.FlashingText = FlashingText[0];
  ProgressBar(Checking, 'Bar', () => {
    //TODO Alert
    ReadyToFlash();
  });
}
export function ErasingBIOS() {
  FlashComponent.FlashingText = FlashingText[1];
  ProgressBar(
    Erasing,
    'Bar1',
    () => {
      WritingBIOS();
    },
    80
  );
}
export function WritingBIOS() {
  FlashComponent.FlashingText = FlashingText[2];
  ProgressBar(Writing, 'Bar2', () => {
    VerifyingBIOS();
  });
}

export function VerifyingBIOS() {
  FlashComponent.FlashingText = FlashingText[3];
  ProgressBar(Verifying, 'Bar3', () => {
    SuccesFlash();
  });
}
