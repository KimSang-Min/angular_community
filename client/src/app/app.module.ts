import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgMaterialUIModule } from './ng-material-ui/ng-material-ui.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ToolbarModule } from './@layout/toolbar/toolbar.module';
import { IndexComponent } from './pages/index/index.component'
import { MatIconModule } from '@angular/material/icon';

import { CommunityComponent } from './@layout/community.component';
import { CommunityModule } from './@layout/community.module';
import { AuthModule } from './pages/auth/auth.module';
import { JwtModule } from '@auth0/angular-jwt';
import { ENV } from 'src/@dw/config/config';
import { DialogModule } from 'src/@dw/dialog/dialog.module';
import { SidenavModule } from './@layout/sidenav/sidenav.module';
import { ChattingModule } from './@layout/chatting/chatting.module';


export function tokenGetter() {
	return localStorage.getItem(ENV.tokenName);
}


@NgModule({
    declarations: [
        AppComponent,
        IndexComponent,
        CommunityComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        NgMaterialUIModule,
        FormsModule,
        HttpClientModule,
        ToolbarModule,
        MatIconModule,
        CommunityModule,
        AuthModule,
        DialogModule,
        CommunityModule,
        SidenavModule,
        ChattingModule,

        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                disallowedRoutes: [
                    '/api/v1/auth/sign-in',
                    '/api/v1/auth/sign-up',
                ]
            }
        }),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
