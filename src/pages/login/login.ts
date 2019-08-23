import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//Form form validations
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//Import Auth Service
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { TabsPage } from '../../pages/tabs/tabs';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
	loginError: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,fb: FormBuilder,private auth: AuthServiceProvider) {
    
    this.loginForm = fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
		let data = this.loginForm.value;

		if (!data.email) {
			return;
		}

		let credentials = {
			email: data.email,
			password: data.password,
			returnSecureToken: true
		};

		this.auth.postLogin(credentials)
		.subscribe((data)=>{
			console.log("Working data");
			console.log(data);
			this.auth.user = data;
			this.navCtrl.setRoot(TabsPage);
		})
	}

}
