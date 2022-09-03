import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegulationService {
  constructor(
    private http: HttpClient
  ) { }

  private typeToUrl = {
    1: 'regulamento_ppge',
    2: 'regras_credenciamento',
  }

  public getInfoRegulation(regulationType: number): Observable<any> {
    return this.http.get(`/api/ppge/page/${this.typeToUrl[regulationType]}`);
  }
}