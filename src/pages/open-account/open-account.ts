import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-open-account',
  templateUrl: 'open-account.html',
})
export class OpenAccountPage {
  generatedAccount: any;
  name: any;
  age: any;
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private auth: AuthServiceProvider) {
    this.user = this.auth.user;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OpenAccountPage');
  }

  register(){
    //generate new account number
    this.generatedAccount = Math.floor((Math.random() * 999999999) + 1);
    console.log(this.generatedAccount);
    let data = {
      account: this.generatedAccount
    }
    this.auth.register(this.generatedAccount,this.user.idToken,data)
    .subscribe((data)=>{
    });
  }

}
