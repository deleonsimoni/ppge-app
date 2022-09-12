import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ResearchLineService {
  constructor(
    private http: HttpClient
  ) { }

  public getInfoResearchLine(_idPage: string): Observable<any> {
    let params = new HttpParams();
    params = _idPage ? params.set('_id', _idPage) : params;
    return this.http.get(`/api/ppge/page/linha_pesquisa`, {params});
  }
}