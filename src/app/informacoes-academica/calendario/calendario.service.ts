import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: "root"
  })
  export class CalendarioService {
  
    constructor(
      private http: HttpClient
    ) { }

  public getInfoIaCalendar(): Observable<any> {
    return this.http.get(`/api/ppge/page/ia_calendario`);
  }
}