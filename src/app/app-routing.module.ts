import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router } from '@angular/router';

import { AppComponent } from './app.component';
import { BoardsComponent } from './boards/boards.component';
import { UsersComponent } from './users/users.component';
import { UserBoardsComponent } from './user-boards/user-boards.component';

const appRoutes = [
    { path : '', redirectTo : '/boards', pathMatch : 'full' },
    { path : 'index', component : AppComponent },
    { path : 'boards', component : BoardsComponent },
    { path : 'users', component : UsersComponent },
    { path : 'boards/:username', component : UserBoardsComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
    exports: [RouterModule],
})

export class AppRoutingModule {}
