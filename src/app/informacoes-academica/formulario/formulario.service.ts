import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: "root"
  })
  export class FormularioService {
  
    constructor(
      private http: HttpClient
    ) { }
  
    public getFormulario(): Observable<any> {
      return this.http.get(`/api/ppge/page/ia_formularios`);
    }
}