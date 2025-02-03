import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UsersService } from 'src/app/shared/services/users.service';

export const authGuard = async () => {
  const authService = inject(AuthService);
  const userService = inject(UsersService);
  let allowed: boolean = false;

  if (userService.user && authService.isTokenValid()) {
    allowed = true;
  }

  if (!allowed) authService.logout();
  return allowed;
};
