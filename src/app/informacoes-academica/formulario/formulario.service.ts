import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

const formulario = require("./formulario.json");

@Injectable({
    providedIn: "root"
  })
  export class FormularioService {
  
    constructor(
      private http: HttpClient
    ) { }
  
    public getMatricula(): Observable<any> {
        return of(formulario);
    }
}