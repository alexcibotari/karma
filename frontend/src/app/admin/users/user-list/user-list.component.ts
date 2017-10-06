import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {ApolloService} from '../../../core/apollo.service';
import {ConfirmationDialogComponent} from '../../../shared/component/dialog/confirmation-dialog/confirmation-dialog.component';
import {UserDataSource} from '../../shared/user-data-source.service';
import {User} from '../../shared/user.model';
import {UserService} from '../../shared/user.service';
import {UserDetailComponent} from '../user-detail/user-detail.component';
import {UserEditComponent} from '../user-edit/user-edit.component';

@Component({
    moduleId: module.id,
    selector: 'nkm-user-list',
    templateUrl: 'user-list.component.html',
    styleUrls: ['user-list.component.scss'],
    providers: []
})
export class UserListComponent implements OnInit {
    displayedColumns = ['avatar', 'name', 'login', 'email', 'actions'];

    @ViewChild('filter') filter: ElementRef;

    constructor(private userService: UserService,
                public dataSource: UserDataSource,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        Observable.fromEvent(this.filter.nativeElement, 'keyup')
            .debounceTime(150)
            .distinctUntilChanged()
            .subscribe(() => {
                this.dataSource.filter = this.filter.nativeElement.value;
            });
    }

    toDetail(user: User) {
        const dialogRef = this.dialog.open(UserDetailComponent, {data: user});
        dialogRef.afterClosed().subscribe((result: User) => {
            console.log(result);
        });
    }

    toEdit(user: User) {
        const dialogRef = this.dialog.open(UserEditComponent, {data: user});
        dialogRef.afterClosed().subscribe((result: User) => {
            console.log(result);
        });
    }

    toDelete(user: User) {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {data: {content: `Delete ${user.name} user ?`}});
        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
        });
    }
}
