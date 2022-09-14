import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CorpoDocenteService {

  constructor(
    private http: HttpClient
  ) { }

  public getCorpoDocente(type: number): Observable<any> {
    let params = new HttpParams();
    params = type ? params.set('type', type) : params;
    return this.http.get(`/api/ppge/corpo-docente`, {params});
  }
}