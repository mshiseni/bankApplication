import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;

export const firebaseConfig = {
	fire: {
		apiKey: "AIzaSyAR4Yezxk7Ao4qeFntu7tIvE7pH28Eh64Y",
		authDomain: "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAR4Yezxk7Ao4qeFntu7tIvE7pH28Eh64Y",
	}
};

@Injectable()
export class AuthServiceProvider {

  //variables that are used globally
  userLoggedIn: firebase.User;
  baseUrl: string = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAR4Yezxk7Ao4qeFntu7tIvE7pH28Eh64Y";
  clientUrl: string = "https://momentum-retail-practical-test.firebaseio.com/clients/";
  accountUrl: string = "https://momentum-retail-practical-test.firebaseio.com/accounts/";
  allAccounts: any;
  balances: any;
  allBalances: any[] = [];
  singleBalances: any;
  user: any;

  constructor(public afAuth: AngularFireAuth, private http: HttpClient) {
    //Auth for firebase
    console.log('Hello AuthServiceProvider Provider');
    afAuth.authState.subscribe(user => {
      console.log(user);
			this.userLoggedIn = user;
		});
  }
//Signing in to the app
  signInWithEmailAndPassword(credentials) {
    console.log('Sign in with email');
    console.log(credentials);
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
			 credentials.password);
  }
//Login to app
  postLogin(parameter){
    var full_url = this.baseUrl;
    return this.http.post(full_url, parameter).map(res=>res);
  }

  //Getting all accounts for the logged in user
  getAccounts(id,token){

    if (this.allAccounts) {
      return Promise.resolve(this.allAccounts);
    }
  
    return new Promise(resolve => {
      this.http.get(this.clientUrl + id + ".json?auth=" + token)
        .subscribe(data => {
          console.log(data);
          this.allAccounts = data;
          resolve(this.allAccounts);
        },
        err => {
          console.log("Oops!");
        });
    });
  }

//Getting all balances on accounts
  getBalances(accountNumbers,token){
    return new Promise(resolve => {
      console.log("............");
      console.log(accountNumbers);
      for (let index = 0; index < accountNumbers.length; index++) {
        this.http.get(this.accountUrl + accountNumbers[index] + ".json?auth=" + token)
        .subscribe(data => {
          console.log("Balances are....");
          console.log(data);
          this.balances = data;
          this.allBalances.push(this.balances);
          resolve(this.allBalances);
          console.log("Listing all balances");
          console.log(this.allBalances);
        },
        err => {
          console.log("Oops!");
        });
      }
    });
  }
  //Get balance for single account
  getSingleBalance(accountNumber,token){

    if (this.singleBalances) {
      return Promise.resolve(this.allAccounts);
    }
  
    return new Promise(resolve => {
        this.http.get(this.accountUrl + accountNumber + ".json?auth=" + token)
        .subscribe(data => {
          this.singleBalances = data;
          resolve(this.singleBalances);
        },
        err => {
          console.log("Oops!");
        });
    });
  }
  //deposit to account number provided
  postDeposit(accountNumber,token,product){
    return  this.http.post(this.accountUrl + accountNumber + ".json?auth=" + token , product)
    .map(response  => {
      console.log(response);
    });
  }

  putDeposit(parameter){
    var full_url = this.accountUrl;
    return this.http.put(full_url, parameter).map(res=>res);
  }

  //Register new account number
  register(accountNumber,token,parameter){
    return  this.http.post(this.accountUrl + accountNumber + ".json?auth=" + token , accountNumber)
    .map(response  => {
      console.log(response);
    });

  }

}
