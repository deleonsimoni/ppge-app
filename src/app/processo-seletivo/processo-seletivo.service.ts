import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { info as processoSeletivo } from "./processo-seletivo";

@Injectable({
    providedIn: "root"
  })
  export class ProcessoSeletivoService {
  
    constructor(
      private http: HttpClient
    ) { }
  
    public getProcessoSeletivo(): Observable<any> {
        return of(processoSeletivo);
    }
}