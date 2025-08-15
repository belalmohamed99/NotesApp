import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css',
})
export class SideNavComponent {
  constructor(readonly _AuthService: AuthService) {}
}
