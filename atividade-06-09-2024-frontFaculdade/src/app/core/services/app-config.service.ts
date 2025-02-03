import { Injectable } from '@angular/core';

@Injectable()
export class AppConfigService {
  accessToken = 'accessToken';
  refreshToken = 'refreshToken';
  userStorageToken = 'user';

  constructor() {}
}
