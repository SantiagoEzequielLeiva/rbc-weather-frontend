import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BoardsComponent } from './boards/boards.component';
import { UsersComponent } from './users/users.component';
import { UserBoardsComponent } from './user-boards/user-boards.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardsComponent,
    UsersComponent,
    UserBoardsComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
