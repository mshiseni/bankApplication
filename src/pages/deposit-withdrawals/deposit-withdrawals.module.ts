import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DepositWithdrawalsPage } from './deposit-withdrawals';

@NgModule({
  declarations: [
    DepositWithdrawalsPage,
  ],
  imports: [
    IonicPageModule.forChild(DepositWithdrawalsPage),
  ],
})
export class DepositWithdrawalsPageModule {}
