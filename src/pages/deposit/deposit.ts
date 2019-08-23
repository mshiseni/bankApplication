import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-deposit',
  templateUrl: 'deposit.html',
})
export class DepositPage {
  accountNumber: any;
  index: any;
  user: any;
  balance: any;
  finalBalance: any;
  finalOverdraft: any;
  amount: any;
  overdraft: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthServiceProvider) {
    this.user = this.auth.userLoggedIn;
    this.accountNumber = this.navParams.get('account');
    this.index = this.navParams.get('index');
    console.log(this.accountNumber);
    console.log(this.index);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DepositPage');
    this.getAccountBalance(this.accountNumber,this.user.ra);
  }

  //get account balance
  getAccountBalance(accountNumber,token){
    this.auth.getSingleBalance(accountNumber,token)
    .then(data => {
      this.balance = data;
      this.finalBalance = this.balance.balance;
      this.finalOverdraft = this.balance.overdraft;
    });
  }

  //deposit amount
  deposit(){
    console.log(this.amount);
    var data = {
      balance: this.amount,
      overdraft: this.overdraft
    }
    this.auth.postDeposit(this.accountNumber,this.user.ra,data)
    .subscribe(data => {
      console.log("Working");
      console.log(data);
    });
    this.navCtrl.pop();
  }

  //withdraw amount
  withdraw(){
    console.log(this.amount);
    var data = {
      balance: this.amount,
      overdraft: this.overdraft
    }
    this.auth.postDeposit(this.accountNumber,this.user.ra,data)
    .subscribe(data => {
      console.log("Working");
      console.log(data);
    });
    this.navCtrl.pop();
  }

}
