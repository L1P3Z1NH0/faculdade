import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  set(key: string, value: any) {
    if (this.storage) {
      this.storage.setItem(key, JSON.stringify(value));
      return true;
    }
    return false;
  }

  get(key: string): any {
    if (this.storage) {
      const data = this.storage.getItem(key);
      if (data) return JSON.parse(data);
    }
    return null;
  }

  remove(key: string): boolean {
    if (this.storage) {
      this.storage.removeItem(key);
      return true;
    }
    return false;
  }

  clear(): boolean {
    if (this.storage) {
      this.storage.clear();
      return true;
    }
    return false;
  }
}
