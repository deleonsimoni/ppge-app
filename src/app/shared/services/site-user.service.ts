import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SiteUserService {

  constructor(
    private http: HttpClient
  ) { }

  getHome() {
    return this.http.get(`/api/leped/noticiaCarrossel`);
  }

}
