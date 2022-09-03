import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ObjectiveService {

  constructor(
    private http: HttpClient
  ) { }

  public getInfoObjective(): Observable<any> {
    return this.http.get(`/api/ppge/page/objetivo`);
  }

}