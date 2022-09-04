import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommitteeService {
  constructor(
    private http: HttpClient
  ) { }

  private typeToUrl = {
    1: 'comissao_deliberativa',
    2: 'comissao_gestao',
  }

  public getInfoCommittee(committeeType: number): Observable<any> {
    return this.http.get(`/api/ppge/page/${this.typeToUrl[committeeType]}`);
  }
}