import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  api = 'http://localhost:3000/subscription'
  constructor(private _http: HttpClient) { }

  sendSubscriptionToTheServer(subscription: PushSubscription){
    return this._http.post( this.api, subscription )
  }
}
