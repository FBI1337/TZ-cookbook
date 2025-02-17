import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Повареная книга';


  constructor(private router: Router) { }

  ngOnit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        console.log('NavigationStart:', event);
      }
      if (event instanceof NavigationEnd) {
        console.log('NavigationEnd:', event);
      }
      if (event instanceof NavigationError) {
        console.log('NavigationError:', event);
      }
      if (event instanceof NavigationCancel) {
        console.log('NavigationCancel:', event);
      }
    });
  }
}
