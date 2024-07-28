// app.component.ts
import { Component } from '@angular/core';
import { CognitoService } from './cognito.service';
import { CognitoIdentityServiceProvider } from 'aws-sdk';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cognito-angular';

  formFields = {
    signUp: {
      name: {
        order: 1
      },
      email: {
        order: 2
      },
      password: {
        order: 3
      },
      confirm_password: {
        order: 4
      }
    },
  };

  private cognitoServiceProvider: CognitoIdentityServiceProvider;

  constructor(private cognitoService: CognitoService) {
    this.cognitoServiceProvider = new CognitoIdentityServiceProvider({
      region: 'us-east-1'
    });
  }

  async signIn(username: string, password: string) {
    const secretHash = this.cognitoService.generateSecretHash(username);

    const params = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: this.cognitoService.getClientId(),
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
        SECRET_HASH: secretHash
      }
    };

    console.log('SECRET_HASH:', secretHash);
    console.log('params:', params);

    try {
      const response = await this.cognitoServiceProvider.initiateAuth(params).promise();
      console.log('User signed in', response);
    } catch (error) {
      console.log('Error signing in', error);
    }
  }
}
