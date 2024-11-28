import { Injectable } from '@angular/core';
import { User } from '../models/User';
@Injectable({
 providedIn: 'root'
})
export class UserService {
 private localStorageKey = 'users';
 private loggedInUserKey = 'loggedInUser'; 
 private loggedInUser:User | null =null; 

 constructor() {
   this.loadLoggedInUser(); 
 }
 
 getUsers(): User[] {
   const users = localStorage.getItem(this.localStorageKey);
   return users ? JSON.parse(users) as User[] : [];
 }

 addUser(user: User): void {
   const users = this.getUsers();
user.id
= this.generateUniqueId(users);
   users.push(user);
   localStorage.setItem(this.localStorageKey, JSON.stringify(users));
 }

 private generateUniqueId(users: User[]): number {
   return users.length ? Math.max(...users.map(user =>
user.id
)) + 1 : 1;
 }
 
 authenticateUser(email: string, password: string): User | undefined {
   const users = this.getUsers();
   const user = users.find(u => u.email === email && u.password === password);
   if (user) {
     this.loggedInUser = user;
     localStorage.setItem(this.loggedInUserKey, JSON.stringify(user)); // Persist the logged-in user
   }
   return user;
 }
 
 isAuthenticated(): boolean {
   return this.loggedInUser !== null;
 }

 private loadLoggedInUser(): void {
   const storedUser = localStorage.getItem(this.loggedInUserKey);
   if (storedUser) {
     this.loggedInUser = JSON.parse(storedUser) as User;
   }
 }

 logout(): void {
   this.loggedInUser = null;
   localStorage.removeItem(this.loggedInUserKey); 
 }
 
 
  getLoggedInUserId(): number | null {
    return this.loggedInUser  ? this.loggedInUser .id : null; 
  }
}