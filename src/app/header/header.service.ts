import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class HeaderService {

  constructor(
    private http: HttpClient
  ) { }

  public getHeaderPage(pageSelected: string, language: string): Observable<any> {
    let params = new HttpParams()
      .set('language', language);
    return this.http.get(`/api/ppge/page/${pageSelected}/headers`, {params});
  }
}