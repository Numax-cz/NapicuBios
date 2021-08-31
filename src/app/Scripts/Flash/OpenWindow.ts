import { WriteInformations, WriteInformationsDefault } from 'src/app/Array/FlashInformation';
import { BiosComponent } from 'src/app/bios/bios.component';
import { reboot } from 'src/app/Config/Animation/Flash';
import { FlashComponent } from 'src/app/flash/flash.component';
import { OptionPanelComponent } from 'src/app/option-panel/option-panel.component';
import { Reboot } from '../exit/Reboot';
import { Window } from '../Window';
import { ErasingBIOS } from './Flash';

export function FileIsUnsupported(): void {
  OptionPanelComponent.window = new Window([{ title: 'Ok' }], 'This file is not supported!', undefined, true, true);
}

export function ReadyToFlash(): void {
  WriteInformations();
  FlashComponent.Flashing = false;
  OptionPanelComponent.window = new Window(
    [{ title: 'Yes' }, { title: 'No' }],
    'Are you sure to update BIOS?',
    () => {
      ErasingBIOS();
    },
    true,
    true,
    () => {
      setTimeout(() => {
        WriteInformationsDefault();
      }, 250);
    }
  );
}
export function SuccesFlash(): void {
  OptionPanelComponent.window = new Window([], 'Update is done! System will reboot.', undefined, true, true);
  setTimeout(() => {
    Reboot();
    FlashComponent.Flashing = false;
  }, reboot);
}