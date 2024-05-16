import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialResponse } from 'google-one-tap';
import { environment } from 'src/environments/environment';
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  auth2: any;

  public googleInit() {
    const initClient = () => {
      this.auth2 = gapi.auth2.init({
        client_id: environment.clientId,
      });
    };
    gapi.load("auth2", initClient);
  }

  constructor(
    private router: Router,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    // @ts-ignore
    window.onGoogleLibraryLoad = () => {

      // @ts-ignore
      google.accounts.id.initialize({
        client_id: environment.clientId,
        callback: this.handleCredentialResponse.bind(this),
        auto_select: true,
        cancel_on_tap_outside: false
      });
      // @ts-ignore
      google.accounts.id.renderButton(
        // @ts-ignore
        document.getElementById("googleLoginBtn"),
        { "scope": "profile email", theme: "outline", shape: "pill" }
      );
      // @ts-ignore
      google.accounts.id.prompt((notification: PromptMomentNotification) => { });
    };
  }

  handleCredentialResponse(response: CredentialResponse) {
    this.ngZone.run(() => {
      this.router.navigate(['/home']);
    });
  }

}
