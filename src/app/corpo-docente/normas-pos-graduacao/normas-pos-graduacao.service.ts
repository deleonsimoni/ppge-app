import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { info as normaPosGraduacao } from "./normas-pos-graduacao";

@Injectable({
    providedIn: "root"
  })
  export class NormaPosGraduacaoService {
  
    constructor(
      private http: HttpClient
    ) { }
  
    public getNormaPosGraduacao(): Observable<any> {
        return this.http.get(`/api/ppge/page/normas_pos_doutorado`);
    }
}