import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SiteAdminService } from "@app/shared/services/site-admin.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class HistoricService {

  constructor(
    private http: HttpClient,
    private siteAdminService: SiteAdminService
  ) { }

  public getInfoHistoric(): Observable<any> {
    return this.http.get(`/api/ppge/page/historico`);
  }
}