import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    currentUser: User = null;

    constructor(
        private _userService: UserService,
        private _router: Router
    ) { }

    ngOnInit() {
        this.isLoggedIn();
    }

    isLoggedIn() {
        if (this._userService.getCurrentUser() == null) {
            this._router.navigateByUrl('/');
        }
    }

    logout(): void {
        this._userService.logout((res) => {
            this.currentUser = null;
            this._router.navigateByUrl('/');
        });
    }

}
