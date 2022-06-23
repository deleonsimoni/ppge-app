import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

const matricula = require("./matricula.json");

@Injectable({
    providedIn: "root"
  })
  export class MatriculaService {
  
    constructor(
      private http: HttpClient
    ) { }
  
    public getMatricula(): Observable<any> {
        return of(matricula);
    }
}