import { Injectable } from '@angular/core';
import { User } from '../../models/User';
@Injectable({
 providedIn: 'root'
})
export class UserService {
 private localStorageKey = 'users';
 private loggedInUserKey = 'loggedInUser'; // Key for storing the logged-in user
 private loggedInUser:User | null =null; // property to hold the logged-in user

 constructor() {
   this.loadLoggedInUser(); // Load persisted logged-in user on service initialization
 }
 // Get all users
 getUsers(): User[] {
   const users = localStorage.getItem(this.localStorageKey);
   return users ? JSON.parse(users) as User[] : [];
 }
 // Add a new user
 addUser(user: User): void {
   const users = this.getUsers();
user.id
= this.generateUniqueId(users);
   users.push(user);
   localStorage.setItem(this.localStorageKey, JSON.stringify(users));
 }
 // Generate a unique ID
 private generateUniqueId(users: User[]): number {
   return users.length ? Math.max(...users.map(user =>
user.id
)) + 1 : 1;
 }
 // Authenticate user
 authenticateUser(email: string, password: string): User | undefined {
   const users = this.getUsers();
   const user = users.find(u => u.email === email && u.password === password);
   if (user) {
     this.loggedInUser = user;
     localStorage.setItem(this.loggedInUserKey, JSON.stringify(user)); // Persist the logged-in user
   }
   return user;
 }
 // Check if user is authenticated
 isAuthenticated(): boolean {
   return this.loggedInUser !== null;
 }
 // Load persisted user
 private loadLoggedInUser(): void {
   const storedUser = localStorage.getItem(this.loggedInUserKey);
   if (storedUser) {
     this.loggedInUser = JSON.parse(storedUser) as User;
   }
 }
 // Logout user
 logout(): void {
   this.loggedInUser = null;
   localStorage.removeItem(this.loggedInUserKey); // Clear the persisted logged-in user
 }
}