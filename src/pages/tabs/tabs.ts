import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { DepositWithdrawalsPage } from '../deposit-withdrawals/deposit-withdrawals';
import { OpenAccountPage } from '../open-account/open-account';

import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = DepositWithdrawalsPage;
  tab3Root = OpenAccountPage;

  constructor() {

  }
}
