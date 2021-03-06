import {FlashComponent} from 'src/app/Bios/components/flash/flash.component';
import {In, Out} from 'src/app/Bios/Config/Animation/Flash';
import {Loading} from '../LoadingAnimations';

export function FlashBios(): void {
  FlashComponent.ezFlashWindow = true;
  Loading('flash', Out, In);
}
