import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { DepositPage } from '../../pages/deposit/deposit';

@IonicPage()
@Component({
  selector: 'page-deposit-withdrawals',
  templateUrl: 'deposit-withdrawals.html',
})
export class DepositWithdrawalsPage {
  logedUser: any;
  user: any;
  name: any;
  accounts: any;
  balances: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private auth: AuthServiceProvider) {
    this.logedUser = this.auth.userLoggedIn;
    this.getAccounts();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DepositWithdrawalsPage');
    this.getAccounts();
  }

  //get all accounts
  getAccounts() {
    this.auth.getAccounts(this.logedUser.uid,this.logedUser.ra)
    .then(data => {
      this.user = data;
      this.accounts = this.user.accounts;
      console.log(this.accounts);
      this.getBalances(this.accounts,this.logedUser.ra);
    });
  }

  //get balances
  getBalances(accounts,token) {
    this.auth.getBalances(accounts,token)
    .then(data => {
      this.balances = data;
    });
  }

  //open page for deposit or withdraw for selected account
  openPage(account,index){
    console.log(account);
    console.log(index);
    this.navCtrl.push(DepositPage, {account: account, index: index})
  }

}
