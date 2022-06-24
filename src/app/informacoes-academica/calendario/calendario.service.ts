import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { info as calendario } from "./calendario";

@Injectable({
    providedIn: "root"
  })
  export class CalendarioService {
  
    constructor(
      private http: HttpClient
    ) { }
  
    public getCalendario(): Observable<any> {
        return of(calendario);
    }
}