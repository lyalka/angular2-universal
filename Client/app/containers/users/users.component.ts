﻿import {
    Component, OnInit,
    // animation imports
    trigger, state, style, transition, animate, Inject
} from '@angular/core';
import { IUser } from '../../models/User';
import { UserService } from '../../shared/user.service';

@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {

    users: IUser[];
    selectedUser: IUser;

    // Use "constructor"s only for dependency injection
    constructor(private userService: UserService) { }

    // Here you want to handle anything with @Input()'s @Output()'s
    // Data retrieval / etc - this is when the Component is "ready" and wired up
    ngOnInit() {
        this.userService.getUsers().subscribe(result => {
            this.users = result as IUser[];
        });
    }

    onReloadUsers() {
      this.userService.getUsers().subscribe(result => {
        this.users = result as IUser[];
      });
    }

    onSelect(user: IUser): void {
          this.selectedUser = user;
    }

    deleteUser(user) {
        this.userService.deleteUser(user).subscribe(result => {
            console.log('Delete user result: ', result);
            if (result.ok) {
                let position = this.users.indexOf(user);
                this.users.splice(position, 1);
            }
        }, error => {
            console.log(`There was an issue. ${error._body}.`);
        });
    }

    addUser(newUserName) {
        this.userService.addUser(newUserName).subscribe(result => {
            console.log('Post user result: ', result);
            if (result.ok) {
                this.users.push(result.json());
            }
        }, error => {
            console.log(`There was an issue. ${error._body}.`);
        });
    }
}
