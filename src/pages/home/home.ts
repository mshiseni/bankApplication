import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loggedUser: any;
  user: any;
  name: any;
  accounts: any;
  balances: any;

  constructor(public navCtrl: NavController,private auth: AuthServiceProvider) {
    this.loggedUser = this.auth.user;
    this.getAccounts();
  }
  //getting account details
  getAccounts() {
    this.auth.getAccounts(this.loggedUser.localId,this.loggedUser.idToken)
    .then(data => {
      this.user = data;
      this.accounts = this.user.accounts;
      this.getBalances(this.accounts,this.loggedUser.idToken);
    });
  }
  //getting account balances
  getBalances(accounts,token) {
    this.auth.getBalances(accounts,token)
    .then(data => {
      this.balances = data;
    });
  }

}
