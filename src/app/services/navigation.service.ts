import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
 providedIn: 'root'
})
export class NavigationService {
 constructor(private router: Router) {}
 saveCurrentRoute(route: string): void {
   localStorage.setItem('currentRoute', route);
 }
 restoreRoute(): void {
   const savedRoute = localStorage.getItem('currentRoute');
   if (savedRoute) {
     this.router.navigateByUrl(savedRoute).catch(err => console.error('Navigation error:', err));
   }
 }
}



// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class NavigationService {
//   constructor(private router: Router) {}

//   saveCurrentRoute(route: string): void {
//     console.log('Saving route:', route);
//     localStorage.setItem('currentRoute', route);
//   }

//   restoreRoute(): void {
//     const savedRoute = localStorage.getItem('currentRoute');
//     console.log('Restoring route:', savedRoute);
//     if (savedRoute) {
//       this.router.navigateByUrl(savedRoute).catch(err => {
//         console.error('Navigation error:', err);
//       });
//     }
//   }
// }

