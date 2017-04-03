import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

export const ROUTES: Routes = [
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
