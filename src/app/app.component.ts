import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { PushNotificationService } from './push-notification.service';

const VAPID_PUBLIC = "BOZ2vUuFBgKO2wEfH6jhLpgw8W0WDnApgRce_4oOVw2zsifge9fyaMfC-SVSxzl9aqnc70idpw_zcA5luliMEPA"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
//{"publicKey":"BOZ2vUuFBgKO2wEfH6jhLpgw8W0WDnApgRce_4oOVw2zsifge9fyaMfC-SVSxzl9aqnc70idpw_zcA5luliMEPA","privateKey":"9sfcETj-SUrWuf8BHI-O0w6Wa9Xv2NaNxYyUpV2LBWs"}
export class AppComponent {
  title = 'angular-push-notifications';
  
  constructor( private swPush: SwPush, private pushService: PushNotificationService ){
    if( this.swPush.isEnabled ){
      this.swPush.requestSubscription({
        serverPublicKey: VAPID_PUBLIC
      })
      .then(subscription => {
        this.pushService.sendSubscriptionToTheServer( subscription ).subscribe()
      })
      .catch(console.error)
    }
  }
}
