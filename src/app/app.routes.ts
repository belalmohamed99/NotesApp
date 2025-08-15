import { Routes } from '@angular/router';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NotesComponent } from './pages/notes/notes.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { userDataGuard } from './user-data.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent, title: 'Sign In' },
  { path: 'signup', component: SignupComponent, title: 'Sign Up' },
  { path: 'notes',canActivate:[userDataGuard] ,component: NotesComponent, title: 'Notes' },
  { path: '**', component: NotfoundComponent, title: 'Error 404' },
];
