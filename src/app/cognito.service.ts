import { Injectable } from '@angular/core';
import * as crypto from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {
  private clientId = '6gs5ar8gmebe8otni6kuipr7fh';
  private clientSecret = '13k92k5un80c46ndvglbarind776qf7p7c5up25c981mnlrk8pc8';

  constructor() { }

  generateSecretHash(username: string): string {
    const message = username + this.clientId;
    const hash = crypto.HmacSHA256(message, this.clientSecret);
    return crypto.enc.Base64.stringify(hash);
  }

  getClientId(): string {
    return this.clientId;
  }

  getClientSecret(): string {
    return this.clientSecret;
  }
}
