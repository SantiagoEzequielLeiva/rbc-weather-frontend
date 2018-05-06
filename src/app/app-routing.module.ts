import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router } from '@angular/router';

import { AppComponent } from './app.component';
import { BoardsComponent } from './boards/boards.component';
import { UsersComponent } from './users/users.component';

const appRoutes = [
    { path : '', redirectTo : '/users', pathMatch : 'full' },
    { path : 'index', component : AppComponent },
    { path : 'boards', component : BoardsComponent },
    { path : 'users', component : UsersComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
    exports: [RouterModule],
})

export class AppRoutingModule {}
