import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiteUserService {
  private readonly URL_API_PPGE = '/api/ppge';
  private readonly URL_PAGE = `${this.URL_API_PPGE}/page`;

  constructor(
    private http: HttpClient
  ) { }

  getHome() {
    return this.http.get(`/api/leped/noticiaCarrossel`);
  }

  getNoticias(
    pageNumber: number = 1,
    pageSize: number = 4,
  ): Observable<any> {
    
    let params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
      
    return this.http.get(`/api/ppge/page/noticias/paginated/headers`, {params});
  }

  getInfoHomeApresentacao() {
    return this.http.get(`${this.URL_PAGE}/home_apresentacao`);
  }

}
