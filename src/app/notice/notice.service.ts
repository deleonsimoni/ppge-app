import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  constructor(
    private http: HttpClient
  ) { }

  getNotice(idNoticia): Observable<any> {
    
    let params = new HttpParams()
      .set('_id', idNoticia);
      
    return this.http.get(`/api/ppge/page/noticias`, {params});

  }
}
