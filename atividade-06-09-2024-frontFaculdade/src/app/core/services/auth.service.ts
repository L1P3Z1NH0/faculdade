import { EventEmitter, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { LocalStorageService } from './local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { AppConfigService } from './app-config.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  accessApproved = new EventEmitter();
  accessToken: string;
  refreshToken: string;
  url: string;

  constructor(
    private router: Router,
    private httpService: HttpService,
    private localStorageService: LocalStorageService,
    private usersService: UsersService,
    private toastrService: ToastrService,
    private configService: AppConfigService,
    private titleService: Title
  ) {
    this.usersService.setUser();
    this.accessToken = this.configService.accessToken;
    this.refreshToken = this.configService.refreshToken;
    this.url = `http://15.229.230.153:3001`;
  }

  async authenticate(email: string, password: string) {
    try {
      const response = await this.httpService.post(`${this.url}/auth`, {
        email,
        password,
      });
      this.setAccessToken(response.accessToken);
      this.setRefreshToken(response.refreshToken);
      await this.usersService.setUserOnLocalStorage(response.user);

      await this.verify(response.refreshToken);
      this.toastrService.success(
        'Bem Vindo ' + this.usersService.getUserFromLocalStorage().email
      );
    } catch (error: any) {
      this.toastrService.error(error?.error?.message || 'Erro');
    }
  }

  async verify(token: string) {
    try {
      await this.httpService.get(`${this.url}/refresh`, {
        headers: { authorization: `Bearer ${token}` },
      });
      this.router.navigateByUrl('');
    } catch (error: any) {
      this.toastrService.error(error?.error?.message || 'Erro');
    }
  }

  async resetPassword(email: string, password: string, resetCode: number) {
    try {
      await this.httpService.post(`${this.url}/users/${email}/reset-password`, {
        password,
        resetCode,
      });
    } catch (error: any) {
      this.toastrService.error(error?.error?.message || 'Erro');
    }
  }

  setAccessToken(token: string) {
    this.localStorageService.set(this.accessToken, token);
  }

  getAccessToken() {
    return this.localStorageService.get(this.accessToken);
  }

  removeAccessToken() {
    this.localStorageService.remove(this.accessToken);
  }

  setRefreshToken(token: string) {
    this.localStorageService.set(this.refreshToken, token);
  }

  getRefreshToken() {
    return this.localStorageService.get(this.refreshToken);
  }

  removeRefreshToken() {
    this.localStorageService.remove(this.refreshToken);
  }

  getTokenExpiration() {
    return moment(this.usersService.user?.exp).format('LLLL');
  }

  isTokenValid() {
    const expirationTimestamp = this.usersService.user?.exp;
    if (!expirationTimestamp) return false;

    const expirationDate = moment.unix(expirationTimestamp);

    const currentDate = moment();
    return !currentDate.isAfter(expirationDate);
  }

  logout(expired?: boolean) {
    this.localStorageService.clear();
    this.usersService.clear();
    this.titleService.setTitle('Caring Guardians');
    if (!expired) {
      this.router.navigateByUrl('/login');
    } else {
      this.router.navigateByUrl('/login?expired=true');
    }
  }
}
