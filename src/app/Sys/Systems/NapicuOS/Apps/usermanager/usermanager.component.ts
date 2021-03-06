import {Component} from '@angular/core';
import {SystemUserPermissionsEnumMetadata} from "../../config/UserPerms";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SystemStateMetadata} from "../../interface/System";
import {
  SYSTEM_USERS_MAX_LENGTH,
  SYSTEM_USERS_MAX_PASSWORD_LENGTH,
  SYSTEM_USERS_MIN_LENGTH,
  SYSTEM_USERS_MIN_PASSWORD_LENGTH
} from "../../config/System";
import {NapicuOS} from "../../system.napicuos";
import {User} from "../../SystemComponents/User";
import {systemAlertImagesEnumMetadata} from "../../config/Alert";
import {UserManagerForm} from "../../interface/Apps/UsermanagerForm";


@Component({
  selector: 'app-usermanager',
  templateUrl: './usermanager.component.html',
  styleUrls: ['./usermanager.component.scss']
})
export class UsermanagerComponent {

  constructor() {
  }


  public formData = new FormGroup<UserManagerForm>( {
    username: new FormControl<string>("", { validators: [
      Validators.required,
      Validators.minLength(SYSTEM_USERS_MIN_LENGTH),
      Validators.maxLength(SYSTEM_USERS_MAX_LENGTH),
    ], nonNullable: true }),

    password: new FormControl<string>("", { validators: [
        Validators.required,
        Validators.minLength(SYSTEM_USERS_MIN_PASSWORD_LENGTH),
        Validators.maxLength(SYSTEM_USERS_MAX_PASSWORD_LENGTH),
      ], nonNullable: true }),

    permission: new FormControl<SystemUserPermissionsEnumMetadata>(SystemUserPermissionsEnumMetadata.User, { validators: [
      Validators.required,
    ], nonNullable: true})
  });

  public onButtonClick() {
    if (this.formData.valid) {
      let i = NapicuOS.add_user(new User({
        username: this.formData.value.username || "NULL",
        password: this.formData.value.password || "NULL",
        permissions: this.formData.value.permission,
      }));

      if (i === SystemStateMetadata.UserExists) {
        NapicuOS.alert("User Manager", "User already exists", systemAlertImagesEnumMetadata.Error);
      } else if (i === SystemStateMetadata.UserNotExists) {
        NapicuOS.alert("User Manager", "User added", systemAlertImagesEnumMetadata.Info);
      }
    }
  }

  get GetUsersPermission() {
    return Object.keys(SystemUserPermissionsEnumMetadata);
  }


}
