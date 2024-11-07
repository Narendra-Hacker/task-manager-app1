import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { NavigationService } from './services/navigation.service';
@Component({
 selector: 'app-root',
 templateUrl: './app.component.html',
 styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 constructor(
   private router: Router,
   private userService: UserService,
   private navigationService: NavigationService
 ) {}
 ngOnInit(): void {
   // Only restore the route if the user is authenticated
   if (this.userService.isAuthenticated()) {
     this.navigationService.restoreRoute();
   }
 }
}


// import { Component, OnInit } from '@angular/core';
// import { NavigationEnd, Router } from '@angular/router';
// import { NavigationService } from './services/navigation.service';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'] // Corrected styleUrl to styleUrls
// })
// export class AppComponent implements OnInit {
//   constructor(private router: Router, private navigationService: NavigationService) {}

//   ngOnInit(): void {
//     // Restore the route on application load
//     this.navigationService.restoreRoute();

//     //Save the current route on navigation end
//     // this.router.events.subscribe(event => {
//     //   if (event instanceof NavigationEnd) {
//     //     this.navigationService.saveCurrentRoute(event.urlAfterRedirects);
//     //   }
//     // }); 
//   }
// }