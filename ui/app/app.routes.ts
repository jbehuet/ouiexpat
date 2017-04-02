import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

export const ROUTES: Routes = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
];
