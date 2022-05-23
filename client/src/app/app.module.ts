import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgMaterialUIModule } from './ng-material-ui/ng-material-ui.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommunityComponent } from './community/community.component';
import { SidenavComponent } from './@layout/sidenav/sidenav.component';
import { ToolbarModule } from './@layout/toolbar/toolbar.module';
import { IndexComponent } from './pages/index/index.component'
import { MatIconModule } from '@angular/material/icon';
import { AuthModule } from './pages/auth/auth.module';
import { CommunityModule } from './community/community.module';


@NgModule({
    declarations: [
        AppComponent,
        IndexComponent,
        CommunityComponent,
        SidenavComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgMaterialUIModule,
        FormsModule,
        HttpClientModule,
        ToolbarModule,
        MatIconModule,
        AuthModule,
        CommunityModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
