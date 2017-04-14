import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_guards/AuthGuard';
import { AuthenticationService } from './_services/authentication.service';

import { LoginComponent } from './login/login.component';
import { OfferListComponent } from './offers/offer-list/offer-list.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: OfferListComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    AuthenticationService
  ]
})
export class AppRoutingModule { }
