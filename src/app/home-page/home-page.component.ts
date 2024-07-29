import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as Auth from '@aws-amplify/auth';
import { getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  user: any;
  session: any;
  fullName: string | undefined;
  email: string | undefined;
  idTokenPayload: any;
  accessTokenPayload: any;
  refreshToken: any;

  constructor(private cdr: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
    try {
      this.user = await this.getCurrentUser();
      // console.log('User:');
      // console.log(this.user);
 
       this.session = await this.getCurrentSession();
      // console.log('Session:');
      // console.log(this.session);
 
       this.idTokenPayload = await this.getIdTokenPayload();
       this.accessTokenPayload = await this.getAccessTokenPayload();
 
       this.fullName = await this.getCurrentUserFullName();
       this.email = await this.getCurrentUserEmail();
 
       this.refreshToken = this.getRefreshTokenFromLocalStorage();

    } catch (error) {
      console.log('Error fetching user data:', error);
    } 
  }

  async getCurrentUser() {
    return await getCurrentUser();
  }

  async getCurrentSession() {
    return (await fetchAuthSession()).tokens;
  }

  async getCurrentUserFullName(): Promise<string | undefined> {
    let cognitoToken = await (await fetchAuthSession()).tokens;
    return cognitoToken?.idToken?.payload['name']?.toString();
  }

  async getCurrentUserEmail(): Promise<string | undefined> {
    let cognitoToken = await (await fetchAuthSession()).tokens;
    return cognitoToken?.idToken?.payload['email']?.toString();
  }

  async getIdTokenPayload(): Promise<any> {
    let cognitoToken = await (await fetchAuthSession()).tokens;
    return cognitoToken?.idToken?.payload;
  }

  async getAccessTokenPayload(): Promise<any> {
    let cognitoToken = await (await fetchAuthSession()).tokens;
    return cognitoToken?.accessToken?.payload;
  }

  getRefreshTokenFromLocalStorage(): string | null {
    const keySuffix = '.refreshToken';
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.endsWith(keySuffix)) {
        return localStorage.getItem(key);
      }
    }
    return null;
  }
  async signOut() {
    try {
      this.user = null;
      this.session = null;
      this.fullName = undefined;
      this.email = undefined;
      this.idTokenPayload = null;
      this.accessTokenPayload = null;
      this.refreshToken = null;
      localStorage.clear();
      console.log('User signed out');
      await Auth.signOut();
    } catch (error) {
      console.log('Error signing out:', error);
    }
  }

}
