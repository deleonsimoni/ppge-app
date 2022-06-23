import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { info as formulario } from './formulario';

@Injectable({
    providedIn: "root"
  })
  export class FormularioService {
  
    constructor(
      private http: HttpClient
    ) { }
  
    public getFormulario(): Observable<any> {
        return of(formulario);
    }
}