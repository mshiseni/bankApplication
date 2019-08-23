import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OpenAccountPage } from './open-account';

@NgModule({
  declarations: [
    OpenAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(OpenAccountPage),
  ],
})
export class OpenAccountPageModule {}
