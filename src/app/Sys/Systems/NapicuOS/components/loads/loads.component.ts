import {Component, OnInit} from '@angular/core';
import {GrubComponent} from 'src/app/Grub/grub/grub.component';

@Component({
  selector: 'app-loads',
  templateUrl: './loads.component.html',
  styleUrls: ['./loads.component.scss'],
})
export class LoadsComponent implements OnInit {
  constructor() {
  }

  get Img(): string {
    var logo = GrubComponent.GrubActiveSystem.boot.logo;
    if (logo) {
      return logo;
    }
    return '';
  }

  ngOnInit(): void {
  }
}
