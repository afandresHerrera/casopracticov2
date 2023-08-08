import { Component } from '@angular/core';
import { Spinkit } from 'ng-http-loader';

@Component({
  selector: 'app-root',
  template: `
  <router-outlet></router-outlet>

  <!-- Spinner de procesamiento -->
  <ng-http-loader [backgroundColor]="'#0370d1'" [spinner]="spinkit.skThreeBounce"></ng-http-loader>
  `
})
export class AppComponent {
  public spinkit = Spinkit;

}
