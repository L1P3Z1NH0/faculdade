import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { AppConfigService } from 'src/app/core/services/app-config.service';

enum genderEnum {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

enum userTypeEnum {
  CAREGIVER = 'caregiver',
  OLD_PERSON = 'oldPerson',
}

type userBody = {
  firstName: string;
  lastName: string;
  age: number;
  gender: genderEnum;
  userType: userTypeEnum;
  email: string;
  phone: string;
  password: string;
  exp?: number;
};

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  url: string;
  keyUser: string;
  user: userBody | null = null;

  constructor(
    private localStorageService: LocalStorageService,
    private configService: AppConfigService,
    private httpService: HttpService
  ) {
    this.url = `http://15.229.230.153:3001`;
    this.keyUser = this.configService.userStorageToken;
  }

  async getOneUser(id: string) {
    return this.httpService.get(`${this.url}/users/${id}`);
  }

  async register(body: Pick<userBody, 'email' | 'password'>) {
    return this.httpService.post(`${this.url}/register`, body);
  }

  async updateUser(id: string, body: userBody) {
    return this.httpService.put(`${this.url}/users/${id}`, body);
  }

  async setUserOnLocalStorage(data: any) {
    this.localStorageService.set(this.keyUser, data);
    this.setUser();
  }

  setUser() {
    const user = this.getUserFromLocalStorage();
    if (user) {
      this.user = user;
    }
  }

  getUserFromLocalStorage() {
    return this.localStorageService.get(this.keyUser);
  }

  clear() {
    this.user = null;
    this.localStorageService.remove(this.keyUser);
  }
}
