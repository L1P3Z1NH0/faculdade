import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import {
  faChevronLeft,
  faUser,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input({ required: true }) title: string = '';
  @Input() navigateTo: string = '';
  @Input() hasLogout: boolean = false;
  @Input() showProfile: boolean = false;
  chevronLeft = faChevronLeft;
  user = faUser;
  rightFromBracket = faRightFromBracket;

  constructor(public router: Router, public authService: AuthService) {
    this.router = inject(Router);
  }
}
