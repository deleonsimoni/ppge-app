import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: "root"
  })
  export class MatriculaService {
  
    constructor(
      private http: HttpClient
    ) { }
  
    public getMatricula(): Observable<any> {
      return this.http.get(`/api/ppge/page/ia_matricula`);
    }
}