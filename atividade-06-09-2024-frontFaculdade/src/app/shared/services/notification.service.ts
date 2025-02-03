import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  url: string;

  constructor(private httpService: HttpService) {
    this.url = `http://15.229.230.153:3001`;
  }

  async teste() {
    return this.httpService.get(`${this.url}/teste`);
  }

  async add(body: any) {
    return this.httpService.post(`${this.url}/notifications`, body);
  }
}
