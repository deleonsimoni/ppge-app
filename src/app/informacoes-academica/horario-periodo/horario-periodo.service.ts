import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { info as horarioPeriodo } from "./horario-periodo";

@Injectable({
    providedIn: "root"
  })
  export class HorarioPeriodoService {
  
    constructor(
      private http: HttpClient
    ) { }
  
    public getHorarioPeriodo(): Observable<any> {
        return of(horarioPeriodo);
    }
}