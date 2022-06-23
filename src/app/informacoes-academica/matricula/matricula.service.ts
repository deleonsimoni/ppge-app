import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { info as matricula } from "./matricula";

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